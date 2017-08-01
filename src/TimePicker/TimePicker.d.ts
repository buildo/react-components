import { CSSProperties, ComponentClass, MouseEventHandler } from 'react';
import { Type } from 'tcomb';
import { Option, MenuRendererProps } from 'react-select';

type TimeFormat = '24h' | '12h';
type Time = {
  hours: number, // [0,23]
  minutes: number // [0,59]
};
type TimeWithTimeFormat = Time & { timeFormat: TimeFormat };

export type TimePickerProps = {
  onChange: (t?: { originalInput?: string, hours?: number, minutes?: number }) => void,
  value?: Time,
  minTime?: Time,
  maxTime?: Time,
  placeholder?: string,
  timeFormat?: TimeFormat,
  searchable?: boolean,
  menuPosition?: 'bottom' | 'top',
  id?: string,
  className?: string,
  style?: CSSProperties,
  disabled?: boolean
};

export const Props: {
  [key: string]: Type<any>
};

declare const TimePicker: ComponentClass<TimePickerProps>;
export default TimePicker;

// exports used in tests
export const H24: '24h';
export const H12: '12h';
export const inputError: {};
export function toOption(time: TimeWithTimeFormat): Option;
export function parseInTimeFormat(inputStr: string, timeFormat: TimeFormat): {
  originalInput?: string,
  hours?: number,
  minutes?: number
};
export function createTimeList(time: Time, timeFormat: TimeFormat): TimeWithTimeFormat[];
export function filterTime(x: { originalInput: string, minTime: Time, maxTime: Time }): (t: Time) => boolean;
export function makeOptions(x: { minTime: Time, maxTime: Time, timeFormat: TimeFormat, userValue?: Time }, inputValue: string): Option[];
