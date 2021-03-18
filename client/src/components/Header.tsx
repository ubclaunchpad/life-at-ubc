import React from "react";
import styled from "styled-components";
import { Link as BaseLink } from "react-router-dom";
import logo from "../assets/logo.svg";

const StyledHeader = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@400;600;900&family=Source+Sans+Pro:wght@300;400;600&family=Rubik:wght@300;400;500;600;700;800;900&display=swap");
  font-family: "Rubik", sans-serif;
  display: flex;
  margin: 2rem;
  h1 {
    color: #333;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 1.25px;
    margin-left: 1rem;
    text-transform: uppercase;
  }
  a {
    text-decoration: none;
  }
  img.logo {
    width: 32px;
  }
`;

const Link = styled(BaseLink)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <img src={logo} className="logo" alt="logo" />
        <h1>Courseload</h1>
      </Link>
      <>
        <Link to="/about">About</Link>
        <Link to="/team">Team</Link>
      </>
    </StyledHeader>
  );
}

export default Header;
