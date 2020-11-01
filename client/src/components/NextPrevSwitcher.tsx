import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { SWITCHCOMPONENT, Switch } from "../actions/HomeActions";
import { RootState } from "../reducers/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

const SectionWrapper = styled.div`
  margin-top: 30px;
  text-align: center;
`;

interface SwitcherProps {
  index?: number;
  handlePrevBtnClick?: any;
  handleNextBtnClick?: any;
}

function NextPrevSwitcher({
  index,
  handlePrevBtnClick,
  handleNextBtnClick,
}: SwitcherProps) {
  const classes = useStyles();
  return (
    <SectionWrapper>
      {index !== 0 && (
        <Button
          variant="contained"
          style={{ backgroundColor: "black" }}
          color="primary"
          className={classes.button}
          startIcon={<ArrowBack />}
          onClick={() => {
            handlePrevBtnClick((index as number) - 1);
          }}
        ></Button>
      )}
      {index !== 5 && (
        <Button
          variant="contained"
          style={{ backgroundColor: "black" }}
          color="primary"
          className={classes.button}
          endIcon={<ArrowForward />}
          onClick={() => {
            handlePrevBtnClick((index as number) + 1);
          }}
        ></Button>
      )}
    </SectionWrapper>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    index: state.HomeReducer.componentIndex,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handlePrevBtnClick(index: any) {
      const action: Switch = { type: SWITCHCOMPONENT, index };
      dispatch(action);
    },
    handleNextBtnClick(index: any) {
      const action: Switch = { type: SWITCHCOMPONENT, index };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NextPrevSwitcher);
