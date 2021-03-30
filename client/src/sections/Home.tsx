import React, { useState, useEffect } from "react";
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import Title from "../components/Title";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import Slide from "@material-ui/core/Slide";
import { SELECTTERM, SelectTerm } from "../actions/HomeActions";
import { Dispatch } from "redux";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      "borderRadius": 4,
      "position": "relative",
      "backgroundColor": theme.palette.background.paper,
      "border": "1px solid #ced4da",
      "fontSize": 16,
      "padding": "10px 26px 10px 12px",
      "transition": theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      "fontFamily": [
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

interface HomeProps {
  selectedTerm: string;
  updateTermToRedux: any;
}

function Home({ selectedTerm, updateTermToRedux }: HomeProps) {
  const [loaded, setLoaded] = useState(false);
  const terms = ["Term 1", "Term 2"];
  const classes = useStyles();

  const handleTermChange = (event: any) => {
    if (event.target.value === 0) {
      updateTermToRedux("1");
    } else {
      updateTermToRedux("2");
    }
  };

  useEffect(() => setLoaded(true), []);

  return (
    <>
      <Title title="1. Choose Term"/>
      <Slide direction="left" in={loaded}>
        <FormControl style={{ width: 430 }} className={classes.margin}>
          <Select
            value={!selectedTerm || selectedTerm === "1" ? 0 : 1}
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            onChange={handleTermChange}
            input={<BootstrapInput />}
            data-test="select"
          >
            {terms.map((term, index) => {
              return (
                <MenuItem value={index} key={index} data-test="option">
                  {term}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Slide>
    </>
  );
}

const mapState = (state: RootState) => {
  return {
    selectedTerm: state.HomeReducer.term,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateTermToRedux(term: string) {
      const action: SelectTerm = {
        type: SELECTTERM,
        term,
      };
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(Home);
