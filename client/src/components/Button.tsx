import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
  height: 45px;
  margin-left: 20px;
  margin-right: 20px;
  border: 1px solid #747474;
  border-radius: 12px;
  text-align: center;
  line-height: 45px;
  cursor: pointer;
  flex: 1;
`;

interface ButtonProps {
  content: string | number;
}

function Button({ content }: ButtonProps) {
  return <StyledButton>{content}</StyledButton>;
}

export default Button;
