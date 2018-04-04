import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Meter from '../../src/Meter';

let consoleError: jest.SpyInstance<{}>;

beforeAll(() => {
  consoleError = jest.spyOn(console, 'error');
});

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled();
});

const style: React.CSSProperties = {
  margin: 10,
  position: 'relative'
};

const ranges: Meter.Props['ranges'] = [
  { startValue: 0, endValue: 50, fillingColor: 'green', labelColor: 'red', backgroundColor: 'grey' },
  { startValue: 50, endValue: 80, fillingColor: 'yellow' },
  { startValue: 80, endValue: 100 }
];

const exampleProps = {
  id: '12345',
  className: 'fancy-class-name',
  style,
  value: 25,
  min: 0,
  max: 100,
  ranges,
  baseLabelColor: '#000000',
  labelFormatter: () => 'test'
};

const meter = shallow(<Meter {...exampleProps} />);

describe('Meter', () => {

  it('renders correctly', () => {
    const component = renderer.create(
      <Meter {...exampleProps} />
    );
    expect(component).toMatchSnapshot();
  });

  it('computes className', () => {
    expect(meter.hasClass('meter')).toBe(true);
    expect(meter.hasClass('fancy-class-name')).toBe(true);
  });

  it('uses labelFormatter', () => {
    expect(meter.find('.label').dive().text()).toBe('test');
  });

  it('computes barStyle', () => {
    expect(meter.find('.bar').prop('style').background).toBe(ranges[0].backgroundColor);
  });

  it('computes fillingStyle', () => {
    expect(meter.find('.filling').prop('style').background).toBe(ranges[0].fillingColor);
  });

  it('computes labelStyle', () => {
    expect(meter.find('.label').prop('style').color).toBe(ranges[0].labelColor);
  });

  it('computes basisSize', () => {
    expect(meter.find('.filling').prop('basis')).toBe('25%');
  });

  it('computes basisSize with custom min and max', () => {
    const meter = shallow(
      <Meter value={150} min={100} max={200} />
    );
    expect(meter.find('.filling').prop('basis')).toBe('50%');
  });

  it('computes basisSize for custom negative min', () => {
    const meter = shallow(
      <Meter value={0} min={-100} max={100} />
    );
    expect(meter.find('.filling').prop('basis')).toBe('50%');
  });

  it('computes background color for filling', () => {
    const ranges = [
      { startValue: 50, endValue: 80, fillingColor: 'yellow' }
    ];
    const meter = shallow(
      <Meter value={60} ranges={ranges} />
    );
    expect(meter.find('.filling').prop('style').background).toBe(ranges[0].fillingColor);
  });

  it('defaults to the base color as background color if there\'s no matching range', () => {
    const ranges = [
      { startValue: 50, endValue: 80, fillingColor: 'yellow' }
    ];
    const meter = shallow(
      <Meter value={20} ranges={ranges} baseFillingColor='#ccc' />
    );
    expect(meter.find('.filling').prop('style').background).toBe('#ccc');
  });

  it('doesn\'t define a background color if there\'s no matching range and no default is given', () => {
    const ranges = [
      { startValue: 50, endValue: 80, fillingColor: 'yellow' }
    ];
    const meter = shallow(
      <Meter value={20} ranges={ranges} />
    );
    expect(meter.find('.filling').prop('style').background).toBeUndefined();
  });

  it('defaults to base color as bar background color should if there\'s no matching range', () => {
    const ranges = [
      { startValue: 50, endValue: 80, fillingColor: 'yellow' }
    ];
    const meter = shallow(
      <Meter value={20} ranges={ranges} baseBackgroundColor='#ccc' />
    );
    expect(meter.find('.bar').prop('style').background).toBe('#ccc');
  });

  it('doesn\'t define a bar background color if there\'s no matching range and no default is given', () => {
    const ranges = [
      { startValue: 50, endValue: 80, fillingColor: 'yellow' }
    ];
    const meter = shallow(
      <Meter value={20} ranges={ranges} />
    );
    expect(meter.find('.bar').prop('style').background).toBeUndefined();
  });

  it('computes colors respecting base colors', () => {
    const ranges = [
      { startValue: 0, endValue: 50, fillingColor: 'yellow' },
      { startValue: 50, endValue: 80 }
    ];
    const baseColors = {
      baseBackgroundColor: 'red',
      baseFillingColor: 'green',
      baseLabelColor: 'blue',
    };
    const meter1 = shallow(
      <Meter value={30} ranges={ranges} {...baseColors} />
    );
    expect(meter1.find('.bar').prop('style').background).toBe('red');
    expect(meter1.find('.filling').prop('style').background).toBe('yellow');
    expect(meter1.find('.label').prop('style').color).toBe('blue');
    const meter2 = shallow(
      <Meter value={60} ranges={ranges} {...baseColors} />
    );
    expect(meter2.find('.bar').prop('style').background).toBe('red');
    expect(meter2.find('.filling').prop('style').background).toBe('green');
    expect(meter2.find('.label').prop('style').color).toBe('blue');
  });

});
