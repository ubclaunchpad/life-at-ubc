import { Browser, ElementHandle, JSHandle, LaunchOptions, Page } from "puppeteer"; // types for TS
const puppeteer = require('puppeteer');
const fs = require('fs');

interface TermTime {
    term: string,
    day: string,
    start: string,
    end: string
}

interface Section {
    sectionTitle: string,
    status: string,
    activity: string,
    prof: string,
    timeInfo: TermTime[]
}

interface Course {
    courseTitle: string,
    courseCode: string,
    preReqs: string[],
    coReqs: string[],
    sections: Section[]
}

const courseCodeRegex = /([A-Z][A-Z][A-Z][A-Z]?\s\d\d\d[A-Z]?)/g;

// helper function
let getInnerHTML = async (element: ElementHandle | Page, selector: string): Promise<string> => {
    return await element.$eval(selector, (elm: any) => elm.innerHTML.trim());
}

/**
 * Scrapes all the links in a table from the [Course Schedule](https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments)
 * @param {Page} page the page instance to scrape
 * @returns {Promise<string[]>} array of URL strings
 */
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

/**
 * Takes in a subject URL and returns all the course URLs within it. [Example URL](https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=AANB)
 * @param {string} url URL string for a subject  
 * @param {Browser} browser the working (top-level) browser instance
 * @returns {Promise<string[]>} array of urls
 */
let getCourseUrls = async (url: string, browser: Browser): Promise<string[]> => {
    let subjectPage: Page = await browser.newPage();
    await pageConfig(subjectPage);
    await subjectPage.goto(url);
    let hrefs: string[] = await getSubjectUrls(subjectPage); // borrowing this function because it does the same thing anyway lol
    await subjectPage.close();
    return hrefs
}

/**
 * Given a URL to a course listing, gets course information. [Example URL](https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=AANB&course=504)
 * @param {string} url URL string to a UBC SSC course page 
 * @param {Browser} browser the working (top-level) browser instance
 * @returns {Promise<Course>} a promise for a Course object
 */
let getCourseInfo = async (url: string, browser: Browser): Promise<Course> => {
    console.time("[getCourseInfo] Opening course page")

    let coursePage: Page = await browser.newPage();
    await pageConfig(coursePage);
    await coursePage.goto(url);
    console.timeEnd("[getCourseInfo] Opening course page")
    let courseCode: string = await getInnerHTML(coursePage, ".breadcrumb.expand > li:nth-child(4)");
    let courseTitle: string = await getInnerHTML(coursePage, ".content.expand > h4");

    // prereq is USUALLY found as '.content.expand > p:nth-of-type(3)' then a list of its a children but we must validate it first 
    // TODO: check if it starts with Pre-reqs: or Co-reqs:? (might not be necessary)
    // same with Coreq but nth-child(4) and if it exists, then it must start with just Co-reqs: but we'll just reuse the code from above lol
    let preReqHTML: string = await coursePage.$eval(".content.expand > p:nth-of-type(3)", p => p.innerHTML)
        .catch( async (err) => {
            return "";
        });

    let preReq: string[] | null = preReqHTML.match(courseCodeRegex) // gets course codes from prereqs, doesn't care if optional/required yet
    if (preReq == null) preReq = [];
    let coReq: string[] = await coursePage.$(".content.expand > p:nth-of-type(4)")
        .then( (p: any) => p.$$eval('a', (a: any) => a.innerHTML))
        .catch( async (err) => {
            return [];
        });
    
    let courseData: Course = {
        courseTitle: courseTitle,
        courseCode: courseCode,
        preReqs: preReq,
        coReqs: coReq,
        sections: []
    }

    let tableRows: ElementHandle[] = await coursePage.$$('.table.table-striped.section-summary > tbody > tr'); 
    let isMultiRow = false;
    for (let i = 0; i < tableRows.length-1; i++) {
        // pushes new section information every time the current <tr> has a non-null title column
        // for every <tr> with a null title, we just add a new TermTime to the last section pushed 

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
            .catch((err) => {
                // unable to find a title in the next row
                return null;
            });

        let thisRowTitle: string | null = await tableRows[i].$('td:nth-child(2)')
            .then((elm: any) => elm.$eval('a', (elm: any) => elm.innerHTML))
            .catch((err) => {
                // unable to find a title in the next row
                return null;
            });
        
        isMultiRow = (nextRowTitle == null);
        if (thisRowTitle) { courseData.sections.push(await formatSectionInfo(tableRows[i], browser)) }
    }
    if (!isMultiRow) {
        courseData.sections.push(await formatSectionInfo(tableRows[tableRows.length-1], browser))
    } else {
        let rowTimeInfo = {
            term: await getInnerHTML(tableRows[tableRows.length-1], 'td:nth-child(4)'),
            day: await getInnerHTML(tableRows[tableRows.length-1], 'td:nth-child(6)'),
            start: await getInnerHTML(tableRows[tableRows.length-1],'td:nth-child(7)'),
            end: await getInnerHTML(tableRows[tableRows.length-1],'td:nth-child(8)')
        }

        courseData.sections[courseData.sections.length-1].timeInfo.push(rowTimeInfo);
    }

    await coursePage.close();
    return courseData;
}

