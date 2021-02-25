import React from "react";
import cx from "classnames";
import Section from "./Section";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Dispatch } from "redux";
import { makeStyles } from "@material-ui/core/styles";
import { CourseSection } from "../util/testScheduler";

import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { SETSELECTEDSECTIONS, SetSelectedSections } from "../actions/HomeActions";

const lectureTypes = new Set(["Waiting List", "Web-Oriented Course", "Lecture"]);

function makerows(start: number, end: number) {
    const rows: any[] = [];
    let startHour = start, endHour = end, half = 0;
    for (let hour = startHour; hour <= endHour; hour += 0.5) {
        const minutes = (half % 2) === 1 ? ":30" : ":00";
        const time = String(Math.floor(hour)) + minutes;
        rows.push({ id: time });
        half++;
    }
    return rows;
}

function addCourse(rows: any, day: any, term: string, startTime: number, endTime: number, sectiontitle: string, activity: string, i: number) {
    if (startTime >= endTime || sectiontitle === "" || sectiontitle === null) return;
    for (let timeslot of rows) {
        let currTime = timeslot.id;
        let currHour: number = +currTime.slice(0, -3);
        let currMin: number = +currTime.slice(-2);
        currHour += (currMin === 0) ? 0 : 0.5;
        if (currHour >= startTime && currHour < endTime) {
            timeslot[day] = {
                align: "center",
                term,
                sectiontitle,
                rowSpan: (endTime - startTime) * 2,
                style: {
                    background: lectureTypes.has(activity) ? "#dff0d8" : "#d8dff0",
                    display: (currHour === startTime) ? "table-cell" : "none",
                    cursor: "pointer",
                }
            };
        }
    }
}

const useStyles = makeStyles({
    container: {
        // maxHeight: 440,
    },
    body: {
        "boxSizing": "border-box",
        "width": 200,
        "&.selected": {
            border: "2px solid #b2dba1"
        }
    }
});

interface ScheduleGridProps {
    schedule?: CourseSection[];
    selectedSchedule: CourseSection[];
    selectedSections: string[];
    setSelectedSections: (selectedSections: string[]) => void;
}

/* Main Function that Generates the Grid */
function ScheduleGrid({ schedule, selectedSchedule, selectedSections, setSelectedSections }: ScheduleGridProps) {
    const classes = useStyles();
    const startHour = 7, endHour = 20;
    const rows = makerows(startHour, endHour);

    const toggleSection = (sectiontitle: string) => () => {
        if (!sectiontitle) return;
        const sections = selectedSections.includes(sectiontitle)
        ? selectedSections.filter((section: string) => section !== sectiontitle)
        : [...selectedSections, sectiontitle];
        setSelectedSections([...sections]);
    };

    (schedule ? schedule : selectedSchedule).forEach((section: any, i: number) => {
        const { sectiontitle = "", activity, term = "", starttime = "", endtime = "", day = "" } = section;
        const [sh, sm] = starttime.split(":");
        const [eh, em] = endtime.split(":");
        const start = Number(sh) + (Number(sm) / 60);
        const end = Number(eh) + (Number(em) / 60);
        const days = day.split(" ");
        days.forEach((dayOfWeek: any) => addCourse(rows, dayOfWeek, term, start, end, sectiontitle, activity, i));
    });

    function ScheduleCell({ sectiontitle, term, ...props }: any) {
        return (
            <TableCell {...props}
                className={cx({selected: selectedSections.includes(sectiontitle) }, classes.body)}
                onClick={toggleSection(sectiontitle)}>
                <b>{sectiontitle}</b>
                {sectiontitle && <p style={{ fontSize: "small", margin: 0 }}>{`Term ${term}`}</p>}
            </TableCell>
        );
    }

    function ScheduleHead() {
        return (
            <TableHead>
                <TableRow>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Mon</TableCell>
                    <TableCell align="center">Tue</TableCell>
                    <TableCell align="center">Wed</TableCell>
                    <TableCell align="center">Thu</TableCell>
                    <TableCell align="center">Fri</TableCell>
                </TableRow>
            </TableHead>
        );
    }

    function ScheduleBody() {
        return (
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell align="center">{row.id}</TableCell>
                        <ScheduleCell {...row.Mon} />
                        <ScheduleCell {...row.Tue} />
                        <ScheduleCell {...row.Wed} />
                        <ScheduleCell {...row.Thu} />
                        <ScheduleCell {...row.Fri} />
                    </TableRow>
                ))}
            </TableBody>
        );
    }

    function ScheduleTable() {
        return (
            <TableContainer component={Paper} className={classes.container}>
                <Table size="small" stickyHeader aria-label="course schedule">
                    <ScheduleHead />
                    <ScheduleBody />
                </Table>
            </TableContainer>
        );
    }

    return (
        <Section>
            <ScheduleTable />
        </Section>
    );
}

const mapStateToProps = (state: RootState) => {
    return {
      selectedSchedule: state.HomeReducer.selectedSchedule,
      selectedSections: state.HomeReducer.selectedSections,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      setSelectedSections(selectedSections: string[]) {
        const action: SetSelectedSections = {
          type: SETSELECTEDSECTIONS,
          selectedSections,
        };
        dispatch(action);
      },
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleGrid);
