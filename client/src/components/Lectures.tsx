import React, { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { SectionWrapper } from "./Home";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { generateSchedules, CourseSection } from "../util/testScheduler";
import { Dispatch } from "redux";
import { SetValidSchedules, SETVALIDSCHEDULES } from "../actions/HomeActions";
interface LectureProps {
  schedules: CourseSection[][];
  addSchedules?: any;
}

function Lectures({ schedules, addSchedules }: LectureProps) {
  const [selected, setSelected] = useState(0);
  const handleChange = (e: any, n: number) => setSelected(n);
  useEffect(() => {
    addSchedules(schedules);
  }, []);
  return (
    <SectionWrapper>
      <Title title="4. Select Lectures to Lock Them"></Title>
      {schedules[selected] && <ScheduleGrid schedule={schedules[selected]}/>}
      <Pagination count={schedules.length} shape="rounded" onChange={handleChange} />
    </SectionWrapper>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    schedules: generateSchedules(state.HomeReducer.sections),
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lectures);