/**
 * Returns professor name for a section. [Example found here](https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=AANB&course=504&section=002)
 * @param {string} url url string to a UBC SSC section page
 * @param {boolean} isCourse true if activity is of type "Web-Oriented Course" or "Lecture"
 * @param {Browser} browser working browser instance
 * @returns {string} the name of the professor teaching the section or an empty string if !isCourse
 */
let getSpecificSectionInfo = async (url: string, isCourse: boolean, browser: Browser) => {
    if (!isCourse) return "";
    let sectionPage: Page = await browser.newPage();
    await pageConfig(sectionPage);
    await sectionPage.goto(url)
    let sectionProf: string = await sectionPage.$('.content.expand > table:nth-of-type(3)')
        .then((table: any) => table.$('tbody > tr > td:nth-of-type(2)'))
        .then((td: any) => getInnerHTML(td, 'a'))
        .catch((err) => {
            // there is no prof yet
            return "TBA";
        });
    await sectionPage.close();
    return sectionProf;
} 

/**
 * Scrapes a table row for a section's information
 * @param {ElementHandle} elmHandle the ElementHandle representing a UBC SSC course row
 * @param {Browser} browser the working (top-level) browser instance
 * @returns the section's title, page url, activity type, and prof
 */
let handleSectionUrl = async (elmHandle: ElementHandle, browser: Browser) => {
    interface returnType {
        sTitle: string,
        sectionUrl: string,
        sActivity: string,
        prof: string
    }
    
    let ret: returnType = {
        sTitle: "",
        sectionUrl: "",
        sActivity: "",
        prof: ""
    }
    await elmHandle.$('td:nth-child(2)')
        .then((elm: any) => elm.$('a'))
        .then(async (a: any) => {
            ret.sectionUrl = await a.evaluate((elm: any) => elm.href)!;
            ret.sTitle = await a.evaluate((elm: any) => elm.innerHTML.trim())!;
            ret.sActivity = await getInnerHTML(elmHandle, 'td:nth-child(3)');
        })
        .catch((err: any) => {
            return ""
        })
        .then(async () => {
            let isCourse = (typeof ret.sActivity == 'string' && (ret.sActivity == "Lecture" || ret.sActivity == "Web-Oriented Course"))
            ret.prof = await getSpecificSectionInfo(ret.sectionUrl, isCourse, browser)
        })

    return ret
}

/**
 * Returns an object that holds all of the information for a given course's section
 * @param {ElementHandle} elmHandle ElementHandle instance of a UBC SSC course table row
 * @param {Browser} browser the working (top-level) browser instance
 * @returns {Section} section information including title, status, activity, prof, and time-related information
 */
let formatSectionInfo = async (elmHandle: ElementHandle, browser: Browser): Promise<Section> => {
    let sStatus: string = await getInnerHTML(elmHandle, 'td:first-child');
    let { prof, sTitle } = await handleSectionUrl(elmHandle, browser)
    let sActivity: string = await getInnerHTML(elmHandle, 'td:nth-child(3)')
    let sTerm: string = await getInnerHTML(elmHandle, 'td:nth-child(4)');
    let sDays: string = await getInnerHTML(elmHandle, 'td:nth-child(6)');
    let timeStart: string = await getInnerHTML(elmHandle,'td:nth-child(7)');
    let timeEnd: string = await getInnerHTML(elmHandle,'td:nth-child(8)');
    return {
        sectionTitle: sTitle,
        status: sStatus,
        activity: sActivity,
        prof: prof,
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

let pageConfig = async (page: Page) => {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (req.resourceType() === "image" || 
            req.resourceType() === "stylesheet" ||
            req.resourceType() === "font") {
            req.abort();
        } else {
            req.continue();
        }
    })
}

// main scraper function
let scraper = async () => {

    let puppeteerOptions: LaunchOptions  = {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ],
        headless: true,
        userDataDir: __dirname + "./pptr_userDataDir"
    }

    try {
        console.time('scraper');
        console.log('scraper: Started scraping.')
        const browser: Browser = await puppeteer.launch(puppeteerOptions);
        const page = await browser.newPage();
        await pageConfig(page);
        await page.goto('https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments')
        let subjectUrls: string[] = await getSubjectUrls(page);
        let data: Course[] = []

        for (let i = 0; i < subjectUrls.length; i++) {
            let courseUrls: string[] = await getCourseUrls(subjectUrls[i], browser);
            for (let j = 0; j < courseUrls.length; j++) {
                console.time("[getCourseInfo] Build course information");
                let courseInfo = await getCourseInfo(courseUrls[j], browser);
                data.push(courseInfo);
                console.log(`Pushed ${courseInfo.courseCode}`)
                console.timeEnd("[getCourseInfo] Build course information");
            }
        }

        fs.writeFile('output.json', JSON.stringify(data), (err: any) => {
            if (err) return console.error(err);
            console.log("scraper: Finished scraping, wrote to output.json.");
        });
        
        // update db
        // axios.post('webhook url', data); <-- post request to trigger front-end build script
        console.timeEnd('scraper'); // latest version: 27850683.808ms or uh... 7 hours lol
        await browser.close();
    } catch (err) {
        console.error(err);
    }
}

scraper();