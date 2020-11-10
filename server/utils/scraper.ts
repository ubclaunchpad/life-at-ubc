import { Browser, ElementHandle, JSHandle, LaunchOptions, Page } from "puppeteer"; // types for TS
import puppeteer from "puppeteer";
import fs from "fs";
import parentLogger from "./logger";

interface TermTime {
    term: string;
    day: string;
    start: string;
    end: string;
}

interface Section {
    sectionTitle: string;
    status: string;
    activity: string;
    prof: string;
    timeInfo: TermTime[];
}

interface Course {
    courseTitle: string;
    courseCode: string;
    description: string;
    credits: string;
    preReqs: string[];
    preReqText: string;
    coReqs: string[];
    coReqText: string;
    sections: Section[];
}

const log = parentLogger.child({ module: "scraper" });
const courseCodeRegex = /([A-Z][A-Z][A-Z][A-Z]?\s\d\d\d[A-Z]?)/g;

let parseHrtimeToSeconds = (hrtime: number[]) => {
    let seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
    return seconds;
};

// helper function
let getInnerHTML = async (element: ElementHandle | Page, selector: string): Promise<string> => {
    return await element.$eval(selector, (elm: any) => elm.innerHTML.trim());
};

/**
 * Scrapes all the links in a table from the [Course Schedule](https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments)
 * @param {Page} page the page instance to scrape
 * @returns {Promise<string[]>} array of URL strings
 */
let getSubjectUrls = async (page: Page): Promise<string[]> => {
    // get <table id="#mainTable">
    let table: any = await page.$("#mainTable");

    // get the first <td> in each row (contains the link)
    let tds: ElementHandle[] = await table.$$("tbody > tr > td:nth-child(1)");
    let aElms: any[] = await Promise.all(
        tds.map((td: ElementHandle) => td.$("a"))
    );

    // take out subjects without course listings this term
    aElms = aElms.filter((a: ElementHandle) => (a !== null && a !== undefined));

    // get href string
    let propertyJsHandles: JSHandle[] = await Promise.all(
        aElms.map((handle: ElementHandle) => handle.getProperty("href"))
    );
    let hrefs: string[] = await Promise.all(
        propertyJsHandles.map((handle: JSHandle) => (handle.jsonValue() as Promise<string>))
    );
    return hrefs;
};

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
    return hrefs;
};

/**
 * Produces a list of pre-reqs and co-reqs a course has, if any. If pre-reqs or co-reqs don't exist, it passes an empty array.
 *
 * For example, if a course has co-reqs but no pre-reqs: `[[], coreqs]`
 * @param {Page} page Page object for a course listing page
 * @returns {Promise<any>} an object that holds a list of coreqs, prereqs, and their corresponding plaintext
 */
let getReqs = async (page: Page): Promise<any> => {
    // preReq <p> may not exist, so .content.expand > p:nth-of-type(3) might be coreq.
    // .content.expand > p:nth-of-type(4) is always a coreq

    // TODO: more nuanced output, see issue #33 on the github
    let preReqs: string[];
    let coReqs: string[];

    let thirdChildHTML = await page.$eval(".content.expand > p:nth-of-type(3)", (p: any) => p.innerText)
        .catch((err: any) => {
            return [];
        });
    let fourthChildHTML = await page.$eval(".content.expand > p:nth-of-type(4)", (p: any) => p.innerText)
        .catch( async (err: any) => {
            return [];
        });

    // regex to determine if the html contains pre-req or coreq
    // sorry this is kind of ugly
    if (/Pre-req/.test(thirdChildHTML)) {
        preReqs = thirdChildHTML.match(courseCodeRegex);

        if (/Co-req/.test(fourthChildHTML)) {
            coReqs = fourthChildHTML.match(courseCodeRegex);
            return {
                preReq: preReqs || [],
                preReqText: thirdChildHTML,
                coReq: coReqs || [],
                coReqText: fourthChildHTML,
            };
        }

        return {
            preReq: preReqs || [],
            preReqText: thirdChildHTML,
            coReq: [],
            coReqText: "",
        };
    } else if (/Co-req/.test(thirdChildHTML)) {
        coReqs = thirdChildHTML.match(courseCodeRegex);

        return {
            preReq: [],
            preReqText: "",
            coReq: coReqs || [],
            coReqText: thirdChildHTML,
        };
    } else {
        return {
            preReq: [],
            preReqText: "",
            coReq: [],
            coReqText: "",
        };
    }
};

