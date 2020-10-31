import React, { useState } from "react";
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import Title from "./Title";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";

const StyledSession = styled.div`
  margin-top: 80px;
  text-align: center;
`;

const Space = styled.div`
  height: 30px;
`;

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  })
);

const sessions = ["2020W", "2020S", "2021W"];

const terms = ["Term 1", "Term 2"];

function Home() {
  const classes = useStyles();
  const [session, setSession] = useState("");
  const [term, setTerm] = useState("");

  const handleSessionChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSession(event.target.value as string);
  };

  const handleTermChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTerm(event.target.value as string);
  };

  return (
    <StyledSession>
      <Title title="1. Choose session and term"></Title>
      <Space></Space>
      <FormControl style={{ width: 430 }} className={classes.margin}>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={session}
          onChange={handleSessionChange}
          input={<BootstrapInput />}
        >
          {sessions.map((session, index) => {
            return <MenuItem value={index}>{session}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <Space></Space>
      <div>
        <FormControl style={{ width: 430 }} className={classes.margin}>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={term}
            onChange={handleTermChange}
            input={<BootstrapInput />}
          >
            {terms.map((term, index) => {
              return <MenuItem value={index}>{term}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
    </StyledSession>
  );
}

export default Home;
