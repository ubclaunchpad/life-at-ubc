import { CourseObjectProps } from "../components/Courses";
import {
  HomeActions,
  SWITCHCOMPONENT,
  ADDCOURSE,
  ADDCOURSESECTIONS,
  SELECTTERM,
  SETVALIDSCHEDULES,
  SETSELECTEDSCHEDULE,
  DELETCOURSE,
} from "../actions/HomeActions";
import { CourseSection } from "../util/testScheduler";

export interface HomeReducerProps {
  componentIndex: number;
  coursesAdded: string[];
  sections: CourseObjectProps[];
  term: string;
  schedules: CourseSection[][];
  selectedSchedule: number;
}

const initialState: HomeReducerProps = {
  componentIndex: 0,
  coursesAdded: [],
  sections: [],
  term: "1",
  schedules: [],
  selectedSchedule: 0, // TODO: Should this be defaulted to 1?
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
    case SETSELECTEDSCHEDULE: {
      return { ...state, selectedSchedule: action.selectedSchedule };
    }
    case DELETCOURSE: {
      return { ...state, coursesAdded: action.courses };
    }
    default:
      return state;
  }
};
