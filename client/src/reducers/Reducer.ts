import { Page1Actions, INCREMENT, DECREMENT } from "../actions/Page1Actions";

export interface ReducerProps {
  number: number;
}

const initialState: ReducerProps = {
  number: 0,
};

export const reducer = (
  state: ReducerProps = initialState,
  action: Page1Actions
): ReducerProps => {
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
