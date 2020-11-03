import React from "react";
import { SectionWrapper } from "./Home";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

const weekday_width = 125;
const time_width = 90;
const title_height = 40;
const row_height = 30;

interface ColDef {
    /**
     * The column identifier. It's used to match with [[RowData]] values.
     */
    field: string;
    headerName: string;
    width: number;
    sortable: boolean;
    headerAlign: 'center';
}

var columns: ColDef[] = [
    {field: "id", headerName: 'Time', width: time_width, sortable: false, headerAlign: 'center',},
    {field: "Monday", headerName: 'Mon', width: weekday_width, sortable: false, headerAlign: 'center',},
    {field: "Tuesday", headerName: 'Tues', width: weekday_width, sortable: false, headerAlign: 'center',},
    {field: "Wednesday", headerName: 'Wed', width: weekday_width, sortable: false, headerAlign: 'center',},
    {field: "Thursday", headerName: 'Thur', width: weekday_width, sortable: false, headerAlign: 'center',},
    {field: "Friday", headerName: 'Fri', width: weekday_width, sortable: false, headerAlign: 'center',},
];


var rows: any[] = [];
let startHour = 8, endHour = 17, half = 0;
for (var hour=startHour; hour<endHour; hour+=0.5) {
    let minutes = (half%2) === 1 ? ':30': ':00';
    var time = String(Math.floor(hour)) + minutes;
    rows.push({
        id: time,
    },);
    half++;
}
rows.push({id: "17:00",});


function ScheduleGrid() {
    const useStyles = makeStyles(theme => ({
        root: {
            marginLeft: 355,
            marginRight: 355,
            textAlign: 'center',
        }
    }))
    const classes = useStyles();
  
    return (
        <SectionWrapper>
            <div style={{ height: 300, width: '50%' }}>
                <DataGrid 
                    className={classes.root} 
                    rows={rows} 
                    columns={columns} 
                    rowHeight={row_height} 
                    headerHeight={title_height}
                    disableExtendRowFullWidth={false}
                    hideFooter={true}/>
            </div>
        </SectionWrapper>
    );
}

export default ScheduleGrid;
