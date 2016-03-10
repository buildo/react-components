import expect from 'expect';
import Dropdown, { Props } from '../../../src/dropdown';
import { newComponent } from '../helpers';

describe('Dropdown', function () {

  describe('locals', () => {
    const exampleProps = {
      id: '12345',
      className: 'fancy-class-name',
      style: { margin: 10, position: 'relative' }
    };
    const componentDropdown = new Dropdown(exampleProps);

    it('should pass props', ()  => {
      const locals = componentDropdown.getLocals();
      expect(locals.id).toBe(exampleProps.id);
      expect(locals.style).toEqual(exampleProps.style);
    });

    it('should compute className', () => {
      const { className } = componentDropdown.getLocals();
      expect(className).toInclude('dropdown');
      expect(className).toInclude('fancy-class-name');
    });

  });

});
