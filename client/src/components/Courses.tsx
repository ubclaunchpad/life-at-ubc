import React from "react";
import Title from "./Title";
import styled from "styled-components";
import { SectionWrapper } from "./Home";
import TextField from "@material-ui/core/TextField";

const Wrapper = styled.div`
  display: flex;
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const AddCourse = styled.div`
  display: inline-block;
  height: 100px;
  flex: 3;
  margin-right: 20px;
`;

const CourseList = styled.div`
  display: inline-block;
  height: 250px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  flex: 3;
`;

function Courses() {
  return (
    <SectionWrapper>
      <Title title="2. Add Courses"></Title>
      <Wrapper>
        <AddCourse>
          <span style={{ fontSize: 30 }}>Course:</span>
          <TextField
            id="outlined-textarea"
            variant="outlined"
            style={{ width: 250, height: 50, marginLeft: 10 }}
          />
        </AddCourse>
        <CourseList></CourseList>
      </Wrapper>
    </SectionWrapper>
  );
}

export default Courses;
