import expect from 'expect';
import Meter from '../../../src/meter';
import { newComponent } from '../helpers';

describe('Meter', () => {
  describe('locals', () => {

    const exampleProps = {
      id: '12345',
      className: 'fancy-class-name',
      style: { margin: 10, position: 'relative' },
      value: 25,
      min: 0,
      max: 50,
      ranges: [
        { startValue: 0, endValue: 50, fillingColor: 'green', labelColor: 'red' },
        { startValue: 50, endValue: 80, fillingColor: 'yellow' },
        { startValue: 80, endValue: 100 }
      ],
      baseLabelColor: '#000000',
      baseFillingColor: '#ccc',
      labelFormatter: () => 'test'
    };

    const componentMeter = new Meter(exampleProps);

    it('should pass props', ()  => {
      const locals = componentMeter.getLocals();
      expect(locals.id).toBe(exampleProps.id);
      expect(locals.style).toEqual(exampleProps.style);
      expect(locals.value).toBe(exampleProps.value);
      expect(locals.min).toBe(exampleProps.min);
      expect(locals.max).toBe(exampleProps.max);
      expect(locals.ranges).toEqual(exampleProps.ranges);
      expect(locals.baseLabelColor).toBe(exampleProps.baseLabelColor);
      expect(locals.baseFillingColor).toBe(exampleProps.baseFillingColor);
    });

    it('should compute className', ()  => {
      const { className } = componentMeter.getLocals();
      expect(className).toInclude('meter');
      expect(className).toInclude('fancy-class-name');
    });

    it('should use labelFormatter correctly', ()  => {
      const { formattedLabel } = componentMeter.getLocals();
      expect(formattedLabel).toBe('test');
    });

    it('should compute fillingStyle correctly', ()  => {
      const { fillingStyle, ranges } = componentMeter.getLocals();
      expect(fillingStyle).toExist();
      expect(fillingStyle).toBeA(Object);
      expect(fillingStyle.backgroundColor).toBe(ranges[0].fillingColor);
    });

    it('should compute labelStyle correctly', ()  => {
      const { labelStyle, ranges } = componentMeter.getLocals();
      expect(labelStyle).toExist();
      expect(labelStyle).toBeA(Object);
      expect(labelStyle.color).toBe(ranges[0].labelColor);
    });

    it('should compute basisSize correctly', ()  => {
      const { basisSize } = componentMeter.getLocals();
      expect(basisSize).toBe('50%');
    });

    it('should compute basisSize correctly with custom min and max', ()  => {
      const meter = newComponent(Meter, {
        value: 150,
        min: 100,
        max: 200
      });
      const { basisSize } = meter.getLocals();
      expect(basisSize).toBe('50%');
    });

    it('should compute basisSize correctly for custom negative min', ()  => {
      const meter = newComponent(Meter, {
        value: 0,
        min: -100,
        max: 100
      });
      const { basisSize } = meter.getLocals();
      expect(basisSize).toBe('50%');
    });

    it('should use the correct background color for filling', ()  => {
      const meter = newComponent(Meter, {
        value: 60,
        ranges: [
          { startValue: 50, endValue: 80, fillingColor: 'yellow' }
        ]
      });
      const { fillingStyle, ranges } = meter.getLocals();
      expect(fillingStyle.backgroundColor).toBe(ranges[0].fillingColor);
    });

    it('background color should be the base color if there\'s no matching range', ()  => {
      const meter = newComponent(Meter, {
        value: 20,
        baseFillingColor: '#ccc',
        ranges: [
          { startValue: 50, endValue: 80, fillingColor: 'yellow' }
        ]
      });
      const { fillingStyle, baseFillingColor } = meter.getLocals();
      expect(fillingStyle.backgroundColor).toBe(baseFillingColor);
    });

    it('background color should be not defined if there\'s no matching range and no default is given', ()  => {
      const meter = newComponent(Meter, {
        value: 20,
        ranges: [
          { startValue: 50, endValue: 80, fillingColor: 'yellow' }
        ]
      });
      const { fillingStyle } = meter.getLocals();
      expect(fillingStyle.backgroundColor).toNotExist();
    });
  });
});
