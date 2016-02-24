import expect from 'expect';
import TimePicker, { Props } from '../../../src/time-picker';
import { newComponent } from '../helpers';


describe('TimePicker', function () {
  describe('locals', () => {

    const exampleProps = {
      minTime: { hours: 5, minutes: 10 },
      maxTime: { hours: 8, minutes: 20 }
    };

    const componentTimePicker = new TimePicker(exampleProps);

    it('should pass props', ()  => {
      const locals = componentTimePicker.getLocals();
      expect(locals).toExist();
    });
  });
});
