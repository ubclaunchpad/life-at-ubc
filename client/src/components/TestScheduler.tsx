import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { filterLectures, filterRestrictedDays, mapDayIndexToString, generateCourseScheduleOnlyLectures} from "../util/testScheduler";
import {testData} from "../util/testData";
import parentLogger from "../logger";

const logger = parentLogger.child({ module: "testScheduler Component" });

const StyledDiv = styled.div`
  font-size: 30px;
  margin-bottom: 30px;
`;

function TestScheduler() {
    let displayLectures = filterLectures(testData);
    logger.info(displayLectures);
    let displayFilteredLectures = filterRestrictedDays(displayLectures, [0, 1, 3].map(mapDayIndexToString)); // test value, pass in restricted days from Redux store
    logger.info(displayFilteredLectures);
    let combinations = generateCourseScheduleOnlyLectures(displayFilteredLectures);
    return (
        <StyledDiv>
        </StyledDiv>
        );
}
export default TestScheduler;
