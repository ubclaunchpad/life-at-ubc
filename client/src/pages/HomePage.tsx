import React from "react";
import Home from "../components/Home";
import Courses from "../components/Courses";
import Restrictions from "../components/Restrictions";
import Lectures from "../components/Lectures";
import Labs from "../components/Labs";
import Generate from "../components/Generate";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import NextPrevSwitcher from "../components/NextPrevSwitcher";

interface HomePageProps {
  index?: number;
}

function HomePage({ index }: HomePageProps) {
  return (
    <span>
      <BreadCrumb></BreadCrumb>
      <div>
        {index === 0 && <Home></Home>}
        {index === 1 && <Courses></Courses>}
        {index === 2 && <Restrictions></Restrictions>}
        {index === 3 && <Lectures></Lectures>}
        {index === 4 && <Labs></Labs>}
        {index === 5 && <Generate></Generate>}
      </div>
      <NextPrevSwitcher></NextPrevSwitcher>
    </span>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    index: state.HomeReducer.componentIndex,
  };
};

export default connect(mapStateToProps, null)(HomePage);
