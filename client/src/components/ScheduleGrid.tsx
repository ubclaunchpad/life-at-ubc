import React from "react";
import Section from "./Section";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

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


function addCourse(rows: any, day: any, startTime: number, endTime: number, courseName: string) {
    if (startTime >= endTime || courseName === "" || courseName === null) return;
    for (let timeslot of rows) {
        let currTime = timeslot.id;
        let currHour: number = +currTime.slice(0, -3);
        let currMin: number = +currTime.slice(-2);
        currHour += (currMin === 0) ? 0 : 0.5;
        if (currHour >= startTime && currHour < endTime) {
            timeslot[day] = {
                align: "center",
                courseName,
                rowSpan: (endTime - startTime) * 2,
                style: {
                    background: "#2ABB9B",
                    display: (currHour === startTime) ? "table-cell" : "none",
                }
            };
        }
    }
}

const useStyles = makeStyles({
    container: {
        maxHeight: 440,
    },
});

/* Main Function that Generates the Grid */
function ScheduleGrid({ schedule = [] }: any) {
    const classes = useStyles();
    const startHour = 8, endHour = 20;
    const rows = makerows(startHour, endHour);
    schedule.forEach((section: any) => {
        const { sectiontitle, starttime = "", endtime = "", day = "" } = section;
        const [sh, sm] = starttime.split(":");
        const [eh, em] = endtime.split(":");
        const start = Number(sh) + (Number(sm) / 60);
        const end = Number(eh) + (Number(em) / 60);
        const days = day.split(" ");
        days.forEach((dayOfWeek: any) => addCourse(rows, dayOfWeek, start, end, sectiontitle));
    });

    function ScheduleCell({ courseName = "", ...props }: any) {
        return (
            <TableCell {...props}>{courseName}</TableCell>
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

export default ScheduleGrid;
