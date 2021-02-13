import parentLogger from "../../utils/logger";
import db from "../database/db";
import {Request, Response} from "express";

const log = parentLogger.child({ module: "router/courses" });

interface CourseSection {
    coursetitle: string;
    coursedept: string;
    coursenumber: string;
    sectiontitle: string;
    status: string;
    activity: string;
    prof: string;
    term: string;
    day: string;
    starttime: string;
    endtime: string;
}

/**
 * Given a list of sections belonging to one course, builds and pushes to array a section for each timeInfo.
 * @param sections the sections field of a course object
 * @param courseTitle the course's course code (eg. CPSC 210)
 */
const displayAllSections = (sections: any[], courseTitle: string) => {
    let result: CourseSection[] = [];
    sections.forEach((section) => {
        section.timeInfo.forEach((element: any) => {
            result.push(buildCourseSection(courseTitle, section, element));
        });
    });
    return result;
};

/**
 * Searches and returns a list of course sections that take place in the given term
 * @param sections the section field of a course object
 * @param courseTitle a course's course code (e.g. CPSC 210)
 * @param term either 1 or 2
 */
const searchSectionsByTerm = (sections: any[], courseTitle: string, term: string) => {
    let result: any[] = [];
    sections.forEach((section) => {
        let timeInfo = section.timeInfo.find((element: any) => element.term === term);
        if (timeInfo !== undefined) {
            result.push(buildCourseSection(courseTitle, section, timeInfo));
        }
    });
    return result;
};

/**
 * Flattens and formats a course's section object
 * @param courseTitle a course code (e.g. CPSC 210)
 * @param section a section object from a course's section field
 * @param timeInfo a timeInfo object from a section
 */
const buildCourseSection = (courseTitle: string, section: any, timeInfo: any): CourseSection => {
    let [ courseDept, courseNumber, sectionNumber ] = section.sectionTitle.split(" ");

    return {
        coursetitle: courseTitle,
        coursedept: courseDept,
        coursenumber: courseNumber,
        sectiontitle: section.sectionTitle,
        status: section.status,
        activity: section.activity,
        prof: section.prof,
        term: timeInfo.term,
        day: timeInfo.day,
        starttime: timeInfo.start,
        endtime: timeInfo.end
    };
};

/**
 * Searches for a specific section in a list of course sections, given its section number and a course title
 * @param sections the list of sections for a course
 * @param search the section number (e.g. 202 in CPSC 210 202)
 * @param courseTitle the course title
 * @param term the desired term
 */
const searchForSection = (sections: any[], search: string, courseTitle: string, term: string): Promise<CourseSection> => {
    if (sections.length < 1) return Promise.reject(new Error("No sections available for this course code"));

    const foundSection = sections.find((element: any) => element.sectionTitle === search);

    if (foundSection === undefined)
        return Promise.reject(new Error("Unable to find section"));
    else if (term === undefined)
        return Promise.resolve(foundSection);

    const validTimeInfo = foundSection.timeInfo.find((element: any) => element.term === term);

    if (validTimeInfo === undefined) {
        return Promise.reject(new Error("Unable to find section"));
    } else {
        let result = buildCourseSection(courseTitle, foundSection, validTimeInfo);
        return Promise.resolve(result);
    }
};

export const getCourses = async (req: Request, res: Response) => {
    log.info("GET api/courses");
    try {
        const { rows } = await db.query("SELECT * FROM course");
        res.status(200).json(rows);
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};

export const getAllSections = async (req: Request, res: Response) => {
    log.info("GET api/courses/sections");
    try {
        const { rows } = await db.query("SELECT * from course");
        let response: any[] = [];
        rows.forEach((row) => {
            response.push(...displayAllSections(row.sections, row.coursetitle));
        });
        res.status(200).json(response);
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};

export const getCourseSections = async (req: Request, res: Response) => {
    log.info("GET api/course/sections");
    log.info(`coursedept ${req.params.coursedept}`);
    log.info(`coursenumber ${req.params.coursenumber}`);
    const coursedept = req.params.coursedept;
    const coursenumber = req.params.coursenumber;
    const query =
    `SELECT sections, coursetitle FROM course 
    WHERE coursedept=$1 AND coursenumber=$2`;
    const values = [coursedept, coursenumber];
    try {
        const { rows } = await db.query(query, values);
        // course codes are unique so we can safely expect the first and only row to be what we want
        res.status(200).json(displayAllSections(rows[0].sections, rows[0].coursetitle));
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};

export const getCourseSectionsWithTerm = async (req: Request, res: Response) => {
    log.info("GET api/course/sections");
    log.info(`coursedept ${req.params.coursedept}`);
    log.info(`coursenumber ${req.params.coursenumber}`);
    log.info(`term ${req.params.term}`);
    const coursedept = req.params.coursedept;
    const coursenumber = req.params.coursenumber;
    const term = req.params.term;
    const query =
    `SELECT sections, coursetitle FROM course 
    WHERE coursedept=$1 AND coursenumber=$2`;
    const values = [coursedept, coursenumber];
    try {
        const { rows } = await db.query(query, values);
        // course codes are unique so we can safely expect the first and only row to be what we want
        let response = searchSectionsByTerm(rows[0].sections, rows[0].coursetitle, term);
        res.status(200).json(response);
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};

// unused, but it selects a specific section from a course
export const getCourseSectionWithTerm = async (req: Request, res: Response) => {
    log.info("GET api/course/section");
    log.info(`coursedept ${req.params.coursedept}`);
    log.info(`coursenumber ${req.params.coursenumber}`);
    log.info(`coursetitle ${req.params.sectionnumber}`);
    log.info(`term ${req.params.term}`);
    const coursedept = req.params.coursedept;
    const coursenumber = req.params.coursenumber;
    const sectionnumber = req.params.sectionnumber;
    const term = req.params.term;
    const sectiontitle = `${coursedept} ${coursenumber} ${sectionnumber}`;
    log.info(`sectiontitle ${sectiontitle}`);
    const query =
    `SELECT sections, coursetitle FROM course 
    WHERE coursedept=$1 AND coursenumber=$2`;
    const values = [coursedept, coursenumber];

    try {
        const { rows } = await db.query(query, values);
        // course codes are unique so we can safely expect the first and only row to be what we want
        let response = await searchForSection(rows[0].sections, sectiontitle, rows[0].coursetitle, term);
        res.status(200).json(response);
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};
