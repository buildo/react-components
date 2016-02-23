import React from 'react';
import { props, t, skinnable } from '../utils';
import cx from 'classnames';
import Dropdown from '../dropdown/Dropdown';
import FlexView from '../flex/FlexView';
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

const insertColon = str => {
  if (numberRegex.test(str) && (str.length >= 3 && str.length <= 4)) {
    const position = str.length - 2;
    const strWithColon = `${str.substr(0, position)}${separator}${str.substr(position)}`;
    return strWithColon;
  }
  return str;
};
const cleanString = str => str.replace(symbolRegex, ':');
const cleanFilter = filterStr => insertColon(cleanString(filterStr));
const filterOptions = (options, filterStr) => (
  options.filter( option => (
      option.value.substr(0, filterStr.length) === cleanFilter(filterStr) ||
      option.label.substr(0, filterStr.length) === cleanFilter(filterStr) ||
      option.label === cleanFilter(filterStr) ||
      option.value === cleanFilter(filterStr)
  ))
);

const Integer = t.refinement(t.Number, n => n % 1 === 0, 'Integer');
const Hour = t.refinement(Integer, int => int >= 0 && int <= 23, 'Hour');
const Hour12 = t.refinement(Hour, int => int >= 1 && int <= 12, 'Hour12');
const Minute = t.refinement(Integer, int => int >= 0 && int <= 59, 'Minute');
const TimeFormat = t.enums.of([H12, H24], 'TimeFormat');
const Time = t.struct({
  hours: Hour,
  minutes: Minute
}, 'Time');
const Time12 = t.struct({
  hours: Hour12,
  minutes: Minute
}, 'Time12');

const Props = t.refinement(t.struct({
  value: Time,
  onChange: t.Function,
  minTime: t.maybe(Time),
  maxTime: t.maybe(Time),
  interval: t.maybe(Integer),
  placeholder: t.maybe(t.String),
  timeFormat: t.maybe(TimeFormat),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
}), ({ timeFormat, value, minTime, maxTime }) => (
  timeFormat === H24 || (Time12(value) && (!minTime || Time12(minTime)) && (!maxTime || Time12(maxTime)))
), 'Props');

@skinnable()
@props(Props)
export default class TimePicker extends React.Component {

  static defaultProps = {
    placeholder: `--${separator}--`,
    timeFormat: H24,
    interval: 30,
    onChange: () => {}
  }

  createOptionsList = ({ timeFormatter, minTime, maxTime, interval }) => {

    const minHour = minTime ? minTime.hours : 0;
    const maxHour = maxTime ? maxTime.hours : 24;
    const hours = range(minHour, maxHour);
    const minutes = range(0, 60, interval);
    const options = flatten(hours.map( hour => minutes.map( minute => (
      { value: `${hour}${separator}${minute}`, label: timeFormatter(hour, minute) }
    )
    )));
    return options;
  };

  _onChange = (value) => {
    if (value) {
      const timeArray = value.split(separator);
      this.props.onChange({ hours: parseInt(timeArray[0]), minutes: parseInt(timeArray[1]) });
    }
  }

  getLocals() {
    const {
      placeholder,
      timeFormat,
      className,
      onChange,
      ...props
    } = this.props;

    return {
      placeholder,
      onChange: this._onChange,
      filterOptions,
      className: cx('time-picker', className),
      options: timeFormat === H24 ? this.createOptionsList({ timeFormatter: timeFormatter24, ...props }) : this.createOptionsList({ timeFormatter: timeFormatter12, ...props })
    };
  }

  template({ id, className, style, placeholder, options, onChange, filterOptions }) {
    return(
      <FlexView {...{ id, className, style }} grow >
        <Dropdown options={options} placeholder={placeholder} filterOptions={filterOptions} onChange={onChange}/>
      </FlexView>
    );
  }
}
