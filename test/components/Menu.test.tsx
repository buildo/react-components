import * as React from 'react';
import { mount } from 'enzyme';
import { ActionsMenu } from '../../src/Menu';

let consoleError: jest.SpyInstance<{}>;
const consoleWarn = console.warn;

const flexViewGrowShrinkWarning = `passing both "grow" and "shrink={false}" is a no-op!`;

beforeAll(() => {
  consoleError = jest.spyOn(console, 'error');
  console.warn = jest.fn((...message) => {
    /* FlexView will emit warnings in the tests because we're passing both shrink={false} and grow
     * in the menu item template.
     * Removing grow will cause issues (e.g. with TextOverflow) so we have to keep it for now.
     * We patch console.warn in order not to pollute the test output.
     */
    if (message[0] !== flexViewGrowShrinkWarning) {
      consoleWarn(message);
    }
  });
});

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled();
});

afterAll(() => {
  console.warn = consoleWarn;
});

const exampleProps: ActionsMenu.Props = {
  options: [
    { title: 'Preferences', type: 'item' },
    { title: 'Preferences', type: 'item' }
  ]
};

describe('ActionsMenu', () => {
  it('renders correctly', () => {
    const component = mount(<ActionsMenu {...exampleProps} />);
    expect(component.html()).toMatchSnapshot();
  });

  it('triggers onClick only on options that are not disabled', () => {
    const onClickEnabled = jest.fn();
    const onClickDisabled = jest.fn();
    const component = mount(
      <ActionsMenu
        options={[
          { title: 'Preferences', type: 'item', onClick: onClickEnabled },
          {
            title: 'Preferences',
            type: 'item',
            disabled: true,
            onClick: onClickDisabled
          }
        ]}
      />
    );
    component
      .find('.menu-action')
      .at(0)
      .simulate('click');
    component
      .find('.menu-action')
      .at(1)
      .simulate('click');
    expect(onClickEnabled).toBeCalled();
    expect(onClickDisabled).not.toBeCalled();
  });
});
