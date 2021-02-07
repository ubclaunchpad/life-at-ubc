import parentLogger from "../../utils/logger";
import db from "../database/db";
import {Request, Response} from "express";

const log = parentLogger.child({ module: "router/courses" });

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

const displayAllSections = (sections: any[], courseTitle: string) => {
    let result: any[] = [];
    sections.forEach((section) => {
        section.timeInfo.forEach((element: any) => {
            result.push(buildCourseSection(courseTitle, section, element));
        });
    });
    return result;
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
        let response = searchSectionsByTerm(rows[0].sections, coursedept, coursenumber, rows[0].coursetitle, term);
        res.status(200).json(response);
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
};

const searchSectionsByTerm = (sections: any[], courseDept: string, courseNumber: string, courseTitle: string, term?: string) => {
    let result: any[] = [];
    sections.forEach((section) => {
        let timeInfo = section.timeInfo.find((element: any) => element.term === term);
        if (timeInfo !== undefined) {
            result.push(buildCourseSection(courseTitle, section, timeInfo));
        }
    });
    return result;
};

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

const searchForSection = (arr: any[], search: string, courseTitle: string, term?: string): Promise<any> => {
    if (arr.length < 1) return Promise.reject(new Error("No sections available for this course code"));

    const foundSection = arr.find((element: any) => element.sectionTitle === search);

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

const buildCourseSection = (courseTitle: string, section: any, timeInfo: any) => {
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
        startTime: timeInfo.start,
        endTime: timeInfo.end
    };
};
