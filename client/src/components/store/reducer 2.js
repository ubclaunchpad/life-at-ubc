import * as constants from './Constants';

const defaultState = {
  number: 10,
};

export default (state = defaultState, action) => {
  if (action.type === constants.INCREMENT) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.number += action.num;
    return newState;
  }
  return state;
};
