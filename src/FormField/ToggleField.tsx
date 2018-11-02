import * as React from "react";
import { props, t, ReactChild } from "../utils";
import * as cx from "classnames";
import View from "react-flexview";
import Toggle from "../Toggle";
import { FormField } from "./FormField";

export namespace ToggleField {
  export type Props = {
    /** the label for the field */
    label: JSX.Element | string;
    /** whether the field is required */
    required?: boolean;
    /** optional props to pass to the wrapping View */
    viewProps?: View.Props;
    /** an optional custom renderer for Toggle */
    toggleRenderer?: (props: Toggle.Props) => JSX.Element;
    /** an optional class name to pass to top level element of the component */
    className?: string;
    /** an optional style object to pass to top level element of the component */
    style?: React.CSSProperties;
    /** an optional id passed to the input component */
    id?: string;
  } & Toggle.Props;
}

export const Props = {
  label: ReactChild,
  required: t.maybe(t.Boolean),
  viewProps: t.maybe(t.Object),
  toggleRenderer: t.maybe(t.Function)
};

@props(Props, { strict: false })
export class ToggleField extends React.PureComponent<ToggleField.Props> {
  render() {
    const {
      label,
      required,
      className: _className,
      id,
      viewProps,
      disabled,
      toggleRenderer,
      ..._toggleProps
    } = this.props;
    const className = cx("time-picker-field", _className);
    const toggleProps = {
      ..._toggleProps,
      disabled
    };

    return (
      <FormField
        label={label}
        required={required}
        className={className}
        viewProps={viewProps}
        disabled={disabled}
        id={id}
        horizontal={true}
      >
        {toggleRenderer ? (
          toggleRenderer(toggleProps)
        ) : (
          <Toggle {...toggleProps} />
        )}
      </FormField>
    );
  }
}
