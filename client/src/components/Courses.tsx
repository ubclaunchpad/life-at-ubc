import React, { useState } from "react";
import Title from "./Title";
import Snackbar from "@material-ui/core/Snackbar";
import {
  AddCourse,
  ADDCOURSE,
  AddCourseSections,
  ADDCOURSESECTIONS,
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
import axios from "axios";
import { DELETCOURSE, DeleteCourse } from "../actions/HomeActions";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";

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
  coursesAdded?: string[];
  addCourseToRedux: (coursesAdded: string[]) => void;
  addSectionsToRedux: (sections: CourseObjectProps[]) => void;
  deleteCourseInRedux: (courses: string[]) => void;
  sections?: CourseObjectProps[];
  term?: string;
}

function Courses({
  coursesAdded,
  addCourseToRedux,
  sections,
  addSectionsToRedux,
  deleteCourseInRedux,
  term,
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
    const correctedCourse = department + " " + courseNumber;
    const response = await axios.get(
      `http://localhost:5000/api/section/${term}/${department}/${courseNumber}`
    );

    if (response.data.length === 0) {
      setMessage("Course does not exist");
    } else if (coursesAdded && !coursesAdded.includes(correctedCourse)) {
      addCourseToRedux([...(coursesAdded as string[]), correctedCourse]);
      const courseSections: CourseObjectProps[] = response.data;
      addSectionsToRedux(
        sections ? sections.concat(courseSections) : courseSections
      );
      setMessage("Course added successfully");
    } else {
      setMessage("This course has been added already");
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
    deleteCourseInRedux(coursesAfterDeletion);
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
    addCourseToRedux(coursesAdded: string[]) {
      const action: AddCourse = {
        type: ADDCOURSE,
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
    deleteCourseInRedux(courses: string[]) {
      const action: DeleteCourse = {
        type: DELETCOURSE,
        courses,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
