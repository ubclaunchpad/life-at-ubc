import {
  HomeActions,
  SWITCHCOMPONENT,
  ADDCOURSE,
} from "../actions/HomeActions";

export interface HomeReducerProps {
  componentIndex: number;
  courseSelected: string[];
}

const initialState: HomeReducerProps = {
  componentIndex: 1,
  courseSelected: [],
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
      return { ...state, courseSelected: action.courses };
    }
    default:
      return state;
  }
};
