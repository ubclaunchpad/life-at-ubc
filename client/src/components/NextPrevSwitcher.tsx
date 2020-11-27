import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { SWITCHCOMPONENT, Switch } from "../actions/HomeActions";
import Section from "./Section";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: "#FFF",
      margin: theme.spacing(1),
    },
  })
);

interface SwitcherProps {
  index?: number;
  handleBtnClick?: any;
}

function NextPrevSwitcher({ index, handleBtnClick }: SwitcherProps) {
  const classes = useStyles();
  return (
    <Section>
      {index !== 0 && (
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ArrowBack />}
          onClick={() => {
            handleBtnClick((index as number) - 1);
          }}
        >Prev</Button>
      )}
      {index !== 5 && (
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          endIcon={<ArrowForward />}
          onClick={() => {
            handleBtnClick((index as number) + 1);
          }}
        >Next</Button>
      )}
    </Section>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    index: state.HomeReducer.componentIndex,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleBtnClick(index: any) {
      const action: Switch = { type: SWITCHCOMPONENT, index };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NextPrevSwitcher);
