import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import axios from "axios";
import {
    SETSELECTEDSCHEDULE,
    SetSelectedSchedule,
} from "../actions/HomeActions";
import { useParams } from "react-router-dom";
import ScheduleGrid from "./ScheduleGrid";
import { CourseSection } from "../util/testScheduler";
import { API_BASE_URL } from "../util/constants";

interface ShareLinkProps {
    setSelectedSchedule: (schedule: CourseSection[]) => void;
}

interface Params {
    scheduleid: string;
}

function ShareLink({setSelectedSchedule}: ShareLinkProps) {
    const { scheduleid } = useParams<Params>();

    useEffect(() => {
        getSchedule();
    }, []);

    const getSchedule = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/savedschedules/${scheduleid}`);
      const schedule = res.data;
      setSelectedSchedule(schedule);
    };

    return <ScheduleGrid />;
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