/**
 * Helper function to retrieve the description and number of credits for a course.
 * @param {Page} page Page object for a course listing page
 * @returns {Promise<[string, string]>} a tuple that holds the description of a course and the number of credits it gives
 */
let getDescCreds = async (page: Page): Promise<[string, string]> => {
    let desc: string = await getInnerHTML(page, ".content.expand > p:first-of-type");
    let creds: string = await getInnerHTML(page, ".content.expand > p:nth-of-type(2)");

    let regexedCreds = creds.match(/[0-9]+/);

    if (regexedCreds != null) {
        creds = regexedCreds[0];
    }

    if (desc === "") {
        desc = "No description provided.";
    }

    return [desc, creds];
};

/**
 * Given a URL to a course listing, gets course information. [Example URL](https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=AANB&course=504)
 * @param {string} url URL string to a UBC Course Schedule course page
 * @param {Browser} browser the working (top-level) browser instance
 * @returns {Promise<Course>} a promise for a Course object
 */
let getCourseInfo = async (url: string, browser: Browser): Promise<Course> => {
    // to benchmark page opening times, since it's the biggest bottleneck for scraper currently
    const startTime = process.hrtime();

    let coursePage: Page = await browser.newPage();
    await pageConfig(coursePage);
    await coursePage.goto(url);

    const elapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));
    log.debug(`Opening course page: ${elapsedSeconds}s`);

    let courseCode: string = await getInnerHTML(coursePage, ".breadcrumb.expand > li:nth-child(4)");
    let courseTitle: string = await getInnerHTML(coursePage, ".content.expand > h4");

    let [ desc, creds ] = await getDescCreds(coursePage);

    let { preReq, preReqText, coReq, coReq_text} = await getReqs(coursePage);

    let courseData: Course = {
        courseTitle: courseTitle,
        courseCode: courseCode,
        description: desc,
        credits: creds,
        preReqs: preReq,
        preReqText: preReqText,
        coReqs: coReq,
        coReqText: coReq_text,
        sections: []
    };

    let tableRows: ElementHandle[] = await coursePage.$$(".table.table-striped.section-summary > tbody > tr");
    let isMultiRow = false;
    for (let i = 0; i < tableRows.length - 1; i++) {
        // pushes new section information every time the current <tr> has a non-null title column
        // for every <tr> with a null title, we just add a new TermTime to the last section pushed

        if (isMultiRow) {
            let rowTimeInfo = {
                term: await getInnerHTML(tableRows[i], "td:nth-child(4)"),
                day: await getInnerHTML(tableRows[i], "td:nth-child(6)"),
                start: await getInnerHTML(tableRows[i], "td:nth-child(7)"),
                end: await getInnerHTML(tableRows[i], "td:nth-child(8)")
            };

            courseData.sections[courseData.sections.length - 1].timeInfo.push(rowTimeInfo);
        }

        let nextRowTitle: string | null = await tableRows[i + 1].$("td:nth-child(2)")
            .then((elm: any) => elm.$eval("a", (a: any) => a.innerHTML))
            .catch((err: any) => {
                // unable to find a title in the next row
                return null;
            });

        let thisRowTitle: string | null = await tableRows[i].$("td:nth-child(2)")
            .then((elm: any) => elm.$eval("a", (a: any) => a.innerHTML))
            .catch((err: any) => {
                // unable to find a title in the next row
                return null;
            });

        isMultiRow = (nextRowTitle == null);

        if (thisRowTitle) {
            courseData.sections.push(await formatSectionInfo(tableRows[i], browser));
        }
    }
    if (!isMultiRow) {
        courseData.sections.push(await formatSectionInfo(tableRows[tableRows.length - 1], browser));
    } else {
        let rowTimeInfo = {
            term: await getInnerHTML(tableRows[tableRows.length - 1], "td:nth-child(4)"),
            day: await getInnerHTML(tableRows[tableRows.length - 1], "td:nth-child(6)"),
            start: await getInnerHTML(tableRows[tableRows.length - 1], "td:nth-child(7)"),
            end: await getInnerHTML(tableRows[tableRows.length - 1], "td:nth-child(8)")
        };

        courseData.sections[courseData.sections.length - 1].timeInfo.push(rowTimeInfo);
    }

    await coursePage.close();
    return courseData;
};

