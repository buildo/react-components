import * as React from 'react';
import { props, t, ReactChild } from '../utils';
import * as cx from 'classnames';
import View from 'react-flexview';
import DatePicker from '../DatePicker';
import { FormField } from './FormField';
import { ObjectOmit } from 'typelevel-ts';

export namespace DatePickerField {
  export type Props<T extends DatePicker.Value> = {
    /** the label for the field */
    label: JSX.Element | string,
    /** whether the field is required */
    required?: boolean,
    /** optional props to pass to the wrapping View */
    viewProps?: View.Props,
    /** an optional class name to pass to top level element of the component */
    className?: string,
    /** an optional style object to pass to top level element of the component */
    style?: React.CSSProperties,
    /** an optional id passed to the input component */
    id?: string
  } & ObjectOmit<DatePicker.Props<T>, 'returnFormat'>;  /* returnFormat is causing issues with the inference of OnChangeProps */
}

export const Props = {
  label: ReactChild,
  required: t.maybe(t.Boolean),
  viewProps: t.maybe(t.Object)
}

@props(Props, { strict: false })
export class DatePickerField<T extends DatePicker.Value> extends React.PureComponent<DatePickerField.Props<T>> {
  render() {
    const { label, required, className: _className, viewProps, id, disabled, onChange: _onChange, ...datePickerProps } = this.props;
    const className = cx('dropdown-field', _className);
    const DatePickerT = DatePicker as new() => DatePicker<T>; // TODO: use generics in JSX with TS 2.9
    const onChange = _onChange as (value?: T) => void;        // forcing onChange to be of type accepted if returnFormat is 'never'

    return (
      <FormField
        label={label}
        required={required}
        className={className}
        fieldId={id}
        viewProps={viewProps}
        disabled={disabled}
      >
        <DatePickerT {...datePickerProps} onChange={onChange} id={id} disabled={disabled} />
      </FormField>
    );
  }
}