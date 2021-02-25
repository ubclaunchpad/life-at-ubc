import { CourseObjectProps } from "../components/Courses";
import {
  HomeActions,
  SWITCHCOMPONENT,
  ADDCOURSESECTIONS,
  SELECTTERM,
  SELECTDAYS,
  SETCOURSES,
  SETSELECTEDSCHEDULE,
  SETSELECTEDSECTIONS,
} from "../actions/HomeActions";
import { CourseSection } from "../util/testScheduler";

export interface HomeReducerProps {
  componentIndex: number;
  coursesAdded: string[];
  sections: CourseObjectProps[];
  term: string;
  days: number[];
  selectedSchedule: CourseSection[];
  selectedSections: string[];
}

const initialState: HomeReducerProps = {
  componentIndex: 0,
  coursesAdded: [],
  sections: [],
  days: [],
  term: "1",
  selectedSchedule: [],
  selectedSections: [],
};

export const HomeReducer = (
  state: HomeReducerProps = initialState,
  action: HomeActions
): HomeReducerProps => {
  var latestState;
  switch (action.type) {
    case SWITCHCOMPONENT: {
      if (action.index > state.latestState + 1 && action.index <= 2) {
        // console.log(action.index, state.latestState);
        return state;
      }
      return { ...state, componentIndex: action.index };
    }
    case ADDCOURSESECTIONS: {
      latestState = 1 <= state.latestState ? state.latestState : 1;
      return { ...state, sections: action.sections, latestState: latestState };
    }
    case SELECTTERM: {
      latestState = 0 <= state.latestState ? state.latestState : 0;
      return { ...state, term: action.term , latestState: latestState };
    }
    case SELECTDAYS: {
      return { ...state, days: action.days };
    }
    case SELECTDAYS: {
      return { ...state, days: action.days };
    }
    case SELECTDAYS: {
      return { ...state, days: action.days };
    }
    case SETCOURSES: {
      return { ...state, coursesAdded: action.courses };
    }
    case SETSELECTEDSCHEDULE: {
      latestState = 3 <= state.latestState ? state.latestState : 3;
      return { ...state, selectedSchedule: action.selectedSchedule, latestState: latestState };
    }
    case SETSELECTEDSECTIONS: {
      return { ...state, selectedSections: action.selectedSections };
    }
    default:
      return state;
  }
};
