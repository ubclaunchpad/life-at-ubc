import { HomeActions, SWITCHCOMPONENT } from "../actions/HomeActions";

export interface HomeReducerProps {
  componentIndex: number;
}

const initialState: HomeReducerProps = {
  componentIndex: 0,
};

export const HomeReducer = (
  state: HomeReducerProps = initialState,
  action: HomeActions
): HomeReducerProps => {
  switch (action.type) {
    case SWITCHCOMPONENT: {
      return { ...state, componentIndex: action.index };
    }
    default:
      return state;
  }
};
