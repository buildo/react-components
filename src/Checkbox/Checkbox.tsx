import * as React from "react";
import * as cx from "classnames";
import { props, t } from "../utils";

export namespace Checkbox {
  export type Props = {
    value: boolean;
    onChange: (value: boolean) => void;
    disabled: boolean;
    className: string,
    style: React.CSSProperties
  }
}

export const Props = {
  value: t.Boolean,
  onChange: t.Function
}

@props(Props, { strict: false })
export default class Checkbox extends React.PureComponent<Checkbox.Props> {

  onClick: () => void = () => {
    this.props.onChange(!this.props.value);
  }

  render() {
    const { value, className } = this.props;
    return (
      <input
        className={cx("checkbox", className)}
        type="checkbox"
        value={value.toString()}
        onClick={this.onClick}
      />
    );
  }
}
