import parentLogger from "../logger";
import dayjs from "dayjs";

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

export const generateSchedules = (courses: CourseSection[], restrictedDays: number[] = []): CourseSection[][] => {
    const lectures = filterLectures(courses);
    const schedules = generateCourseScheduleOnlyLectures(lectures, restrictedDays);
    return schedules;
};

/**
 * Given an array of course sections, filter out non Web-Oriented sections (no labs, waiting lists etc)
 * @param {CourseSection[]} courseSections array of course sections (of all types including lectures, labs, waitlists)
 * @returns {CourseSection[]} An array of course sections which only contains "lecture" type
 * NOTE: My types here are generic because there might be more changes to schema, so don't want to lock in types just yet
 */
export const filterLectures = (courseSections: CourseSection[]): CourseSection[] => {
    const lectures = courseSections.filter(filterActivityTypes);
    return lectures;
};


/**
 * Given an array of course sections, filter out non Web-Oriented sections (no labs, waiting lists etc)
 * @param {CourseSection[]} courseSections array of course sections (of all types including lectures, labs, waitlists)
 * @returns {CourseSection[]} An array of course sections which only contains "lecture" type
 * NOTE: My types here are generic because there might be more changes to schema, so don't want to lock in types just yet
 */
export const filterNotLectures = (courseSections: CourseSection[]): any => {
    const sections = courseSections.filter(filterActivityTypesNotLecture);
    return sections.reduce((acc: { [key: string]: CourseSection[] }, section) => {
        const { coursetitle } = section;
        const curr = acc[coursetitle] || [];
        return ({...acc, [coursetitle]: [...curr, section]});
    }, {});
};

/**
 * helper function for filterLectures
 * @param {CourseSection} courseSection a course section
 * @returns {boolean} returns false if a section's type is any of unwantedTypes
 */
export const filterActivityTypes = (courseSection: CourseSection): boolean => {
    const activity = courseSection["activity"];
    const unwantedTypes = [
        "Waiting List",
        "Tutorial",
        "Laboratory",
        "Discussion"
    ];
    return !unwantedTypes.some((unwantedType: string) => activity === unwantedType);
};

/**
 * Given an array of course sections, produces an array with sections that fall on an allowed day.
 * @param {CourseSection[]} courseSections array of combinations
 * @returns {CourseSection[]} an array of combinations that pass the given day restrictions
 */
export const filterRestrictedDays = (combinations: CourseSection[][], restrictedDays: string[]): CourseSection[][] => {
    let newCombinations =  combinations.filter((combination: CourseSection[]) => {
        for (let section of combination ) {
            const sectionDays: string[] = section["day"].split(" ");
            for (let restrictedDay of sectionDays) {
                if (restrictedDays.includes(restrictedDay)) {
                    return false;
                }
            }
        }
        return true;
    });
    return newCombinations;

};

/**
 * helper to convert numbers to shortened day strings
 * @param num number between [0,6] inclusive that represents a day
 * @returns a shortened day string
 */
export const mapDayIndexToString = (num: number): string => {
    const indexToString = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    return indexToString[num];
};

/**
 * Filter out lectures
 * @param {CourseSection} courseSection a course section
 * @returns {boolean} returns false if a section's type is any of unwantedTypes
 */
export const filterActivityTypesNotLecture = (courseSection: any) => {
    const activity = courseSection["activity"];
    const unwantedTypes = [
        "Waiting List",
        "Web-Oriented Course",
        "Lecture"
    ];
    return !unwantedTypes.some((unwantedType: string) => activity === unwantedType);
};

/**
 * Given an array of unique course sections (lectures), generates all valid combinations
 * Valid means each course is represented exactly once in the schedule AND there are no overlaps with times (currently not yet filtering for overlaps)
 * @param {CourseSection[]} courses array of course sections (should only be lectures)
 * @returns {CourseSection[]} An array of valid course schedules
 */
