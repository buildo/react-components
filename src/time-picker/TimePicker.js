import React from 'react';
import { props, t, skinnable } from '../utils';
import cx from 'classnames';
import Dropdown from '../dropdown/Dropdown';
import range from 'lodash/utility/range';
import flatten from 'lodash/array/flatten';

/*
  Options is defined here cause we need to not change the ref.
  This happend because of a very wired behaviour of react-select v0.6.12
*/
const options = [];

export const H24 = '24h';
export const H12 = '12h';
const generateList = {};
const inputError = {};
const symbolRegex = /[\s,\-\+\.\|\/\\]/;
const numberRegex = /^\d+$/;
const separator = ':';
const interval = 30;

const pad = (num) => num <= 9 ? `0${num}` : num;
const reverseTime12 = hour => hour + 12 !== 24 ? hour + 12 : 0;
const lteTime = (minTime, maxTime) => (
  maxTime.hours > minTime.hours || (maxTime.hours === minTime.hours && maxTime.minutes >= minTime.minutes)
);

const Integer = t.refinement(t.Number, n => n % 1 === 0, 'Integer');
const Hour = t.refinement(Integer, int => int >= 0 && int <= 23, 'Hour');
const Hour12 = t.refinement(Integer, int => int >= 1 && int <= 12, 'Hour12');
const Minute = t.refinement(Integer, int => int >= 0 && int <= 59, 'Minute');
const TimeFormat = t.enums.of([H12, H24], 'TimeFormat');
const Time = t.struct({
  hours: Hour,
  minutes: Minute
}, 'Time');

const isValidHours = (hours, timeFormat) => timeFormat === H24 ? Hour.is(hours) : Hour12.is(hours);

const Props = t.refinement(t.struct({
  onChange: t.Function,
  value: t.maybe(Time),
  minTime: t.maybe(Time),
  maxTime: t.maybe(Time),
  placeholder: t.maybe(t.String),
  timeFormat: t.maybe(TimeFormat),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
}), ({ value, minTime, maxTime }) => (
  lteTime(minTime, maxTime) && (!value || (lteTime(value, maxTime) && lteTime(minTime, value)))
), 'Props');

/** FORMATTING **/
const timeFormatter24 = ({ hours, minutes }) => `${pad(hours)}:${pad(minutes)}`;
const timeFormatter12 = ({ hours, minutes }) => {
  if (hours === 0 || (hours > 12 && hours % 12 === 0)) {
    return `12${separator}${pad(minutes)} am`;
  } else if (hours === 12) {
    return `12${separator}${pad(minutes)} pm`;
  } else if (hours >= 13) {
    return `${pad(hours % 12)}${separator}${pad(minutes)} pm`;
  } else {
    return `${pad(hours)}${separator}${pad(minutes)} am`;
  }
};
const timeToString = ({ hours, minutes, timeFormat }) => (
  timeFormat === H12 ? timeFormatter12({ hours, minutes }) : timeFormatter24({ hours, minutes })
);

export const formatter = (time, timeFormat) => ({
  value: timeFormatter24(time),
  label: timeToString(time, timeFormat)
});


const cleanSeparator = str => str.replace(symbolRegex, separator);
const addZero = str => {
  if (str.length === 4) {
    return `${str}0`;
  } else {
    return str;
  }
};
const insertSeparator = str => {
  if (numberRegex.test(str)) {
    if (str.length === 3) {
      const position = str.length - 1;
      const strWithColon = `${str.substr(0, position)}${separator}${str.substr(position)}`;
      return strWithColon;
    } else if (str.length === 4) {
      const position = str.length - 2;
      const strWithColon = `${str.substr(0, position)}${separator}${str.substr(position)}`;
      return strWithColon;
    }
  }
  return str;
};

export const parser = (inputStr, timeFormat) => {
  if (inputStr === '') {
    return { generateList, originalInput: inputStr };
  }
  const cleanedInput = addZero(insertSeparator(cleanSeparator(inputStr)));
  const inputArray = cleanedInput.split(separator);
  const [_hours, _minutes] = inputArray;
  const hours = numberRegex.test(_hours) ? parseInt(_hours, 10) : '';
  const minutes = !_minutes || numberRegex.test(_minutes) ? parseInt(_minutes, 10) : '';

  if (isValidHours(hours, timeFormat) && (Minute.is(minutes))) {
    return { hours, minutes, originalInput: cleanedInput };
  } else if (hours !== 0 && !isValidHours(hours, timeFormat)) {
    return { inputError };
  } else if (Number.isNaN(minutes)) {
    return { generateList, originalInput: cleanedInput };
  } else {
    return { inputError };
  }
};

export const timesGenerator = ({ hours, minutes, generateList, inputError }, timeFormat) => {
  if (inputError) {
    return [];
  } else if (generateList) {
    const hoursList = range(0, 24);
    const minutesList = range(0, 60, interval);
    return flatten(hoursList.map(hours => minutesList.map(minutes => ({ hours, minutes, timeFormat })
    )));
  } else {
    return timeFormat !== H24 ? [{ hours, minutes, timeFormat }, { hours: reverseTime12(hours), minutes, timeFormat }] : [{ hours, minutes, timeFormat }];
  }
};

const startsWith = (time, originalInput) => {
  const timeStr = timeToString(time);
  return timeStr.substr(0, originalInput.length) === originalInput;
};

export const timesFilter = (timeList, { originalInput }, minTime, maxTime) => {
  return timeList.filter(time => (
     ((lteTime(minTime, time) && lteTime(time, maxTime)) && startsWith(time, originalInput))
  ));
};

@skinnable()
@props(Props)
export default class TimePicker extends React.Component {

  static defaultProps = {
    placeholder: `--${separator}--`,
    timeFormat: H24,
    minTime: { hours: 0, minutes: 0 },
    maxTime: { hours: 23, minutes: 59 }
  }

  /**
    We use filterOptions because seems that is not possible
    to change the options from outside of this function,
    then we use this tricky hack and we workaround this creating a new set
    of options as we wish and filter it if needed, or just returning a brand new array.
  `_` is a placeholder because the TLC pass me the optionsList, but i don't really care. YOLO
  **/
  optionsManager = (_, inputStr) => {
    const {
      minTime,
      maxTime,
      timeFormat
    } = this.props;
    const time = parser(inputStr, timeFormat);
    const timeList = timesGenerator(time, timeFormat);
    const filteredTimeList = timesFilter(timeList, time, minTime, maxTime);
    return filteredTimeList.map(time => formatter(time, timeFormat));
  };

  _onChange = (value) => {
    if (value) {
      const time = parser(value);
      this.props.onChange(time);
    } else {
      this.props.onChange();
    }
  };

  getLocals() {
    const {
      timeFormat,
      className,
      value,
      ...props
    } = this.props;

    return {
      ...props,
      className: cx('time-picker', className),
      value: value ? formatter(value, timeFormat) : '',
      options,
      onChange: this._onChange,
      optionsManager: this.optionsManager
    };
  }

  template({ id, className, style, value, placeholder, options, onChange, optionsManager }) {
    return (
      <Dropdown
        {...{ id, className, style }}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        filterOptions={optionsManager}
        onBlur={() => this.forceUpdate()}
      />
    );
  }
}
