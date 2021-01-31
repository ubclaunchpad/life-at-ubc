import React from "react";
import Section from "./Section";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid";
import { CourseSection, filterNotLectures } from "../util/testScheduler";

import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";
import { Dispatch } from "redux";
import { SetSelectedSchedule, SETSELECTEDSCHEDULE } from "../actions/HomeActions";

interface LabsProps {
  selectedSchedule: CourseSection[];
  notLectureSections: { [key: string]: CourseSection[] };
  setSelectedSchedule?: any;
}


function Labs({selectedSchedule, notLectureSections, setSelectedSchedule}: LabsProps) {
  const handleClick = (selectedSection: CourseSection) => {
    if (selectedSchedule.includes(selectedSection)) {
      setSelectedSchedule([...selectedSchedule.filter((section) => section !== selectedSection)]);
    } else {
      setSelectedSchedule([...selectedSchedule, selectedSection]);
    }
  };

  return (
    <Section>
      <Title title="5. Add Lab Sections"></Title>
      <div style={{ display: "flex" }}>
        <ScheduleGrid></ScheduleGrid>
        {Object.keys(notLectureSections).map((notLectureSectionTitle: string, i) => {
          const currNotLectureSections = notLectureSections[notLectureSectionTitle];
          return (
            <div key={i}>
              <p>{notLectureSectionTitle}</p>
              {currNotLectureSections.map((notLectureSection: CourseSection, j) => (
                <Chip
                  key={j}
                  variant="outlined"
                  size="medium"
                  label={notLectureSection["sectiontitle"]}
                  onClick={() => handleClick(notLectureSection)}
                />
              ))}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    selectedSchedule: state.HomeReducer.selectedSchedule,
    notLectureSections: filterNotLectures(state.HomeReducer.sections)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSelectedSchedule(schedule: CourseSection[]) {
      const action: SetSelectedSchedule = {
        type: SETSELECTEDSCHEDULE,
        selectedSchedule: schedule,
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Labs);
