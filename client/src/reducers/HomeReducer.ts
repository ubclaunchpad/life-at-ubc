import { CourseObjectProps } from "../components/Courses";
import {
  HomeActions,
  SWITCHCOMPONENT,
  ADDCOURSE,
  ADDCOURSESECTIONS,
  SELECTTERM,
  SETVALIDSCHEDULES
} from "../actions/HomeActions";
import { CourseSection } from "../util/testScheduler";

export interface HomeReducerProps {
  componentIndex: number;
  coursesAdded: string[];
  sections: CourseObjectProps[];
  term: string;
  schedules: CourseSection[][];
}

const initialState: HomeReducerProps = {
  componentIndex: 0,
  coursesAdded: [],
  sections: [],
  term: "1",
  schedules: []
};

export const HomeReducer = (
  state: HomeReducerProps = initialState,
  action: HomeActions
): HomeReducerProps => {
  switch (action.type) {
    case SWITCHCOMPONENT: {
      return { ...state, componentIndex: action.index };
    }
    case ADDCOURSE: {
      return { ...state, coursesAdded: action.courses };
    }
    case ADDCOURSESECTIONS: {
      return { ...state, sections: action.sections };
    }
    case SELECTTERM: {
      return { ...state, term: action.term };
    }
    case SETVALIDSCHEDULES: {
      return { ...state, schedules: action.schedules };
    }
    default:
      return state;
  }
};
