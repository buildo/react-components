import * as React from "react";
import * as renderer from "react-test-renderer";
import { shallow } from "enzyme";

import Badge from "../../src/Badge";

let consoleError: jest.SpyInstance<{}>;

beforeAll(() => {
  consoleError = jest.spyOn(console, "error");
});

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled();
});

describe("Badge", () => {
  it("renders correctly", () => {
    const component = renderer.create(<Badge label="42" />);
    expect(component).toMatchSnapshot();
  });

  it("computes className", () => {
    const badge = shallow(<Badge label={42} className="awesome-class" />);
    expect(badge.hasClass("badge")).toBe(true);
    expect(badge.hasClass("awesome-class")).toBe(true);
    expect(!badge.hasClass("active")).toBe(true);
  });

  it("computes className when active", () => {
    const badge = shallow(
      <Badge label={42} className="awesome-class" active={true} />
    );
    expect(badge.hasClass("badge")).toBe(true);
    expect(badge.hasClass("awesome-class")).toBe(true);
    expect(badge.hasClass("active")).toBe(true);
  });
});
