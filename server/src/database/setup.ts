import { readFile } from "fs";
import parentLogger from "../../utils/logger";
import db from "./db";
import { PreReq, CoReq, Course, SavedSchedules } from "./schema";

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
    let { rows: tables } = await getTables();
    tables = tables.map((table) => table.table_name);
    await db.query(Course);
    if (!tables.includes("savedschedules")) {
        log.info("Creating SavedSchedules table");
        await db.query(SavedSchedules);
    }
};

const populateDb = () => {
    readFile(src, { encoding: "utf8" }, async (err: any, data: any) => {

        if (err) {
            log.error(`error ${err}`);
            return;
        }

        const courses = JSON.parse(data);
        log.info(`${courses.length} courses`);
        const coursesToStore: any[] = [];
        courses.forEach((course: any) => {
            const { courseTitle, courseCode, description, credits, preReqText, coReqText, preReqs = [], coReqs = [], sections = [] } = course;
            const [ courseDept, courseNumber ] = courseCode.split(" ");
            const sectionJson = JSON.stringify(sections);
            coursesToStore.push([
                courseTitle, courseDept,
                courseNumber, description,
                credits, preReqText,
                coReqText, sectionJson
            ]);
        });
        try {
            log.info(`Found ${coursesToStore.length} courses.`);
            coursesToStore.forEach(insertCourse);
            const { rows: sections } = await db.query(`SELECT * FROM Course`);
            log.info(`Inserted ${sections.length} courses.`);
        } catch (e) {
            log.error(`error ${e}`);
        }
    });
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
