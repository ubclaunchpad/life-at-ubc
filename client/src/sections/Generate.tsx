import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ButtonBase from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import CheckIcon from "@material-ui/icons/CheckRounded";
import styled from "styled-components";
import axios from "axios";
import Title from "../components/Title";
import ScheduleGrid from "../components/ScheduleGrid";
import { CourseSection } from "../util/testScheduler";
import { RootState } from "../reducers/index";
import { CLIENT_BASE_URL, API_BASE_URL } from "../util/constants";

const Button = styled(ButtonBase)`
  color: white;
  margin-bottom: 2rem;
`;

interface GenerateProps {
  schedule: CourseSection[];
}

function Generate({ schedule }: GenerateProps) {
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleSave = async () => {
    const { data } = await axios.post(`${API_BASE_URL}/api/savedschedules/`, { schedule });
    navigator.clipboard.writeText(`${CLIENT_BASE_URL}/sharelink/${data}`);
    setCopied(true);
  };
  useEffect(() => setLoaded(true), []);
  return (
    <>
      <Title title="Your Individualized Schedule"/>
      <Slide direction="left" in={loaded}>
        <div>
          <Button variant="contained" color="secondary" onClick={handleSave} disableElevation>
            {copied ? (
              <div style={{ display: "flex" }}>
                Copied to clipboard<CheckIcon fontSize="small" style={{ marginLeft: 5 }} />
              </div>) : "Generate Shareable Link"}
          </Button>
          <ScheduleGrid />
        </div>
      </Slide>
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    schedule: state.HomeReducer.selectedSchedule,
  };
};

export default connect(mapStateToProps)(Generate);
