import { CourseObjectProps } from "../components/Courses";
import { CourseSection } from "../util/testScheduler";

export const SELECTTERM = "select_term";
export const SWITCHCOMPONENT = "switch_component";
export const ADDCOURSE = "add_course";
export const ADDCOURSESECTIONS = "add_course_sections";
export const SETVALIDSCHEDULES = "set_valid_schedules";

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

export interface SetValidSchedules {
  type: typeof SETVALIDSCHEDULES;
  schedules: CourseSection[][];
}

export type HomeActions = Switch | AddCourse | AddCourseSections | SelectTerm | SetValidSchedules;
