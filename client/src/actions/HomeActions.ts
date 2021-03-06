import { CourseSection } from "../util/testScheduler";

export const SELECTTERM = "select_term";
export const SETSECTIONS = "set_sections";
export const SELECTDAYS = "select_days";
export const SETCOURSES = "set_courses";
export const SETSELECTEDSCHEDULE = "set_selected_schedule";
export const SETSELECTEDSECTIONS = "set_selected_sections";

export interface SelectTerm {
  type: typeof SELECTTERM;
  term: string;
}

export interface SetSections {
  type: typeof SETSECTIONS;
  sections: CourseSection[];
}

export interface SelectDays {
  type: typeof SELECTDAYS;
  days: number[];
}

export interface SetCourses {
  type: typeof SETCOURSES;
  courses: string[];
}

export interface SetSelectedSchedule {
  type: typeof SETSELECTEDSCHEDULE;
  selectedSchedule: CourseSection[];
}

export interface SetSelectedSections {
  type: typeof SETSELECTEDSECTIONS;
  selectedSections: string[];
}

export type HomeActions =
  | SetSections
  | SelectTerm
  | SelectDays
  | SetCourses
  | SetSelectedSchedule
  | SetSelectedSections;
