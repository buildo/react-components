import * as React from "react";
import { props, t, ReactChild, ObjectOmit } from "../utils";
import * as cx from "classnames";
import View from "react-flexview";
import { PasswordInput } from "../Input";
import { FormField } from "./FormField";

type DefaultProps = {
  /** an optional custom renderer for PasswordInput */
  passwordInputRenderer: (props: PasswordInput.Props) => JSX.Element;
};

type FieldProps = {
  /** the label for the field */
  label: JSX.Element | string;
  /** whether the field is required */
  required?: boolean;
  /** optional props to pass to the wrapping View */
  viewProps?: View.Props;

  /** an optional class name to pass to top level element of the component */
  className?: string;
  /** an optional style object to pass to top level element of the component */
  style?: React.CSSProperties;
};

type NonDefaultProps = FieldProps &
  ObjectOmit<PasswordInput.Props, keyof FieldProps>;

type InternalProps = NonDefaultProps & DefaultProps;

export namespace PasswordInputField {
  export type Props = NonDefaultProps & Partial<DefaultProps>;
}

export const Props = {
  label: ReactChild,
  required: t.maybe(t.Boolean),
  viewProps: t.maybe(t.Object),
  passwordInputRenderer: t.maybe(t.Function)
};

@props(Props, { strict: false })
export class PasswordInputField extends React.PureComponent<InternalProps> {
  static defaultProps: DefaultProps = {
    passwordInputRenderer: props => <PasswordInput {...props} />
  };

  render() {
    const {
      label,
      required,
      className: _className,
      viewProps,
      disabled,
      passwordInputRenderer,
      ..._inputProps
    } = this.props;
    const className = cx("password-input-field", _className);
    const inputProps = {
      ..._inputProps,
      disabled
    };

    return (
      <FormField
        label={label}
        required={required}
        className={className}
        viewProps={viewProps}
        disabled={disabled}
        render={(onFocus, onBlur) =>
          passwordInputRenderer({ ...inputProps, onFocus, onBlur })
        }
      />
    );
  }
}
