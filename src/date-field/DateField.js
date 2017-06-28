import React from 'react';
import { props, t } from '../utils';
import every from 'lodash/every';
import cx from 'classnames';
import View from 'react-flexview';

import './dateField.scss';

export const Props = {
  value: t.maybe(t.Date),
  onChange: t.Function,
  onValidChange: t.Function
};

function parseDate(date) {
  return {
    day: String(date.getDate()),
    month: String(date.getMonth() + 1),
    year: String(date.getFullYear())
  };
}

const defaultState = {
  day: '',
  month: '',
  year: '',
  isValid: false
};

/** A simple component used to visually divide UI elements
 * @param value - JS Date
 * @param onChange - callback
 * @param onValidChange - callback
 */
@props(Props)
export default class DateField extends React.PureComponent {

  state = this.props.value ? {
    ...parseDate(this.props.value),
    isValid: true
  } : defaultState

  componentWillReceiveProps(nextProps) {
    if (!nextProps.value && this.props.value) { // "value" has become "undefined"
      this.setState(defaultState);
    } else if ((nextProps.value && !this.props.value) || (nextProps.value && this.props.value && nextProps.value.getTime() !== this.props.value.getTime())) { // "value" exists and has changed
      const { day, month, year } = parseDate(nextProps.value);

      if (parseInt(day) !== parseInt(this.state.day) || parseInt(month) !== parseInt(this.state.month) || parseInt(year) !== parseInt(this.state.year)) {
        this.setState({ day, month, year });
      }
    }
  }

  parseValue(value) {
    if (value.length === 0) {
      return '';
    } else if (/^\d+$/.test(value)) {
      return value;
    } else {
      return null;
    }
  }

  onChange = key => ({ target: { value } }) => {
    const parsedValue = this.parseValue(value);

    // exit if parsedValue is "null"
    if (parsedValue === null) {
      return;
    }

    const patch = {
      [key]: parsedValue
    };

    const values = {
      ...this.state,
      ...patch
    };

    const isValid = this.isValid(values);

    if (this.state.isValid !== isValid) {
      this.props.onValidChange(isValid);
    }

    if (isValid && every([values.day, values.month, values.year], s => s.length > 0)) {
      this.props.onChange(new Date(values.year, values.month - 1, values.day));
    }

    this.setState({ isValid, ...patch });
  }

  isValid({ year, month, day }) {
    const _date = new Date(year, parseInt(month) - 1, day);
    return parseInt(year) === _date.getFullYear() && parseInt(month) === _date.getMonth() + 1 && parseInt(day) === _date.getDate();
  }

  render() {
    const {
      props: { className, id, style },
      state: { day, month, year, isValid },
      onChange
    } = this;

    return (
      <View className={cx('date-field', className, { 'is-invalid': !isValid })} id={id} style={style}>
        <input className='day-field' value={day} placeholder='dd' onChange={onChange('day')} type='number' />
        <input className='month-field' value={month} placeholder='mm' onChange={onChange('month')} type='number' />
        <input className='year-field' value={year} placeholder='yyyy' onChange={onChange('year')} type='number' />
      </View>
    );
  }
}
