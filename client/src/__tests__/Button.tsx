import React from "react";
import { mount } from "enzyme";
import Button from "../components/Button";
// import Enzyme from "enzyme";
// import Adapter from "enzyme-adapter-react-16";

// Enzyme.configure({ adapter: new Adapter() });

describe("Home", () => {
  it("renders properly", () => {
    const wrapper = mount(<Button />);
    expect(wrapper).toMatchSnapshot();
  });
});
