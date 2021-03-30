import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slide from "@material-ui/core/Slide";
import Title from "../components/Title";
import Button from "../components/Button";
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

export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

interface RestrictionProps {
  selectedDays?: number[];
  updateSelectedDaysToRedux?: any;
}

function Restrictions({
  selectedDays,
  updateSelectedDaysToRedux,
}: RestrictionProps) {
  const [loaded, setLoaded] = useState(false);
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
  useEffect(() => setLoaded(true), []);
  useEffect(() => {
    updateSelectedDaysToRedux(days);
  }, [days]);

  return (
    <>
      <Title title="3. Add Restrictions"></Title>
      <Slide direction="left" in={loaded}>
        <div>
          <Title title="What days do you not want to go to school?"></Title>
          <ButtonGroup>
            {weekDays.map((weekday, index) => {
              return (
                <Button
                  key={index}
                  content={weekday}
                  data-test="button"
                  selected={days.includes(index)}
                  onClick={() => {
                    handleBtnClick(index);
                  }}
                ></Button>
              );
            })}
          </ButtonGroup>
        </div>
      </Slide>
    </>
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
    }
  };
};

export default connect(mapState, mapDispatch)(Restrictions);
