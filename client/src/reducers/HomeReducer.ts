import {
  HomeActions,
  SWITCHCOMPONENT,
  ADDCOURSE,
} from "../actions/HomeActions";

export interface HomeReducerProps {
  componentIndex: number;
  coursesAdded: string[];
}

const initialState: HomeReducerProps = {
  componentIndex: 1,
  coursesAdded: [],
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
    default:
      return state;
  }
};
