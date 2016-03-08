import React from 'react';
import { props, t, skinnable } from '../utils';
import cx from 'classnames';
import Dropdown from '../dropdown/Dropdown';
import range from 'lodash/range';
import flatten from 'lodash/flatten';

const options = [];

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

const Props = t.refinement(t.struct({
  /**
  * onChange handler it will return an object
  */
  onChange: t.Function,
  /**
   * Value provided as input. Have to be passed in 24h format.
   * Es: { hours: 10, minutes: 30 }
   */
  value: t.maybe(Time),
  /**
   * Minimum value. Have to be passed in 24h format. Default [00:00]
   */
  minTime: t.maybe(Time),
  /**
   * Maximum value. Have to be passed in 24h format. Default [23:59]
   */
  maxTime: t.maybe(Time),
  /**
   * Field placeholder, displayed when there's no value. Default[--:--]
   */
  placeholder: t.maybe(t.String),
  /**
   * format in which options are displayed. Default [24H].
   */
  timeFormat: t.maybe(TimeFormat),
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

// we are not "filtering" options (options array is always empty and discarded by this function)
// our `filterOptions` actually generates options based on current input string and props.
// We use this as a workaround because there's not any other easy way of updating options
// without breaking input in react-select v0.6.x
// NOTE: can be fixed updating to v1.0.0
export const makeFilterOptions = ({ minTime, maxTime, timeFormat }) => (_, inputStr) => {
  const time = parseInTimeFormat(inputStr, timeFormat);
  const timeList = time === inputError ? [] : createTimeList(time, timeFormat);
  const filteredTimeList = timeList.filter(filterTime({
    originalInput: time.originalInput, minTime, maxTime
  }));
  return filteredTimeList.map(toOption);
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

  _onChange = (value) => {
    if (value) {
      // interface with component user is always in H24
      const time = parseInTimeFormat(value, H24);
      this.props.onChange(time);
    } else {
      this.props.onChange();
    }
  };

  getLocals() {
    const {
      timeFormat,
      className,
      value: userValue,
      ...props
    } = this.props;

    const value = userValue ? toOption({
      ...userValue, timeFormat
    }) : undefined;

    return {
      ...props,
      value,
      options,
      className: cx('time-picker', className),
      onChange: this._onChange,
      filterOptions: makeFilterOptions(this.props)
    };
  }

  template({ id, className, style, value, placeholder, options, onChange, filterOptions }) {
    return (
      <Dropdown
        {...{ id, className, style }}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        filterOptions={filterOptions}
        onBlur={() => this.forceUpdate()}
      />
    );
  }
}
