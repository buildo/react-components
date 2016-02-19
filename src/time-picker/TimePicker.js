import React from 'react';
import { props, t, skinnable } from '../utils';
import cx from 'classnames';
import Dropdown from '../dropdown/Dropdown';
import FlexView from '../flex/FlexView';
import range from 'lodash/utility/range';
import flatten from 'lodash/array/flatten';

const H24 = '24h';
const H12 = '12h';

const pad = (num) => ( num <= 9 ? `0${num}` : num );

const timeFormatter24 = (hour, minute) => (`${pad(hour)}:${pad(minute)}`);
const timeFormatter12 = (hour, minute) => {
  if (hour === 0) {
    return `12:${pad(minute)} pm`;
  } else if (hour >= 13) {
    return `${pad(hour % 12)}:${pad(minute)} pm`;
  } else {
    return `${pad(hour)}:${pad(minute)} am`;
  }
};

const Integer = t.refinement(t.Number, n => n % 1 === 0, 'Integer');
const Hour = t.refinement(Integer, int => int >= 1 && int <= 23, 'Hour');
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
  minTime: t.maybe(Time),
  maxTime: t.maybe(Time),
  interval: t.maybe(Integer),
  placeholder: t.maybe(t.String),
  timeFormat: t.maybe(TimeFormat),
  onChange: t.maybe(t.Function),
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
    placeholder: '--:--',
    timeFormat: '24h',
    interval: 30,
    onChange: () => {}
  }

  createOptionsList = ({ timeFormatter, minTime, maxTime, interval }) => {

    const hours = range(minTime.hours, maxTime.hours);
    const minutes = range(0, 60, interval);
    const options = flatten(hours.map( hour => minutes.map( minute => (
      { value: `${hour}:${minute}`, label: timeFormatter(hour, minute) }
    )
    )));
    return options;
  };

  getLocals() {
    const {
      placeholder,
      timeFormat,
      className,
      ...props
    } = this.props;

    return {
      placeholder,
      className: cx('time-picker', className),
      options: timeFormat === H24 ? this.createOptionsList({ timeFormatter: timeFormatter24, ...props }) : this.createOptionsList({ timeFormatter: timeFormatter12, ...props })
    };
  }

  template({ id, className, style, placeholder, options }) {
    return(
      <FlexView {...{ id, className, style }} grow>
        <Dropdown options={options} placeholder={placeholder} />
      </FlexView>
    );
  }
}
