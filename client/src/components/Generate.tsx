import React from "react";
import Section from "./Section";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid";

function Generate() {
  return (
    <Section>
      <Title title="Your Individualized Schedule"></Title>
      <ScheduleGrid></ScheduleGrid>
    </Section>
  );
}

export default Generate;
