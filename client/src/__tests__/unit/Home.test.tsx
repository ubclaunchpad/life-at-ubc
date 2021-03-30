import React from "react";
import { mount } from "enzyme";
import Home from "../../sections/Home";
import { findTestWrapper } from "../../util/findTestWrapper";
import { Provider } from "react-redux";
import { store } from "../../App";

describe("Home", () => {
  const wrapper = mount(
    <Provider store={store}>
      <Home></Home>
    </Provider>
  );

  it("renders dropdown", () => {
    const select = findTestWrapper(wrapper, "select");
    expect(select.exists).toBeTruthy();
  });

  it("can expand dropdown when option is clicked", () => {
    const option = wrapper.find(`[role="button"]`);
    const expanded = wrapper.find(`[aria-expanded="true"]`);
    option.simulate("click");
    expect(expanded.exists).toBeTruthy();
  });
});
