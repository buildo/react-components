import * as React from 'react';
import * as cx from 'classnames';
import { SingleDropdown } from '../Dropdown';
import range = require('lodash/range');
import flatten = require('lodash/flatten');
import compact = require('lodash/compact');
import uniqBy = require('lodash/uniqBy');
import sortBy = require('lodash/sortBy');
import { components } from 'react-select';
import find = require('lodash/find');
import { warn } from '../utils/log';
import { OptionProps } from 'react-select/lib/components/Option';
import { SingleValueProps } from 'react-select/lib/components/SingleValue';

export const H24 = '24h';
export const H12 = '12h';
export const inputError = {};
const symbolRegex = /[\s,\-\+\.\|\/\\]/;
const numberRegex = /^\d+$/;
const separator = ':';
const interval = 30;

const pad = (num: number) => (num <= 9 ? `0${num}` : num);
const normalizeHoursToH24 = (hour: number) => (hour + 12 !== 24 ? hour + 12 : 0);
const lteTime = (minTime: TimePicker.Time, maxTime: TimePicker.Time) =>
  maxTime.hours > minTime.hours ||
  (maxTime.hours === minTime.hours && maxTime.minutes >= minTime.minutes);

const isInteger = (n: number): boolean => n % 1 === 0;
const isHour = (n: number): boolean => isInteger(n) && n >= 0 && n <= 23;
const isHour12 = (n: number): boolean => isInteger(n) && n >= 0 && n <= 12;
const isMinute = (n: number): boolean => isInteger(n) && n >= 0 && n <= 59;
const isTime = (time: TimePicker.Props['value']): boolean =>
  time != null && isHour(time.hours) && isMinute(time.minutes);

const isValidHoursInTimeFormat = (
  hours: number | null,
  timeFormat: TimePicker.TimeFormat
): hours is number =>
  hours == null ? false : timeFormat === H24 ? isHour(hours) : isHour12(hours);

const getComponents = (
  timeFormatter?: TimePicker.TimeFormatter
): NonNullable<TimePicker.Props['components']> => {
  return timeFormatter
    ? {
        Option: (props: OptionProps<any>) => (
          <components.Option {...props}>{timeFormatter(props.data.time)}</components.Option>
        ),
        SingleValue: (props: SingleValueProps<any>) => timeFormatter(props.data.time)
      }
    : {};
};

function validProps({ value, minTime, maxTime }: TimePicker.Props): boolean {
  const validTimes =
    (value == null || isTime(value)) &&
    (minTime == null || isTime(minTime)) &&
    (maxTime == null || isTime(maxTime));
  const minMaxCoherent = minTime == null || maxTime == null || lteTime(minTime, maxTime);
  const valueMoreThanMin = value == null || minTime == null || lteTime(minTime, value);
  const valueLessThanMax = value == null || maxTime == null || lteTime(value, maxTime);
  return validTimes && minMaxCoherent && valueMoreThanMin && valueLessThanMax;
}

