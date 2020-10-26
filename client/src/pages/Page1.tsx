import React from "react";
import { addNumber } from "../components/store/ActionCreator";
import { connect } from "react-redux";

interface Page1Props {
  num: number;
  handelAddBtnClick: any;
}
function Page1({ num, handelAddBtnClick }: Page1Props) {
  return (
    <div>
      <div>Global state: {num}</div>
      <div>This is page1</div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          handelAddBtnClick(1);
        }}
      >
        Add one
      </div>
    </div>
  );
}

const mapState = (state: any) => {
  return {
    num: state.getIn(["reducer", "number"]),
  };
};

const mapDispatch = (dispatch: any) => ({
  handelAddBtnClick(num: number) {
    const action = addNumber(num);
    dispatch(action);
  },
});

export default connect(mapState, mapDispatch)(Page1);
