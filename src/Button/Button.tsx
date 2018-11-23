import * as React from "react";
import * as cx from "classnames";
import every = require("lodash/every");
import { props, t, stateClassUtil } from "../utils";
import { ReactChild } from "tcomb-react";
import { TextOverflow } from "../TextOverflow/TextOverflow";
import FlexView from "react-flexview";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export type ButtonRequiredProps = {
  /** callback */
  onClick: (e: React.SyntheticEvent<HTMLDivElement>) => void;
  /** can be a String, or a dictionary { [buttonState]: String }, t.maybe(t.union([t.Str,  stringForButtonStates]) */
  label?: string | Button.ButtonStateMap<string>;
  /** otherwise just pass a string as children */
  children?: string;
  /** type of the button (default, primary, positive, negative, flat) */
  type?: Button.ButtonType;
  /** shortcut for type "flat" */
  flat?: boolean;
  /** can be a component referring to an Icon, or a dictionary { [buttonState]: JSX.Element } */
  icon?: JSX.Element | Button.ButtonStateMap<JSX.Element>;
};

export type ButtonDefaultProps = {
  /** function to handle the overflow of too long labels, replacing with ellipsed string and tooltip */
  textOverflow: Button.TextOverflowCompatibleComponent;
  /** ready, not-allowed, processing, success, error; overrides `baseState`, use it if you want button to be a functional component */
  buttonState: Button.ButtonState;
  /** size of the button, one of 'tiny', 'small', 'medium' */
  size: Button.ButtonSize;
  /** fluid (block) button, takes the width of the container */
  fluid: boolean;
  /** shortcut for type "primary" */
  primary: boolean;
  /** circular button, this is allowed only if it's an icon button */
  circular: boolean;
  /** an optional class name to pass to first inner element of the component */
  className: string;
  /** an optional style object to pass to first inner element of the component */
  style: React.CSSProperties;
};

export namespace Button {
  export type TextOverflowCompatibleComponent = React.ComponentClass<
    TextOverflow.Props
  >;
  export type ButtonStateMap<T> = { [key in Button.ButtonState]?: T };
  export type ButtonState =
    | "ready"
    | "not-allowed"
    | "processing"
    | "error"
    | "success";
  export type ButtonType =
    | "default"
    | "primary"
    | "positive"
    | "negative"
    | "flat";
  export type ButtonSize = "tiny" | "small" | "medium";

  export type Props = ButtonRequiredProps & Partial<ButtonDefaultProps>;
}

type ButtonDefaultedProps = ButtonRequiredProps & ButtonDefaultProps;

// types
export const buttonStates: Button.ButtonState[] = [
  "ready",
  "not-allowed",
  "processing",
  "error",
  "success"
];
const ButtonState = t.enums.of(buttonStates, "ButtonState");
export const buttonTypes: Button.ButtonType[] = [
  "default",
  "primary",
  "positive",
  "negative",
  "flat"
];
const ButtonType = t.enums.of(buttonTypes, "ButtonType");
export const buttonSizes: Button.ButtonSize[] = ["tiny", "small", "medium"];
const ButtonSize = t.enums.of(buttonSizes, "ButtonSize");

// util
const notBoth = (a: any, b: any): boolean => !(a && b);
const satisfyAll = (...conditions: Array<(props: Button.Props) => boolean>) => (
  props: ButtonRequiredProps
) => every(conditions, c => c(props));

// invariants
const propsInvariants: Array<(props: Button.Props) => boolean> = [
  ({ label, icon, children }) => notBoth(label || icon, children), // notBothChildrenAndLabelOrIcon
  ({ primary, flat }) => notBoth(primary, flat), // notBothFlatAndPrimary
  ({ fluid, circular }) => notBoth(fluid, circular), // notBothFluidAndCircular
  ({ circular, icon, label }) => !circular || !!(icon && !label), // circularOnlyIfIconAndNotLabel
  ({ type, primary, flat }) => notBoth(type, flat || primary) // notBothTypeAndItsShortucts
];

export const ButtonPropTypes = {
  buttonState: t.maybe(ButtonState),
  onClick: t.Function,
  label: t.maybe(t.union([t.String, t.dict(ButtonState, t.String)])),
  icon: t.maybe(t.union([ReactChild, t.dict(ButtonState, ReactChild)])),
  children: t.maybe(t.String),
  type: t.maybe(ButtonType),
  primary: t.maybe(t.Boolean),
  flat: t.maybe(t.Boolean),
  size: t.maybe(ButtonSize),
  fluid: t.maybe(t.Boolean),
  circular: t.maybe(t.Boolean),
  textOverflow: t.maybe(t.Function),
  style: t.maybe(t.Object),
  className: t.maybe(t.String)
};

