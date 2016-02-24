import React from 'react';
import { props, t, skinnable } from '../utils';
import cx from 'classnames';
import Dropdown from '../dropdown/Dropdown';
import range from 'lodash/utility/range';
import flatten from 'lodash/array/flatten';

const H24 = '24h';
const H12 = '12h';
const symbolRegex = /[\s,\.\|\/\\]/;
const numberRegex = /^\d+$/;
const separator = ':';

const pad = (num) => num <= 9 ? `0${num}` : num;
const timeFormatter24 = (hour, minute) => `${pad(hour)}:${pad(minute)}`;
const timeFormatter12 = (hour, minute) => {
  if (hour === 0) {
    return `12${separator}${pad(minute)} am`;
  } else if (hour === 12) {
    return `12${separator}${pad(minute)} pm`;
  } else if (hour >= 13) {
    return `${pad(hour % 12)}${separator}${pad(minute)} pm`;
  } else {
    return `${pad(hour)}${separator}${pad(minute)} am`;
  }
};

const lteTime = (minTime, maxTime) => (
  maxTime.hours > minTime.hours || (maxTime.hours === minTime.hours && maxTime.minutes > minTime.minutes)
);

const insertColon = str => {
  if (numberRegex.test(str) && (str.length === 3 || str.length === 4)) {
    const position = str.length - 2;
    const strWithColon = `${str.substr(0, position)}${separator}${str.substr(position)}`;
    return strWithColon;
  }
  return str;
};
const cleanSeparator = str => str.replace(symbolRegex, ':');
const cleanFilter = inputStr => insertColon(cleanSeparator(inputStr));

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

  createOptionsList = ({ timeFormatter, minTime, maxTime, interval }) => {
    const minHours = minTime.hours;
    const maxHours = maxTime.hours;
    const minMinutes = minTime.minutes;
    const maxMinutes = maxTime.minutes;

    const hours = range(minHours, maxHours + 1);
    const minutes = range(0, 60, interval);
    const options = flatten(hours.map(hour => minutes.filter(minute => (
      (hour !== minHours || minute >= minMinutes) &&
      (hour !== maxHours || minute <= maxMinutes)
    )).map( minute => ({
      value: `${hour}${separator}${minute}`,
      label: timeFormatter(hour, minute)
    })
    )));
    return options;
  };

  _filterOptions = (options, inputStr) => (
    options.filter( option => (
        option.value.substr(0, inputStr.length) === cleanFilter(inputStr) ||
        option.label.substr(0, inputStr.length) === cleanFilter(inputStr) ||
        option.label === cleanFilter(inputStr) ||
        option.value === cleanFilter(inputStr)
    ))
  );

  _onChange = (value) => {
    if (value) {
      const timeArray = value.split(separator);
      this.props.onChange({ hours: parseInt(timeArray[0]), minutes: parseInt(timeArray[1]) });
    } else {
      this.props.onChange();
    }
  }

  getLocals() {
    const {
      timeFormat,
      className,
      ...props
    } = this.props;

    const timeFormatter = timeFormat === H24 ? timeFormatter24 : timeFormatter12;

    return {
      ...props,
      className: cx('time-picker', className),
      options: this.createOptionsList({ timeFormatter, ...props }),
      onChange: this._onChange,
      filterOptions: this._filterOptions
    };
  }

  template({ id, className, style, value, placeholder, options, onChange, filterOptions }) {
    return(
      <Dropdown
        {...{ id, className, style }}
        onChange={onChange}
        value={value}
        options={options}
        placeholder={placeholder}
        filterOptions={filterOptions}
      />
    );
  }
}
