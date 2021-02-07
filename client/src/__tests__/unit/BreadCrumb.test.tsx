import React from "react";
import { mount } from "enzyme";
import BreadCrumb from "../../components/BreadCrumb";
import { findTestWrapper } from "../../util/findTestWrapper";
import { Provider } from "react-redux";
import { store } from "../../App";

describe("BreadCrumb", () => {
  const wrapper = mount(
    <Provider store={store}>
      <BreadCrumb />
    </Provider>
  );
  const links = findTestWrapper(wrapper, "link");

  it("renders 6 links", () => {
    let set = new Set<string>();
    for (let i = 0; i < links.length; i++) {
      set.add(links.at(i).text());
    }
    expect(set.size).toBe(6);
  });
});
