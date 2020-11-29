import { readFile } from "fs";
import parentLogger from "../../utils/logger";
import db from "./db";
import { PreReq, CoReq, CourseSection } from "./schema";

const log = parentLogger.child({ module: "router" });
const src = "./utils/output.json";

export const setupDb = async () => {
    let { rows: tables } = await getTables();
    tables = tables.map((table) => table.table_name);
    if (["prereq", "coreq", "coursesection"].every((name) => tables.includes(name))) {
        log.info("Tables already exist. Will not be re-creating the DB.");
        return;
    }
    await dropDb();
    await createDb();
    await populateDb();
};

const dropDb = () => db.query(`DROP TABLE IF EXISTS PreReq, CoReq, CourseSection;`);

const createDb = async () => {
    await db.query(PreReq);
    await db.query(CoReq);
    await db.query(CourseSection);
};

const populateDb = () => {
    readFile(src, { encoding: "utf8" }, async (err: any, data: any) => {
        if (err) {
            log.error(`error ${err}`);
            return;
        }
        const courses = JSON.parse(data);
        log.info(`${courses.length} courses`);
        const coReqsToStore: any[] = [];
        const preReqsToStore: any[] = [];
        const sectionsToStore: any[] = [];
        courses.forEach((course: any) => {
            const { courseTitle, courseCode, preReqs = [], coReqs = [], sections = [], preReqText, coReqText } = course;
            const [courseDept, courseNumber] = courseCode.split(" ");
            coReqs.forEach((coReq: any) => handleReq(courseDept, courseNumber, coReq, coReqText, coReqsToStore));
            preReqs.forEach((preReq: any) => handleReq(courseDept, courseNumber, preReq, preReqText, preReqsToStore));
            sections.forEach((section: any) => handleSection(courseTitle, courseDept, courseNumber, section, sectionsToStore));
        });
        try {
            log.info(`Found ${coReqsToStore.length} co-requisites.`);
            log.info(`Found ${preReqsToStore.length} pre-requisites.`);
            log.info(`Found ${sectionsToStore.length} course sections.`);
            coReqsToStore.forEach(insertCoReq);
            preReqsToStore.forEach(insertPreReq);
            sectionsToStore.forEach(insertSection);
            const { rows: coReqs } = await db.query(`SELECT * FROM CoReq`);
            const { rows: preReqs } = await db.query(`SELECT * FROM PreReq`);
            const { rows: sections } = await db.query(`SELECT * FROM CourseSection`);
            log.info(`Inserted ${coReqs.length} co-requisites.`);
            log.info(`Inserted ${preReqs.length} pre-requisites.`);
            log.info(`Inserted ${sections.length} course sections.`);
        } catch (e) {
            log.error(`error ${e}`);
        }
    });
};

const handleReq = (courseDept: string, courseNumber: string, req: any, plaintext: string, store: any[]) => {
    const [reqCourseDept, reqCourseNumber] = req.split(" ");
    store.push([courseDept, courseNumber, reqCourseDept, reqCourseNumber, plaintext]);
};

const handleSection = (courseTitle: string, courseDept: string, courseNumber: string, section: any, store: any[]) => {
    const { sectionTitle, status, activity, prof, timeInfo } = section;
    timeInfo.forEach((time: any) => {
        const { term, day, start, end } = time;
        store.push([
            courseTitle, courseDept, courseNumber,
            sectionTitle, status, activity, prof,
            term, day, start, end,
        ]);
    });
};

const insertCoReq = (req: []) => insertReq("CoReq", req);
const insertPreReq = (req: []) => insertReq("PreReq", req);

const insertReq = (table: string, req: []) => {
    db.query(`INSERT INTO ${table} VALUES ($1, $2, $3, $4, $5)`, req);
};

const insertSection = (section: []) => {
    db.query("INSERT INTO CourseSection VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", section);
};

const getTables = () => db.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
    AND table_type='BASE TABLE';
`);
