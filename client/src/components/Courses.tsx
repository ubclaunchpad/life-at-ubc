import React, { useState } from "react";
import Title from "./Title";
import Snackbar from "@material-ui/core/Snackbar";
import {
  SetCourses, SETCOURSES,
  AddCourseSections, ADDCOURSESECTIONS,
} from "../actions/HomeActions";
import styled from "styled-components";
import Section from "./Section";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { MESSAGE } from "../util/constants";
import axios from "axios";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://course-load-ubc.herokuapp.com"
    : "http://localhost:5000";

const Wrapper = styled.div`
  display: flex;
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
  height: 262px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  flex: 3;
  overflow: scroll;
`;

export interface CourseObjectProps {
  coursetitle: string;
  coursedept: string;
  coursenumber: string;
  sectiontitle: string;
  status: string;
  activity: string;
  prof: string;
  term: string;
  day: string;
  starttime: string;
  endtime: string;
}

interface CoursesProps {
  term?: string;
  sections?: CourseObjectProps[];
  coursesAdded?: string[];
  addSectionsToRedux: (sections: CourseObjectProps[]) => void;
  setCoursesToRedux: (courses: string[]) => void;
}

function Courses({
  term,
  sections,
  coursesAdded,
  addSectionsToRedux,
  setCoursesToRedux,
}: CoursesProps) {
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
      setMessage(MESSAGE.EMPTY_INPUT);
      setOpen(true);
      return;
    }
    const partition = input.split(" ");
    if (partition.length !== 2) {
      setMessage(MESSAGE.INVALID_FORMAT);
      setOpen(true);
      return;
    }

    const department = partition[0].toUpperCase();
    const courseNumber = partition[1];
    const correctedCourse = department + " " + courseNumber;
    const response = await axios.get(
      `${API_BASE_URL}/api/section/${term}/${department}/${courseNumber}`
    );

    if (response.data.length === 0) {
      setMessage(MESSAGE.COURSE_NOT_EXIST);
    } else if (coursesAdded && !coursesAdded.includes(correctedCourse)) {
      setCoursesToRedux([...(coursesAdded as string[]), correctedCourse]);
      const courseSections: CourseObjectProps[] = response.data;
      addSectionsToRedux(
        sections ? sections.concat(courseSections) : courseSections
      );
      setMessage(MESSAGE.COURSE_ADD_SUCC);
    } else {
      setMessage(MESSAGE.COURSE_ALREADY_ADDED);
    }
    setOpen(true);
  };

  const handleDltBtnClick = (deletedCourse: string) => {
    const coursesAfterDeletion = coursesAdded
      ? coursesAdded.filter((course) => course !== deletedCourse)
      : [];
    const [deptName, courseNumber] = deletedCourse.split(" ");
    const sectionsAfterDeletion = sections
      ? sections.filter(
          (section) =>
            section.coursedept !== deptName ||
            section.coursenumber !== courseNumber
        )
      : [];
    addSectionsToRedux(sectionsAfterDeletion);
    setCoursesToRedux(coursesAfterDeletion);
  };

  return (
    <Section>
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
            color="secondary"
            style={{
              display: "block",
              marginTop: 164,
              marginLeft: 360,
              color: "white",
            }}
            onClick={handleAddBtnClick}
          >
            Add
          </Button>
        </AddCourseSection>
        <CourseList>
          {coursesAdded && coursesAdded.length > 0
            ? coursesAdded.map((course, index) => {
                return (
                  <List
                    style={{ borderBottom: "1px solid #eee" }}
                    key={index}
                    dense={false}
                  >
                    <ListItem>
                      <ListItemText primary={course} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            handleDltBtnClick(course);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
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
        key="topcenter"
      />
    </Section>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    coursesAdded: state.HomeReducer.coursesAdded,
    sections: state.HomeReducer.sections,
    term: state.HomeReducer.term,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setCoursesToRedux(coursesAdded: string[]) {
      const action: SetCourses = {
        type: SETCOURSES,
        courses: coursesAdded,
      };
      dispatch(action);
    },
    addSectionsToRedux(sections: CourseObjectProps[]) {
      const action: AddCourseSections = {
        type: ADDCOURSESECTIONS,
        sections,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
