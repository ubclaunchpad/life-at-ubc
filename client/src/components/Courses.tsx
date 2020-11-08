import React, { useState, useEffect } from "react";
import CourseItem from "./CouseItem";
import Title from "./Title";
import styled from "styled-components";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SectionWrapper } from "./Home";
import { AddCourse, ADDCOURSE } from "../actions/HomeActions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

const Wrapper = styled.div`
  display: flex;
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const AddCourseSection = styled.div`
  display: inline-block;
  height: 300px;
  flex: 1;
  margin-right: 20px;
`;

const CourseList = styled.div`
  display: inline-block;
  height: 250px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  flex: 1.4;
`;

interface CoursesProps {
  courseSelected?: string[];
  addCourseToRedux?: any;
}

function Courses({ courseSelected, addCourseToRedux }: CoursesProps) {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [coursesPool, setCoursesPool] = useState<string[]>([]);
  const [currCoursesSelected, setCurrCoursesSelected] = useState<string[]>(
    courseSelected ? courseSelected : []
  );
  const [curr, setCurr] = useState("");

  const fetchAllCourses = async () => {
    const coursesFetched = await axios.get("http://localhost:3000/courses");
    let courseList: string[] = [];
    for (let course of coursesFetched.data) {
      courseList.push(course.coursename);
    }
    setCoursesPool(courseList);
    setIsLoaded(true);
  };

  const handleChange = (event: object, value: any) => {
    setCurr(value);
  };

  const handelAddBtnClick = () => {
    if (curr && !currCoursesSelected.includes(curr)) {
      setCurrCoursesSelected([...currCoursesSelected, curr]);
      setCurr("");
      addCourseToRedux(currCoursesSelected);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <SectionWrapper>
      <Title title="2. Add Courses"></Title>
      <Wrapper>
        <AddCourseSection>
          <Autocomplete
            options={isLoaded ? coursesPool : []}
            getOptionLabel={(option) => option}
            style={{ width: 300, marginLeft: 100 }}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField {...params} label="Select Course" variant="outlined" />
            )}
          ></Autocomplete>
          <Button
            variant="contained"
            style={{
              backgroundColor: "black",
              marginTop: 160,
              marginLeft: 250,
            }}
            color="primary"
            className={classes.button}
            onClick={handelAddBtnClick}
          >
            Add
          </Button>
        </AddCourseSection>
        <CourseList>
          {currCoursesSelected.map((course, index) => {
            return <CourseItem courseName={course} key={index}></CourseItem>;
          })}
        </CourseList>
      </Wrapper>
    </SectionWrapper>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    courseSelected: state.HomeReducer.courseSelected,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addCourseToRedux(currCoursesSelected: string[]) {
      const action: AddCourse = {
        type: ADDCOURSE,
        courses: currCoursesSelected,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
