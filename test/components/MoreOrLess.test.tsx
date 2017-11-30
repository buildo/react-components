import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import MoreOrLess from '../../src/MoreOrLess';

let consoleError: jest.SpyInstance<{}>;

beforeAll(() => {
  consoleError = jest.spyOn(console, 'error');
});

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled();
});

const exampleProps = {
  children: 'content',
  className: 'fancy-class-name',
  icons: {
    expanded: 'angle-up',
    collapsed: 'angle-down'
  },
  onExpandedChange: () => {}
};

const componentMore = mount(<MoreOrLess {...exampleProps} expanded={true} />);

const componentLess = mount(<MoreOrLess {...exampleProps} expanded={false} />);


describe('MoreOrLess', () => {

  it('renders correctly when expanded', () => {
    const component = renderer.create(
      <MoreOrLess {...exampleProps} expanded />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly when not expanded', () => {
    const component = renderer.create(
      <MoreOrLess {...exampleProps} expanded={false} />
    );
    expect(component).toMatchSnapshot();
  });

});
