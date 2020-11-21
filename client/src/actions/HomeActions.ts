import { CourseObjectProps } from "../components/Courses";

export const SELECTTERM = "select_term";
export const SWITCHCOMPONENT = "switch_component";
export const ADDCOURSE = "add_course";
export const ADDCOURSESECTIONS = "add_course_sections";
export const SELECTDAYS = "select_days";

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

export type HomeActions =
  | Switch
  | AddCourse
  | AddCourseSections
  | SelectTerm
  | SelectDays;
