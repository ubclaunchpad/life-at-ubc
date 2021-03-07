import React, { useState, useEffect } from "react";
import Section from "./Section";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid";
import Button from "@material-ui/core/Button";

import { RootState } from "../reducers/index";
import { connect } from "react-redux";

interface GenerateProps {
  selectedSchedule?: any;
}

function Generate({ selectedSchedule }: GenerateProps) {
  const [shareLink, setShareLink] = useState("");
  const handleSave = () => {
    setShareLink(`sharelink/${JSON.stringify(selectedSchedule)}`);
  };
  return (
    <Section>
      <Title title="Your Individualized Schedule"></Title>
      <ScheduleGrid></ScheduleGrid>
      <Button variant="contained" color="secondary" onClick={handleSave}>Save</Button>
      <p>{shareLink}</p>
    </Section>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    selectedSchedule: state.HomeReducer.selectedSchedule,
  };
};

export default connect(mapStateToProps)(Generate);

