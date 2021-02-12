export const PreReq = `CREATE TABLE PreReq (
    CourseDept VARCHAR(255),
    CourseNumber VARCHAR(255),
    PreReqCourseDept VARCHAR(255),
    PreReqCourseNumber VARCHAR(255),
    PreReqText TEXT
);`;

export const CoReq = `CREATE TABLE CoReq (
    CourseDept VARCHAR(255),
    CourseNumber VARCHAR(255),
    CoReqCourseDept VARCHAR(255),
    CoReqCourseNumber VARCHAR(255),
    CoReqText TEXT
);`;

export const Course = `CREATE TABLE Course (
    CourseTitle VARCHAR(255),
    CourseDept VARCHAR(255),
    CourseNumber VARCHAR(255),
    Description TEXT,
    Credits INT,
    PreReqText TEXT,
    CoReqText TEXT,
    Sections json
);`;
