import { Page1Actions, INCREMENT, DECREMENT } from "../actions/Page1Actions";

export interface Page1StateProps {
  number: number;
}

const initialState: Page1StateProps = {
  number: 0,
};

export const Page1Reducer = (
  state: Page1StateProps = initialState,
  action: Page1Actions
): Page1StateProps => {
  switch (action.type) {
    case INCREMENT: {
      return { ...state, number: state.number + 1 };
    }
    case DECREMENT: {
      return { ...state, number: state.number - 1 };
    }
    default:
      return state;
  }
};
