import { HomeActions, SWITCHCOMPONENT } from "../actions/HomePageActions";

export interface HomeReducerProps {
  index: number;
}

const initialState: HomeReducerProps = {
  index: 0,
};

export const HomeReducer = (
  state: HomeReducerProps = initialState,
  action: HomeActions
): HomeReducerProps => {
  switch (action.type) {
    case SWITCHCOMPONENT: {
      return { ...state, index: action.index };
    }
    default:
      return state;
  }
};
