import {
  HomeActions,
  SETSECTIONS,
  SELECTTERM,
  SELECTDAYS,
  SETCOURSES,
  SETSELECTEDSCHEDULE,
  SETSELECTEDSECTIONS,
} from "../actions/HomeActions";
import { CourseSection } from "../util/testScheduler";

export interface HomeReducerProps {
  coursesAdded: string[];
  sections: CourseSection[];
  term: string;
  days: number[];
  selectedSchedule: CourseSection[];
  selectedSections: string[];
}

const initialState: HomeReducerProps = {
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
  switch (action.type) {
    case SETSECTIONS: {
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
    case SETSELECTEDSCHEDULE: {
      return { ...state, selectedSchedule: action.selectedSchedule };
    }
    case SETSELECTEDSECTIONS: {
      return { ...state, selectedSections: action.selectedSections };
    }
    default:
      return state;
  }
};
