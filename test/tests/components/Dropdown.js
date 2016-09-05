import expect from 'expect';
import Dropdown from '../../../src/dropdown';
import { newComponent } from '../helpers';

describe('Dropdown', () => {

  describe('locals', () => {
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
    const componentDropdown = new Dropdown(exampleProps);

    it('should pass props', ()  => {
      const locals = componentDropdown.getLocals();
      expect(locals.id).toBe(exampleProps.id);
      expect(locals.style).toEqual(exampleProps.style);
      expect(locals.options).toEqual(exampleProps.options);
      expect(locals.fakeProp).toEqual(exampleProps.fakeProp);
    });

    it('should compute className', () => {
      const { className } = componentDropdown.getLocals();
      expect(className).toInclude('dropdown');
      expect(className).toInclude('fancy-class-name');
    });

    it('should leave object value untouched', () => {
      const { value } = componentDropdown.getLocals();
      expect(value).toBeA(Object);
      expect(value).toEqual(exampleProps.value);
    });

    it('should compute value from a string', () => {
      const dropdown = newComponent(Dropdown, {
        value: 'test',
        options: [
          { value: 'test', label: 'Test' },
          { value: 'test1', label: 'Test1' },
          { value: 'test2', label: 'Test2' }
        ]
      });
      const { value, options } = dropdown.getLocals();
      expect(value).toBeA(Object);
      expect(value).toEqual(options[0]);
    });

    it('should compute value as number', () => {
      const dropdown = newComponent(Dropdown, {
        value: 2,
        options: [
          { value: 0, label: 'Test' },
          { value: 1, label: 'Test1' },
          { value: 2, label: 'Test2' }
        ]
      });
      const { value, options } = dropdown.getLocals();
      expect(value).toBeA(Object);
      expect(value).toEqual(options[2]);
    });

  });

});
