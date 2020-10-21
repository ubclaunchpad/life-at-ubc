import { table } from "console";
import { Browser, ElementHandle, JSHandle, Page } from "puppeteer"; // types for TS
const puppeteer = require('puppeteer');
const fs = require('fs');

/* interface Section {
    sectionTitle: string,
    status: string,
    terms: string,
    days: string[][], // should usually be size 0 (if it's a seminar/thesis/directed studies class) or 1, unless it's a year-long course, which should have size 2
    start: string,
    end: string
} */

interface TermTime {
    term: string,
    day: string,
    start: string,
    end: string
}

interface Section {
    sectionTitle: string,
    status: string,
    timeInfo: TermTime[]
}

interface Course {
    courseTitle: string,
    courseCode: string,
    sections: Section[]
}

let getInnerHTML = async (element: ElementHandle | Page, selector: string): Promise<string> => {
    return await element.$eval(selector, (elm: any) => elm.innerHTML.trim());
}

let getSubjectUrls = async (page: Page): Promise<string[]> => {
    // get <table id="#mainTable">
    let table: any = await page.$('#mainTable'); 

    // get the first <td> in each row (contains the link)
    let tds: ElementHandle[] = await table.$$("tbody > tr > td:nth-child(1)"); 
    let aElms: any[] = await Promise.all(
        tds.map(td => td.$('a'))
    )

    // take out subjects without course listings this term
    aElms = aElms.filter(a => (a != null && a != undefined)) 

    // get href string
    let propertyJsHandles: JSHandle[] = await Promise.all(
        aElms.map(handle => handle.getProperty('href'))
    );
    let hrefs: string[] = await Promise.all(
        propertyJsHandles.map(handle=>(handle.jsonValue() as Promise<string>))
    ); 
    return hrefs;
 }

// given a url to a subject listing, get the course urls 
let getCourseUrls = async (url: string, browser: Browser) => {
    let subjectPage: Page = await browser.newPage();
    await subjectPage.goto(url);
    let hrefs: string[] = await getSubjectUrls(subjectPage);
    await subjectPage.close();
    return hrefs
}

// given a url to a course listing, get course information
let getCourseInfo = async (url: string, browser: Browser) => {
    let sectionPage: Page = await browser.newPage();
    await sectionPage.goto(url);
    let courseCode: string = await getInnerHTML(sectionPage, '.breadcrumb.expand > li:nth-child(4)');
    let courseTitle: string = await getInnerHTML(sectionPage, '.content.expand > h4');
    let courseData: Course = {
        courseTitle: courseTitle,
        courseCode: courseCode,
        sections: []
    }
    let tableRows: ElementHandle[] = await sectionPage.$$('.table.table-striped.section-summary > tbody > tr'); 
    let isMultiRow = false;
    for (let i = 0; i < tableRows.length-1; i++) {
        // if next guy after this has no title, we know the next row is 
        // if we just found a section with 2+ rows, keep scraping ONLY the timeInfo until you reach a row
        // with a title or you reach the end of the table

        if (isMultiRow) {
            let rowTimeInfo = {
                term: await getInnerHTML(tableRows[i], 'td:nth-child(4)'),
                day: await getInnerHTML(tableRows[i], 'td:nth-child(6)'),
                start: await getInnerHTML(tableRows[i],'td:nth-child(7)'),
                end: await getInnerHTML(tableRows[i],'td:nth-child(8)')
            }
            courseData.sections[courseData.sections.length-1].timeInfo.push(rowTimeInfo);
        }

        let nextRowTitle: string | null = await tableRows[i+1].$('td:nth-child(2)')
            .then((elm: any) => elm.$eval('a', (elm: any) => elm.innerHTML))
            .catch(async () => {
                // unable to find a title in the next row
                return null;
            });
        
        isMultiRow = (nextRowTitle == null);

        courseData.sections.push(await formatSectionInfo(tableRows[i]));
    }
    if (!isMultiRow) courseData.sections.push(await formatSectionInfo(tableRows[tableRows.length-1]));
    await sectionPage.close();
    return courseData;
}

let formatSectionInfo = async (elmHandle: ElementHandle) => {
    let sStatus: string = await getInnerHTML(elmHandle, 'td:first-child')
    let sTitle: any = await elmHandle.$('td:nth-child(2)')
        .then((elm: any) => elm.$eval('a', (elm: any) => elm.innerHTML.trim()))
        .catch(async () => {
            return ""
        });
    let sTerm: string = await getInnerHTML(elmHandle, 'td:nth-child(4)');
    let sDays: string = await getInnerHTML(elmHandle, 'td:nth-child(6)');
    let timeStart: string = await getInnerHTML(elmHandle,'td:nth-child(7)');
    let timeEnd: string = await getInnerHTML(elmHandle,'td:nth-child(8)');

    return {
        sectionTitle: sTitle,
        status: sStatus,
        timeInfo: [
            {
                term: sTerm,
                day: sDays,
                start: timeStart,
                end: timeEnd
            }
        ]
    }
}

(async  () => {
    try {
        console.time('scraper');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments')
        let subjectUrls: string[] = await getSubjectUrls(page);
        let data: Course[] = []

        for (let i = 0; i < subjectUrls.length; i++) {
            let courseUrls: string[] = await getCourseUrls(subjectUrls[i], browser);
            for (let j = 0; j < courseUrls.length; j++) {
                let sectionInfo = await getCourseInfo(courseUrls[j], browser);
                data.push(sectionInfo);
            }
        }

        fs.writeFile('courses.json', JSON.stringify(data), (err: any) => {
            if (err) return console.error(err);
            console.log("Wrote to courses.json");
        });
        
        // axios.post('webhook url', data); <-- post request to trigger front-end build script
        console.timeEnd('scraper');
        await browser.close();
    } catch (err) {
        console.error(err);
    }
})();