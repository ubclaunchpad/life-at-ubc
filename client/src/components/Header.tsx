import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  width: 1300px;
  height: 100px;
  line-height: 100px;
  margin-left: auto;
  margin-right: auto;
  .left {
    font-size: 36px;
  }
  .right {
    font-size: 30px;
    float: right;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <div className="left" style={{ display: "inline-block" }}>
        <span>Schedule Generator</span>
      </div>
      <div className="right" style={{ display: "inline-block" }}>
        <span style={{ marginRight: 30 }}>Home</span>
        <span style={{ marginRight: 30 }}>Degree Navigator</span>
        <span>Courses</span>
      </div>
    </StyledHeader>
  );
}

export default Header;
