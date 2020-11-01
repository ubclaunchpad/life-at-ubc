import React from "react";
import Home from "../components/Home";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface HomePageProps {
  index?: number;
}

function HomePage({ index }: HomePageProps) {
  return <div>{index === 0 && <Home></Home>}</div>;
}

const mapStateToProps = (state: RootState) => {
  return {
    index: state.HomeReducer.index,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
