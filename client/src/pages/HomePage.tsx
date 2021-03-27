import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import MuiButton from "@material-ui/core/Button";
import styled from "styled-components";

const Section = styled.div`
  font-family: 'Rubik', sans-serif;
  margin-left: 16vw;
  margin-top: 32vh;
  font-weight: 300;
  h1 {
    margin: 0;
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: .5rem;
  }
  a {
    color: inherit;
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
  }
  p {
    margin: 0;
    .sm {
      letter-spacing: 1px;
    }
    .md {
      font-size: 1.25rem;
    }
  }
  @media (max-width: 425px) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

const Button = withStyles({
  root: {
    color: "white",
    margin: "3rem .5rem 0 0",
  }
})(({ text, ...props }: any) => (
  <MuiButton variant="contained" color="secondary" disableElevation {...props}>{text}</MuiButton>
));

function HomePage() {
  return (
    <Section>
      <p className="sm">Welcome to</p>
      <h1>Courseload</h1>
      <p className="md">Course scheduling, made easier!</p>
      <Link to="schedule"><Button text="Get Started"/></Link>
    </Section>
  );
}

export default HomePage;
