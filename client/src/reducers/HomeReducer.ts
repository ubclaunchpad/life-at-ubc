import { CourseObjectProps } from "../components/Courses";
import {
  HomeActions,
  SWITCHCOMPONENT,
  ADDCOURSE,
  ADDCOURSESECTIONS,
  SELECTTERM,
  SELECTDAYS,
} from "../actions/HomeActions";

export interface HomeReducerProps {
  componentIndex: number;
  coursesAdded: string[];
  sections: CourseObjectProps[];
  term: string;
  days: number[];
}

const initialState: HomeReducerProps = {
  componentIndex: 0,
  coursesAdded: [],
  sections: [],
  term: "",
  days: [],
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
    case SELECTDAYS: {
      return { ...state, days: action.days };
    }
    default:
      return state;
  }
};
