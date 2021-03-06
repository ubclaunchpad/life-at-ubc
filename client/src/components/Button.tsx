import React from "react";
import styled from "styled-components";

const StyledButton = styled.div<ButtonProps>`
  height: 45px;
  margin: 0 1rem;
  border: 1px solid #585858;
  border-radius: 12px;
  text-align: center;
  line-height: 45px;
  cursor: pointer;
  flex: 1;
  text-transform: uppercase;
  font-weight: 500;
  font-size: .8rem;
  background: ${(props) => (props.selected ? "#585858" : "none")};
  color: ${(props) => (props.selected ? "#fff" : "#383838")};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

interface ButtonProps {
  content?: string | number;
  selected?: boolean;
  onClick?: any;
}

function Button({ content, selected, onClick }: ButtonProps) {
  return (
    <StyledButton selected={selected} onClick={onClick}>
      {content}
    </StyledButton>
  );
}

export default Button;
