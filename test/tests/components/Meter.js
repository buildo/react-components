import expect from 'expect';
import Meter from '../../../src/meter';

const exampleProps = {
  id: '12345',
  className: 'fancy-class-name',
  style: { margin: 10, position: 'relative' },
  value: 20,
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
  it('should exist', () => {
    expect(componentMeter).toExist();
  });
  it('should be an Object', () => {
    expect(componentMeter).toBeA(Object);
  });
  it('should be a Meter Component', () => {
    expect(componentMeter).toBeA(Meter);
  });
  describe('locals', () => {
    it('should compute id', ()  => {
      const { id: idMeter } = componentMeter.getLocals();
      expect(idMeter).toExist();
      expect(idMeter).toBeA('string');
      expect(idMeter).toBe('12345');
    });
    it('should compute className', ()  => {
      const { className: classNameMeter } = componentMeter.getLocals();
      expect(classNameMeter).toExist();
      expect(classNameMeter).toBeA('string');
      expect(classNameMeter).toBe('meter fancy-class-name');
    });
    it('should compute style', ()  => {
      const { style: styleMeter } = componentMeter.getLocals();
      expect(styleMeter).toExist();
      expect(styleMeter).toBeA(Object);
      expect(styleMeter.margin).toBe(10);
      expect(styleMeter.position).toBe('relative');
    });
    it('should compute value', ()  => {
      const { value: valueMeter } = componentMeter.getLocals();
      expect(valueMeter).toBeA('number');
      expect(valueMeter).toBe(20);
    });
    it('should compute min', ()  => {
      const { min: minMeter } = componentMeter.getLocals();
      expect(minMeter).toBeA('number');
      expect(minMeter).toBe(0);
    });
    it('should compute max', ()  => {
      const { max: maxMeter } = componentMeter.getLocals();
      expect(maxMeter).toBeA('number');
      expect(maxMeter).toBe(50);
    });
    it('should compute ranges', ()  => {
      const { ranges: rengesMeter } = componentMeter.getLocals();
      expect(rengesMeter).toExist();
      expect(rengesMeter).toBeA(Array);
      expect(rengesMeter.length).toBe(3);
      expect(rengesMeter[0]).toBeA(Object);
      expect(rengesMeter[0].startValue).toBeA('number');
      expect(rengesMeter[0].endValue).toBeA('number');
      expect(rengesMeter[0].fillingColor).toBeA('string');
      expect(rengesMeter[0].labelColor).toBeA('string');
    });
    it('should compute baseLabelColor', ()  => {
      const { baseLabelColor: baseLabelColorMeter } = componentMeter.getLocals();
      expect(baseLabelColorMeter).toExist();
      expect(baseLabelColorMeter).toBeA('string');
      expect(baseLabelColorMeter).toBe('#000000');
    });
    it('should compute baseFillingColor', ()  => {
      const { baseFillingColor: baseFillingColorMeter } = componentMeter.getLocals();
      expect(baseFillingColorMeter).toExist();
      expect(baseFillingColorMeter).toBeA('string');
      expect(baseFillingColorMeter).toBe('#ccc');
    });
    it('should compute labelFormatter', ()  => {
      const { labelFormatter: labelFormatterMeter } = componentMeter.getLocals();
      expect(labelFormatterMeter).toExist();
      expect(labelFormatterMeter).toBeA('function');
      expect(labelFormatterMeter()).toBe('test');
    });
    it('should compute fillingStyle', ()  => {
      const { fillingStyle: fillingStyleMeter, ranges, value } = componentMeter.getLocals();
      expect(fillingStyleMeter).toExist();
      expect(fillingStyleMeter).toBeA(Object);
      if (value >= ranges[0].startValue && value <= ranges[0].endValue){
        expect(fillingStyleMeter.backgroundColor).toBe(ranges[0].fillingColor);
      }
    });
    it('should compute labelStyle', ()  => {
      const { labelStyle: labelStyleMeter, ranges, value } = componentMeter.getLocals();
      expect(labelStyleMeter).toExist();
      expect(labelStyleMeter).toBeA(Object);
      if (value >= ranges[0].startValue && value <= ranges[0].endValue){
        expect(labelStyleMeter.color).toBe(ranges[0].labelColor);
      }
    });
    it('should compute basisSize', ()  => {
      const { basisSize: basisSizeMeter, ranges, value, min, max } = componentMeter.getLocals();
      expect(basisSizeMeter).toExist();
      expect(basisSizeMeter).toBeA('string');
      expect(basisSizeMeter).toBe(`${Math.abs((value - min) * 100 / (max - min))}%`);
    });
  });
});
