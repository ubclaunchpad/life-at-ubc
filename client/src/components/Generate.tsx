import React from "react";
import { SectionWrapper } from "./Home";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid"

function Generate() {
  return (
    <SectionWrapper>
      <Title title="Your Individualized Scehdule"></Title>
      <ScheduleGrid></ScheduleGrid>
    </SectionWrapper>
  );
}

export default Generate;
