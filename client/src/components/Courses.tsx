import React, { useState, useEffect } from 'react';
import Title from './Title';
import styled from 'styled-components';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SectionWrapper } from './Home';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

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

const AddCourse = styled.div`
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

function Courses() {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [courses, setCourses] = useState<string[]>([]);
  const [curr, setCurr] = useState('');

  const fetchAllCourses = async () => {
    const coursesFetched = await axios.get('http://localhost:3000/courses');
    let courseList: string[] = [];
    for (let course of coursesFetched.data) {
      courseList.push(course.coursename);
    }
    setCourses(courseList);
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <SectionWrapper>
      <Title title='2. Add Courses'></Title>
      <Wrapper>
        <AddCourse>
          <Autocomplete
            options={isLoaded ? courses : []}
            getOptionLabel={(option) => option}
            style={{ width: 300, marginLeft: 100 }}
            renderInput={(params) => (
              <TextField {...params} label='Select Course' variant='outlined' />
            )}
          ></Autocomplete>
          <Button
            variant='contained'
            style={{
              backgroundColor: 'black',
              marginTop: 160,
              marginLeft: 250,
            }}
            color='primary'
            className={classes.button}
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
