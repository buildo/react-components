import React from 'react';
import renderer from 'react-test-renderer';

import Meter from '../../src/Meter';

const exampleProps = {
  ...Meter.defaultProps,
  id: '12345',
  className: 'fancy-class-name',
  style: { margin: 10, position: 'relative' },
  value: 25,
  min: 0,
  max: 50,
  ranges: [
    { startValue: 0, endValue: 50, fillingColor: 'green', labelColor: 'red', backgroundColor: 'grey' },
    { startValue: 50, endValue: 80, fillingColor: 'yellow' },
    { startValue: 80, endValue: 100 }
  ],
  baseLabelColor: '#000000',
  baseFillingColor: '#ccc',
  labelFormatter: () => 'test'
};

const meter = new Meter(exampleProps);

describe('Meter', () => {

  it('renders correctly', () => {
    const component = renderer.create(
      <Meter {...exampleProps} />
    );
    expect(component).toMatchSnapshot();
  });

  describe('getLocals', () => {

    it('computes className', () => {
      const { className } = meter.getLocals();
      expect(className).toContain('meter');
      expect(className).toContain('fancy-class-name');
    });

    it('uses labelFormatter', () => {
      const { formattedLabel } = meter.getLocals();
      expect(formattedLabel).toBe('test');
    });

    it('computes barStyle', () => {
      const { barStyle, ranges } = meter.getLocals();
      expect(barStyle.backgroundColor).toBe(ranges[0].backgroundColor);
    });

    it('computes fillingStyle', () => {
      const { fillingStyle, ranges } = meter.getLocals();
      expect(fillingStyle.backgroundColor).toBe(ranges[0].fillingColor);
    });

    it('computes labelStyle', () => {
      const { labelStyle, ranges } = meter.getLocals();
      expect(labelStyle.color).toBe(ranges[0].labelColor);
    });

    it('computes basisSize', () => {
      const { basisSize } = meter.getLocals();
      expect(basisSize).toBe('50%');
    });

    it('computes basisSize with custom min and max', () => {
      const meter = new Meter({
        ...Meter.defaultProps,
        value: 150,
        min: 100,
        max: 200,
        labelFormatter: () => 'test'
      });
      const { basisSize } = meter.getLocals();
      expect(basisSize).toBe('50%');
    });

    it('computes basisSize for custom negative min', () => {
      const meter = new Meter({
        ...Meter.defaultProps,
        value: 0,
        min: -100,
        max: 100,
        labelFormatter: () => 'test'
      });
      const { basisSize } = meter.getLocals();
      expect(basisSize).toBe('50%');
    });

    it('computes background color for filling', () => {
      const meter = new Meter({
        ...Meter.defaultProps,
        value: 60,
        ranges: [
          { startValue: 50, endValue: 80, fillingColor: 'yellow' }
        ],
        labelFormatter: () => 'test'
      });
      const { fillingStyle, ranges } = meter.getLocals();
      expect(fillingStyle.backgroundColor).toBe(ranges[0].fillingColor);
    });

    it('defaults to the base color as background color if there\'s no matching range', () => {
      const meter = new Meter({
        ...Meter.defaultProps,
        value: 20,
        baseFillingColor: '#ccc',
        ranges: [
          { startValue: 50, endValue: 80, fillingColor: 'yellow' }
        ],
        labelFormatter: () => 'test'
      });
      const { fillingStyle, baseFillingColor } = meter.getLocals();
      expect(fillingStyle.backgroundColor).toBe(baseFillingColor);
    });

    it('doesn\'t define a background color if there\'s no matching range and no default is given', () => {
      const meter = new Meter({
        ...Meter.defaultProps,
        value: 20,
        ranges: [
          { startValue: 50, endValue: 80, fillingColor: 'yellow' }
        ],
        labelFormatter: () => 'test'
      });
      const { fillingStyle } = meter.getLocals();
      expect(fillingStyle.backgroundColor).toBeUndefined();
    });

    it('defaults to base color as bar background color should if there\'s no matching range', () => {
      const meter = new Meter({
        ...Meter.defaultProps,
        value: 20,
        baseBackroundColor: '#ccc',
        ranges: [
          { startValue: 50, endValue: 80, backgroundColor: 'yellow' }
        ],
        labelFormatter: () => 'test'
      });
      const { barStyle, baseBackgroundColor } = meter.getLocals();
      expect(barStyle.backgroundColor).toBe(baseBackgroundColor);
    });

    it('doesn\'t define a bar background color if there\'s no matching range and no default is given', () => {
      const meter = new Meter({
        ...Meter.defaultProps,
        value: 20,
        ranges: [
          { startValue: 50, endValue: 80, backgroundColor: 'yellow' }
        ],
        labelFormatter: () => 'test'
      });
      const { barStyle } = meter.getLocals();
      expect(barStyle.backgroundColor).toBeUndefined();
    });
  });
});
