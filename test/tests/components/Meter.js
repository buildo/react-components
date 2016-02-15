import expect from 'expect';
import Meter, { Props } from '../../../src/meter';
import { newComponent } from '../helpers';

describe('Meter', function () {
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

    const componentMeter = new Meter({
      ...exampleProps
    });

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
      const { className } = componentMeter.getLocals();
      expect(className).toInclude('meter');
      expect(className).toInclude('fancy-class-name')
    });
    it('should compute labelFormatter', ()  => {
      const { formattedLabel } = componentMeter.getLocals();
      expect(formattedLabel).toBe('test');
    });
    it('should compute fillingStyle', ()  => {
      const { fillingStyle, ranges } = componentMeter.getLocals();
      expect(fillingStyle).toExist();
      expect(fillingStyle).toBeA(Object);
      expect(fillingStyle.backgroundColor).toBe(ranges[0].fillingColor);
    });
    it('should compute labelStyle', ()  => {
      const { labelStyle, ranges } = componentMeter.getLocals();
      expect(labelStyle).toExist();
      expect(labelStyle).toBeA(Object);
      expect(labelStyle.color).toBe(ranges[0].labelColor);
    });
    it('should compute basisSize', ()  => {
      const { basisSize } = componentMeter.getLocals();
      expect(basisSize).toBe('50%');
    });
    it('should compute basisSize for custom min-max', ()  => {
      const meter = newComponent(Meter, {
        value: 150,
        min: 100,
        max: 200
      });
      const { basisSize } = meter.getLocals();
      expect(basisSize).toBe('50%');
    });
    it('should compute basisSize for custom negative min', ()  => {
      const meter = newComponent(Meter, {
        value: 0,
        min: -100,
        max: 100
      });
      const { basisSize } = meter.getLocals();
      expect(basisSize).toBe('50%');
    });
    it('should compute basisSize for decimal value', ()  => {
      const meter = newComponent(Meter, {
        value: 0.5,
        min: 0,
        max: 1
      });
      const { basisSize } = meter.getLocals();
      expect(basisSize).toBe('50%');
    });
    it('should compute basisSize for decimal min-max', ()  => {
      const meter = newComponent(Meter, {
        value: 2.5,
        min: 1.5,
        max: 3.5
      });
      const { basisSize } = meter.getLocals();
      expect(basisSize).toBe('50%');
    });
    it('should compute ranges with holes', ()  => {
      const meter = newComponent(Meter, {
        value: 60,
        ranges: [
          { startValue: 50, endValue: 80, fillingColor: 'yellow' }
        ]
      });
      const { fillingStyle, ranges } = meter.getLocals();
      expect(fillingStyle.backgroundColor).toBe(ranges[0].fillingColor);
    });
    it('should compute ranges with holes and baseFillingColor not defined', ()  => {
      const meter = newComponent(Meter, {
        value: 20,
        ranges: [
          { startValue: 50, endValue: 80, fillingColor: 'yellow' }
        ]
      });
      const { fillingStyle } = meter.getLocals();
      //console.log(meter.logWarnings());
      expect(fillingStyle.backgroundColor).toNotExist();
    });
    it('should compute ranges with holes and setted baseFillingColor', ()  => {
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
    it('should compute ranges without holes and setted baseFillingColor', ()  => {
      const meter = newComponent(Meter, {
        value: 20,
        baseFillingColor: '#ccc',
        ranges: [
          { startValue: 0, endValue: 50, fillingColor: 'green', labelColor: 'red' },
          { startValue: 50, endValue: 80, fillingColor: 'yellow' },
          { startValue: 80, endValue: 100 }
        ]
      });
      const { fillingStyle, labelStyle, baseFillingColor, ranges } = meter.getLocals();
      expect(fillingStyle.backgroundColor).toNotBe(baseFillingColor);
      expect(fillingStyle.backgroundColor).toBe(ranges[0].fillingColor);
      expect(labelStyle.color).toBe(ranges[0].labelColor);
    });
    it('should compute ranges without holes using defaults', ()  => {
      const meter = newComponent(Meter, {
        value: 20,
        ranges: [
          { startValue: 0, endValue: 50 },
          { startValue: 50, endValue: 80 },
          { startValue: 80, endValue: 100 }
        ]
      });
      const { fillingStyle, labelStyle, baseFillingColor, ranges } = meter.getLocals();
      expect(fillingStyle.backgroundColor).toNotExist();
      expect(labelStyle.color).toNotExist();
    });
  });
});
