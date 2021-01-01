import React from "react";
import { mount } from "enzyme";
import Courses from "../../components/Courses";
import { findTestWrapper } from "../../util/findTestWrapper";
import { Provider } from "react-redux";
import { store } from "../../App";
import { fetchData } from "../../util/__mocks__/axios";

jest.mock("../../util/__mocks__/axios");

describe("Course", () => {
  const wrapper = mount(
    <Provider store={store}>
      <Courses></Courses>
    </Provider>
  );

  const textField = wrapper.find("input");
  const addButton = findTestWrapper(wrapper, "addButton").find(
    `[className="MuiButton-label"]`
  );

  it(`can send HTTP request to server and update course list if the input course is legit`, () => {
    textField.simulate("change", { target: { value: "CPSC 221" } });
    console.log(textField.debug());
    expect(textField.text()).toBe("CPSC 221");
    addButton.simulate("click");
    process.nextTick(() => {
      const listItem = findTestWrapper(wrapper, "list-item");
      wrapper.update();
      expect(listItem.length).toBe(2);
    });
  });
});
