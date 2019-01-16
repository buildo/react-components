import * as React from "react";
import { props, t, ReactChild, ReactChildren } from "../utils";
import * as cx from "classnames";
import View from "react-flexview";

export namespace FormField {
  export type Props = {
    /** the label for the field */
    label: JSX.Element | string;
    /** whether the field is required */
    required?: boolean;
    /** whether the field is disabled */
    disabled?: boolean;
    /** the input component to wrap */
    children: JSX.Element;
    /** the id of the input component, passed to <label> as 'htmlFor' */
    fieldId?: string;
    /** optional props to pass to the wrapping View */
    viewProps?: View.Props;
    /** wheter the label should be put on the same line of the component */
    horizontal?: boolean;
    /** optional callback when the field label is clicked */
    onLabelClick?: () => void;
    /** an optional class name to pass to top level element of the component */
    className?: string;
    /** an optional style object to pass to top level element of the component */
    style?: React.CSSProperties;
    /** an optional id to pass to top level element of the component */
    id?: string;
  };
}

export const Props = {
  label: ReactChild,
  required: t.maybe(t.Boolean),
  disabled: t.maybe(t.Boolean),
  children: ReactChildren,
  fieldId: t.maybe(t.String),
  viewProps: t.maybe(t.Object),
  horizontal: t.maybe(t.Boolean),
  onLabelClick: t.maybe(t.Function),
  className: t.maybe(t.String),
  style: t.maybe(t.Object),
  id: t.maybe(t.String)
};

@props(Props)
export class FormField extends React.PureComponent<FormField.Props> {
  render() {
    const {
      label,
      required,
      disabled,
      children,
      className: _className,
      fieldId,
      viewProps: _viewProps,
      horizontal,
      onLabelClick
    } = this.props;
    const className = cx("form-field", _className, {
      "is-disabled": disabled,
      "is-required": required,
      "is-horizontal": horizontal
    });
    const viewStyle: React.CSSProperties = {
      flexDirection: horizontal ? "row-reverse" : undefined,
      ...(_viewProps || {}).style
    };
    const viewProps = {
      grow: !horizontal,
      column: !horizontal,
      ..._viewProps,
      className,
      style: viewStyle
    };
    const labelStyle: React.CSSProperties = onLabelClick
      ? { cursor: "pointer", userSelect: "none" }
      : {};

    return (
      <View {...viewProps}>
        <View className="form-field-label" vAlignContent="center" key="label">
          <label htmlFor={fieldId} onClick={onLabelClick} style={labelStyle}>
            {label}
          </label>
        </View>
        {children}
      </View>
    );
  }
}
