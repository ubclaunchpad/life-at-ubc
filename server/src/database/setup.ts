import { readFile } from "fs";
import parentLogger from "../../utils/logger";
import db from "./db";
import { CourseCode, PreReq, CoReq, CourseSection } from "./schema";

const log = parentLogger.child({ module: "router" });
const src = "./utils/output.json";

export const setupDb = async () => {
    await dropDb();
    await createDb();
    await populateDb();
};

const dropDb = () => db.query(`DROP TABLE IF EXISTS CourseCode, PreReq, CoReq, CourseSection;`);

const createDb = async () => {
    await db.query(CourseCode);
    await db.query(PreReq);
    await db.query(CoReq);
    await db.query(CourseSection);
};

const populateDb = async () => {
    readFile(src, { encoding: "utf8" }, async (err: any, data: any) => {
        if (err) return;
        const courses = JSON.parse(data);
        log.info(`${courses.length} courses`);
        const coReqsToStore: any[] = [];
        const preReqsToStore: any[] = [];
        const sectionsToStore: any[] = [];
        courses.forEach((course: any) => {
            const { courseTitle, courseCode, preReqs = [], coReqs = [], sections = [] } = course;
            const [courseDept, courseNumber] = courseCode.split(" ");
            coReqs.forEach((coReq: any) => {
                const [coReqCourseDept, coReqCourseNumber] = coReq.split(" ");
                coReqsToStore.push([courseDept, courseNumber, coReqCourseDept, coReqCourseNumber]);
            });
            preReqs.forEach(async (preReq: any) => {
                const [preReqCourseDept, preReqCourseNumber] = preReq.split(" ");
                preReqsToStore.push([courseDept, courseNumber, preReqCourseDept, preReqCourseNumber]);
            });
            sections.forEach(async (section: any) => {
                const { sectionTitle, status, activity, prof, timeInfo } = section;
                const { term, day, start, end } = timeInfo;
                // TODO: handle cases where start or end is an empty string
                sectionsToStore.push([courseTitle, courseDept, courseNumber, sectionTitle, status, activity, prof, term, day]);
            });
        });
        try {
            log.info(`Found ${coReqsToStore.length} co-requisites.`);
            log.info(`Found ${preReqsToStore.length} pre-requisites.`);
            log.info(`Found ${sectionsToStore.length} course sections.`);
            preReqsToStore.forEach(async ([courseDept, courseNumber, preReqCourseDept, preReqCourseNumber]) => {
                await db.query("INSERT INTO CourseCode VALUES ($1, $2) ON CONFLICT DO NOTHING", [courseDept, courseNumber]);
                await db.query("INSERT INTO CourseCode VALUES ($1, $2) ON CONFLICT DO NOTHING", [preReqCourseDept, preReqCourseNumber]);
                await db.query("INSERT INTO PreReq VALUES ($1, $2, $3, $4)", [courseDept, courseNumber, preReqCourseDept, preReqCourseNumber]);
            });
            sectionsToStore.forEach((section) => db.query("INSERT INTO CourseSection VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", section));
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
