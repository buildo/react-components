import React from 'react';
import { mount } from 'enzyme';
import { Menu } from '../../src/DropdownMenu';

const exampleProps = {
  options: [
    { title: 'Preferences', type: 'item' },
    { title: 'Preferences', type: 'item' }
  ]
};

describe('Menu', () => {

  it('renders correctly', () => {
    const component = mount(
      <Menu {...exampleProps} />
    );
    expect(component.html()).toMatchSnapshot();
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
