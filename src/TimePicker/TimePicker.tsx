import * as React from 'react';
import { props, t } from '../utils';
import * as cx from 'classnames';
import Dropdown, { MenuPosition } from '../Dropdown/Dropdown';
import range = require('lodash/range');
import flatten = require('lodash/flatten');
import compact = require('lodash/compact');
import uniqBy = require('lodash/uniqBy');
import sortBy = require('lodash/sortBy');

export const H24 = '24h';
export const H12 = '12h';
export const inputError = {};
const symbolRegex = /[\s,\-\+\.\|\/\\]/;
const numberRegex = /^\d+$/;
const separator = ':';
const interval = 30;

export type Time = {
  hours: number,
  minutes: number
};
export type TimeFormat = '12h' | '24h';

const pad = (num: number) => num <= 9 ? `0${num}` : num;
const normalizeHoursToH24 = (hour: number) => hour + 12 !== 24 ? hour + 12 : 0;
const lteTime = (minTime: Time, maxTime: Time) => (
  maxTime.hours > minTime.hours || (maxTime.hours === minTime.hours && maxTime.minutes >= minTime.minutes)
);

const Integer = t.refinement(t.Number, n => n % 1 === 0, 'Integer');
const Hour = t.refinement(Integer, n => n >= 0 && n <= 23, 'Hour');
const Hour12 = t.refinement(Integer, n => n >= 1 && n <= 12, 'Hour12');
const Minute = t.refinement(Integer, n => n >= 0 && n <= 59, 'Minute');
export const TimeFormat = t.enums.of([H12, H24], 'TimeFormat');
export const Time = t.struct({
  hours: Hour,
  minutes: Minute
}, 'Time');

const isValidHoursInTimeFormat = (hours: number | null, timeFormat: TimeFormat): hours is number =>
  timeFormat === H24 ? Hour.is(hours) : Hour12.is(hours);

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
  style: t.maybe(t.Object),
  menuPosition: t.enums.of(['bottom', 'top']),
  disabled: t.maybe(t.Boolean)
}), ({ value, minTime, maxTime }) => (
  lteTime(minTime, maxTime) && (!value || (lteTime(value, maxTime) && lteTime(minTime, value)))
), 'Props');

