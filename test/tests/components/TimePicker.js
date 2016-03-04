import expect from 'expect';
import TimePicker, { parser, H24, H12, formatter, timesFilter, timesGenerator } from '../../../src/time-picker/TimePicker';
import { newComponent } from '../helpers';

describe('TimePicker', function () {
  describe('locals', () => {

    const exampleProps = {
      id: '12345',
      className: 'fancy-class-name',
      placeholder: '--:--',
      timeFormat: '24h',
      style: { margin: 10, position: 'relative' },
      value: { hours: 6, minutes: 30 },
      minTime: { hours: 5, minutes: 10 },
      maxTime: { hours: 8, minutes: 20 }
    };

    const componentTimePicker = new TimePicker(exampleProps);

    it('should pass props', ()  => {
      const locals = componentTimePicker.getLocals();
      expect(locals.id).toBe(exampleProps.id);
      expect(locals.style).toBe(exampleProps.style);
      expect(locals.placeholder).toBe(exampleProps.placeholder);
      expect(locals.minTime).toBe(exampleProps.minTime);
      expect(locals.maxTime).toBe(exampleProps.maxTime);
    });
    it('should compute className', () => {
      const { className } = componentTimePicker.getLocals();
      expect(className).toInclude('time-picker');
      expect(className).toInclude('fancy-class-name');
    });
    it('parser should parse input and return a valid 24h time', () => {
      const input = '13:59';
      const parsedInput = parser(input, H24);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.inputError).toNotExist();
      expect(parsedInput.generateList).toNotExist();
      expect(parsedInput.originalInput).toBe(input);
      expect(parsedInput.hours).toBe(13);
      expect(parsedInput.minutes).toBe(59);
    });
    it('parser should parse input and return a valid 12h time', () => {
      const input = '06:30';
      const parsedInput = parser(input, H12);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.inputError).toNotExist();
      expect(parsedInput.generateList).toNotExist();
      expect(parsedInput.originalInput).toBe(input);
      expect(parsedInput.hours).toBe(6);
      expect(parsedInput.minutes).toBe(30);
    });
    it('parser should parse input and return an error for invalid 24h time', () => {
      const input = '36:30';
      const parsedInput = parser(input, H24);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.generateList).toNotExist();
      expect(parsedInput.originalInput).toNotExist();
      expect(parsedInput.hours).toNotExist();
      expect(parsedInput.minutes).toNotExist();
      expect(parsedInput.inputError).toExist();
    });
    it('parser should parse input and return an error for invalid 12h time', () => {
      const input = '18:30';
      const parsedInput = parser(input, H12);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.generateList).toNotExist();
      expect(parsedInput.originalInput).toNotExist();
      expect(parsedInput.hours).toNotExist();
      expect(parsedInput.minutes).toNotExist();
      expect(parsedInput.inputError).toExist();
    });
    it('parser should parse empty input and return generateList', () => {
      const input = '';
      const parsedInput = parser(input, H24);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.generateList).toExist();
      expect(parsedInput.originalInput).toBe(input);
      expect(parsedInput.hours).toNotExist();
      expect(parsedInput.minutes).toNotExist();
      expect(parsedInput.inputError).toNotExist();
    });
    it('parser should parse input and when minutes are not setted will return generateList', () => {
      const input = '10:';
      const parsedInput = parser(input, H24);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.generateList).toExist();
      expect(parsedInput.originalInput).toBe(input);
      expect(parsedInput.hours).toNotExist();
      expect(parsedInput.minutes).toNotExist();
      expect(parsedInput.inputError).toNotExist();
    });
    it('parser should parse input without separator and return a valid time', () => {
      const input = '1231';
      const parsedInput = parser(input, H24);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.hours).toBe(12);
      expect(parsedInput.minutes).toBe(31);
      expect(parsedInput.originalInput).toBe('12:31');
      expect(parsedInput.inputError).toNotExist();
      expect(parsedInput.generateList).toNotExist();
    });
    it('parser should parse input and return error if string is not well formed', () => {
      const input = '1a:aa';
      const parsedInput = parser(input, H24);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.inputError).toExist();
      expect(parsedInput.generateList).toNotExist();
      expect(parsedInput.hours).toNotExist();
      expect(parsedInput.minutes).toNotExist();
    });
    it('timesGenerator should return all the available times', () => {
      const time = { generateList: {} };
      const timeList24 = timesGenerator(time, H24);
      expect(timeList24).toBeA(Array);
      expect(timeList24.length).toBe(48);
      expect(timeList24[0].hours).toBe(0);
      expect(timeList24[0].minutes).toBe(0);
      expect(timeList24[0].timeFormat).toBe('24h');
      expect(timeList24[26].hours).toBe(13);
      expect(timeList24[26].minutes).toBe(0);
      expect(timeList24[27].hours).toBe(13);
      expect(timeList24[27].minutes).toBe(30);
      const timeList12 = timesGenerator(time, H12);
      expect(timeList24).toNotEqual(timeList12);
      expect(timeList12[0].timeFormat).toBe('12h');
    });
    it('timesGenerator should return all the available times', () => {
      const time = { inputError: {} };
      const timeList = timesGenerator(time, H24);
      expect(timeList).toBeA(Array);
      expect(timeList).toExist();
    });
  });
});
