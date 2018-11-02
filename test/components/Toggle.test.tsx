import * as React from "react";
import { mount } from "enzyme";

import Toggle from "../../src/Toggle";

let consoleError: jest.SpyInstance<{}>;

beforeAll(() => {
  consoleError = jest.spyOn(console, "error");
});

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled();
});

describe("Toggle", () => {
  it("renders correctly when off", () => {
    const component = mount(<Toggle value={false} />).debug();
    expect(component).toMatchSnapshot();
  });

  it("renders correctly when on", () => {
    const component = mount(<Toggle value={true} />).debug();
    expect(component).toMatchSnapshot();
  });

  it("calls onChange when toggled", () => {
    const onChange = jest.fn();
    const component = mount(<Toggle value={false} onChange={onChange} />);
    component.find(".toggle-button").simulate("click");
    expect(onChange).toHaveBeenLastCalledWith(true);

    component.setProps({ value: true });
    component.find(".toggle-button").simulate("click");
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it("does not call onChange when disabled", () => {
    const onChange = jest.fn();
    const component = mount(
      <Toggle value={false} onChange={onChange} disabled />
    );
    component.find(".toggle-button").simulate("click");
    expect(onChange).not.toHaveBeenCalled();
  });
});
