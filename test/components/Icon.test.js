import React from 'react';
import renderer from 'react-test-renderer';
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

  describe('getLocals', () => {

    const getLocals = Icon.prototype.getLocals;

    it('computes className', () => {
      const props = { icon: 'foo', className: 'myicon' };
      const { className } = getLocals(props);
      expect(className).toContain('icon');
      expect(className).toContain('icon-foo');
      expect(className).toContain('myicon');
    });

    it('computes color when not provided', () => {
      const props = { icon: 'foo' };
      const { style: { color } = {} } = getLocals(props);
      expect(color).toBeUndefined();
    });

    it('computes color when provided as prop', () => {
      const props = { icon: 'foo', color: 'blue' };
      const { style: { color } = {} } = getLocals(props);
      expect(color).toBe('blue');
    });

    it('computes color when provided as style', () => {
      const props = { icon: 'foo', style: { color: 'blue' } };
      const { style: { color } = {} } = getLocals(props);
      expect(color).toBe('blue');
    });

    it('overrides color form style if provided as prop', () => {
      const props = { icon: 'foo', style: { color: 'blue' }, color: 'red' };
      const { style: { color } = {} } = getLocals(props);
      expect(color).toBe('red');
    });

  });

});
