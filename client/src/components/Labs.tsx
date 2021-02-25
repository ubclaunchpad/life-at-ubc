import React, { useState } from "react";
import Section from "./Section";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid";
import { CourseSection, filterNotLectures } from "../util/testScheduler";

import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import MuiSelect from "@material-ui/core/Select";
import { Dispatch } from "redux";
import { SetSelectedSchedule, SETSELECTEDSCHEDULE } from "../actions/HomeActions";

interface LabsProps {
  selectedSchedule: CourseSection[];
  notLectureSections: { [key: string]: CourseSection[] };
  setSelectedSchedule?: any;
}

function Labs({selectedSchedule, notLectureSections, setSelectedSchedule}: LabsProps) {
  const [selected, setSelected] = useState(Object.fromEntries(Object.keys(notLectureSections).map((sectiontitle: string) => [sectiontitle, {}])));
  const handleClick = (sectionTitle: string, selectedSection: CourseSection) => () => {
    const nextSelectedSchedule = selectedSchedule.filter(({ sectiontitle }) => sectiontitle !== selected[sectionTitle]);
    if (selectedSection.sectiontitle === selected[sectionTitle]) {
      setSelected({...selected, [sectionTitle]: ""});
      setSelectedSchedule(nextSelectedSchedule);
    } else {
      setSelected({...selected, [sectionTitle]: selectedSection.sectiontitle});
      setSelectedSchedule([...nextSelectedSchedule, selectedSection]);
    }
  };

  const Select = withStyles({
    select: {
      padding: ".5rem 1rem"
    }
  })(MuiSelect);

  return (
    <Section>
      <Title title="5. Add Lab Sections"></Title>
      <div style={{ margin: "1rem"}}>
        {Object.keys(notLectureSections).map((notLectureSectionTitle: string, i) => {
          const currNotLectureSections = notLectureSections[notLectureSectionTitle];
          return (
            <div key={i} style={{ textAlign: "left" }}>
                <span style={{ marginRight: ".5rem"}}>{notLectureSectionTitle}</span>
                <Select value={selected[notLectureSectionTitle]} variant="outlined">
                  {currNotLectureSections.map((section, j) => (
                    <MenuItem key={j} value={section.sectiontitle} onClick={handleClick(notLectureSectionTitle, section)}>{section.sectiontitle}</MenuItem>
                  ))}
                </Select>
            </div>
          );
        })}
      </div>
      <ScheduleGrid />
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
