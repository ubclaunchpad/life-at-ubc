import React from "react";
import { mount } from "enzyme";
import Restrictions from "../../components/Restrictions";
import { findTestWrapper } from "../../util/findTestWrapper";

describe("Restrictions", () => {
  const wrapper = mount(<Restrictions />);
  const buttons = findTestWrapper(wrapper, "button");

  it("renders two titles properly", () => {
    const titles = findTestWrapper(wrapper, "title");
    expect(titles.length).toBe(2);
  });

  it("render five buttons represeting five workdays", () => {
    expect(buttons.length).toBe(5);
  });

  it("does not have any selected days initially", () => {
    for (let i = 0; i < buttons.length; i++) {
      expect(buttons.at(i).prop("selected")).toBeFalsy();
    }
  });
});
