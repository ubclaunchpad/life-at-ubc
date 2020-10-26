import * as constants from "./Constants";
const defaultState = {
  number: 0,
};

export default (state = defaultState, action) => {
  if (action.type === constants.ADD) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.number += action.num;
    return newState;
  }
  return state;
};
