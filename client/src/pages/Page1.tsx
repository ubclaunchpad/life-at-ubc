import React from "react";
import { connect } from "react-redux";

interface Page1Props {
  num?: string;
}
function Page1({ num }: Page1Props) {
  return (
    <div>
      <div>Global state: {num}</div>
      <div>This is page1</div>
    </div>
  );
}

const mapState = (state: any) => {
  return {
    num: state.getIn(["reducer", "number"]),
  };
};

export default connect(mapState, null)(Page1);
