import React from "react";
import { SectionWrapper } from "./Home";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { generateSchedules, CourseSection } from "../util/testScheduler";

function Lectures({ schedules = [] }: any) {
  return (
    <SectionWrapper>
      <Title title="4. Select Lectures to Lock Them"></Title>
      {schedules.map((schedule: CourseSection[], i: any) => <ScheduleGrid key={i} schedule={schedule}/>)}
    </SectionWrapper>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    schedules: generateSchedules(state.HomeReducer.sections),
  };
};

export default connect(mapStateToProps)(Lectures);
