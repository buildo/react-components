import expect from 'expect';
import TimePicker, { parser, H24, H12, formatter, timesFilter, timesGenerator, optionsManager } from '../../../src/time-picker/TimePicker';

describe('TimePicker', () => {

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

  });

  describe('parser', () => {

    it('should parse input and return a valid 24h time', () => {
      const input = '13:59';
      const parsedInput = parser(input, H24);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.inputError).toNotExist();
      expect(parsedInput.generateList).toNotExist();
      expect(parsedInput.originalInput).toBe(input);
      expect(parsedInput.hours).toBe(13);
      expect(parsedInput.minutes).toBe(59);
    });

    it('should parse input and return a valid 12h time', () => {
      const input = '06:30';
      const parsedInput = parser(input, H12);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.inputError).toNotExist();
      expect(parsedInput.generateList).toNotExist();
      expect(parsedInput.originalInput).toBe(input);
      expect(parsedInput.hours).toBe(6);
      expect(parsedInput.minutes).toBe(30);
    });

    it('should parse input and return an error for invalid 24h time', () => {
      const input = '36:30';
      const parsedInput = parser(input, H24);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.generateList).toNotExist();
      expect(parsedInput.originalInput).toNotExist();
      expect(parsedInput.hours).toNotExist();
      expect(parsedInput.minutes).toNotExist();
      expect(parsedInput.inputError).toExist();
    });

    it('should parse input and return an error for invalid 12h time', () => {
      const input = '18:30';
      const parsedInput = parser(input, H12);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.generateList).toNotExist();
      expect(parsedInput.originalInput).toNotExist();
      expect(parsedInput.hours).toNotExist();
      expect(parsedInput.minutes).toNotExist();
      expect(parsedInput.inputError).toExist();
    });

    it('should parse empty input and return generateList', () => {
      const input = '';
      const parsedInput = parser(input, H24);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.generateList).toExist();
      expect(parsedInput.originalInput).toBe(input);
      expect(parsedInput.hours).toNotExist();
      expect(parsedInput.minutes).toNotExist();
      expect(parsedInput.inputError).toNotExist();
    });

    it('should parse input and when minutes are not set will return generateList', () => {
      const input = '10:';
      const parsedInput = parser(input, H24);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.generateList).toExist();
      expect(parsedInput.originalInput).toBe(input);
      expect(parsedInput.hours).toNotExist();
      expect(parsedInput.minutes).toNotExist();
      expect(parsedInput.inputError).toNotExist();
    });

    it('should parse input without separator and return a valid time', () => {
      const input = '1231';
      const parsedInput = parser(input, H24);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.hours).toBe(12);
      expect(parsedInput.minutes).toBe(31);
      expect(parsedInput.originalInput).toBe('12:31');
      expect(parsedInput.inputError).toNotExist();
      expect(parsedInput.generateList).toNotExist();
    });

    it('should parse input and return error if string is not well formed', () => {
      const input = '1a:aa';
      const parsedInput = parser(input, H24);
      expect(parsedInput).toBeA(Object);
      expect(parsedInput.inputError).toExist();
      expect(parsedInput.generateList).toNotExist();
      expect(parsedInput.hours).toNotExist();
      expect(parsedInput.minutes).toNotExist();
    });

  });

  describe('timesGenerator', () => {

    it('should return all the available times', () => {
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

    it('should return an array of a single element for 24h', () => {
      const time = { hours: 10, minutes: 31 };
      const timeList = timesGenerator(time, H24);
      expect(timeList).toBeA(Array);
      expect(timeList.length).toBe(1);
      expect(timeList[0]).toEqual({ hours: 10, minutes: 31, timeFormat: H24 });

    });

    it('should return an array of 2 elements for 12h', () => {
      const time = { hours: 10, minutes: 31 };
      const timeList = timesGenerator(time, H12);
      expect(timeList).toBeA(Array);
      expect(timeList.length).toBe(2);
      expect(timeList[0]).toEqual({ hours: 10, minutes: 31, timeFormat: H12 });
      expect(timeList[1]).toEqual({ hours: 22, minutes: 31, timeFormat: H12 });

    });

    it('should return an empty array on errors', () => {
      const time = { inputError: {} };
      const timeList = timesGenerator(time, H24);
      expect(timeList).toBeA(Array);
      expect(timeList.length).toBe(0);
    });

  });

  describe('timesFilter', () => {

    it('should filter based on minTime/maxTime ', () => {
      const time = { generateList: {}, originalInput: '' };
      const minTime = { hours: 8, minutes: 0 };
      const maxTime = { hours: 9, minutes: 0 };
      const timeList = [
        { hours: 7, minutes: 22 },
        { hours: 8, minutes: 33 },
        { hours: 9, minutes: 44 }
      ];
      const timeListFilterd = timesFilter(timeList, time, minTime, maxTime);
      expect(timeListFilterd).toBeA(Array);
      expect(timeListFilterd.length).toBe(1);
      expect(timeListFilterd[0]).toEqual({ hours: 8, minutes: 33 });
    });

    it('should filter based on minTime/maxTime and show no result for out of range values', () => {
      const time = { originalInput: '10:00', hours: 10, minutes: 0 };
      const minTime = { hours: 8, minutes: 0 };
      const maxTime = { hours: 9, minutes: 0 };
      const timeList = [
        { hours: 10, minutes: 0 }
      ];
      const timeListFilterd = timesFilter(timeList, time, minTime, maxTime);
      expect(timeListFilterd).toBeA(Array);
      expect(timeListFilterd.length).toBe(0);
    });

  });

  describe('formatter', () => {

    it('should format into a valid option for 24H time', () => {
      const time = { hours: 10, minutes: 20 };
      const formattedTime = formatter(time, H24);
      expect(formattedTime).toBeA(Object);
      expect(formattedTime.label).toBe('10:20');
    });

    describe('12H time', () => {

      it('should work 1', () => {
        const time = { hours: 13, minutes: 20, timeFormat: H12 };
        const formattedTime = formatter(time);
        expect(formattedTime).toBeA(Object);
        expect(formattedTime.label).toBe('01:20 pm');
      });

      it('should work 2', () => {
        const time = { hours: 10, minutes: 20, timeFormat: H12 };
        const formattedTime = formatter(time);
        expect(formattedTime).toBeA(Object);
        expect(formattedTime.label).toBe('10:20 am');
      });

      it('should work 3', () => {
        const time = { hours: 12, minutes: 34, timeFormat: H12 };
        const formattedTime = formatter(time);
        expect(formattedTime).toBeA(Object);
        expect(formattedTime.label).toBe('12:34 pm');
      });

      it('should work 4', () => {
        const time = { hours: 0, minutes: 34, timeFormat: H12 };
        const formattedTime = formatter(time);
        expect(formattedTime).toBeA(Object);
        expect(formattedTime.label).toBe('12:34 am');
      });

      it('should work 5', () => {
        const time = { hours: 24, minutes: 34, timeFormat: H12 };
        const formattedTime = formatter(time);
        expect(formattedTime).toBeA(Object);
        expect(formattedTime.label).toBe('12:34 am');
      });

    });

  });

  describe('optionsManager', () => {

    it('should compute options based on min/max for 24H time', () => {
      const filterOptions = optionsManager({ timeFormat: H24, minTime: { hours: 5, minutes: 10 }, maxTime: { hours: 7, minutes: 20 } });
      const inputStr = '';
      const results = filterOptions([], inputStr);
      expect(results).toBeA(Array);
      expect(results.length).toBe(4);
      expect(results[0]).toEqual({ label: '05:30', value: '05:30' });
      expect(results[3]).toEqual({ label: '07:00', value: '07:00' });
    });

    it('should compute options based on min/max for 12H time', () => {
      const filterOptions = optionsManager({ timeFormat: H12, minTime: { hours: 5, minutes: 10 }, maxTime: { hours: 7, minutes: 20 } });
      const inputStr = '';
      const results = filterOptions([], inputStr);
      expect(optionsManager).toBeA(Function);
      expect(results).toBeA(Array);
      expect(results.length).toBe(4);
      expect(results[0]).toEqual({ label: '05:30 am', value: '05:30' });
      expect(results[3]).toEqual({ label: '07:00 am', value: '07:00' });
    });

  });

});
