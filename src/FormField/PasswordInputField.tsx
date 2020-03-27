import * as React from "react";
import * as cx from "classnames";
import { PasswordInput } from "../Input";
import { FormField } from "./FormField";

type DefaultProps = {
  /** an optional custom renderer for PasswordInput */
  passwordInputRenderer: (props: PasswordInput.Props) => JSX.Element;
};

type NonDefaultProps = {
  /** the label for the field */
  label: FormField.Props["label"];
  /** whether the field is required */
  required?: FormField.Props["required"];
  /** optional props to pass to the wrapping View */
  viewProps?: FormField.Props["viewProps"];
  /** an optional hint describing what's the expected value for the field (e.g. sample value or short description) */
  hint?: FormField.Props["hint"];
  /** an optional class name to pass to top level element of the component */
  className?: string;
  /** an optional style object to pass to top level element of the component */
  style?: React.CSSProperties;
  /** the properties of password input */
  passwordInputProps: PasswordInput.Props;
};

type InternalProps = NonDefaultProps & DefaultProps;

export namespace PasswordInputField {
  export type Props = NonDefaultProps & Partial<DefaultProps>;
}

export class PasswordInputField extends React.PureComponent<InternalProps> {
  static defaultProps: DefaultProps = {
    passwordInputRenderer: props => <PasswordInput {...props} />
  };

  render() {
    const {
      label,
      required,
      className,
      viewProps,
      hint,
      passwordInputRenderer,
      passwordInputProps
    } = this.props;

    return (
      <FormField
        label={label}
        required={required}
        className={cx("password-input-field", className)}
        viewProps={viewProps}
        disabled={passwordInputProps.disabled}
        hint={hint}
        render={(onFocus, onBlur) =>
          passwordInputRenderer({ ...passwordInputProps, onFocus, onBlur })
        }
      />
    );
  }
}
