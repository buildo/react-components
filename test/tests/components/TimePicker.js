import expect from 'expect';
import TimePicker, { Props } from '../../../src/time-picker';
import { newComponent } from '../helpers';


describe('TimePicker', function () {
  describe('locals', () => {

    const exampleProps = {};

    const componentTimePicker = new TimePicker(exampleProps);

    it('should pass props', ()  => {
      const locals = componentTimePicker.getLocals();
      expect(locals).toExist();
    });
  });
});
