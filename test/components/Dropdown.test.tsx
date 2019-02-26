import * as React from "react";
import * as renderer from "react-test-renderer";
import { shallow } from "enzyme";

import Dropdown from "../../src/Dropdown";

let consoleError: jest.SpyInstance<{}>;

beforeAll(() => {
  consoleError = jest.spyOn(console, "error");
});

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled();
});

const exampleProps: Dropdown.Props = {
  id: "12345",
  className: "fancy-class-name",
  style: { margin: 10, position: "relative" },
  value: { value: "test", label: "Test", foo: "bar" },
  options: [
    { value: "test", label: "Test" },
    { value: "test1", label: "Test1" },
    { value: "test2", label: "Test2" }
  ],
  onChange: () => {}
};

describe("Dropdown", () => {
  it("renders correctly", () => {
    const component = renderer.create(<Dropdown {...exampleProps} />);
    expect(component).toMatchSnapshot();
  });

  it("computes className", () => {
    const component = shallow(<Dropdown {...exampleProps} />);
    expect(component.hasClass("dropdown")).toBe(true);
    expect(component.hasClass("fancy-class-name")).toBe(true);
  });

  it("doesn't alter object value", () => {
    const component = shallow(<Dropdown {...exampleProps} />);
    const value = component.prop("value");
    expect(typeof value).toBe("object");
    expect(value).toEqual(exampleProps.value);
  });
});
