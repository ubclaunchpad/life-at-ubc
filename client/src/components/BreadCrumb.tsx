import React from "react";
import styled from "styled-components";
import { SWITCHCOMPONENT, Switch } from "../actions/HomeActions";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import MuiLink from "@material-ui/core/Link";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";

var latestState = 0;

const steps = [
  { step: 0, title: "Home" },
  { step: 1, title: "Courses" },
  { step: 2, title: "Restrictions" },
  { step: 3, title: "Lectures" },
  { step: 4, title: "Labs" },
  { step: 5, title: "Generate" },
];

const StyledBreadcrumbesWrapper = styled.div`
  width: fit-content;
  margin: 46px auto 40px;
`;

const Link = ({ title, ...props }: any) => (
  <MuiLink {...props}>{title}</MuiLink>
);

const StyledLink = styled(Link)`
  cursor: pointer;
  font-weight: ${({ selected }) => (selected ? 600 : 300)};
  opacity: ${({ grayed }) => (grayed ? 0.3 : 1)};
`;

interface BreadcrumbProps {
  index?: number;
  handleClick: (index: number) => void;
}

function Breadcrumb({ index, handleClick }: BreadcrumbProps) {
  return (
    <StyledBreadcrumbesWrapper>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {steps.map(({ step, ...props }, i) => (
          <StyledLink
            key={i}
            selected={step === index}
            grayed={index !== undefined && step > latestState}
            onClick={() => handleClick(step)}
            {...props}
            data-test="link"
          />
        ))}
      </Breadcrumbs>
    </StyledBreadcrumbesWrapper>
  );
}

const mapStateToProps = (state: RootState) => {
  if (state.HomeReducer.componentIndex >= latestState) {
    latestState = state.HomeReducer.componentIndex;
  }
  return {
    index: state.HomeReducer.componentIndex,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleClick(index: number) {
      const action: Switch = { type: SWITCHCOMPONENT, index };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
