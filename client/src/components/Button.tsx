import React from "react";
import styled from "styled-components";

const StyledButton = styled.div<ButtonProps>`
  height: 45px;
  margin-left: 20px;
  margin-right: 20px;
  border: 1px solid #747474;
  border-radius: 12px;
  text-align: center;
  line-height: 45px;
  cursor: pointer;
  flex: 1;
  background: ${(props) => (props.selected ? "#747474" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "black")};
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
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
