import * as React from "react";
import * as cx from "classnames";
import View from "react-flexview";
import Popover from "../Popover";
import { ObjectOmit } from "../utils";

export namespace FormField {
  export type Props = {
    /** the label for the field */
    label: JSX.Element | string;
    /** whether the field is required */
    required?: boolean;
    /** whether the field is disabled */
    disabled?: boolean;
    /** the input component to wrap */
    render: (onFocus: () => void, onBlur: () => void) => JSX.Element;
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
          content: NonNullable<React.ReactElement>;
          type: "box" | "label";
        }
      | {
          content: NonNullable<React.ReactElement>;
          type: "tooltip";
          popover?: ObjectOmit<Popover.Props["popover"], "content">;
        };
  };
}

const leftArrow = (
  <svg
    className="form-field-hint-left-arrow"
    width="5.75"
    height="12"
    viewBox="0 0 5.75 12"
  >
    <path d="M5.75 0.67L5.68 11.86L0.06 6.17L5.75 0.67Z" />
  </svg>
);

type State = {
  focused: boolean;
  mouseover: boolean;
};

export class FormField extends React.PureComponent<FormField.Props, State> {
  state: State = { focused: false, mouseover: false };

  stateChange = <K extends keyof State>(k: K, value: State[K]) => () => {
    this.setState(s => ({ ...s, [k]: value }));
  };

  renderFieldWithHint = (
    render: FormField.Props["render"],
    hint: FormField.Props["hint"]
  ) => {
    const Field = render(
      this.stateChange("focused", true),
      this.stateChange("focused", false)
    );

    if (hint) {
      switch (hint.type) {
        case "label":
          return (
            <View grow column>
              {Field}
              <View className={cx("form-field-hint", "form-field-hint-label")}>
                {hint.content}
              </View>
            </View>
          );
        case "box":
          return (
            <View grow>
              {Field}
              <View
                shrink={false}
                className={cx("form-field-hint", "form-field-hint-box")}
              >
                {hint.content}
              </View>
            </View>
          );
        case "tooltip":
          return (
            <Popover
              key="popover"
              className={cx("form-field-hint", "form-field-hint-tooltip")}
              popover={{
                position: "right",
                anchor: "start",
                isOpen: this.state.focused || this.state.mouseover,
                ...hint.popover,
                content: (
                  <View style={{ pointerEvents: "none" }}>
                    <View shrink={false}>{leftArrow}</View>
                    <View grow className="form-field-hint-content">
                      {hint.content}
                    </View>
                  </View>
                )
              }}
            >
              {Field}
            </Popover>
          );
      }
    }
    return Field;
  };

  render() {
    const {
      label,
      required,
      disabled,
      className: _className,
      viewProps: _viewProps,
      horizontal,
      onLabelClick,
      render,
      hint
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

    const fieldComponent = this.renderFieldWithHint(render, hint);

    return (
      <View
        grow={!horizontal}
        {..._viewProps}
        className={className}
        onMouseOver={this.stateChange("mouseover", true)}
        onMouseOut={this.stateChange("mouseover", false)}
      >
        <View grow column={!horizontal}>
          {horizontal
            ? [fieldComponent, labelComponent]
            : [labelComponent, fieldComponent]}
        </View>
      </View>
    );
  }
}
