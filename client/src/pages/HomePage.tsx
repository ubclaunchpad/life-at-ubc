import React from "react";
import Home from "../components/Home";
import Courses from "../components/Courses";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";

interface HomePageProps {
  index?: number;
}

function HomePage({ index }: HomePageProps) {
  return (
    <div>
      {index === 0 && <Home></Home>}
      {index === 1 && <Courses></Courses>}
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    index: state.HomeReducer.componentIndex,
  };
};

export default connect(mapStateToProps, null)(HomePage);
