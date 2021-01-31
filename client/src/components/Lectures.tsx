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
  SETSELECTEDSCHEDULE,
  SetSelectedSchedule,
} from "../actions/HomeActions";
interface LectureProps {
  schedules: CourseSection[][];
  setSelectedSchedule?: any;
}

function Lectures({
  schedules,
  setSelectedSchedule,
}: LectureProps) {
  const [selected, setSelected] = useState(0);
  const handleChange = (e: any, n: number) => {
    // TODO: save the selection only when lock button is clicked
    setSelectedSchedule(schedules[n - 1]);
    setSelected(n - 1);
  };
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
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSelectedSchedule(schedule: CourseSection[]) {
      const action: SetSelectedSchedule = {
        type: SETSELECTEDSCHEDULE,
        selectedSchedule: schedule,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lectures);
