import * as React from "react";
import * as cx from "classnames";
import View from "react-flexview";
import Popover from "../Popover";

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
    /** an optional hint describing what's the expected value for the field (e.g. sample value or short description) */
    hint?:
      | {
          content: JSX.Element | string;
          type: "box" | "label";
        }
      | {
          content: JSX.Element | string;
          type: "popover";
          popover?: Popover.Props["popover"];
        };
  };
}

export class FormField extends React.PureComponent<FormField.Props> {
  render() {
    const {
      label,
      required,
      disabled,
      children,
      className: _className,
      viewProps: _viewProps,
      horizontal,
      onLabelClick
    } = this.props;
    const className = cx("form-field", _className, {
      "is-disabled": disabled,
      "is-required": required,
      "is-horizontal": horizontal
    });
    const labelStyle: React.CSSProperties = onLabelClick
      ? { cursor: "pointer", userSelect: "none" }
      : {};

    const labelComponent = (
      <View className="form-field-label" vAlignContent="center" key="label">
        <View className="label" onClick={onLabelClick} style={labelStyle}>
          {label}
        </View>
      </View>
    );

    const hintComponent = !!this.props.hint && (
      <View
        className={cx("form-field-hint", {
          ["form-field-hint-box"]: this.props.hint.type === "box",
          ["form-field-hint-tooltip"]: this.props.hint.type === "popover",
          ["form-field-hint-label"]: this.props.hint.type === "label"
        })}
      >
        {this.props.hint.content}
      </View>
    );

    const fieldComponent =
      this.props.hint && this.props.hint.type === "popover" ? (
        <Popover
          popover={{
            ...this.props.hint.popover,
            content: hintComponent
          }}
        >
          {children}
        </Popover>
      ) : (
        children
      );

    return (
      <View
        column={!this.props.hint || this.props.hint.type === "label"}
        grow={!horizontal}
        {..._viewProps}
        className={className}
      >
        <View column={!horizontal}>
          {horizontal
            ? [fieldComponent, labelComponent]
            : [labelComponent, fieldComponent]}
        </View>
        {this.props.hint && this.props.hint.type !== "popover" && hintComponent}
      </View>
    );
  }
}
