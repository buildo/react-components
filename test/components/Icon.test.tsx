import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Icon from '../../src/Icon';

describe('Icon', () => {

  it('renders correctly', () => {
    const component = renderer.create(
      <Icon icon='foo' />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders null if no icon is passed', () => {
    const component = renderer.create(
      <Icon />
    );
    expect(component.toJSON()).toBeNull();
  });

  it('renders no child when path is 1', () => {
    const component = shallow(
      <Icon icon='foo' paths={1} />
    );
    expect(component.children().length).toBe(0);
  });

  it('renders a child for each path', () => {
    const component = shallow(
      <Icon icon='foo' paths={4} />
    );
    expect(component.children().length).toBe(4);
    component.children().forEach((child, i) => {
      expect(child.prop('className')).toBe(`path${i + 1}`);
    });
  });

  it('calls onClick once when clicked', () => {
    const onClick = jest.fn();
    const component = shallow(
      <Icon icon='foo' onClick={onClick} />
    );
    component.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });


  it('computes className', () => {
    const component = shallow(
      <Icon icon='foo' className='myicon' />
    );
    expect(component.hasClass('icon')).toBe(true);
    expect(component.hasClass('icon-foo')).toBe(true);
    expect(component.hasClass('myicon')).toBe(true);
  });

  it('computes color when not provided', () => {
    const component = shallow(
      <Icon icon='foo' />
    );
    expect(component.prop('style').color).toBeUndefined();
  });

  it('computes color when provided as prop', () => {
    const component = shallow(
      <Icon icon='foo' color='blue' />
    );
    expect(component.prop('style').color).toBe('blue');
  });

  it('computes color when provided as style', () => {
    const component = shallow(
      <Icon icon='foo' style={{ color: 'blue' }} />
    );
    expect(component.prop('style').color).toBe('blue');
  });

  it('overrides color form style if provided as prop', () => {
    const component = shallow(
      <Icon icon='foo' color='red' style={{ color: 'blue' }} />
    );
    expect(component.prop('style').color).toBe('red');
  });

});
