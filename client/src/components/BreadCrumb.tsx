import React from "react";
import styled from "styled-components";
import { SWITCHCOMPONENT, Switch } from "../actions/HomeActions";
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
  margin-bottom: 40px;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
`;

interface BreadcrumbProps {
  index?: number;
  handleClick?: any;
}

function Breadcrumb({ index, handleClick }: BreadcrumbProps) {
  return (
    <StyledBreadcrumbesWrapper>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <StyledLink
          style={{ color: index === 0 ? "black" : "inherit" }}
          onClick={() => {
            handleClick(0);
          }}
        >
          Home
        </StyledLink>
        <StyledLink
          style={{ color: index === 1 ? "black" : "inherit" }}
          onClick={() => {
            handleClick(1);
          }}
        >
          Courses
        </StyledLink>
        <StyledLink
          style={{ color: index === 2 ? "black" : "inherit" }}
          onClick={() => {
            handleClick(2);
          }}
        >
          Restrictions
        </StyledLink>
        <StyledLink
          style={{ color: index === 3 ? "black" : "inherit" }}
          onClick={() => {
            handleClick(3);
          }}
        >
          Lectures
        </StyledLink>
        <StyledLink
          style={{ color: index === 4 ? "black" : "inherit" }}
          onClick={() => {
            handleClick(4);
          }}
        >
          Labs
        </StyledLink>
        <StyledLink
          style={{ color: index === 5 ? "black" : "inherit" }}
          onClick={() => {
            handleClick(5);
          }}
        >
          Generate
        </StyledLink>
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
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
