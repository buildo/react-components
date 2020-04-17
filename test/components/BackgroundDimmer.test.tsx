import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { BackgroundDimmer } from '../../src/Modal/BackgroundDimmer';

const content = <div className="content">content</div>;

let consoleError: jest.SpyInstance<{}>;

beforeAll(() => {
  consoleError = jest.spyOn(console, 'error');
});

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled();
});

describe('BackgroundDimmer', () => {
  it('renders correctly', () => {
    const component = renderer.create(<BackgroundDimmer>{content}</BackgroundDimmer>);
    expect(component).toMatchSnapshot();
  });

  it('invokes the callback when the background is clicked', () => {
    const onClickOutside = jest.fn();
    const dimmer = shallow(
      <BackgroundDimmer onClickOutside={onClickOutside}>{content}</BackgroundDimmer>
    );
    dimmer.find('.main-content-wrapper').simulate('click');
    expect(onClickOutside).toBeCalled();
  });

  it("doesn't invoke the callback when the content is clicked", () => {
    const onClickOutside = jest.fn();
    const dimmer = shallow(
      <BackgroundDimmer onClickOutside={onClickOutside}>{content}</BackgroundDimmer>
    );
    dimmer.find('.content').simulate('click');
    expect(onClickOutside).not.toBeCalled();
  });
});
