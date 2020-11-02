import React from "react";
import { SectionWrapper } from "./Home";
import { GridComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-grids";
// import { DataGrid, RowProps } from '@material-ui/data-grid';
import timeslot from "./timeslot.json"
import "../grid.css"


// const { data } = timeslot();

function ScheduleGrid() {
  return (
    <SectionWrapper>
        <GridComponent 
                dataSource={timeslot} 
                style={{ marginLeft: '30%', marginRight: '30%' }} 
                rowHeight={25}
                height='250'
                width='auto'>
            <ColumnDirective field='Time' textAlign='Center' width='162.98'></ColumnDirective>
            <ColumnDirective field='Mon' textAlign='Center' width='162.98'></ColumnDirective>
            <ColumnDirective field='Tues' textAlign='Center' width='162.98'></ColumnDirective>
            <ColumnDirective field='Wed' textAlign='Center' width='162.98'></ColumnDirective>
            <ColumnDirective field='Thu' textAlign='Center' width='162.98'></ColumnDirective>
            <ColumnDirective field='Fri' textAlign='Center' width='162.98'></ColumnDirective>
        </GridComponent>
    </SectionWrapper>
  );
}

export default ScheduleGrid;