/**
 * Returns professor name for a section. [Example URL found here](https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=AANB&course=504&section=002)
 * @param {string} url url string to a UBC Course Schedule section page
 * @param {boolean} isCourse true if activity is of type "Web-Oriented Course" or "Lecture"
 * @param {Browser} browser working browser instance
 * @returns {string} the name of the professor teaching the section or an empty string if !isCourse
 */
let getSpecificSectionInfo = async (url: string, isCourse: boolean, browser: Browser) => {
    if (!isCourse) return "";
    let sectionPage: Page = await browser.newPage();
    await pageConfig(sectionPage);
    await sectionPage.goto(url);
    let sectionProf: string = await sectionPage.$(".content.expand > table:nth-of-type(3)")
        .then((table: any) => table.$("tbody > tr > td:nth-of-type(2)"))
        .then((td: any) => getInnerHTML(td, "a"))
        .catch((err) => {
            // there is no prof yet
            return "TBA";
        });
    await sectionPage.close();
    return sectionProf;
};

/**
 * Scrapes a table row for a section's information
 * @param {ElementHandle} elmHandle the ElementHandle representing a UBC Course Schedule course row
 * @param {Browser} browser the working (top-level) browser instance
 * @returns the section's title, page url, activity type, and prof
 */
let handleSectionUrl = async (elmHandle: ElementHandle, browser: Browser) => {
    interface returnType {
        sTitle: string;
        sectionUrl: string;
        sActivity: string;
        prof: string;
    }

    let ret: returnType = {
        sTitle: "",
        sectionUrl: "",
        sActivity: "",
        prof: ""
    };

    await elmHandle.$("td:nth-child(2)")
        .then((elm: any) => elm.$("a"))
        .then(async (a: any) => {
            ret.sectionUrl = await a.evaluate((elm: any) => elm.href)!;
            ret.sTitle = await a.evaluate((elm: any) => elm.innerHTML.trim())!;
            ret.sActivity = await getInnerHTML(elmHandle, "td:nth-child(3)");
        })
        .catch((err: any) => {
            return "";
        })
        .then(async () => {
            let isCourse = (typeof ret.sActivity === "string" && (ret.sActivity === "Lecture" || ret.sActivity === "Web-Oriented Course"));
            ret.prof = await getSpecificSectionInfo(ret.sectionUrl, isCourse, browser);
        });

    return ret;
};

/**
 * Returns an object that holds all of the information for a given course's section
 * @param {ElementHandle} elmHandle ElementHandle instance of a UBC Course Schedule course table row
 * @param {Browser} browser the working (top-level) browser instance
 * @returns {Section} section information including title, status, activity, prof, and time-related information
 */
let formatSectionInfo = async (elmHandle: ElementHandle, browser: Browser): Promise<Section> => {
    let sStatus: string = await getInnerHTML(elmHandle, "td:first-child");
    let { prof, sTitle } = await handleSectionUrl(elmHandle, browser);
    let sActivity: string = await getInnerHTML(elmHandle, "td:nth-child(3)");
    let sTerm: string = await getInnerHTML(elmHandle, "td:nth-child(4)");
    let sDays: string = await getInnerHTML(elmHandle, "td:nth-child(6)");
    let timeStart: string = await getInnerHTML(elmHandle, "td:nth-child(7)");
    let timeEnd: string = await getInnerHTML(elmHandle, "td:nth-child(8)");
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
    };
};


/**
 * Configures a page to disable network asset requests to improve performance
 * @param {Page} page The Page to be configured
 */
let pageConfig = async (page: Page) => {
    await page.setRequestInterception(true);
    page.on("request", (req) => {
        if (req.resourceType() === "image" ||
            req.resourceType() === "stylesheet" ||
            req.resourceType() === "font") {
            req.abort();
        } else {
            req.continue();
        }
    });
};


