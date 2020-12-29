import React from "react";
import { mount } from "enzyme";
import Button from "../../components/Button";

describe("Button", () => {
  it("can be rendered properly", () => {
    const wrapper = mount(<Button />);
    expect(wrapper).toMatchSnapshot();
  });

  it("can be selected", () => {
    const wrapper = mount(<Button selected={true} />);
    expect(wrapper.prop("selected")).toBeTruthy();
  });

  it("can be unselected", () => {
    const wrapper = mount(<Button selected={false} />);
    expect(wrapper.prop("selected")).toBeFalsy();
  });

  it("can trigger onClick function after being clicked", () => {
    const fn = jest.fn();
    const wrapper = mount(<Button onClick={fn} />);
    wrapper.simulate("click");
    expect(fn).toHaveBeenCalledTimes(1);
    wrapper.simulate("click");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("can render content properly", () => {
    const wrapper = mount(<Button content="test" />);
    const button = wrapper.find("div");
    expect(button.text()).toEqual("test");
  });
});
