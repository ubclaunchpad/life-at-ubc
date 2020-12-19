import React, { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import Section from "./Section";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { generateSchedules, CourseSection } from "../util/testScheduler";
import { Dispatch } from "redux";
import {
  SetValidSchedules,
  SETVALIDSCHEDULES,
  SETSELECTEDSCHEDULE,
  SetSelectedSchedule,
} from "../actions/HomeActions";
interface LectureProps {
  schedules: CourseSection[][];
  coursesAdded: string[];
  addSchedules: (schedules: CourseSection[][]) => void;
  setSelectedSchedule?: any;
}

function Lectures({
  schedules,
  coursesAdded,
  addSchedules,
  setSelectedSchedule,
}: LectureProps) {
  // TODO: state should not be default 0, if user has already selected, we should set it to the selected one
  const [selected, setSelected] = useState(0);
  const handleChange = (e: any, n: number) => {
    setSelectedSchedule(n - 1);
    setSelected(n - 1);
  };
  useEffect(() => {
    addSchedules(schedules);
  }, [coursesAdded]);
  return (
    <Section>
      <Title title="4. Select Lectures to Lock Them"></Title>
      {schedules[selected] && <ScheduleGrid schedule={schedules[selected]} />}
      <Pagination
        count={schedules.length}
        shape="rounded"
        onChange={handleChange}
      />
    </Section>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    schedules: generateSchedules(state.HomeReducer.sections),
    coursesAdded: state.HomeReducer.coursesAdded,
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
    setSelectedSchedule(schedule: number) {
      const action: SetSelectedSchedule = {
        type: SETSELECTEDSCHEDULE,
        selectedSchedule: schedule,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lectures);
