import React from 'react';
import { props, t, skinnable } from '../utils';
import cx from 'classnames';
import Dropdown from '../dropdown/Dropdown';
import range from 'lodash/range';
import flatten from 'lodash/flatten';

export const H24 = '24h';
export const H12 = '12h';
export const inputError = {};
const symbolRegex = /[\s,\-\+\.\|\/\\]/;
const numberRegex = /^\d+$/;
const separator = ':';
const interval = 30;

const pad = (num) => num <= 9 ? `0${num}` : num;
const normalizeHoursToH24 = hour => hour + 12 !== 24 ? hour + 12 : 0;
const lteTime = (minTime, maxTime) => (
  maxTime.hours > minTime.hours || (maxTime.hours === minTime.hours && maxTime.minutes >= minTime.minutes)
);

const Integer = t.refinement(t.Number, n => n % 1 === 0, 'Integer');
const Hour = t.refinement(Integer, n => n >= 0 && n <= 23, 'Hour');
const Hour12 = t.refinement(Integer, n => n >= 1 && n <= 12, 'Hour12');
const Minute = t.refinement(Integer, n => n >= 0 && n <= 59, 'Minute');
const TimeFormat = t.enums.of([H12, H24], 'TimeFormat');
const Time = t.struct({
  hours: Hour,
  minutes: Minute
}, 'Time');

const isValidHoursInTimeFormat = (hours, timeFormat) => timeFormat === H24 ? Hour.is(hours) : Hour12.is(hours);

export const Props = t.refinement(t.struct({
  onChange: t.Function,
  value: t.maybe(Time),
  minTime: t.maybe(Time),
  maxTime: t.maybe(Time),
  placeholder: t.maybe(t.String),
  timeFormat: t.maybe(TimeFormat),
  searchable: t.Boolean,
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
}), ({ value, minTime, maxTime }) => (
  lteTime(minTime, maxTime) && (!value || (lteTime(value, maxTime) && lteTime(minTime, value)))
), 'Props');

const formatTime24 = ({ hours, minutes }) => `${pad(hours)}:${pad(minutes)}`;
const formatTime12 = ({ hours, minutes }) => {
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
const formatTime = ({ hours, minutes, timeFormat }) => (
  timeFormat === H12 ? formatTime12({ hours, minutes }) : formatTime24({ hours, minutes })
);

export const toOption = time => ({
  value: formatTime24(time),
  label: formatTime(time)
});

const cleanSeparator = str => str.replace(symbolRegex, separator);
const maybeAddTrailingZero = str => {
  if (str.length === 4) {
    return `${str}0`;
  } else {
    return str;
  }
};
const maybeInsertSeparator = str => {
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

export const parseInTimeFormat = (inputStr, timeFormat) => {
  if (inputStr === '') {
    return { originalInput: inputStr };
  }
  const cleanedInput = maybeAddTrailingZero(maybeInsertSeparator(cleanSeparator(inputStr)));
  const inputArray = cleanedInput.split(separator);
  const [_hours, _minutes] = inputArray;
  const hours = numberRegex.test(_hours) ? parseInt(_hours, 10) : '';
  const minutes = !_minutes || numberRegex.test(_minutes) ? parseInt(_minutes, 10) : '';
  const validHours = isValidHoursInTimeFormat(hours, timeFormat);
  const validMinutes = Minute.is(minutes);

  if (validHours && validMinutes) {
    return { hours, minutes, originalInput: cleanedInput };
  } else if (validHours) {
    return { originalInput: cleanedInput };
  } else {
    return inputError;
  }
};

export const createTimeList = ({ hours, minutes }, timeFormat) => {
  if (!isValidHoursInTimeFormat(hours, timeFormat) || !Minute.is(minutes)) {
    const hoursList = range(0, 24);
    const minutesList = range(0, 60, interval);
    return flatten(hoursList.map(hours => minutesList.map(minutes => ({ hours, minutes, timeFormat }))));
  } else {
    return timeFormat !== H24 ? [
      { hours, minutes, timeFormat },
      { hours: normalizeHoursToH24(hours), minutes, timeFormat }
    ] : [
      { hours, minutes, timeFormat }
    ];
  }
};

const startsWith = (time, originalInput) => {
  const timeStr = formatTime(time);
  return timeStr.substr(0, originalInput.length) === originalInput;
};

export const filterTime = ({ originalInput, minTime, maxTime }) => time => {
  return lteTime(minTime, time) && lteTime(time, maxTime) && startsWith(time, originalInput);
};

export const makeOptions = ({ minTime, maxTime, timeFormat }, inputValue) => {
  const time = parseInTimeFormat(inputValue, timeFormat);
  const timeList = time === inputError ? [] : createTimeList(time, timeFormat);
  const filteredTimeList = timeList.filter(filterTime({
    originalInput: time.originalInput, minTime, maxTime
  }));
  return filteredTimeList.map(toOption);
};


/**
 * TimePicker field, used to pick a time from a dropdown
 * @param onChange - onChange handler. It will return an object
 * @param value - value provided as input. Have to be passed in 24h format. E.g. { hours: 10, minutes: 30 }
 * @param minTime - minimum value. Have to be passed in 24h format. Default [00:00]
 * @param maxTime - maximum value. Have to be passed in 24h format. Default [23:59]
 * @param placeholder - field placeholder, displayed when there's no value. Default[--:--]
 * @param timeFormat - format in which options are displayed (12h|24h)
 * @param searchable - enable the search feature
 */
@skinnable()
@props(Props)
export default class TimePicker extends React.Component {

  static defaultProps = {
    placeholder: `--${separator}--`,
    timeFormat: H24,
    minTime: { hours: 0, minutes: 0 },
    maxTime: { hours: 23, minutes: 59 },
    searchable: true
  }

  state = { inputValue: '' }

  _onChange = (value) => {
    if (value) {
      // interface with component user is always in H24
      const time = parseInTimeFormat(value, H24);
      this.props.onChange(time);
    } else {
      this.props.onChange();
    }
  };

  updateInputValue = (inputValue) => this.setState({ inputValue });

  getLocals() {
    const {
      className,
      minTime, maxTime, timeFormat,
      value: userValue,
      ...props
    } = this.props;

    const value = userValue ? formatTime24(userValue) : undefined;

    return {
      ...props,
      value,
      options: makeOptions({ minTime, maxTime, timeFormat }, this.state.inputValue),
      className: cx('time-picker', className),
      onChange: this._onChange,
      updateInputValue: this.updateInputValue
    };
  }

  template({ id, className, style, searchable, value, placeholder, options, onChange, updateInputValue }) {
    return (
      <Dropdown
        {...{ id, className, style }}
        searchable={searchable}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        onInputChange={updateInputValue}
        onBlur={() => this.forceUpdate()}
      />
    );
  }
}
