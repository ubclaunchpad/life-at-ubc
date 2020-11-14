import React from "react";
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
  return <StyledItem>{courseName}</StyledItem>;
}

export default CourseItem;
