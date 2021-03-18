import React, { useState, useEffect } from "react";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid";
import Button from "@material-ui/core/Button";
import { CourseSection } from "../util/testScheduler";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "./Courses";

interface GenerateProps {
  selectedSchedule: CourseSection[];
}

export const CLIENT_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://course-load.netlify.app/"
    : "http://localhost:3000";

function Generate({ selectedSchedule }: GenerateProps) {
  const [shareLink, setShareLink] = useState("");
  const handleSave = async () => {
    const res = await axios.post(`${API_BASE_URL}/api/savedschedules/`, {
      schedule: selectedSchedule
    });
    const id = res.data;
    setShareLink(`${CLIENT_BASE_URL}/sharelink/${id}`);
  };
  return (
    <>
      <Title title="Your Individualized Schedule"></Title>
      <ScheduleGrid></ScheduleGrid>
      <Button variant="contained" color="secondary" onClick={handleSave}>Save</Button>
      <p>{shareLink}</p>
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    selectedSchedule: state.HomeReducer.selectedSchedule,
  };
};

export default connect(mapStateToProps)(Generate);
