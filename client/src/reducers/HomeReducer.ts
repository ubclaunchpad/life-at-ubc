import { CourseObjectProps } from "../components/Courses";
import {
  HomeActions,
  SWITCHCOMPONENT,
  ADDCOURSE,
  ADDCOURSESECTIONS,
  SELECTTERM,
} from "../actions/HomeActions";

export interface HomeReducerProps {
  componentIndex: number;
  coursesAdded: string[];
  sections: CourseObjectProps[];
  term: string;
}

const initialState: HomeReducerProps = {
  componentIndex: 1,
  coursesAdded: [],
  sections: [],
  term: "",
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
    default:
      return state;
  }
};
