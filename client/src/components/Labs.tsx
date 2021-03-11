import React, { useState } from "react";
import Title from "./Title";
import ScheduleGrid from "./ScheduleGrid";
import { CourseSection, filterNotLectures, isOverlapping } from "../util/testScheduler";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MuiSelect from "@material-ui/core/Select";
import MuiPopover from "@material-ui/core/Popover";
import { Dispatch } from "redux";
import { SetSelectedSchedule, SETSELECTEDSCHEDULE } from "../actions/HomeActions";
import { Button } from "@material-ui/core";

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
  const [selected, setSelected] = useState(
    Object.fromEntries(
      Object.keys(notLectureSections).map((sectiontitle: string) => [sectiontitle, {}])
    )
  );

  const handleClick = (sectionTitle: string, selectedSection: CourseSection) => () => {
    const nextSchedule = selectedSchedule.filter(({ sectiontitle }) => sectiontitle !== selected[sectionTitle]);
    if (selectedSection.sectiontitle !== selected[sectionTitle]) {
      const overlaps = nextSchedule.find((section) => isOverlapping(section, selectedSection));
      if (overlaps) {
        setMessage(`${selectedSection.sectiontitle} overlaps with ${overlaps.sectiontitle}`);
        setOpen(true);
      } else {
        setSelected({...selected, [sectionTitle]: selectedSection.sectiontitle});
        setSelectedSchedule([...nextSchedule, selectedSection]);
      }
    }
  };

  const Select = withStyles({
    select: {
      padding: ".5rem 1rem"
    }
  })(MuiSelect);

  const Popover = withStyles({
    paper: {
      backgroundColor: "#383838",
      color: "white",
      margin: 2.5,
      padding: "5px 10px",
    }
  })(MuiPopover);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleSnackBarClose = () => setOpen(false);

  const handlePopoverOpen = (event: any) => {
    const { top, left, height } = event.currentTarget.getBoundingClientRect();
    setPosition({ top: top, left: left + 100 });
    setAnchorEl(event.currentTarget);
    setTimeslot(event.currentTarget.id);
    // console.log("opening!", event.currentTarget.id);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    // console.log("closing!");
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
                <Select value={selected[notLectureSectionTitle]} variant="outlined">
                  {currNotLectureSections.map((section, j) => (
                    <MenuItem
                      key={j}
                      value={section.sectiontitle}
                      onClick={handleClick(notLectureSectionTitle, section)}
                      onMouseLeave={handlePopoverClose}
                    >
                      <Button
                        id={`${section.day}, ${section.starttime} - ${section.endtime}`}
                        key={j}
                        onMouseOver={handlePopoverOpen}
                      >
                        {section.sectiontitle}
                      </Button>
                    </MenuItem>
                  ))}
                </Select>
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
        onClose={handleSnackBarClose}
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
