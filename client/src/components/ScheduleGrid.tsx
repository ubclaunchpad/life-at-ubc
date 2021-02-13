import React from "react";
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

const colors = ["#1BAFD0", "#FD636B", "#FFB900", "#3BE8B0", "#6967C1"];

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

function addCourse(rows: any, day: any, startTime: number, endTime: number, sectionTitle: string, i: number) {
    if (startTime >= endTime || sectionTitle === "" || sectionTitle === null) return;
    for (let timeslot of rows) {
        let currTime = timeslot.id;
        let currHour: number = +currTime.slice(0, -3);
        let currMin: number = +currTime.slice(-2);
        currHour += (currMin === 0) ? 0 : 0.5;
        if (currHour >= startTime && currHour < endTime) {
            timeslot[day] = {
                align: "center",
                sectionTitle,
                rowSpan: (endTime - startTime) * 2,
                style: {
                    background: colors[i % 5],
                    display: (currHour === startTime) ? "table-cell" : "none",
                }
            };
        }
    }
}

const useStyles = makeStyles({
    container: {
        // maxHeight: 440,
    },
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
    const startHour = 8, endHour = 20;
    const rows = makerows(startHour, endHour);

    const toggleSection = (sectionTitle: string) => () => {
        const sections = selectedSections.includes(sectionTitle)
        ? selectedSections.filter((section: string) => section !== sectionTitle)
        : [...selectedSections, sectionTitle];
        setSelectedSections([...sections]);
    };

    (schedule ? schedule : selectedSchedule).forEach((section: any, i: number) => {
        const { sectiontitle, starttime = "", endtime = "", day = "" } = section;
        const [sh, sm] = starttime.split(":");
        const [eh, em] = endtime.split(":");
        const start = Number(sh) + (Number(sm) / 60);
        const end = Number(eh) + (Number(em) / 60);
        const days = day.split(" ");
        days.forEach((dayOfWeek: any) => addCourse(rows, dayOfWeek, start, end, sectiontitle, i));
    });

    function ScheduleCell({ sectionTitle = "", ...props }: any) {
        return (
            <TableCell {...props} onClick={toggleSection(sectionTitle)}>
                {sectionTitle}
                {selectedSections.includes(sectionTitle) && " (selected)"}
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
                <Table stickyHeader aria-label="course schedule">
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
