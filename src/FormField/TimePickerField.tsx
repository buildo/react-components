import * as React from "react";
import { props, t, ReactChild } from "../utils";
import * as cx from "classnames";
import View from "react-flexview";
import TimePicker from "../TimePicker";
import { FormField } from "./FormField";

type DefaultProps = {
  /** an optional custom renderer for TimePicker */
  timePickerRenderer: (props: TimePicker.Props) => JSX.Element;
};

type NonDefaultProps = {
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
} & TimePicker.Props;

type InternalProps = NonDefaultProps & DefaultProps;

export namespace TimePickerField {
  export type Props = NonDefaultProps & Partial<DefaultProps>;
}

export const Props = {
  label: ReactChild,
  required: t.maybe(t.Boolean),
  viewProps: t.maybe(t.Object),
  timePickerRenderer: t.maybe(t.Function)
};

@props(Props, { strict: false })
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
        render={() => timePickerRenderer({ ...timePickerProps })}
      />
    );
  }
}
