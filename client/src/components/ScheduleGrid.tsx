import React from "react";
import { SectionWrapper } from "./Home";
import clsx from "clsx";
import { DataGrid, CellClassParams, isArray } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";


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
    for (let row of rows) {
        let currTime = row.id;
        let currHour: number = +currTime.slice(0, -3);
        let currMin: number = +currTime.slice(-2);
        currHour += (currMin === 0) ? 0 : 0.5;
        if (currHour >= startTime && currHour < endTime) {
            switch (day) {
                case 1:
                    row.Monday = courseName;
                    break;
                case 2:
                    row.Tuesday = courseName;
                    break;
                case 3:
                    row.Wednesday = courseName;
                    break;
                case 4:
                    row.Thursday = courseName;
                    break;
                case 5:
                    row.Friday = courseName;
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


/* Main Function that Generates the Grid */
function ScheduleGrid() {
    const classes = gridStyle();
    const colorclasses = colorStyle();

    let startHour = 8, endHour = 20;
    var rows = makerows(startHour, endHour);
    addCourse(rows, 1, 13, 14, "CPSC 221");
    addCourse(rows, 3, 13, 14, "CPSC 221");
    addCourse(rows, 5, 13, 14, "CPSC 221");
    addCourse(rows, 1, 14, 15, "ELEC 221");
    addCourse(rows, 3, 14, 15, "ELEC 221");
    addCourse(rows, 5, 14, 15, "ELEC 221");
    addCourse(rows, 1, 17, 19, "ELEC 221");
    addCourse(rows, 5, 11, 13, "CPEN 331");
    addCourse(rows, 5, 15, 16, "CPEN 331");
    addCourse(rows, 5, 17, 20, "CPEN 331");
    addCourse(rows, 2, 8, 9.5, "MATH 307");
    addCourse(rows, 4, 8, 9.5, "MATH 307");
    addCourse(rows, 2, 9.5, 11, "PHYS 301");
    addCourse(rows, 2, 13, 14, "PHYS 301");
    addCourse(rows, 4, 9.5, 11, "PHYS 301");
    addCourse(rows, 1, 15, 16, "MECH 360");
    addCourse(rows, 2, 17, 18.5, "MECH 360");
    addCourse(rows, 4, 17, 18.5, "MECH 360");

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
