import React from "react";
import styled from "styled-components";
import { SWITCHCOMPONENT, Switch } from "../actions/HomeActions";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import MuiLink from "@material-ui/core/Link";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const steps = [
  { step: 0, title: "Home" },
  { step: 1, title: "Courses" },
  { step: 2, title: "Restrictions" },
  { step: 3, title: "Lectures" },
  { step: 4, title: "Labs" },
  { step: 5, title: "Generate" },
];

const StyledBreadcrumbesWrapper = styled.div`
  max-width: 768px;
  margin: 46px auto 40px;
`;

interface BreadcrumbProps {
  index?: number;
  handleClick?: any;
}

function Breadcrumb({ index, handleClick }: BreadcrumbProps) {
  const Link = ({ title }: any) => (
    <MuiLink>{title}</MuiLink>
  );
  const StyledLink = styled(Link).attrs(({ step }: any) => ({
    style: { color: index === step ? "orange" : "inherit" },
    onClick: () => handleClick(step)
  }))`
    cursor: pointer;
  `;

  return (
    <StyledBreadcrumbesWrapper>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {steps.map((props) => <StyledLink {...props} />)}
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
