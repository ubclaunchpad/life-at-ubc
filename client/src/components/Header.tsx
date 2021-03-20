import React from "react";
import styled from "styled-components";
import { Link as BaseLink } from "react-router-dom";
import logo from "../assets/logo.svg";

const StyledHeader = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@400;600;900&family=Source+Sans+Pro:wght@300;400;600&family=Rubik:wght@300;400;500;600;700;800;900&display=swap");
  font-family: "Rubik", sans-serif;
  margin: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    display: flex;
    h1 {
      color: #333;
      font-size: 1rem;
      font-weight: 400;
      margin-left: 1rem;
      letter-spacing: 1.25px;
      text-transform: capitalize;
    }
    img {
      width: 32px;
    }
  }
`;

const Link = styled(BaseLink)`
  display: inline;
  color: inherit;
  text-decoration: none;
  text-transform: uppercase;
  transition: .3s;
  margin: auto 1.25rem;
  &:hover {
    color: #4A5EA3;
  }
  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Link to="/" className="logo" >
        <img src={logo} alt="logo" />
        <h1>Courseload</h1>
      </Link>
      <div>
        {/* TODO: revisit later */}
        {/* <Link to="/about">About</Link> */}
        <Link to="/team">Team</Link>
      </div>
    </StyledHeader>
  );
}

export default Header;