export const Props = t.refinement(
  t.struct(ButtonPropTypes),
  satisfyAll(...propsInvariants),
  "ButtonProps"
);

const defaultLabels = {
  success: "success",
  error: "error",
  processing: "processing"
};

const defaultSuccessIcon = (
  <svg width="16" height="16" viewBox="0 0 28 28">
    <title>check</title>
    <path
      fill="#ffffff"
      d="M26.109 8.844q0 0.625-0.438 1.062l-13.438 13.438q-0.438 0.438-1.062 0.438t-1.062-0.438l-7.781-7.781q-0.438-0.438-0.438-1.062t0.438-1.062l2.125-2.125q0.438-0.438 1.062-0.438t1.062 0.438l4.594 4.609 10.25-10.266q0.438-0.438 1.062-0.438t1.062 0.438l2.125 2.125q0.438 0.437 0.438 1.062z"
    />
  </svg>
);
const defaultErrorIcon = (
  <svg width="10" height="16" viewBox="0 0 10 28">
    <title>exclamation</title>
    <path
      fill="#ffffff"
      d="M8 19.5v3.5q0 0.406-0.297 0.703t-0.703 0.297h-4q-0.406 0-0.703-0.297t-0.297-0.703v-3.5q0-0.406 0.297-0.703t0.703-0.297h4q0.406 0 0.703 0.297t0.297 0.703zM8.469 3l-0.438 12q-0.016 0.406-0.32 0.703t-0.711 0.297h-4q-0.406 0-0.711-0.297t-0.32-0.703l-0.438-12q-0.016-0.406 0.273-0.703t0.695-0.297h5q0.406 0 0.695 0.297t0.273 0.703z"
    />
  </svg>
);

const defaultIcons = {
  success: defaultSuccessIcon,
  error: defaultErrorIcon
};

@props(Props)
export class Button extends React.PureComponent<Button.Props> {
  static defaultProps: ButtonDefaultProps = {
    textOverflow: TextOverflow,
    buttonState: "ready",
    size: "small",
    fluid: false,
    primary: false,
    circular: false,
    className: "",
    style: {}
  };

  templateLoading = () => (
    <FlexView
      className="button-loading"
      shrink={false}
      vAlignContent="center"
      hAlignContent="center"
    >
      <LoadingSpinner size="1em" overlayColor="transparent" />
    </FlexView>
  );

  templateIcon = (icon: JSX.Element) => (
    <FlexView className="button-icon" shrink={false}>
      {icon}
    </FlexView>
  );

  // TODO: the popover props is not handled by TextOverflow
  templateLabel = (
    label: string,
    TextOverflow: Button.TextOverflowCompatibleComponent
  ) => (
    <FlexView
      className="button-label"
      column
      shrink={false}
      vAlignContent="center"
      hAlignContent="center"
    >
      <TextOverflow label={label} popover={{ offsetY: -8 }} />
    </FlexView>
  );

  render() {
    const {
      buttonState,
      circular,
      className: _className,
      flat,
      fluid,
      icon: _icon,
      label: _label,
      children,
      onClick,
      primary,
      size,
      style,
      textOverflow,
      type
    } = this.props as ButtonDefaultedProps;

    const l = _label || children;

    const labels = {
      ...defaultLabels,
      ...(t.String.is(l) ? { ready: l, "not-allowed": l } : l)
    };

    const icons = {
      ...defaultIcons,
      ...(_icon && React.isValidElement(_icon)
        ? { ready: _icon, "not-allowed": _icon }
        : _icon)
    };

    const getButtonType = () =>
      type || (primary && "primary") || (flat && "flat") || "default";

    const wrapperStyle = {
      display: fluid ? "block" : "inline-block",
      width: fluid ? "100%" : undefined
    };

    const isIconButton = (): boolean => !!_icon && !_label;

    const className = cx(
      stateClassUtil([getButtonType()]),
      { "icon-button": isIconButton() },
      { circular },
      stateClassUtil([size]),
      _className
    );

    const label = labels[buttonState];
    const icon = icons[buttonState];
    const loading = buttonState === "processing";

    return (
      <div className="button" style={wrapperStyle}>
        <FlexView
          className={cx(
            "button-inner",
            className,
            stateClassUtil([buttonState])
          )}
          vAlignContent="center"
          hAlignContent="center"
          onClick={buttonState === "ready" ? onClick : () => {}}
          style={style}
        >
          {loading && this.templateLoading()}
          {icon && this.templateIcon(icon)}
          {label && this.templateLabel(label, textOverflow)}
        </FlexView>
      </div>
    );
  }
}
