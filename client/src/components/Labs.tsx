import React from "react";
import Section from "./Section";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid";
import { CourseSection, filterNotLectures } from "../util/testScheduler";

import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";
import { Dispatch } from "redux";
import { SetValidSchedules, SETVALIDSCHEDULES, SETSELECTEDSCHEDULE, SetSelectedSchedule } from "../actions/HomeActions";

interface LabsProps {
  selectedSchedule: number;
  schedules: CourseSection[][];
  notLectureSections: CourseSection[];
  addSchedules?: any;
}


function Labs({selectedSchedule, schedules, notLectureSections, addSchedules}: LabsProps) {
  const handleClick = (section: CourseSection) => {
    // TODO: This isnt a good way to add lectures, since we're replacing the entire schedules state in the store
    // Need a better way to do this
    const newSchedules = [...schedules];
    newSchedules[selectedSchedule].push(section);
    addSchedules(newSchedules);
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addSchedules(schedules: CourseSection[][]) {
      const action: SetValidSchedules = {
        type: SETVALIDSCHEDULES,
        schedules: schedules,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Labs);
