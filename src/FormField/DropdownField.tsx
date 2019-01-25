import * as React from "react";
import { props, t, ReactChild } from "../utils";
import * as cx from "classnames";
import View from "react-flexview";
import Dropdown from "../Dropdown";
import { FormField } from "./FormField";

export namespace DropdownField {
  export type Props = {
    /** the label for the field */
    label: JSX.Element | string;
    /** whether the field is required */
    required?: boolean;
    /** optional props to pass to the wrapping View */
    viewProps?: View.Props;
    /** An optional custom renderer for Dropdown */
    dropdownRenderer?: (props: Dropdown.Props) => JSX.Element;
    /** an optional class name to pass to top level element of the component */
    className?: string;
    /** an optional style object to pass to top level element of the component */
    style?: React.CSSProperties;
  } & Dropdown.Props;
}

export const Props = {
  label: ReactChild,
  required: t.maybe(t.Boolean),
  viewProps: t.maybe(t.Object),
  dropdownRenderer: t.maybe(t.Function)
};

@props(Props, { strict: false })
export class DropdownField extends React.PureComponent<DropdownField.Props> {
  render() {
    const {
      label,
      required,
      className: _className,
      viewProps,
      disabled,
      dropdownRenderer,
      ..._dropdownProps
    } = this.props;
    const className = cx("dropdown-field", _className);
    const dropdownProps = {
      ..._dropdownProps,
      disabled
    };

    return (
      <FormField
        label={label}
        required={required}
        className={className}
        viewProps={viewProps}
        disabled={disabled}
      >
        {dropdownRenderer ? (
          dropdownRenderer(dropdownProps)
        ) : (
          <Dropdown {...dropdownProps} />
        )}
      </FormField>
    );
  }
}
