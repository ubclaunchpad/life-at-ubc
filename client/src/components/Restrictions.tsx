import React, { useState } from "react";
import styled from "styled-components";
import Section from "./Section";
import TimePicker from "./TimePicker";
import Title from "./Title";
import Button from "./Button";

const ButtonGroup = styled.div`
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TimePickerGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function Restrictions() {
  const [days, setDays] = useState<number[]>([]);

  // when a day is not selected, it becomes selected after being clicked. Vice versa.
  const handleBtnClick = (index: number) => {
    if (!days.includes(index)) {
      setDays([...days, index]);
    } else {
      const daysAfterRemoval = days.filter((day) => day !== index);
      setDays(daysAfterRemoval);
    }
  };

  return (
    <Section>
      <Title title="3. Add Restrictions"></Title>
      <Title title="What days do you want to go to school?"></Title>
      <ButtonGroup>
        {weekDays.map((weekday, index) => {
          return (
            <Button
              key={index}
              content={weekday}
              selected={days.includes(index)}
              onClick={() => {
                handleBtnClick(index);
              }}
            ></Button>
          );
        })}
      </ButtonGroup>
      <Title title="What time?"></Title>
      <TimePickerGroup>
        <TimePicker></TimePicker>
        <TimePicker></TimePicker>
      </TimePickerGroup>
    </Section>
  );
}

export default Restrictions;
