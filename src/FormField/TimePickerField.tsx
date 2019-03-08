import * as React from "react";
import * as cx from "classnames";
import TimePicker from "../TimePicker";
import { FormField } from "./FormField";

type DefaultProps = {
  /** an optional custom renderer for TimePicker */
  timePickerRenderer: (props: TimePicker.Props) => JSX.Element;
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
} & TimePicker.Props;

type InternalProps = NonDefaultProps & DefaultProps;

export namespace TimePickerField {
  export type Props = NonDefaultProps & Partial<DefaultProps>;
}

export class TimePickerField extends React.PureComponent<InternalProps> {
  static defaultProps: DefaultProps = {
    timePickerRenderer: props => <TimePicker {...props} />
  };

  render() {
    const {
      label,
      required,
      className: _className,
      viewProps,
      disabled,
      hint,
      timePickerRenderer,
      ..._timePickerProps
    } = this.props;
    const className = cx("time-picker-field", _className);
    const timePickerProps = {
      ..._timePickerProps,
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
        render={() => timePickerRenderer({ ...timePickerProps })}
      />
    );
  }
}
