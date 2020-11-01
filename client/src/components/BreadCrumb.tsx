import React from "react";
import styled from "styled-components";
import { SWITCHCOMPONENT, Switch } from "../actions/HomePageActions";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const StyledBreadcrumbesWrapper = styled.div`
  width: 465px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 46px;
  margin-bottom: 46px;
`;

interface BreadcrumbProps {
  index?: number;
  handleClick?: any;
}

function Breadcrumb({ index, handleClick }: BreadcrumbProps) {
  return (
    <StyledBreadcrumbesWrapper>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link
          style={{ color: index === 0 ? "black" : "inherit" }}
          onClick={() => {
            handleClick(0);
          }}
        >
          Home
        </Link>
        <Link
          style={{ color: index === 1 ? "black" : "inherit" }}
          onClick={() => {
            handleClick(1);
          }}
        >
          Courses
        </Link>
        <Link
          style={{ color: index === 2 ? "black" : "inherit" }}
          onClick={() => {
            handleClick(2);
          }}
        >
          Restrictions
        </Link>
        <Link
          style={{ color: index === 3 ? "black" : "inherit" }}
          onClick={() => {
            handleClick(3);
          }}
        >
          Lectures
        </Link>
        <Link
          style={{ color: index === 4 ? "black" : "inherit" }}
          onClick={() => {
            handleClick(4);
          }}
        >
          Labs
        </Link>
        <Link
          style={{ color: index === 5 ? "black" : "inherit" }}
          onClick={() => {
            handleClick(5);
          }}
        >
          Generate
        </Link>
      </Breadcrumbs>
    </StyledBreadcrumbesWrapper>
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
      console.log(index);
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
