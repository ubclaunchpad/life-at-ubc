import React from "react";
import { SectionWrapper } from "./Home";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid";
import { CourseSection } from "../util/testScheduler";

import { RootState } from "../reducers/index";
import { connect } from "react-redux";

interface LabsProps {
  selectedSchedule: number;
  schedules: CourseSection[][];
}


function Labs({selectedSchedule, schedules}: LabsProps) {
  return (
    <SectionWrapper>
      <Title title="5. Add Lab Sections"></Title>
      <ScheduleGrid></ScheduleGrid>
    </SectionWrapper>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    selectedSchedule: state.HomeReducer.selectedSchedule,
    schedules: state.HomeReducer.schedules
  };
};

export default connect(mapStateToProps)(Labs);
