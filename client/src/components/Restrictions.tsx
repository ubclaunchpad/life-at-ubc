import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SectionWrapper } from "./Home";
// import TimePicker from "./TimePicker";
import Title from "./Title";
import Button from "./Button";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SELECTDAYS, SelectDays } from "../actions/HomeActions";

const ButtonGroup = styled.div`
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

// const TimePickerGroup = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
// `;

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

interface RestrictionProps {
  selectedDays?: number[];
  updateSelectedDaysToRedux?: any;
}

function Restrictions({
  selectedDays,
  updateSelectedDaysToRedux,
}: RestrictionProps) {
  const [days, setDays] = useState<number[]>(selectedDays ? selectedDays : []);

  // when a day is not selected, it becomes selected after being clicked. Vice versa.
  const handleBtnClick = (index: number) => {
    if (!days.includes(index)) {
      setDays([...days, index]);
    } else {
      const daysAfterRemoval = days.filter((day) => day !== index);
      setDays(daysAfterRemoval);
    }
  };

  useEffect(() => {
    updateSelectedDaysToRedux(days);
  }, [days]);

  return (
    <SectionWrapper>
      <Title title="3. Add Restrictions"></Title>
      <Title title="What days can you not go to school?"></Title>
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
      {/* <Title title='What time?'></Title>
      <TimePickerGroup>
        <TimePicker></TimePicker>
        <TimePicker></TimePicker>
      </TimePickerGroup> */}
    </SectionWrapper>
  );
}

const mapState = (state: RootState) => {
  return {
    selectedDays: state.HomeReducer.days,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateSelectedDaysToRedux(days: number[]) {
      const action: SelectDays = {
        type: SELECTDAYS,
        days,
      };
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(Restrictions);
