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

const H24 = '24h';
const H12 = '12h';
const symbolRegex = /[\s,\.\|\/\\]/;
const numberRegex = /^\d+$/;
const time12Regex = /^([1-9]|1[0-2])[:,\.\|\/\\]?([0-5]\d)?\s*?(AM|PM)$/;
const time24Regex = /^([01]?\d|2[0-3])[:,\.\|\/\\]?([0-5]?\d)?$/;
const separator = ':';

const pad = (num) => num <= 9 ? `0${num}` : num;
const timeFormatter24 = (hour, minute) => `${pad(hour)}:${pad(minute)}`;
const timeFormatter12 = (hour, minute) => {
  if (hour === 0 || (hour > 12 && hour % 12 === 0)) {
    return `12${separator}${pad(minute)} am`;
  } else if (hour === 12) {
    return `12${separator}${pad(minute)} pm`;
  } else if (hour >= 13) {
    return `${pad(hour % 12)}${separator}${pad(minute)} pm`;
  } else {
    return `${pad(hour)}${separator}${pad(minute)} am`;
  }
};

const isValidTime = input => time12Regex.test(input) || time24Regex.test(input);

const formatValue = (timeFormatter, hour, minute) => ({
  value: `${hour}${separator}${minute}`,
  label: timeFormatter(hour, minute)
});

const lteTime = (minTime, maxTime) => (
  maxTime.hours > minTime.hours || (maxTime.hours === minTime.hours && maxTime.minutes >= minTime.minutes)
);

const addZero = str => {
  if (str.length === 4) {
    return `${str}0`;
  } else {
    return str;
  }
};

const insertColon = str => {
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

const cleanSeparator = str => str.replace(symbolRegex, separator);
const cleanInput = inputStr => addZero(insertColon(cleanSeparator(inputStr)));

const getSpecificOptionList = (cleanedInput, timeFormat) => {
  const inputArray = cleanedInput.split(separator);
  const hours = parseInt(inputArray[0]);
  const minutes = parseInt(inputArray[1]);
  if (hours !== 0 && numberRegex.test(hours) && numberRegex.test(minutes)) {
    const optionTime12 = [
      { value: `${cleanedInput}am`, label: timeFormatter12(hours, minutes) },
      { value: `${cleanedInput}pm`, label: timeFormatter12(hours + 12, minutes) }
    ];
    const optionTime24 = [{ value: cleanedInput, label: timeFormatter24(hours, minutes) }];

    if (timeFormat === H12 && hours <= 12 ) {
      return optionTime12;
    } else if (timeFormat === H24) {
      return optionTime24;
    }
  }
  return [];
};

const Integer = t.refinement(t.Number, n => n % 1 === 0, 'Integer');
const Hour = t.refinement(Integer, int => int >= 0 && int <= 23, 'Hour');
const Minute = t.refinement(Integer, int => int >= 0 && int <= 59, 'Minute');
const TimeFormat = t.enums.of([H12, H24], 'TimeFormat');
const Time = t.struct({
  hours: Hour,
  minutes: Minute
}, 'Time');

const Props = t.refinement(t.struct({
  onChange: t.Function,
  value: t.maybe(Time),
  minTime: t.maybe(Time),
  maxTime: t.maybe(Time),
  interval: t.maybe(Integer),
  placeholder: t.maybe(t.String),
  timeFormat: t.maybe(TimeFormat),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
}), ({ value, minTime, maxTime }) => (
  lteTime(minTime, maxTime) && (!value || (lteTime(value, maxTime) && lteTime(minTime, value)))
), 'Props');

@skinnable()
@props(Props)
export default class TimePicker extends React.Component {

  static defaultProps = {
    placeholder: `--${separator}--`,
    timeFormat: H24,
    interval: 30,
    minTime: { hours: 0, minutes: 0 },
    maxTime: { hours: 23, minutes: 59 }
  }

  /**
    We use filterOptions because seems that is not possible
    to change the options from outside of this function,
    then we use this tricky hack and we workaround this creating a new set
    of options as we wish and filter it if needed, or just returning a brand new array
  **/
  createOptionsList = (_, inputStr) => {
    /**
    _ is a placeholder because the TLC pass me the optionsList, but i don't really care. YOLO
    **/
    const { minTime, maxTime, interval, timeFormat } = this.props;
    const timeFormatter = timeFormat === H24 ? timeFormatter24 : timeFormatter12;
    const minHours = minTime.hours;
    const maxHours = maxTime.hours;
    const minMinutes = minTime.minutes;
    const maxMinutes = maxTime.minutes;

    const hours = range(minHours, maxHours + 1);
    const minutes = range(0, 60, interval);
    const options = flatten(hours.map(hour => minutes.filter(minute => (
      (hour !== minHours || minute >= minMinutes) &&
      (hour !== maxHours || minute <= maxMinutes)
    )).map( minute => formatValue(timeFormatter, hour, minute)
    )));
    return this.filterOrRecreateOptions(options, inputStr);
  };

  filterOrRecreateOptions = (options, inputStr) => {
    const cleanedInput = cleanInput(inputStr);
    if ((cleanedInput.length === 4 || cleanedInput.length === 5) && isValidTime(cleanedInput)) {
      return getSpecificOptionList(cleanedInput, this.props.timeFormat);
    }
    return options.filter( option => (
        option.label.substr(0, inputStr.length) === cleanedInput ||
        option.label === cleanedInput ||
        option.value === cleanedInput
    ));
  };

  _onChange = (value) => {
    if (value) {
      const timeArray = value.split(separator);
      const hours = parseInt(timeArray[0]);
      const minutes = parseInt(timeArray[1]);
      this.props.onChange({ hours, minutes });
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

    const timeFormatter = timeFormat === H24 ? timeFormatter24 : timeFormatter12;
    return {
      ...props,
      className: cx('time-picker', className),
      value: value ? formatValue(timeFormatter, value.hours, value.minutes) : '',
      options,
      onChange: this._onChange,
      filterOptions: this.createOptionsList
    };
  }

  template({ id, className, style, value, placeholder, options, onChange, filterOptions }) {
    return(
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
