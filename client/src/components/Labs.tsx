import React from "react";
import Section from "./Section";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid";
import { CourseSection, filterNotLectures } from "../util/testScheduler";

import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";

interface LabsProps {
  selectedSchedule: number;
  schedules: CourseSection[][];
  notLectureSections: CourseSection[];
}


function Labs({selectedSchedule, schedules, notLectureSections}: LabsProps) {
  const handleClick = (section: any) => {
    // TODO: Add lab to schedule
  };

  return (
    <Section>
      <Title title="5. Add Lab Sections"></Title>
      <ScheduleGrid></ScheduleGrid>
      {notLectureSections.map((notLectureSection: CourseSection) => (
        <Chip
          variant="outlined"
          size="medium"
          label={notLectureSection["sectiontitle"]}
          onClick={() => handleClick(notLectureSection)}
        />
      ))}
    </Section>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    selectedSchedule: state.HomeReducer.selectedSchedule,
    schedules: state.HomeReducer.schedules,
    notLectureSections: filterNotLectures(state.HomeReducer.sections)
  };
};

export default connect(mapStateToProps)(Labs);
