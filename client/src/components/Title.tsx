import React from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  font-weight: 300;
`;

interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  return <StyledTitle>{title}</StyledTitle>;
}

export default Title;
