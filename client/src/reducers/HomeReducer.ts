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
  latestState: number;
}

const initialState: HomeReducerProps = {
  componentIndex: 0,
  coursesAdded: [],
  sections: [],
  days: [],
  term: "1",
  selectedSchedule: [],
  selectedSections: [],
  latestState: 0,
};

export const HomeReducer = (
  state: HomeReducerProps = initialState,
  action: HomeActions
): HomeReducerProps => {
  var latestState;
  switch (action.type) {
    case SWITCHCOMPONENT: {
      // console.log(action.index, state.latestState, (action.index === 1));
      if ((action.index > state.latestState + 1 && action.index <= 5) || (state.latestState === 1 && action.index === 2)) {
        return state;
      }
      return { ...state, componentIndex: action.index };
    }
    case ADDCOURSESECTIONS: {
      latestState = 1 <= state.latestState ? state.latestState : 2;
      // console.log("Add course! ", latestState);
      return { ...state, sections: action.sections, latestState: latestState };
    }
    case SELECTTERM: {
      latestState = 0 <= state.latestState ? state.latestState : 1;
      return { ...state, term: action.term , latestState: latestState };
    }
    case SELECTDAYS: {
      latestState = 2 <= state.latestState ? state.latestState : 3;
      // console.log("Select Days! ", latestState);
      return { ...state, days: action.days , latestState: latestState };
    }
    case SETCOURSES: {
      latestState = 1 <= state.latestState ? state.latestState : 2;
      // console.log("Set Course! ", latestState);
      return { ...state, coursesAdded: action.courses , latestState: latestState };
    }
    case SETSELECTEDSCHEDULE: {
      latestState = 3 <= state.latestState ? state.latestState : 4;
      // console.log("Set Selected Schedule! ", latestState);
      return { ...state, selectedSchedule: action.selectedSchedule, latestState: latestState };
    }
    case SETSELECTEDSECTIONS: {
      latestState = 3 <= state.latestState ? state.latestState : 4;
      return { ...state, selectedSections: action.selectedSections , latestState: latestState };
    }
    default:
      return state;
  }
};
