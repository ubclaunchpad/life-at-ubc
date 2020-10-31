export const CourseCode = `CREATE TABLE CourseCode (
    CourseDept VARCHAR(200),
    CourseNumber VARCHAR(200),
    PRIMARY KEY(CourseDept, CourseNumber)
);`;

export const PreReq = `CREATE TABLE PreReq (
    CourseDept VARCHAR(200),
    CourseNumber VARCHAR(200),
    PreReqCourseDept VARCHAR(200),
    PreReqCourseNumber VARCHAR(200)
);`;

export const CoReq = `CREATE TABLE CoReq (
    CourseDept VARCHAR(200),
    CourseNumber VARCHAR(200),
    CoReqCourseDept VARCHAR(200),
    CoReqCourseNumber VARCHAR(200)
);`;

export const CourseSection = `CREATE TABLE CourseSection (
    CourseTitle VARCHAR(200),
    CourseDept VARCHAR(200),
    CourseNumber VARCHAR(200),
    SectionTitle VARCHAR(200),
    Status VARCHAR(200),
    Activity VARCHAR(200),
    Prof VARCHAR(200),
    Term VARCHAR(200),
    Day VARCHAR(200),
    StartTime DATE,
    EndTime DATE
);`;
