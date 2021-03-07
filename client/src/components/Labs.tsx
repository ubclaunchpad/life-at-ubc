import React, { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid";
import MuiChip from "@material-ui/core/Chip";
import Snackbar from "@material-ui/core/Snackbar";
import MuiPopover from "@material-ui/core/Popover";
import { withStyles } from "@material-ui/core/styles";
import { CourseSection, filterNotLectures, isOverlapping } from "../util/testScheduler";
import { SetSelectedSchedule, SETSELECTEDSCHEDULE } from "../actions/HomeActions";
import { RootState } from "../reducers/index";

interface LabsProps {
  selectedSchedule: CourseSection[];
  notLectureSections: { [key: string]: CourseSection[] };
  setSelectedSchedule?: any;
}

function Labs({selectedSchedule, notLectureSections, setSelectedSchedule}: LabsProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [timeslot, setTimeslot] = useState("");
  const [selectedSections, setSelectedSections] = useState(
    Object.fromEntries(
      Object.keys(notLectureSections).map((sectiontitle: string) => [sectiontitle, {}])
    )
  );

  const handleClick = (sectionTitle: string, selectedSection: CourseSection) => () => {
    const nextSchedule = selectedSchedule.filter(({ sectiontitle }) => sectiontitle !== selectedSections[sectionTitle]);
    if (selectedSection.sectiontitle !== selectedSections[sectionTitle]) {
      const overlaps = nextSchedule.find((section) => isOverlapping(section, selectedSection));
      if (overlaps) {
        setMessage(`${selectedSection.sectiontitle} overlaps with ${overlaps.sectiontitle}`);
        setOpen(true);
      } else {
        setSelectedSections({...selectedSections, [sectionTitle]: selectedSection.sectiontitle});
        setSelectedSchedule([...nextSchedule, selectedSection]);
      }
    }
  };

  const Chip = withStyles({
    root: {
      backgroundColor: "#585858",
      color: "white",
      margin: 2.5,
      minWidth: 124,
      fontWeight: 500,
    },
    clickable: {
      "&:hover, &:focus": {
        backgroundColor: "#585858",
      }
    },
    outlined: {
      backgroundColor: "transparent",
      color: "#383838",
    },
  })(MuiChip);

  const Popover = withStyles({
    paper: {
      backgroundColor: "#383838",
      color: "white",
      margin: 2.5,
      padding: "2.5px 5px",
    }
  })(MuiPopover);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event: any) => {
    const { top, left, height } = event.currentTarget.getBoundingClientRect();
    setPosition({ top: top + height, left });
    setAnchorEl(event.currentTarget);
    setTimeslot(event.currentTarget.id);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popOpen = Boolean(anchorEl);

  return (
    <>
      <Title title="5. Add Lab Sections"></Title>
      <div style={{ margin: "1rem" }}>
        {Object.keys(notLectureSections).map((notLectureSectionTitle: string, i) => {
          const currNotLectureSections = notLectureSections[notLectureSectionTitle];
          return (
            <div key={i} style={{ textAlign: "left", margin: ".5rem 0" }}>
                <span style={{ marginRight: ".5rem" }}>{notLectureSectionTitle}</span>
                <div>
                  {currNotLectureSections.map((section, j) => {
                    const selected = selectedSections[notLectureSectionTitle] === section.sectiontitle;
                    return (
                      <Chip
                        id={`${section.day}, ${section.starttime} - ${section.endtime}`}
                        key={j}
                        clickable
                        label={section.sectiontitle}
                        variant={selected ? "default" : "outlined"}
                        onClick={handleClick(notLectureSectionTitle, section)}
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                      />
                    );
                  })}
                </div>
            </div>
          );
        })}
        <Popover
          open={popOpen}
          anchorEl={anchorEl}
          anchorReference="anchorPosition"
          anchorPosition={position}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
          style={{ pointerEvents: "none" }}
        >
          {timeslot}
        </Popover>
      </div>
      <ScheduleGrid />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={() => setOpen(false)}
        message={message}
        key="topcenter"
      />
    </>
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
