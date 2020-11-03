export const CourseCode = `CREATE TABLE CourseCode (
    CourseDept VARCHAR(255),
    CourseNumber VARCHAR(255),
    PRIMARY KEY(CourseDept, CourseNumber)
);`;

export const PreReq = `CREATE TABLE PreReq (
    CourseDept VARCHAR(255),
    CourseNumber VARCHAR(255),
    PreReqCourseDept VARCHAR(255),
    PreReqCourseNumber VARCHAR(255)
);`;

export const CoReq = `CREATE TABLE CoReq (
    CourseDept VARCHAR(255),
    CourseNumber VARCHAR(255),
    CoReqCourseDept VARCHAR(255),
    CoReqCourseNumber VARCHAR(255)
);`;

export const CourseSection = `CREATE TABLE CourseSection (
    CourseTitle VARCHAR(255),
    CourseDept VARCHAR(255),
    CourseNumber VARCHAR(255),
    SectionTitle VARCHAR(255),
    Status VARCHAR(255),
    Activity VARCHAR(255),
    Prof VARCHAR(255),
    Term VARCHAR(255),
    Day VARCHAR(255),
    StartTime VARCHAR(255),
    EndTime VARCHAR(255)
);`;
