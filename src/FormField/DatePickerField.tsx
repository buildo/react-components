import * as React from "react";
import { ObjectOmit } from "../utils";
import * as cx from "classnames";
import DatePicker from "../DatePicker";
import { FormField } from "./FormField";

type DefaultProps<T extends DatePicker.Value> = {
  /** An optional custom renderer for DatePicker */
  datePickerRenderer: (props: DatePicker.Props<T>) => JSX.Element;
};

type NonDefaultProps<T extends DatePicker.Value> = {
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
} & ObjectOmit<
  DatePicker.Props<T>,
  "returnFormat"
>; /* returnFormat is causing issues with the inference of OnChangeProps */

type InternalProps<T extends DatePicker.Value> = DefaultProps<T> &
  NonDefaultProps<T>;

export namespace DatePickerField {
  export type Props<T extends DatePicker.Value> = NonDefaultProps<T> &
    Partial<DefaultProps<T>>;
}

export class DatePickerField<
  T extends DatePicker.Value
> extends React.PureComponent<InternalProps<T>> {
  static defaultProps: DefaultProps<any> = {
    datePickerRenderer: props => <DatePicker {...props} />
  };

  render() {
    const {
      label,
      required,
      className: _className,
      viewProps,
      id,
      disabled,
      hint,
      onChange: _onChange,
      datePickerRenderer,
      ..._datePickerProps
    } = this.props;
    const className = cx("date-picker-field", _className);
    const onChange = _onChange as (value?: T) => void; // forcing onChange to be of type accepted if returnFormat is 'never'
    const datePickerProps = {
      ..._datePickerProps,
      onChange,
      id,
      disabled
    };

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
            ...datePickerProps,
            onFocusChange: focus => {
              focus ? onFocus() : onBlur();
            }
          })
        }
      />
    );
  }
}
