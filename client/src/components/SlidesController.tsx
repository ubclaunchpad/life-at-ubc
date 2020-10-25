import React from 'react';
import styled from 'styled-components';

const StyledSlidesContainer = styled.div`
  a {
    margin-right: 10px;
  }
`;

type controllerProps = {
  a: boolean;
  setA: any;
};

function SlidesContainer({ a, setA }: controllerProps) {
  return (
    <StyledSlidesContainer>
      <div
        onClick={() => {
          setA(!a);
          console.log(a);
        }}
      >
        change parent RC state
      </div>
      <a href='/'>Go to home</a>
      <a href='/page1'>Go to page 1</a>
      <a href='/page2'>Go to page 2</a>
    </StyledSlidesContainer>
  );
}

export default SlidesContainer;
