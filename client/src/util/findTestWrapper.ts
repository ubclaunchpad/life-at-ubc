import Enzyme from "enzyme";
export const findTestWrapper = (wrapper: Enzyme.ReactWrapper, tag: string) => {
  return wrapper.find(`[data-test="${tag}"]`);
};
