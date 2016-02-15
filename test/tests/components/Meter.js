import expect from 'expect';
import Meter from '../../../src/meter';

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

const componentMeter = new Meter({
  ...exampleProps
});

describe('Meter', function () {
  describe('locals', () => {
    it('should pass props', ()  => {
      const {
        id,
        style,
        value,
        min,
        max,
        ranges,
        baseLabelColor,
        baseFillingColor
      } = componentMeter.getLocals();
      expect(id).toBe(exampleProps.id);
      expect(style).toEqual(exampleProps.style);
      expect(value).toBe(exampleProps.value);
      expect(min).toBe(exampleProps.min);
      expect(max).toBe(exampleProps.max);
      expect(ranges).toEqual(exampleProps.ranges);
      expect(baseLabelColor).toBe(baseLabelColor);
      expect(baseFillingColor).toBe(baseFillingColor);
    });
    it('should compute className', ()  => {
      const { className: classNameMeter } = componentMeter.getLocals();
      expect(classNameMeter.includes('meter')).toExist();
      expect(classNameMeter.includes('fancy-class-name')).toExist();
    });
    it('should compute labelFormatter', ()  => {
      const { formattedLabel } = componentMeter.getLocals();
      expect(formattedLabel).toBe('test');
    });
    it('should compute fillingStyle', ()  => {
      const { fillingStyle: fillingStyleMeter, ranges } = componentMeter.getLocals();
      expect(fillingStyleMeter).toExist();
      expect(fillingStyleMeter).toBeA(Object);
      expect(fillingStyleMeter.backgroundColor).toBe(ranges[0].fillingColor);
    });
    it('should compute labelStyle', ()  => {
      const { labelStyle: labelStyleMeter, ranges} = componentMeter.getLocals();
      expect(labelStyleMeter).toExist();
      expect(labelStyleMeter).toBeA(Object);
      expect(labelStyleMeter.color).toBe(ranges[0].labelColor);
    });
    it('should compute basisSize', ()  => {
      const { basisSize: basisSizeMeter } = componentMeter.getLocals();
      expect(basisSizeMeter).toExist();
      expect(basisSizeMeter).toBeA('string');
      expect(basisSizeMeter).toBe('50%');
    });
  });
});
