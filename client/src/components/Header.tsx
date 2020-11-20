import React from "react";
import styled from "styled-components";
import Link from "@material-ui/core/Link";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SWITCHCOMPONENT, Switch } from "../actions/HomeActions";

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

const StyledLink = styled(Link)`
  cursor: pointer;
`;

interface NavBarProps {
  index?: number;
  handleClick?: any;
}

function Header({ index, handleClick }: NavBarProps) {
  return (
    <StyledHeader>
      <div className="left" style={{ display: "inline-block" }}>
        <span>Schedule Generator</span>
      </div>
      <div className="right" style={{ display: "inline-block" }}>
      <StyledLink
          style={{ color: "black" }}
          onClick={() => {
            handleClick(0);
          }}
        >
          <span style={{ marginRight: 30 }}>Home</span>
        </StyledLink>
        <StyledLink
          style={{ color: "black" }}
          onClick={() => {
            handleClick(6);
          }}
        >
          <span style={{ marginRight: 30 }}>Degree Navigator</span>
        </StyledLink>
        <StyledLink
          style={{ color: "black" }}
          onClick={() => {
            handleClick(7);
          }}
        >
          <span style={{ marginRight: 30 }}>Courses</span>
        </StyledLink>
      </div>
    </StyledHeader>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    index: state.HomeReducer.componentIndex,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleClick(index: any) {
      const action: Switch = { type: SWITCHCOMPONENT, index };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