const formatTime24 = ({ hours, minutes }: TimePicker.Time) => `${pad(hours)}:${pad(minutes)}`;
const formatTime12 = ({ hours, minutes }: TimePicker.Time) => {
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

const formatTime = ({ hours, minutes, timeFormat }: TimePicker.TimeAndFormat) =>
  timeFormat === H12 ? formatTime12({ hours, minutes }) : formatTime24({ hours, minutes });

const toOption = (time: TimePicker.TimeAndFormat): TimeDropdownOption => ({
  time,
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

const parseInTimeFormat = (
  inputStr: string,
  timeFormat: TimePicker.TimeFormat
): TimePicker.OnChangeInput => {
  if (inputStr === '') {
    return { originalInput: inputStr };
  }
  const cleanedInput = maybeAddTrailingZero(maybeInsertSeparator(cleanSeparator(inputStr)));
  const inputArray = cleanedInput.split(separator);
  const [_hours, _minutes] = inputArray;
  const hours = numberRegex.test(_hours) ? parseInt(_hours, 10) : null;
  const minutes = !_minutes || numberRegex.test(_minutes) ? parseInt(_minutes, 10) : null;

  if (isValidHoursInTimeFormat(hours, timeFormat) && minutes != null && isMinute(minutes)) {
    return { hours, minutes, originalInput: cleanedInput };
  } else if (isValidHoursInTimeFormat(hours, timeFormat)) {
    return { originalInput: cleanedInput };
  } else {
    return inputError;
  }
};

const createTimeList = (
  { hours, minutes }: TimePicker.Time,
  timeFormat: TimePicker.TimeFormat
): Array<TimePicker.TimeAndFormat> => {
  if (!isValidHoursInTimeFormat(hours, timeFormat) || !minutes || !isMinute(minutes)) {
    const hoursList = range(0, 24);
    const minutesList = range(0, 60, interval);
    return flatten(
      hoursList.map(hours => minutesList.map(minutes => ({ hours, minutes, timeFormat })))
    );
  } else {
    return timeFormat !== H24
      ? [
          { hours, minutes, timeFormat },
          { hours: normalizeHoursToH24(hours), minutes, timeFormat }
        ]
      : [{ hours, minutes, timeFormat }];
  }
};

const startsWith = (time: TimePicker.TimeAndFormat, originalInput: string) => {
  const timeStr = formatTime(time);
  return timeStr.substr(0, originalInput.length) === originalInput;
};

type FilterTimeInput = {
  originalInput: string;
  minTime: TimePicker.Time;
  maxTime: TimePicker.Time;
};
const filterTime = ({ originalInput, minTime, maxTime }: FilterTimeInput) => (
  time: TimePicker.TimeAndFormat
) => {
  return lteTime(minTime, time) && lteTime(time, maxTime) && startsWith(time, originalInput);
};

type MakeOptionsInput = {
  timeFormat: TimePicker.TimeFormat;
  minTime: TimePicker.Time;
  maxTime: TimePicker.Time;
  userValue?: TimePicker.Time;
};
const makeOptions = (
  { minTime, maxTime, timeFormat, userValue }: MakeOptionsInput,
  inputValue: string
): TimeDropdownOption[] => {
  const time = parseInTimeFormat(inputValue, timeFormat);
  const selectedValue =
    userValue && userValue !== inputError ? { ...userValue, timeFormat } : userValue;
  const timeList = (time === inputError
    ? []
    : createTimeList(time as TimePicker.Time, timeFormat)
  ).concat(compact([selectedValue]) as any);
  const filteredTimeList = timeList.filter(
    filterTime({
      originalInput: (time as any).originalInput || '',
      minTime,
      maxTime // TODO(typo)
    })
  );
  return uniqBy(sortBy(filteredTimeList.map(toOption), 'value'), 'value');
};

export interface RequiredProps {
  /** onChange handler. It takes an object */
  onChange: (time?: TimePicker.OnChangeInput) => void;
  /** value provided as input. Have to be passed in 24h format. E.g. { hours: 10, minutes: 30 } */
  value?: TimePicker.Time;
  timeFormatter?: TimePicker.TimeFormatter;
  /** optionally disable the control */
  disabled?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}
export interface DefaultProps {
  /** field placeholder, displayed when there's no value. Default[--:--] */
  placeholder: string;
  /** format in which options are displayed (12h|24h) */
  timeFormat: TimePicker.TimeFormat;
  /** minimum value. Have to be passed in 24h format. Default [00:00] */
  minTime: TimePicker.Time;
  /** maximum value. Have to be passed in 24h format. Default [23:59] */
  maxTime: TimePicker.Time;
  /** enable the search feature */
  searchable: boolean;
  /** dropdown size */
  size: 'medium' | 'small';
  /** whether the menu should open on top or bottom */
  menuPosition: SingleDropdown.Props<TimeDropdownOption>['menuPlacement'];
  /** object of custom compoents for react select */
  components: SingleDropdown.Props<TimeDropdownOption>['components'];
}

export namespace TimePicker {
  export type Time = {
    hours: number;
    minutes: number;
  };
  export type TimeFormat = '12h' | '24h';

  export type TimeAndFormat = Time & { timeFormat: TimeFormat };
  export type TimeFormatter = (t: TimeAndFormat) => JSX.Element;

  export type OnChangeInput = {
    originalInput?: string;
  } & Partial<Time>;

  export type Props = RequiredProps & Partial<DefaultProps>;
}
type TimePickerDefaultedProps = RequiredProps & DefaultProps;
type TimeDropdownOption = {
  time: TimePicker.TimeAndFormat;
  value: string;
  label: string;
};

export class TimePicker extends React.Component<TimePicker.Props, { inputValue: string }> {
  static defaultProps = {
    placeholder: `--${separator}--`,
    timeFormat: H24,
    minTime: { hours: 0, minutes: 0 },
    maxTime: { hours: 23, minutes: 59 },
    searchable: true,
    size: 'medium',
    menuPosition: 'bottom'
  };

  state = { inputValue: '' };

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      if (!validProps(this.props)) {
        warn(
          'Invalid props provided: `value`, `minTime` or `maxTime` are not valid times or not coherent'
        );
      }
    }
  }

  _onChange = (value: TimeDropdownOption) => {
    // interface with component user is always in H24
    const time = parseInTimeFormat(value.value, H24);
    this.props.onChange(time);
  };

  updateInputValue = (inputValue: string) => this.setState({ inputValue });

  render() {
    const {
      className: _className,
      id,
      style,
      minTime,
      maxTime,
      timeFormat,
      value: userValue,
      searchable,
      size,
      placeholder,
      menuPosition,
      disabled,
      timeFormatter,
      components: userComponents
    } = this.props as TimePickerDefaultedProps;

    const value = userValue ? formatTime24(userValue) : undefined;
    const options = makeOptions({ minTime, maxTime, timeFormat, userValue }, this.state.inputValue);
    const className = cx('time-picker', _className);
    const onChange = this._onChange;
    const updateInputValue = this.updateInputValue;
    const computedComponents = getComponents(timeFormatter);

    return (
      <SingleDropdown
        id={id}
        className={className}
        style={style}
        isSearchable={searchable}
        value={find(options, o => o.value === value)!}
        onChange={onChange}
        options={options}
        components={{ ...computedComponents, ...userComponents }}
        placeholder={placeholder}
        size={size}
        onInputChange={updateInputValue}
        onBlur={() => this.forceUpdate()}
        menuPlacement={menuPosition}
        isDisabled={disabled}
      />
    );
  }
}

// must be exported after TimePicker class in order to be compatible with react-styleguide (see #1153)
export { toOption, parseInTimeFormat, createTimeList, filterTime, makeOptions };
