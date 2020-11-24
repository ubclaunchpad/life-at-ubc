import React from "react";
import { SectionWrapper } from "./Home";
import clsx from "clsx";
import { DataGrid, CellClassParams } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { CourseSection } from "../util/testScheduler";


const weekdayWidth = 125;
const timeWidth = 90;
const titleHeight = 40;
const rowHeight = 30;

interface ColDef {
    /**
     * The column identifier. It's used to match with [[RowData]] values.
     */
    field: string;
    headerName: string;
    type: string;
    width: number;
    sortable: boolean;
    headerAlign: "center";
    cellClassName: any;
}

let color = (timeslot: CellClassParams) => clsx("selected", { true: (timeslot.value as string) !== "", });
var columns: ColDef[] = [
    {field: "id", headerName: "Time", type: "string", width: timeWidth, sortable: false, headerAlign: "center", cellClassName: null},
    {field: "Monday", headerName: "Mon", type: "string", width: weekdayWidth, sortable: false, headerAlign: "center", cellClassName: color, },
    {field: "Tuesday", headerName: "Tues", type: "string", width: weekdayWidth, sortable: false, headerAlign: "center", cellClassName: color, },
    {field: "Wednesday", headerName: "Wed", type: "string", width: weekdayWidth, sortable: false, headerAlign: "center", cellClassName: color, },
    {field: "Thursday", headerName: "Thur", type: "string", width: weekdayWidth, sortable: false, headerAlign: "center", cellClassName: color, },
    {field: "Friday", headerName: "Fri", type: "string", width: weekdayWidth, sortable: false, headerAlign: "center", cellClassName: color, },
];

const daysOfWeek: {[key: string]: number} = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
};

let makerows = function (start: number, end: number) {
    var rows: any[] = [];
    let startHour = start, endHour = end, half = 0;
    for (var hour = startHour; hour <= endHour; hour += 0.5) {
        let minutes = (half % 2) === 1 ? ":30" : ":00";
        var time = String(Math.floor(hour)) + minutes;
        rows.push({
            id: time,
            Monday: "",
            Tuesday: "",
            Wednesday: "",
            Thursday: "",
            Friday: "",
        }, );
        half++;
    }
    return rows;
};


function addCourse(rows: any, day: any, startTime: number, endTime: number, courseName: string) {
    if (startTime >= endTime || courseName === "" || courseName === null) return;
    let colnum = day + 1;
    for (var timeslot of rows) {
        let currTime = timeslot.id;
        let currHour: number = +currTime.slice(0, -3);
        let currMin: number = +currTime.slice(-2);
        currHour += (currMin === 0) ? 0 : 0.5;
        if (currHour >= startTime && currHour < endTime) {
            switch (day) {
                case 1:
                    timeslot.Monday = courseName;
                    break;
                case 2:
                    timeslot.Tuesday = courseName;
                    break;
                case 3:
                    timeslot.Wednesday = courseName;
                    break;
                case 4:
                    timeslot.Thursday = courseName;
                    break;
                case 5:
                    timeslot.Friday = courseName;
                    break;
            }
        }
    }
}


/* Styling */
const colorStyle = makeStyles({
    root: {
      "& .selected.true": {
        backgroundColor: "rgba(157, 255, 118, 0.49)",
        color: "#1a3e72",
        fontWeight: "600",
      },
    //   '& .selected.false': {
    //     backgroundColor: '#d47483',
    //     color: '#1a3e72',
    //     fontWeight: '600',
    //   },
    },
});

const gridStyle = makeStyles(() => ({
    root: {
        marginLeft: 320,
        marginRight: 355,
        textAlign: "center",
        textDecorationColor: "rgba(157, 255, 118, 0)"
    }
}));

interface ScheduleGridProps {
    schedule: CourseSection[];
}


/* Main Function that Generates the Grid */
function ScheduleGrid({ schedule }: ScheduleGridProps) {
    const classes = gridStyle();
    const colorclasses = colorStyle();

    let startHour = 8, endHour = 20;
    var rows = makerows(startHour, endHour);
    schedule.forEach((section: any) => {
        const { sectiontitle, starttime = "", endtime = "", day = "" } = section;
        const [sh, sm] = starttime.split(":");
        const [eh, em] = endtime.split(":");
        const start = Number(sh) + (Number(sm) / 60);
        const end = Number(eh) + (Number(em) / 60);
        const days = day.split(" ");
        days.forEach((dayOfWeek: any) => addCourse(rows, daysOfWeek[dayOfWeek], start, end, sectiontitle));
    });

    return (
        <SectionWrapper>
            <div style={{ height: 300, width: "53.5%" }} className={colorclasses.root}>
                <DataGrid
                    className={classes.root}
                    rows={rows}
                    columns={columns}
                    rowHeight={rowHeight}
                    headerHeight={titleHeight}
                    disableExtendRowFullWidth={false}
                    hideFooter={true}
                />
            </div>
        </SectionWrapper>
    );
}

export default ScheduleGrid;
