import { CourseObjectProps } from "../components/Courses";
import { CourseSection } from "../util/testScheduler";

export const SELECTTERM = "select_term";
export const SWITCHCOMPONENT = "switch_component";
export const ADDCOURSE = "add_course";
export const ADDCOURSESECTIONS = "add_course_sections";
export const SELECTDAYS = "select_days";
export const SETVALIDSCHEDULES = "set_valid_schedules";
export const SETSELECTEDSCHEDULE = "set_selected_schedule";
export const DELETCOURSE = "delete_course";

export interface SelectTerm {
  type: typeof SELECTTERM;
  term: string;
}

export interface Switch {
  type: typeof SWITCHCOMPONENT;
  index: number;
}

export interface AddCourse {
  type: typeof ADDCOURSE;
  courses: string[];
}

export interface AddCourseSections {
  type: typeof ADDCOURSESECTIONS;
  sections: CourseObjectProps[];
}

export interface SelectDays {
  type: typeof SELECTDAYS;
  days: number[];
}
export interface SetValidSchedules {
  type: typeof SETVALIDSCHEDULES;
  schedules: CourseSection[][];
}
export interface SetSelectedSchedule {
  type: typeof SETSELECTEDSCHEDULE;
  selectedSchedule: CourseSection[];
}

export interface DeleteCourse {
  type: typeof DELETCOURSE;
  courses: string[];
}

export type HomeActions =
  | Switch
  | AddCourse
  | AddCourseSections
  | SelectTerm
  | SelectDays
  | SetValidSchedules
  | SetSelectedSchedule
  | DeleteCourse;
