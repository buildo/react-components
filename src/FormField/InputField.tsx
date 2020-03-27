import * as React from "react";
import * as cx from "classnames";
import Input from "../Input";
import { FormField } from "./FormField";

type DefaultProps = {
  /** An optional custom renderer for Input */
  inputRenderer: (props: Input.Props) => JSX.Element;
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
  /** the properties of the input */
  inputProps: Input.Props;
};

type InternalProps = DefaultProps & NonDefaultProps;

export namespace InputField {
  export type Props = NonDefaultProps & Partial<DefaultProps>;
}

export class InputField extends React.PureComponent<InternalProps> {
  static defaultProps: DefaultProps = {
    inputRenderer: (props: Input.Props) => <Input {...props} />
  };

  render() {
    const {
      label,
      required,
      className,
      viewProps,
      hint,
      inputRenderer,
      inputProps
    } = this.props;

    return (
      <FormField
        label={label}
        required={required}
        className={cx("input-field", className)}
        viewProps={viewProps}
        disabled={inputProps.disabled}
        hint={hint}
        render={(onFocus, onBlur) =>
          inputRenderer({ ...inputProps, onFocus, onBlur })
        }
      />
    );
  }
}
