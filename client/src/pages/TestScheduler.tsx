import React from "react";
import styled from "styled-components";
import { filterLectures, generateCourseScheduleOnlyLectures} from "../util/testScheduler";
import {testData} from "../util/testData";
import parentLogger from "../logger";

const logger = parentLogger.child({module : "scheduler comp"});

const StyledDiv = styled.div`
  font-size: 30px;
  margin-bottom: 30px;
`;

function TestScheduler() {
    let displayLectures = filterLectures(testData);
    let combinations = generateCourseScheduleOnlyLectures(displayLectures, []); // dummy value for restricted days arr
    logger.info(combinations);
    return (
        <StyledDiv>
        </StyledDiv>
        );
}
export default TestScheduler;
