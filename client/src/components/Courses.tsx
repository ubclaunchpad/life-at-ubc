import React, { useState } from "react";
import Title from "./Title";
import Snackbar from "@material-ui/core/Snackbar";
import {
  SetCourses, SETCOURSES,
  AddCourseSections, ADDCOURSESECTIONS,
} from "../actions/HomeActions";
import styled from "styled-components";
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
  flex: 1;
`;

const CourseList = styled(List)`
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  flex: 1;
  margin-top: 8px;
  overflow: scroll;
  padding: 0;
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
  sections: CourseObjectProps[];
  coursesAdded: string[];
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

  const addCourse = async (course: string): Promise<{ courseTitle: string; courseSections: CourseObjectProps[]; }> => {
    const partition = course.split(" ");
    if (partition.length !== 2) {
      throw new Error(MESSAGE.INVALID_FORMAT);
    }

    const department = partition[0].toUpperCase();
    const courseNumber = partition[1];
    const courseTitle = department + " " + courseNumber;

    const { data: courseSections } = await axios.get(
      `${API_BASE_URL}/api/section/${term}/${department}/${courseNumber}`
    );
    if (courseSections.length === 0) {
      throw new Error(MESSAGE.COURSE_NOT_EXIST);
    } else if (coursesAdded.includes(courseTitle)) {
      throw new Error(MESSAGE.COURSE_ALREADY_ADDED);
    } else {
      return { courseTitle, courseSections };
    }
  };

  const handleAddBtnClick = async () => {
    if (input.length === 0) {
      setMessage(MESSAGE.EMPTY_INPUT);
      setOpen(true);
      return;
    }
    const courses = input.split(/,\s*/);
    const coursesToAdd: string[] = [];
    const sectionsToAdd: CourseObjectProps[] = [];
    try {
      await Promise.all(courses.map(async (course) => {
        const { courseTitle, courseSections } = await addCourse(course);
        coursesToAdd.push(courseTitle);
        sectionsToAdd.push(...courseSections);
        setMessage(MESSAGE.COURSE_ADD_SUCC);
      }));
      setCoursesToRedux(coursesToAdd);
      addSectionsToRedux(sectionsToAdd);
    } catch (e) {
      setMessage(e.message);
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
    <>
      <Title title="2. Add Courses"></Title>
      <Wrapper>
        <AddCourseSection>
          <TextField
            id="outlined-textarea"
            placeholder="e.g. CPSC 310, CPSC 320"
            helperText="Start typing in courses you wish to take this term"
            variant="outlined"
            onChange={handleChange}
            margin="dense"
            style={{ marginLeft: "1rem" }}
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
            disableElevation
          >
            Add
          </Button>
        </AddCourseSection>
        <CourseList>
          {coursesAdded.map((course, index) => {
            return (
              <ListItem key={index} style={{ borderBottom: "1px solid #eee" }}>
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
            );
          })}
        </CourseList>
      </Wrapper>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleSnackBarClose}
        message={message}
        key="topcenter"
      />
    </>
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
    setCoursesToRedux(courses: string[]) {
      const action: SetCourses = {
        type: SETCOURSES,
        courses,
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
