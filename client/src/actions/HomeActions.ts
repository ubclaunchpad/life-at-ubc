export const SWITCHCOMPONENT = "switch_component";
export const ADDCOURSE = "add_course";

export interface Switch {
  type: typeof SWITCHCOMPONENT;
  index: number;
}

export interface AddCourse {
  type: typeof ADDCOURSE;
  courses: string[];
}

export type HomeActions = Switch | AddCourse;
