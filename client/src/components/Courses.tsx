import React, { useState } from "react";
import Title from "./Title";
import CourseItem from "./CourseItem";
import Snackbar from "@material-ui/core/Snackbar";
import { AddCourse, ADDCOURSE } from "../actions/HomeActions";
import styled from "styled-components";
import { SectionWrapper } from "./Home";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const Wrapper = styled.div`
  display: flex;
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const AddCourseSection = styled.div`
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

interface CoursesProps {
  coursesAdded?: string[];
  addCourseToRedux?: any;
}

function Courses({ coursesAdded, addCourseToRedux }: CoursesProps) {
  // snackbar:
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [input, setInput] = useState("");

  const handleSnackBarClose = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleAddBtnClick = async () => {
    if (input.length === 0) {
      setMessage("Empty input");
      setOpen(true);
      return;
    }
    const partition = input.split(" ");
    if (partition.length !== 2) {
      setMessage("Invalid format");
      setOpen(true);
      return;
    }

    const department = partition[0].toUpperCase();
    const courseNumber = partition[1];
    const response = await axios.get(
      `http://localhost:5000/api/section/${department}/${courseNumber}`
    );

    if (response.data.length === 0) {
      setMessage("Course does not exist");
    } else if (
      coursesAdded &&
      !coursesAdded.includes(department + courseNumber)
    ) {
      addCourseToRedux([
        ...(coursesAdded as string[]),
        department + courseNumber,
      ]);
      setMessage("Course added successfully");
    } else {
      setMessage("This course has been added already");
    }
    setOpen(true);
  };

  return (
    <SectionWrapper>
      <Title title="2. Add Courses"></Title>
      <Wrapper>
        <AddCourseSection>
          <span style={{ fontSize: 30 }}>Course:</span>
          <TextField
            id="outlined-textarea"
            variant="outlined"
            onChange={handleChange}
            style={{ width: 250, height: 50, marginLeft: 10 }}
          />
          <Button
            variant="contained"
            style={{
              display: "block",
              marginTop: 164,
              marginLeft: 400,
              color: "black",
            }}
            onClick={handleAddBtnClick}
          >
            Add
          </Button>
        </AddCourseSection>
        <CourseList>
          {coursesAdded
            ? coursesAdded.map((course, index) => {
                return (
                  <CourseItem key={index} courseName={course}></CourseItem>
                );
              })
            : null}
        </CourseList>
      </Wrapper>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleSnackBarClose}
        message={message}
        key={"top" + "center"}
      />
    </SectionWrapper>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    coursesAdded: state.HomeReducer.coursesAdded,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addCourseToRedux(coursesAdded: string[]) {
      const action: AddCourse = {
        type: ADDCOURSE,
        courses: coursesAdded,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
