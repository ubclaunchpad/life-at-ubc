import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import styled from "styled-components";

const StyledItem = styled.div`
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #c4c4c4;
  line-height: 30px;
`;

interface CourseItemProps {
  courseName: string;
}
function CourseItem({ courseName }: CourseItemProps) {
  return (
    <StyledItem>
      {courseName}
      <ClearIcon
        style={{ lineHeight: 40, cursor: "pointer" }}
        fontSize='small'
      ></ClearIcon>
    </StyledItem>
  );
}

export default CourseItem;
