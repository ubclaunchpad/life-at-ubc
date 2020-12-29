import React from "react";
import { mount } from "enzyme";
import Home from "../components/Home";

describe("Home", () => {
  it("renders properly", () => {
    const wrapper = mount(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});