const formatTime24 = ({ hours, minutes }: Time) => `${pad(hours)}:${pad(minutes)}`;
const formatTime12 = ({ hours, minutes }: Time) => {
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
type TimeAndFormat = Time & { timeFormat: TimeFormat };
const formatTime = ({ hours, minutes, timeFormat }: TimeAndFormat) => (
  timeFormat === H12 ? formatTime12({ hours, minutes }) : formatTime24({ hours, minutes })
);

export const toOption = (time: TimeAndFormat) => ({
  value: formatTime24(time),
  label: formatTime(time)
});

const cleanSeparator = (str: string) => str.replace(symbolRegex, separator);
const maybeAddTrailingZero = (str: string) => {
  if (str.length === 4) {
    return `${str}0`;
  } else {
    return str;
  }
};
const maybeInsertSeparator = (str: string) => {
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

export const parseInTimeFormat = (inputStr: string, timeFormat: TimeFormat): OnChangeInput => {
  if (inputStr === '') {
    return { originalInput: inputStr };
  }
  const cleanedInput = maybeAddTrailingZero(maybeInsertSeparator(cleanSeparator(inputStr)));
  const inputArray = cleanedInput.split(separator);
  const [_hours, _minutes] = inputArray;
  const hours = numberRegex.test(_hours) ? parseInt(_hours, 10) : null;
  const minutes = !_minutes || numberRegex.test(_minutes) ? parseInt(_minutes, 10) : null;

  if (isValidHoursInTimeFormat(hours, timeFormat) && Minute.is(minutes)) {
    return { hours, minutes, originalInput: cleanedInput };
  } else if (isValidHoursInTimeFormat(hours, timeFormat)) {
    return { originalInput: cleanedInput };
  } else {
    return inputError;
  }
};

export const createTimeList = ({ hours, minutes }: Time, timeFormat: TimeFormat) => {
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

const startsWith = (time: TimeAndFormat, originalInput: string) => {
  const timeStr = formatTime(time);
  return timeStr.substr(0, originalInput.length) === originalInput;
};

type FilterTimeInput = {
  originalInput: string
  minTime: Time
  maxTime: Time
};
export const filterTime = ({ originalInput, minTime, maxTime }: FilterTimeInput) => (time: TimeAndFormat) => {
  return lteTime(minTime, time) && lteTime(time, maxTime) && startsWith(time, originalInput);
};

type MakeOptionsInput = {
  timeFormat: TimeFormat
  minTime: Time
  maxTime: Time
  userValue?: Time
};
export const makeOptions = ({ minTime, maxTime, timeFormat, userValue }: MakeOptionsInput, inputValue: string) => {
  const time = parseInTimeFormat(inputValue, timeFormat);
  const selectedValue = (userValue && userValue !== inputError) ? { ...userValue, timeFormat } : userValue;
  const timeList = (
    (time === inputError ? [] : createTimeList(time as Time, timeFormat)) as (Time | TimeAndFormat)[] // TODO(typo)
  ).concat(compact([selectedValue]));
  const filteredTimeList = timeList.filter(filterTime({
    originalInput: (time as any).originalInput || '', minTime, maxTime // TODO(typo)
  }));
  return uniqBy(sortBy(filteredTimeList.map(toOption), 'value'), 'value');
};

export type OnChangeInput = {
  originalInput?: string
} & Partial<Time>;

export interface RequiredProps {
  /** onChange handler. It takes an object */
  onChange: (time?: OnChangeInput) => void
  /** value provided as input. Have to be passed in 24h format. E.g. { hours: 10, minutes: 30 } */
  value?: Time
  /** optionally disable the control */
  disabled?: boolean
  className?: string
  id?: string
  style?: React.CSSProperties
}
export interface DefaultProps {
  /** field placeholder, displayed when there's no value. Default[--:--] */
  placeholder: string
  /** format in which options are displayed (12h|24h) */
  timeFormat: TimeFormat
  /** minimum value. Have to be passed in 24h format. Default [00:00] */
  minTime: Time
  /** maximum value. Have to be passed in 24h format. Default [23:59] */
  maxTime: Time
  /** enable the search feature */
  searchable: boolean
  /** whether the menu should open on top or bottom */
  menuPosition: MenuPosition
}
export type TimePickerProps = RequiredProps & Partial<DefaultProps>
type TimePickerDefaultedProps = RequiredProps & DefaultProps;

@props(Props)
export default class TimePicker extends React.Component<TimePickerProps, { inputValue: string }> {

  static defaultProps = {
    placeholder: `--${separator}--`,
    timeFormat: H24,
    minTime: { hours: 0, minutes: 0 },
    maxTime: { hours: 23, minutes: 59 },
    searchable: true,
    menuPosition: 'bottom'
  }

  state = { inputValue: '' }

  _onChange = (value?: string) => {
    if (value) {
      // interface with component user is always in H24
      const time = parseInTimeFormat(value, H24);
      this.props.onChange(time);
    } else {
      this.props.onChange();
    }
  };

  updateInputValue = (inputValue: string) => this.setState({ inputValue });

  render() {
    const {
      className: _className, id, style,
      minTime, maxTime, timeFormat,
      value: userValue,
      searchable, placeholder, menuPosition, disabled
    } = this.props as TimePickerDefaultedProps;

    const value = userValue ? formatTime24(userValue) : undefined;
    const options = makeOptions({ minTime, maxTime, timeFormat, userValue }, this.state.inputValue);
    const className = cx('time-picker', _className);
    const onChange = this._onChange;
    const updateInputValue = this.updateInputValue;

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
        menuPosition={menuPosition}
        disabled={disabled}
      />
    );
  }
}
