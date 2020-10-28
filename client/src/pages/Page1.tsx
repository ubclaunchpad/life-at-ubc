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
    <div>
      <div style = {{display: 'inline-block', marginRight: 10, cursor: 'pointer'}} onClick = {handleAddBtnPress}>Add</div>
      <div style = {{display: 'inline-block', cursor: 'pointer'}} onClick = {handleMinusBtnPress}>Minus</div>
    </div>
  </div>
  );
}

export default Page1;
