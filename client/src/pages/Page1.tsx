import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Page1StateProps } from '../reducers/Page1Reducer'
import { INCREMENT, DECREMENT } from '../actions/Page1Actions';

function Page1() {
  const number = useSelector<Page1StateProps, Page1StateProps['number']>((state) => state.number);
  const dispatch = useDispatch();

  const handleAddBtnPress = () => {
    dispatch({type: INCREMENT});
  }

  const handleMinusBtnPress = () => {
    dispatch({type: DECREMENT});
  }

  return (
  <div>
    <div>{number}</div>
      <button style = {{marginRight: 10}} onClick = {handleAddBtnPress}>Add</button>
      <button onClick = {handleMinusBtnPress}>Minus</button>
  </div>
  );
}

export default Page1;
