export const CourseCode = `CREATE TABLE CourseCode (
    CourseDept VARCHAR(100),
    CourseNumber INT,
    PRIMARY KEY(CourseDept, CourseNumber)
);`;

export const PreReq = `CREATE TABLE PreReq (
    CourseDept VARCHAR(100),
    CourseNumber INT,
    PreReqCourseDept VARCHAR(100),
    PreReqCourseNumber INT,
    FOREIGN KEY(CourseDept, CourseNumber) REFERENCES CourseCode,
    FOREIGN KEY(PreReqCourseDept, PreReqCourseNumber) REFERENCES CourseCode(CourseDept, CourseNumber)
);`;

export const CoReq = `CREATE TABLE CoReq (
    CourseDept VARCHAR(100),
    CourseNumber INT,
    CoReqCourseDept VARCHAR(100),
    CoReqCourseNumber INT,
    FOREIGN KEY(CourseDept, CourseNumber) REFERENCES CourseCode,
    FOREIGN KEY(CoReqCourseDept, CoReqCourseNumber) REFERENCES CourseCode(CourseDept, CourseNumber)
);`;

export const CourseSection = `CREATE TABLE CourseSection (
    CourseTitle VARCHAR(100),
    CourseDept VARCHAR(100),
    CourseNumber INT,
    SectionTitle VARCHAR(100),
    Status VARCHAR(100),
    Activity VARCHAR(100),
    Prof VARCHAR(100),
    Term VARCHAR(100),
    Day VARCHAR(100),
    Start DATE,
    End DATE,
    FOREIGN KEY(CourseDept, CourseNumber) REFERENCES CourseCode
);`;
