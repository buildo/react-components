import * as React from "react";
import * as cx from "classnames";
import { props, t, ReactChildren, ObjectOverwrite, Children } from "../utils";
import omit = require("lodash/omit");
import InputChildren from "react-input-children";
import View from "react-flexview";

export type InputStatus = "success" | "failure";
const InputStatusT = t.enums.of(["success", "failure"]);

export type InputRequiredProps = ObjectOverwrite<
  InputChildren.Props,
  {
    /** value */
    value: string;
    /** onChange */
    onChange: (value: string) => void;
    /** input children */
    children?: Children;
    /** optional input status */
    status?: InputStatus;
    /** don't use this. Use `innerRef` instead */
    ref?: never;
  }
>;

export type InputDefaultProps = {
  /** true if disabled */
  disabled: boolean;
};

export namespace Input {
  export type Props = InputRequiredProps & Partial<InputDefaultProps>;
}
type InputDefaultedProps = InputRequiredProps & InputDefaultProps;

const successIcon = (
  <svg width="14" height="14" viewBox="0 0 24 28">
    <title>success</title>
    <path d="M20.062 11.469q0-0.438-0.281-0.719l-1.422-1.406q-0.297-0.297-0.703-0.297t-0.703 0.297l-6.375 6.359-3.531-3.531q-0.297-0.297-0.703-0.297t-0.703 0.297l-1.422 1.406q-0.281 0.281-0.281 0.719 0 0.422 0.281 0.703l5.656 5.656q0.297 0.297 0.703 0.297 0.422 0 0.719-0.297l8.484-8.484q0.281-0.281 0.281-0.703zM24 14q0 3.266-1.609 6.023t-4.367 4.367-6.023 1.609-6.023-1.609-4.367-4.367-1.609-6.023 1.609-6.023 4.367-4.367 6.023-1.609 6.023 1.609 4.367 4.367 1.609 6.023z" />
  </svg>
);
const failureIcon = (
  <svg width="14" height="14" viewBox="0 0 24 28">
    <title>error</title>
    <path d="M17.953 17.531q0-0.406-0.297-0.703l-2.828-2.828 2.828-2.828q0.297-0.297 0.297-0.703 0-0.422-0.297-0.719l-1.406-1.406q-0.297-0.297-0.719-0.297-0.406 0-0.703 0.297l-2.828 2.828-2.828-2.828q-0.297-0.297-0.703-0.297-0.422 0-0.719 0.297l-1.406 1.406q-0.297 0.297-0.297 0.719 0 0.406 0.297 0.703l2.828 2.828-2.828 2.828q-0.297 0.297-0.297 0.703 0 0.422 0.297 0.719l1.406 1.406q0.297 0.297 0.719 0.297 0.406 0 0.703-0.297l2.828-2.828 2.828 2.828q0.297 0.297 0.703 0.297 0.422 0 0.719-0.297l1.406-1.406q0.297-0.297 0.297-0.719zM24 14q0 3.266-1.609 6.023t-4.367 4.367-6.023 1.609-6.023-1.609-4.367-4.367-1.609-6.023 1.609-6.023 4.367-4.367 6.023-1.609 6.023 1.609 4.367 4.367 1.609 6.023z" />
  </svg>
);

export const Props = {
  value: t.String,
  onChange: t.Function,
  placeholder: t.maybe(t.String),
  disabled: t.maybe(t.Boolean),
  className: t.maybe(t.String),
  id: t.maybe(t.String),
  style: t.maybe(t.Object),
  children: t.maybe(ReactChildren),
  status: t.maybe(InputStatusT)
};

@props(Props, { strict: false })
export class Input extends React.PureComponent<Input.Props> {
  static defaultProps: InputDefaultProps = {
    disabled: false
  };

  _onChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value }
  }) => this.props.onChange(value);

  render() {
    const { className, value, status, wrapper = {}, ...props } = this
      .props as InputDefaultedProps;
    const { _onChange: onChange } = this;

    const isSuccess = status === "success";
    const isFailure = status === "failure";
    const children =
      this.props.children ||
      (isSuccess ? (
        <View vAlignContent="center">{successIcon}</View>
      ) : isFailure ? (
        <View vAlignContent="center">{failureIcon}</View>
      ) : (
        undefined
      ));

    const inputProps = {
      ...omit(props, ["onChange", "status", "children", "wrapper"]),
      children,
      value,
      onChange,
      wrapper: {
        ...wrapper,
        className: cx(
          "input",
          {
            "has-value": value !== "",
            "is-success": isSuccess,
            "is-failure": isFailure
          },
          wrapper.className,
          className
        )
      }
    };

    return <InputChildren {...inputProps} />;
  }
}
