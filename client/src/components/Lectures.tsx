import React, { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import Section from "./Section";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { generateSchedules, CourseSection } from "../util/testScheduler";

function Lectures({ schedules = [] }: any) {
  const [selected, setSelected] = useState(0);
  const handleChange = (e: any, n: number) => setSelected(n);
  return (
    <Section>
      <Title title="4. Select Lectures to Lock Them"></Title>
      {schedules[selected] && <ScheduleGrid schedule={schedules[selected]}/>}
      <Pagination count={schedules.length} shape="rounded" onChange={handleChange} />
    </Section>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    schedules: generateSchedules(state.HomeReducer.sections),
  };
};

export default connect(mapStateToProps)(Lectures);
