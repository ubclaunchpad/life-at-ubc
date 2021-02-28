import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import MuiPagination from "@material-ui/lab/Pagination";
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
import check from "../assets/check.svg";
import error from "../assets/error.svg";
import { MESSAGE } from "../util/constants";
interface LectureProps {
  coursesAdded: string[];
  numCourses: number;
  schedules: CourseSection[][];
  selectedSections: string[];
  setSelectedSchedule?: any;
}

const List = styled.ul`
  width: 350px;
  text-align: left;
  margin: auto;
  list-style: none;
`;

function Lectures({
  coursesAdded,
  numCourses,
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

  const CheckIcon = () => (
    <img src={check} width="14px" alt="check mark" style={{
      width: ".5rem",
      marginRight: ".5rem",
    }}/>
  );

  const ListItem = ({text}: any) => (
    <li><CheckIcon />{text}</li>
  );

  const NoResultFound = () => {
    return (
      <div>
        <img src={error} alt="no result" style={{ margin: "auto", display: "block", width: 150 }} />
        <h3 style={{ textAlign: "center", fontSize: "1rem", fontWeight: 400 }}>{MESSAGE.NO_RESULT_FOUND}</h3>
        <List>
          <ListItem text="You have not selected any courses" />
          <ListItem text="Your preferences are too strict" />
          <ListItem text="All of your selected courses are web-oriented" />
        </List>
      </div>
    );
  };

  const Pagination = withStyles({
    ul: {
      justifyContent: "center",
    }
  })(MuiPagination);

  const Alert = withStyles({
    root: {
      margin: "1rem auto"
    }
  })(MuiAlert);

  const Schedule = () => {
    const timetable: Set<string> = new Set(schedules[selected].map(({coursedept, coursenumber}) => `${coursedept} ${coursenumber}`));
    return (
    <>
      {schedules[selected]?.length !== numCourses && <Alert severity="warning" variant="outlined">
        {`${MESSAGE.UNSCHEDULED_COURSE_WARNING}: ${coursesAdded.filter((course: string) => !timetable.has(course)).join(", ")}`}
      </Alert>}
      {schedules[selected] && <ScheduleGrid schedule={schedules[selected]} />}
      <Pagination
        shape="rounded"
        page={selected + 1}
        count={schedules.length}
        onChange={handleChange}
      />
    </>
  );
};

  return (
    <>
      <Title title="4. Select Lectures to Lock Them"></Title>
      {schedules.length ? <Schedule /> : <NoResultFound />}
    </>
  );
}

const mapStateToProps = ({ HomeReducer: { coursesAdded, sections, days, selectedSections } }: RootState) => {
  return {
    coursesAdded,
    numCourses: coursesAdded.length,
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
