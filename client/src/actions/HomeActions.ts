import { CourseObjectProps } from "../components/Courses";
import { CourseSection } from "../util/testScheduler";

export const SELECTTERM = "select_term";
export const SWITCHCOMPONENT = "switch_component";
export const ADDCOURSESECTIONS = "add_course_sections";
export const SELECTDAYS = "select_days";
export const SETCOURSES = "set_courses";
// export const SETVALIDSCHEDULES = "set_valid_schedules";
export const SETSELECTEDSCHEDULE = "set_selected_schedule";
export const SETSELECTEDSECTIONS = "set_selected_sections";

export interface SelectTerm {
  type: typeof SELECTTERM;
  term: string;
}

export interface Switch {
  type: typeof SWITCHCOMPONENT;
  index: number;
}

export interface AddCourseSections {
  type: typeof ADDCOURSESECTIONS;
  sections: CourseObjectProps[];
}

export interface SelectDays {
  type: typeof SELECTDAYS;
  days: number[];
}

export interface SetCourses {
  type: typeof SETCOURSES;
  courses: string[];
}

// export interface SetValidSchedules {
//   type: typeof SETVALIDSCHEDULES;
//   schedules: CourseSection[][];
// }

export interface SetSelectedSchedule {
  type: typeof SETSELECTEDSCHEDULE;
  selectedSchedule: CourseSection[];
}

export interface SetSelectedSections {
  type: typeof SETSELECTEDSECTIONS;
  selectedSections: string[];
}

export type HomeActions =
  | Switch
  | AddCourseSections
  | SelectTerm
  | SelectDays
  | SetCourses
  // | SetValidSchedules
  | SetSelectedSchedule
  | SetSelectedSections;
