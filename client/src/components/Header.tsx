import React, { useState } from "react";
import styled from "styled-components";
import { Link as BaseLink } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/MenuRounded";
import logo from "../assets/logo.svg";

const NavBar = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@400;600;900&family=Source+Sans+Pro:wght@300;400;600&family=Rubik:wght@300;400;500;600;700;800;900&display=swap");
  font-family: "Rubik", sans-serif;
  padding: 2rem;
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
  @media (max-width: 425px) {
    nav {
      display: none;
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
  @media (max-width: 425px) {
    text-align: center;
    display: block;
    padding: .5rem;
  }
`;

const Hamburger = ({ toggle }: any) => (
  <IconButton aria-label="menu" onClick={toggle}>
    <MenuIcon/>
  </IconButton>
);

function Header() {
  const mobile = useMediaQuery("(max-width:425px)");
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev: boolean) => !prev);
  return (
    <>
      <NavBar>
        <Link to="/" className="logo" >
          <img src={logo} alt="logo" />
          <h1>Courseload</h1>
        </Link>
        <nav className="bar">
          <Link to="/schedule">Schedule</Link>
          <Link to="/team">Team</Link>
        </nav>
        {mobile && <Hamburger toggle={toggle} />}
      </NavBar>
      {mobile && open && (
        <nav className="list">
          <Link to="/schedule">Schedule</Link>
          <Link to="/team">Team</Link>
        </nav>
      )}
    </>
  );
}

export default Header;
