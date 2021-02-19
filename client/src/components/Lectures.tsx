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
import search from "../assets/search.svg";
interface LectureProps {
  schedules: CourseSection[][];
  selectedSections: string[];
  setSelectedSchedule?: any;
}

function Lectures({
  schedules,
  selectedSections,
  setSelectedSchedule,
}: LectureProps) {
  const [selected, setSelected] = useState(0);
  const handleChange = (e: any, n: number) => {
    setSelectedSchedule(schedules[n - 1]);
    setSelected(n - 1);
  };

  useEffect(() => {
    setSelectedSchedule(schedules[0] || []);
  }, []);

  useEffect(() => {
    setSelected(0);
  }, [selectedSections]);

  const NoResultFound = () => {
    return (
      <div style={{ textAlign: "center", fontSize: 16 }}>
        <img src={search} alt="no result" style={{ margin: "100px auto 0", display: "block", width: 50 }} />
        <p>There are no timetable that matches your preference</p>
      </div>
    );
  };

  const Schedule = () => (
    <>
    {schedules[selected] && <ScheduleGrid schedule={schedules[selected]} />}
      <Pagination
        shape="rounded"
        page={selected + 1}
        count={schedules.length}
        onChange={handleChange}
      />
    </>
  );

  return (
    <Section>
      <Title title="4. Select Lectures to Lock Them"></Title>
      {schedules.length ? <Schedule /> : <NoResultFound />}
    </Section>
  );
}

const mapStateToProps = ({ HomeReducer: { sections, days, selectedSections } }: RootState) => {
  return {
    schedules: generateSchedules(sections, days, selectedSections),
    selectedSections,
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
