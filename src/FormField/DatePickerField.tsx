import * as React from "react";
import * as cx from "classnames";
import DatePicker from "../DatePicker";
import { FormField } from "./FormField";

type DefaultProps = {
  /** An optional custom renderer for DatePicker */
  datePickerRenderer: (props: DatePicker.Props) => JSX.Element;
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
} & DatePicker.Props;

type InternalProps = DefaultProps & NonDefaultProps;

export namespace DatePickerField {
  export type Props = NonDefaultProps & Partial<DefaultProps>;
}

export class DatePickerField extends React.PureComponent<InternalProps> {
  static defaultProps: DefaultProps = {
    datePickerRenderer: props => <DatePicker {...props} />
  };
  render() {
    const {
      label,
      required,
      className: _className,
      viewProps,
      disabled,
      hint,
      datePickerRenderer
    } = this.props;
    const className = cx("date-picker-field", _className);

    return (
      <FormField
        label={label}
        required={required}
        className={className}
        viewProps={viewProps}
        disabled={disabled}
        hint={hint}
        render={(onFocus, onBlur) =>
          datePickerRenderer({
            ...this.props,
            onFocusChange: focus => {
              focus ? onFocus() : onBlur();
            }
          })
        }
      />
    );
  }
}
