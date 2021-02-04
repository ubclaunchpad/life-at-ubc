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
  latestState: number;
}

const initialState: HomeReducerProps = {
  componentIndex: 0,
  coursesAdded: [],
  sections: [],
  term: "1",
  schedules: [],
  selectedSchedule: 0, // TODO: Should this be defaulted to 1?
  latestState: 0,
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
    case ADDCOURSE: {
      latestState = 1 <= state.latestState ? state.latestState : 1;
      return { ...state, coursesAdded: action.courses, latestState: latestState };
    }
    case ADDCOURSESECTIONS: {
      latestState = 1 <= state.latestState ? state.latestState : 1;
      return { ...state, sections: action.sections, latestState: latestState };
    }
    case SELECTTERM: {
      latestState = 0 <= state.latestState ? state.latestState : 0;
      return { ...state, term: action.term , latestState: latestState };
    }
    case SETVALIDSCHEDULES: {
      latestState = 3 <= state.latestState ? state.latestState : 3;
      return { ...state, schedules: action.schedules, latestState: latestState };
    }
    case SETSELECTEDSCHEDULE: {
      latestState = 3 <= state.latestState ? state.latestState : 3;
      return { ...state, selectedSchedule: action.selectedSchedule, latestState: latestState };
    }
    case DELETCOURSE: {
      latestState = 1 <= state.latestState ? state.latestState : 1;
      return { ...state, coursesAdded: action.courses, latestState: latestState };
    }
    default:
      return state;
  }
};
