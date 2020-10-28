import { Page1ActionTypes, INCREMENT, DECREMENT } from '../actions/page1Actions';

interface StateProps {
   number: number;
}

const initialState: StateProps = {
  number: 0,
}

export const Page1Reducer = (state: StateProps = initialState, action: Page1ActionTypes) => {
  switch (action.type) {
    case INCREMENT: {
      return {...state, number: state.number + 1}
    }
    case DECREMENT: {
      return {...state, number: state.number - 1}
    }
    default: 
      return state;
  }
}