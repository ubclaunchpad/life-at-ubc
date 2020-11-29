import React from "react";
import styled from "styled-components";
import MuiLink from "@material-ui/core/Link";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SWITCHCOMPONENT, Switch } from "../actions/HomeActions";
import logo from "../assets/logo.svg";

const Link = ({ href, text }: any) => (
  <MuiLink href={href}>
    <span style={{ marginRight: 30 }}>{text}</span>
  </MuiLink>
);

const StyledHeader = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@400;600;900&family=Source+Sans+Pro:wght@300;400;600&display=swap');
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 300;
  display: flex;
  max-width: 1024px;
  min-height: 100px;
  margin-left: auto;
  margin-right: auto;
  line-height: 100px;
  justify-content: space-between;
  text-transform: uppercase;
  img.logo {
    max-width: 15vw;
  }
  .right {
    font-size: 1rem;
    float: right;
  }
`;

const StyledLink = styled(Link)`
  color: black;
  cursor: pointer;
`;

interface NavBarProps {
  index?: number;
  handleClick?: any;
}

function Header({ index, handleClick }: NavBarProps) {
  return (
    <StyledHeader>
      <img src={logo} className="logo" alt="logo"/>
      <div className="right">
        <StyledLink href="/" text="Home"/>
        <StyledLink href="/degnav" text="Degree Navigator"/>
        <StyledLink href="/allcourses" text="Courses"/>
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
