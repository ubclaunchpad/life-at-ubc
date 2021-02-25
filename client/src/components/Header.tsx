import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SWITCHCOMPONENT, Switch } from "../actions/HomeActions";
import logo from "../assets/logo.svg";

const StyledHeader = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@400;600;900&family=Source+Sans+Pro:wght@300;400;600&display=swap");
  font-family: "Source Sans Pro", sans-serif;
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
  margin-right: 30px;
  text-decoration: none;
`;

function Header() {
  return (
    <StyledHeader>
      <img src={logo} className="logo" alt="logo" />
      <div className="right">
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/degnav">Degree Navigator</StyledLink>
        <StyledLink to="/allcourses">Courses</StyledLink>
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
    handleClick(index: number) {
      const action: Switch = { type: SWITCHCOMPONENT, index };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
