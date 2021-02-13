import { CourseObjectProps } from "../components/Courses";
import {
  HomeActions,
  SWITCHCOMPONENT,
  ADDCOURSESECTIONS,
  SELECTTERM,
  SELECTDAYS,
  SETCOURSES,
  SETVALIDSCHEDULES,
  SETSELECTEDSCHEDULE,
} from "../actions/HomeActions";
import { CourseSection } from "../util/testScheduler";

export interface HomeReducerProps {
  componentIndex: number;
  coursesAdded: string[];
  sections: CourseObjectProps[];
  term: string;
  days: number[];
  schedules: CourseSection[][];
  selectedSchedule: CourseSection[];
}

const initialState: HomeReducerProps = {
  componentIndex: 0,
  coursesAdded: [],
  sections: [],
  days: [],
  term: "1",
  schedules: [],
  selectedSchedule: [],
};

export const HomeReducer = (
  state: HomeReducerProps = initialState,
  action: HomeActions
): HomeReducerProps => {
  switch (action.type) {
    case SWITCHCOMPONENT: {
      return { ...state, componentIndex: action.index };
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
    case SETCOURSES: {
      return { ...state, coursesAdded: action.courses };
    }
    case SETVALIDSCHEDULES: {
      return { ...state, schedules: action.schedules };
    }
    case SETSELECTEDSCHEDULE: {
      return { ...state, selectedSchedule: action.selectedSchedule };
    }
    }
    default:
      return state;
  }
};
