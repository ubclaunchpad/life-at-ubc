import parentLogger from "../logger";

const log = parentLogger.child({ module: "testScheduler" });

export interface CourseSection {
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
 * Given an array of course sections, filter out non Web-Oriented sections (no labs, waiting lists etc)
 * TODO: For testing purposes, I'm only filtering for Web Oriented Course, but there will be other types of valid lectures
 * @param {CourseSection[]} courseSections array of course sections (of all types including lectures, labs, waitlists)
 * @returns {CourseSection[]} An array of course sections which only contains "lecture" type
 * NOTE: My types here are generic because there might be more changes to schema, so don't want to lock in types just yet
 */
export const filterLectures = (courseSections: CourseSection[]): CourseSection[] => {
    const lectures = courseSections.filter((coursesection: CourseSection) => coursesection["activity"] === "Web-Oriented Course");
    return lectures;
};


/**
 * Given an array of unique course sections (lectures), generates all valid combinations
 * Valid means each course is represented exactly once in the schedule AND there are no overlaps with times (currently not yet filtering for overlaps)
 * @param {CourseSection[]} courses array of course sections (should only be lectures)
 * @returns {CourseSection[]} An array of valid course schedules
 */
export const generateCourseScheduleOnlyLectures = (courses: CourseSection[]): CourseSection[][] => {
    const uniqueCourses = countUniqueCourses(courses);
    let allCombinations = backTrackOnlyLectures(uniqueCourses, courses.length - 1, courses);
    log.info(allCombinations);
    let filteredCombinations = filterCombinations(allCombinations);
    log.info(filteredCombinations);
    return filteredCombinations;
};

/**
 * Given an array of course sections counts the number of unique courses
 * @param {CourseSection[]} courses array of course sections
 * @returns {number} Number of unique courses in courses array
 */
export const countUniqueCourses = (courses: CourseSection[]): number => {
    let coursesMap: {[key: string]: number} = {};
    for (const course of courses) {
        const deptNumber = `${course["coursedept"]}${course["coursenumber"]}`;
        if (coursesMap[deptNumber]) {
            coursesMap[deptNumber]++;
        } else {
            coursesMap[deptNumber] = 1;
        }
    }
    return Object.keys(coursesMap).length;
};

/**
 * Performs a recursive backtracking search to generate all combinations of course schedules (only lectures)
 * @param {number} max the number of courses in 1 combination, every combination should have max courses
 * @param {number} n the total number of courses given in courses array
 * @param {CourseSection[]} courses array of course sections
 * @param {CourseSection[][]} result An array of CourseSection[] to be returned, gets built up as the backtracking search progresses
 * @param {CourseSection[]} curr Current combination being built
 * @param {number} index index for choosing courses in courses array
 * @returns {result} An array of CourseSection[] to be returned
 */
export const backTrackOnlyLectures = (max: number, n: number, courses: CourseSection[], result: CourseSection[][] = [], curr: CourseSection[] = [], index: number = 0): CourseSection[][] => {
    if (curr.length === max) {
        result.push(curr);
        return [];
    } else {
        while (index <= n) {
            backTrackOnlyLectures(max, n, courses, result, [...curr, courses[index]], ++index);
        }
        return result;
    }
};

/**
 * Filters generated schedules
 * TODO: Filter out combinations with overlapping times
 * @param {CourseSection[][]} combinations generated course schedules
 * @returns {CourseSection[][]} returns filtered version of combinations (eg. filter our combinations which dont contain every course)
 */
export const filterCombinations = (combinations: CourseSection[][]): CourseSection[][] => {
    // TODO: Other filters can go here
    return filterCombinationsWithMissingCourses(combinations);
};

/**
 * Removes schedules that dont contain every course (eg. if courses are CPSC 100 and CPSC 121, will filter out combinations with only 1 of the courses)
 * @param {CourseSection[][]} combinations generated course schedules
 * @returns {CourseSection[][]} returns filtered version of combinations (eg. filter our combinations which dont contain every course)
 */
export const filterCombinationsWithMissingCourses = (combinations: CourseSection[][]): CourseSection[][] => {
    return combinations.filter((combination: CourseSection[]) => filterHelperMissingCourses(combination));
};

/**
 * Helper function for filterCombinationsWithMissingCourses
 * @param {CourseSection[]} combination a course schedule
 * @returns {boolean} returns false if the given schedule should be filtered out
 */
export const filterHelperMissingCourses = (combination: CourseSection[]): boolean => {
    let map: {[key: string]: number} = {};
    for (const course of combination) {
        const deptNumber = `${course["coursedept"]}${course["coursenumber"]}`;
        if (map[deptNumber]) {
            return false;
        } else {
            map[deptNumber] = 1;
        }
    }
    return true;
};
