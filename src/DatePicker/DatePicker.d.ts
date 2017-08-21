import { PureComponent, CSSProperties } from 'react';
import { Type } from 'tcomb';
import moment from 'moment';

type Value = string | Date | moment.Moment;

export type DatePickerProps = {
  id?: string,
  value?: Value,
  defaultValue?: Value,
  onChange?: (date?: moment.Moment) => void,
  onHide?: () => void,
  returnFormat?: string,
  displayFormat?: string,
  onClear: () => void,
  minDate?: Value,
  maxDate?: Value,
  fromDate?: Value,
  toDate?: Value,
  displayTwoMonths?: boolean,
  small?: boolean,
  startDate?: Value,
  locale?: string,
  disabled?: boolean,
  className?: string,
  style?: CSSProperties
}

export const Props: {
  [key: string]: Type<any>
};

export default class DatePicker extends PureComponent<DatePickerProps> {}
