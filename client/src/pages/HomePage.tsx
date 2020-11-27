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
import Section from "../components/Section";

interface HomePageProps {
  index?: number;
}

function HomePage({ index }: HomePageProps) {
  return (
    <Section>
      <BreadCrumb />
      {index === 0 && <Home />}
      {index === 1 && <Courses />}
      {index === 2 && <Restrictions />}
      {index === 3 && <Lectures />}
      {index === 4 && <Labs />}
      {index === 5 && <Generate />}
      <NextPrevSwitcher />
    </Section>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    index: state.HomeReducer.componentIndex,
  };
};

export default connect(mapStateToProps, null)(HomePage);
