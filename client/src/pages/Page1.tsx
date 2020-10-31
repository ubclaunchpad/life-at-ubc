import React from "react";
import { INCREMENT, DECREMENT } from "../actions/Page1Actions";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface Page1Props {
  num?: number;
  handleAddBtnPress?: any;
  handleMinusBtnPress?: any;
}

function Page1({ num, handleAddBtnPress, handleMinusBtnPress }: Page1Props) {
  return (
    <div>
      <div>{num}</div>
      <button style={{ marginRight: 10 }} onClick={handleAddBtnPress}>
        Add
      </button>
      <button onClick={handleMinusBtnPress}>Minus</button>
    </div>
  );
}

const mapState = (state: RootState) => {
  return {
    num: state.reducer.number,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    handleAddBtnPress() {
      const action = { type: INCREMENT };
      dispatch(action);
    },
    handleMinusBtnPress() {
      const action = { type: DECREMENT };
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(Page1);
