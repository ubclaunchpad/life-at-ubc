import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    SETSELECTEDSCHEDULE,
    SetSelectedSchedule,
  } from "../actions/HomeActions";
import { useParams } from "react-router-dom";
import ScheduleGrid from "./ScheduleGrid";
import { CourseSection } from "../util/testScheduler";

interface ShareLinkProps {
    setSelectedSchedule: (schedule: CourseSection[]) => void;
}

interface Params {
    selectedSchedule?: string | undefined;
}

function ShareLink({setSelectedSchedule}: ShareLinkProps) {
    const { selectedSchedule } = useParams<Params>();

    useEffect(() => {
        let correctlyTypedSchedule = selectedSchedule && JSON.parse(selectedSchedule);
        setSelectedSchedule(correctlyTypedSchedule);
    }, []);

    return (
        <>
        <ScheduleGrid></ScheduleGrid>
        </>
    );
}

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

export default connect(null, mapDispatchToProps)(ShareLink);
