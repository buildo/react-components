import React from 'react';
import renderer from 'react-test-renderer';

import Dropdown from '../../src/dropdown';

// Because of this bug: https://github.com/facebook/react/issues/7386
// Should be fixed in react 15.4
jest.mock('react-dom');

const exampleProps = {
  id: '12345',
  className: 'fancy-class-name',
  style: { margin: 10, position: 'relative' },
  value: { value: 'test', label: 'Test', foo: 'bar' },
  fakeProp: true,
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

  describe('getLocals', () => {

    it('computes className', () => {
      const { className } = dropdown.getLocals();
      expect(className).toContain('dropdown');
      expect(className).toContain('fancy-class-name');
    });

    it('doesn\'t alter object value', () => {
      const { value } = dropdown.getLocals();
      expect(typeof value).toBe('object');
      expect(value).toEqual(exampleProps.value);
    });

    it('computes value from a string', () => {
      const dropdown = new Dropdown({
        value: 'test',
        options: [
          { value: 'test', label: 'Test' },
          { value: 'test1', label: 'Test1' },
          { value: 'test2', label: 'Test2' }
        ]
      });
      const { value, options } = dropdown.getLocals();
      expect(typeof value).toBe('object');
      expect(value).toEqual(options[0]);
    });

    it('computes value from a number', () => {
      const dropdown = new Dropdown({
        value: 2,
        options: [
          { value: 0, label: 'Test' },
          { value: 1, label: 'Test1' },
          { value: 2, label: 'Test2' }
        ]
      });
      const { value, options } = dropdown.getLocals();
      expect(typeof value).toBe('object');
      expect(value).toEqual(options[2]);
    });
  });

});
