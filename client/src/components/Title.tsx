import React from "react";
import styled from "styled-components";

const StyledTitle = styled.div`
  font-size: 30px;
`;

interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  return <StyledTitle>{title}</StyledTitle>;
}

export default Title;