/**
 * Scrapes the entire UBC Course Schedule and writes the information of all course sections to disk.
 *
 * If given an argument, it scrapes the information of a specific course and outputs that to ./utils/output_test.json
 *
 * Some recommended arguments are **145** (tests multi-term courses), **67** (tests prereqs), **118** (tests courses that have different day/times), **72** (CPSC)
 *
 * @param {number} [subjectTest] (optional) The row index (between [0, 237] inclusive) of a course on the main [Course Schedule](https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments) page
 */
let scraper = async (subjectTest?: number) => {

    let puppeteerOptions: LaunchOptions  = {
        // args should help reduce load on CPU, since we're running headless Chromium
        args: [
            "--no-sandbox",                             // disabled for docker container
            "--disable-setuid-sandbox",                 // a sandbox dependent
            "--no-zygote",                              // sandbox dependent
            "--disable-accelerated-2d-canvas",          // disables gpu-accel 2d <canvas>
            "--no-first-run",                           // disables first run options
            "--disable-gpu"                             // yes
        ],
        headless: true,                                 // set to false for graphical debugging
        userDataDir: __dirname + "./pptr_userDataDir"   // stores cookies, localStorage, cache to improve performance
    };

    try {
        let startTime = process.hrtime();
        log.info("Started scraping.");
        const browser: Browser = await puppeteer.launch(puppeteerOptions);
        const page = await browser.newPage();
        await pageConfig(page);
        await page.goto("https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-all-departments");
        let subjectUrls: string[] = await getSubjectUrls(page);
        let data: Course[] = [];
        let outputPath = (subjectTest !== undefined && subjectTest < 237 && subjectTest >= 0) ? "./utils/output_test.json" : "./utils/output.json";

        if (subjectTest !== undefined && subjectTest < 237 && subjectTest >= 0) {
            let courseUrls: string[] = await getCourseUrls(subjectUrls[subjectTest], browser);
            for (let i = 0; i < courseUrls.length; i++) {
                const courseStartTime = process.hrtime();
                let courseInfo = await getCourseInfo(courseUrls[i], browser);
                data.push(courseInfo);
                const elapsedSeconds = parseHrtimeToSeconds(process.hrtime(courseStartTime));
                log.debug(`getCourseInfo: build ${elapsedSeconds}s`);
                log.debug(`Pushed ${courseInfo.courseCode} (${i} of ${courseUrls.length})`);
            }
        } else if (subjectTest === undefined) {
            for (let i = 0; i < subjectUrls.length; i++) {
                let courseUrls: string[] = await getCourseUrls(subjectUrls[i], browser);
                for (let j = 0; j < courseUrls.length; j++) {
                    const courseStartTime = process.hrtime();
                    let courseInfo = await getCourseInfo(courseUrls[j], browser);
                    data.push(courseInfo);
                    const elapsedSeconds = parseHrtimeToSeconds(process.hrtime(courseStartTime));
                    log.debug(`getCourseInfo: build ${elapsedSeconds}s`);
                    log.debug(`Pushed ${courseInfo.courseCode} (${j + 1} of ${courseUrls.length} sections)`);
                }
                log.debug(`Pushed ${data[i].courseCode.substr(0, 4)} (${i + 1} of ${subjectUrls.length} courses)`);
            }
        } else {
            log.error("Input must be a number in the range [0, 237] inclusive.");
        }

        if (data) {
            fs.writeFile(outputPath, JSON.stringify(data), (err: any) => {
                if (err) return log.error(err);
                log.info(`Finished scraping, wrote to ${outputPath}.`);
            });

            // update db
            // axios.post("webhook url", data); <-- post request to trigger front-end build script
        } else {
            log.warn("Possible error, nothing written to disk.");
        }

        let scraperElapsedSeconds = parseHrtimeToSeconds(process.hrtime(startTime));
        log.info(`scraper: elapsed time ${scraperElapsedSeconds}s`);
        await browser.close();
    } catch (err) {
        log.error(err);
    }
};

export default scraper;