export const generateCourseScheduleOnlyLectures = (courses: CourseSection[], restrictedDays: number[]): CourseSection[][] => {
    const uniqueCourses = countUniqueCourses(courses);
    let allCombinations = backTrackOnlyLectures(uniqueCourses, courses.length - 1, courses);
    log.info(allCombinations, "allCombinations");
    let filteredCombinations = filterCombinations(allCombinations, restrictedDays);
    log.info(filteredCombinations, "filteredCombination");
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
export const filterCombinations = (combinations: CourseSection[][], restrictedDays: number[]): CourseSection[][] => {
    // TODO: Other filters can go here
    let filteredMissingCourses = filterCombinationsWithMissingCourses(combinations);
    log.info(filteredMissingCourses);
    let filteredDayRestrictedCourses = filterRestrictedDays(filteredMissingCourses, restrictedDays.map(mapDayIndexToString));
    log.info(filteredDayRestrictedCourses, "filterDayRestrictions");
    return filterCombinationsWithTimeOverlaps(filteredDayRestrictedCourses);
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

/**
 * Removes schedules that have overlapping times
 * @param {CourseSection[][]} combinations generated course schedules
 * @returns {CourseSection[][]} returns filtered version of combinations
 */
export const filterCombinationsWithTimeOverlaps = (combinations: CourseSection[][]): CourseSection[][] => {
    return combinations.filter((combination: CourseSection[]) => filterHelperTimeOverlaps(combination));
};

/**
 * Helper function for filterCombinationsWithTimeOverlaps
 * @param {CourseSection[]} combination a course schedule
 * @returns {boolean} returns false if the given schedule should be filtered out (ie: there are time overlaps)
 */
export const filterHelperTimeOverlaps = (combination: CourseSection[]): boolean => {
    // NOTE: disabling lint rule here because i don't know how to do this yet without the indices in the for loops
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < combination.length; i++) {
        for (let j = i + 1; j < combination.length; j++) {
            let firstCourseTimeExists: boolean = combination[i]["starttime"] !== undefined && combination[i]["endtime"] !== undefined;
            let secondCourseTimeExists: boolean = combination[j]["starttime"] !== undefined && combination[j]["endtime"] !== undefined;
            const firstDay = combination[i].day;
            const secondDay = combination[j].day;

            if (firstCourseTimeExists && secondCourseTimeExists) {
                if (firstDay !== secondDay) continue;
                let firstCourseTimeStart = combination[i]["starttime"];
                let momentFirstCourseTimeStart = dayjs(`05-17-2018 ${firstCourseTimeStart}`, "MM-DD-YYYY hh:mm a");

                let firstCourseEnd = combination[i]["endtime"];
                let momentFirstCourseTimeEnd = dayjs(`05-17-2018 ${firstCourseEnd}`, "MM-DD-YYYY hh:mm a");

                let secondCourseStart = combination[j]["starttime"];
                let momentSecondCourseTimeStart = dayjs(`05-17-2018 ${secondCourseStart}`, "MM-DD-YYYY hh:mm a");

                let secondCourseEnd = combination[j]["endtime"];
                let momentSecondCourseTimeEnd = dayjs(`05-17-2018 ${secondCourseEnd}`, "MM-DD-YYYY hh:mm a");

                // If start times are the same, they overlap
                if (momentFirstCourseTimeStart.isSame(momentSecondCourseTimeStart)) {
                    return false;
                }

                // If start time of course 1 is after start time of second, check if if start time of course 1 is before end time of course 2
                if (momentFirstCourseTimeStart.isAfter(momentSecondCourseTimeStart)) {
                    if (momentFirstCourseTimeStart.isBefore(momentSecondCourseTimeEnd)) {
                        return false;
                    }
                }

                // If start time of course 1 is before start time of second, check if if end time of course 1 is after start time of course 2
                if (momentFirstCourseTimeStart.isBefore(momentSecondCourseTimeStart)) {
                    if (momentFirstCourseTimeEnd.isAfter(momentSecondCourseTimeStart)) {
                        return false;
                    }
                }
            }
        }

    }
    return true;
};
