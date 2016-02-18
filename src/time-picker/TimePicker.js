import React from 'react';
import { props, t, skinnable } from '../utils';
import Dropdown from '../dropdown/Dropdown';

const H24 = '24h';
const H12 = '12h';

const Integer = t.refinement(t.Number, (n) => n % 1 === 0, 'Integer');
const TimeFormat = t.enums.of([H12, H24], 'TimeFormat');
const Time = t.refinement(t.struct({
  hours: Integer,
  minutes: Integer
}), t => (t.hours >= 1 && t.hours <= 23) && (t.minutes >= 0 && t.minutes <= 59), 'Time');

const Time12 = t.refinement(t.struct({
  hours: Integer,
  minutes: Integer
}), t => (t.hours >= 1 && t.hours <= 12 ) && (t.minutes >= 0 && t.minutes <= 59), 'Time');

const Props = t.refinement(t.struct({
  value: Time,
  minTime: t.maybe(Time),
  maxTime: t.maybe(Time),
  placeholder: t.maybe(t.String),
  timeFormat: t.maybe(TimeFormat),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
}), ({ timeFormat, value, minTime, maxTime }) => (
  timeFormat === H24 || (Time12.is(value) && t.maybe(Time12).is(minTime) && t.maybe(Time12).is(maxTime))
), 'Props');

@skinnable()
@props(Props)
export default class TimePicker extends React.Component {

  static defaultProps = {
    placeholder: '--:--',
    timeFormat: '24h'
  }

  getLocals = () => {
    return null;
  };

  template() {
    return(
      <Dropdown />
    );
  }
}
