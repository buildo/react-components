import React from 'react';
// import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Menu } from '../../src/DropdownMenu';

const exampleProps = {
  options: [
    { title: 'Preferences', type: 'item' },
    { title: 'Preferences', type: 'item' }
  ]
};

describe('Menu', () => {

  // ignored because react-test-renderer cannot co-exist with enzyme
  // because of this bug: https://github.com/facebook/react/issues/7386
  // Should be fixed in react 15.4
  xit('renders correctly', () => {
    const component = renderer.create( // eslint-disable-line no-undef
      <Menu {...exampleProps} />
    );
    expect(component).toMatchSnapshot();
  });

  it('triggers onClick only on options that are not disabled', () => {
    const onClickEnabled = jest.fn();
    const onClickDisabled = jest.fn();
    const component = mount(
      <Menu options={[
        { title: 'Preferences', type: 'item', onClick: onClickEnabled },
        { title: 'Preferences', type: 'item', disabled: true, onClick: onClickDisabled }
      ]}
      />
    );
    component.find('.menu-item').at(0).simulate('click');
    component.find('.menu-item').at(1).simulate('click');
    expect(onClickEnabled).toBeCalled();
    expect(onClickDisabled).not.toBeCalled();
  });

});
