import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Dropdown from '../../src/Dropdown';

let consoleError: jest.SpyInstance<{}>;

beforeAll(() => {
  consoleError = jest.spyOn(console, 'error');
});

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled();
});

const exampleProps = {
  ...Dropdown.defaultProps,
  id: '12345',
  className: 'fancy-class-name',
  style: { margin: 10, position: 'relative' },
  value: { value: 'test', label: 'Test', foo: 'bar' },
  options: [
    { value: 'test', label: 'Test' },
    { value: 'test1', label: 'Test1' },
    { value: 'test2', label: 'Test2' }
  ]
};

const dropdown = new Dropdown(exampleProps);

describe('Dropdown', () => {

  it('renders correctly', () => {
    const component = renderer.create(
      <Dropdown {...exampleProps} />
    );
    expect(component).toMatchSnapshot();
  });

  it('computes className', () => {
    const component = shallow(
      <Dropdown {...exampleProps} />
    );
    expect(component.hasClass('dropdown')).toBe(true);
    expect(component.hasClass('fancy-class-name')).toBe(true);
  });

  it('doesn\'t alter object value', () => {
    const component = shallow(
      <Dropdown {...exampleProps} />
    );
    const value = component.prop('value');
    expect(typeof value).toBe('object');
    expect(value).toEqual(exampleProps.value);
  });

  it('computes value from a string', () => {
    const options = [
      { value: 'test', label: 'Test' },
      { value: 'test1', label: 'Test1' },
      { value: 'test2', label: 'Test2' }
    ];
    const component = shallow(
      <Dropdown {...Dropdown.defaultProps} value='test' options={options} />
    );
    const value = component.prop('value');
    expect(typeof value).toBe('object');
    expect(value).toEqual(options[0]);
  });

  it('computes value from a number', () => {
    const options = [
      { value: 0, label: 'Test' },
      { value: 1, label: 'Test1' },
      { value: 2, label: 'Test2' }
    ];
    const component = shallow(
      <Dropdown {...Dropdown.defaultProps} value={2} options={options} />
    );
    const value = component.prop('value');
    expect(typeof value).toBe('object');
    expect(value).toEqual(options[2]);
  });

});
