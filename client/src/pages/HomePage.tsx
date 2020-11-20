import React from "react";
import Home from "../components/Home";
import Courses from "../components/Courses";
import Restrictions from "../components/Restrictions";
import Lectures from "../components/Lectures";
import Labs from "../components/Labs";
import Generate from "../components/Generate";
import DegNav from "../components/DegNav"
import AllCourses from "../components/AllCourses"
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
      {index === 2 && <Restrictions></Restrictions>}
      {index === 3 && <Lectures></Lectures>}
      {index === 4 && <Labs></Labs>}
      {index === 5 && <Generate></Generate>}
      {index === 6 && <DegNav></DegNav>}
      {index === 7 && <AllCourses></AllCourses>}
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    index: state.HomeReducer.componentIndex,
  };
};

export default connect(mapStateToProps, null)(HomePage);
