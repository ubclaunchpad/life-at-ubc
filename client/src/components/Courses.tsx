import React, { useState } from "react";
import Title from "./Title";
import styled from "styled-components";
import { SectionWrapper } from "./Home";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

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
  const [input, setInput] = useState("");

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleAddBtnClick = async () => {
    console.log(input);
    const department = input.split(" ")[0];
    const number = input.split(" ")[1];
    console.log([department, number]);
    const response = await axios.get(
      `http://localhost:5000/api/section/${department}/${number}`
    );
    console.log(response);
  };

  return (
    <SectionWrapper>
      <Title title='2. Add Courses'></Title>
      <Wrapper>
        <AddCourse>
          <span style={{ fontSize: 30 }}>Course:</span>
          <TextField
            id='outlined-textarea'
            variant='outlined'
            onChange={handleChange}
            style={{ width: 250, height: 50, marginLeft: 10 }}
          />
          <Button
            variant='contained'
            color='primary'
            style={{ display: "block", marginTop: 165, marginLeft: 400 }}
            onClick={handleAddBtnClick}
          >
            Add
          </Button>
        </AddCourse>
        <CourseList></CourseList>
      </Wrapper>
    </SectionWrapper>
  );
}

export default Courses;
