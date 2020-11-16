import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { filterLectures, generateCourseScheduleOnlyLectures} from "../util/testScheduler";
import {testData} from "../util/testData";

const StyledDiv = styled.div`
  font-size: 30px;
  margin-bottom: 30px;
`;

function TestScheduler() {
    let displayLectures = filterLectures(testData);
    let combinations = generateCourseScheduleOnlyLectures(displayLectures);
    return (
        <StyledDiv>
        </StyledDiv>
        );
}
export default TestScheduler;
