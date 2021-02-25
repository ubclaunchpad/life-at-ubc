import { readFile } from "fs";
import parentLogger from "../../utils/logger";
import db from "./db";
import { PreReq, CoReq, Course } from "./schema";

const log = parentLogger.child({ module: "router" });
const src = "./utils/output.json";

export const setupDb = async (update: boolean) => {
    let { rows: tables } = await getTables();
    tables = tables.map((table) => table.table_name);

    if (update === true || ["prereq", "coreq", "course"].some((name) => !tables.includes(name))) {
        await dropDb();
        await createDb();
        await populateDb();
    } else {
        if (tables.includes("coursesection")) await db.query(`DROP TABLE IF EXISTS CourseSection;`);
        log.info("Tables already exist. Will not be re-creating the DB.");
        return;
    }
};

const dropDb = () => db.query(`DROP TABLE IF EXISTS PreReq, CoReq, Course, CourseSection;`);

const createDb = async () => {
    await db.query(PreReq);
    await db.query(CoReq);
    await db.query(Course);
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
        const coursesToStore: any[] = [];
        courses.forEach((course: any) => {
            const { courseTitle, courseCode, description, credits, preReqText, coReqText, preReqs = [], coReqs = [], sections = [] } = course;
            const [ courseDept, courseNumber ] = courseCode.split(" ");
            coReqs.forEach((coReq: any) => handleReq(courseDept, courseNumber, coReq, coReqText, coReqsToStore));
            preReqs.forEach((preReq: any) => handleReq(courseDept, courseNumber, preReq, preReqText, preReqsToStore));
            const sectionJson = JSON.stringify(sections);
            coursesToStore.push([
                courseTitle, courseDept,
                courseNumber, description,
                credits, preReqText,
                coReqText, sectionJson
            ]);
        });
        try {
            log.info(`Found ${coReqsToStore.length} co-requisites.`);
            log.info(`Found ${preReqsToStore.length} pre-requisites.`);
            log.info(`Found ${coursesToStore.length} courses.`);
            coReqsToStore.forEach(insertCoReq);
            preReqsToStore.forEach(insertPreReq);
            coursesToStore.forEach(insertCourse);
            const { rows: coReqs } = await db.query(`SELECT * FROM CoReq`);
            const { rows: preReqs } = await db.query(`SELECT * FROM PreReq`);
            const { rows: sections } = await db.query(`SELECT * FROM Course`);
            log.info(`Inserted ${coReqs.length} co-requisites.`);
            log.info(`Inserted ${preReqs.length} pre-requisites.`);
            log.info(`Inserted ${sections.length} courses.`);
        } catch (e) {
            log.error(`error ${e}`);
        }
    });
};

const handleReq = (courseDept: string, courseNumber: string, req: any, plaintext: string, store: any[]) => {
    const [reqCourseDept, reqCourseNumber] = req.split(" ");
    store.push([courseDept, courseNumber, reqCourseDept, reqCourseNumber, plaintext]);
};

const insertCoReq = (req: []) => insertReq("CoReq", req);
const insertPreReq = (req: []) => insertReq("PreReq", req);

const insertReq = (table: string, req: []) => {
    db.query(`INSERT INTO ${table} VALUES ($1, $2, $3, $4, $5)`, req);
};

const insertCourse = (course: []) => {
    db.query("INSERT INTO Course VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", course);
};

const getTables = () => db.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
    AND table_type='BASE TABLE';
`);
