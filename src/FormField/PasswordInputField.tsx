import * as React from 'react';
import { props, t, ReactChild } from '../utils';
import * as cx from 'classnames';
import View from 'react-flexview';
import { PasswordInput } from '../Input';
import { FormField } from './FormField';

export namespace PasswordInputField {
  export type Props = {
    /** the label for the field */
    label: JSX.Element | string,
    /** whether the field is required */
    required?: boolean,
    /** optional props to pass to the wrapping View */
    viewProps?: View.Props,
    /** an optional custom renderer for PasswordInput */
    passwordInputRenderer?: (props: PasswordInput.Props) => JSX.Element,
    /** an optional class name to pass to top level element of the component */
    className?: string,
    /** an optional style object to pass to top level element of the component */
    style?: React.CSSProperties,
    /** an optional id passed to the input component */
    id?: string
  } & PasswordInput.Props;
}

export const Props = {
  label: ReactChild,
  required: t.maybe(t.Boolean),
  viewProps: t.maybe(t.Object),
  passwordInputRenderer: t.maybe(t.Function)
}

@props(Props, { strict: false })
export class PasswordInputField extends React.PureComponent<PasswordInputField.Props> {
  render() {
    const { label, required, className: _className, id, viewProps, disabled, passwordInputRenderer, ..._inputProps } = this.props;
    const className = cx('password-input-field', _className);
    const inputProps = {
      ..._inputProps,
      disabled,
      id
    };

    return (
      <FormField
        label={label}
        required={required}
        className={className}
        fieldId={id}
        viewProps={viewProps}
        disabled={disabled}
      >
        {passwordInputRenderer ?
          passwordInputRenderer(inputProps) :
          <PasswordInput {...inputProps} />
        }
      </FormField>
    );
  }
}