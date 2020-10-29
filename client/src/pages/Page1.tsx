import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerProps } from "../reducers/Reducer";
import { INCREMENT, DECREMENT } from "../actions/Page1Actions";

function Page1() {
  const num = useSelector<ReducerProps, ReducerProps["number"]>(
    (state) => state.number
  );
  const dispatch = useDispatch();

  const handleAddBtnPress = () => {
    dispatch({ type: INCREMENT });
  };

  const handleMinusBtnPress = () => {
    dispatch({ type: DECREMENT });
  };

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

export default Page1;
