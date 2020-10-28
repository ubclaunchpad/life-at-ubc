import React from "react";
import {useSelector} from 'react-redux';
import { Page1StateProps } from '../reducers/Page1Reducer'

function Page1() {
  const number = useSelector<Page1StateProps, Page1StateProps["number"]>((state) => state.number);
  return <div>{number}</div>;
}

export default Page1;
