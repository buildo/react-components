import * as React from "react";
import { props, t } from "../utils";
import * as cx from "classnames";
import { warn } from "../utils/log";

export const Props = {
  value: t.maybe(t.Boolean),
  onChange: t.maybe(t.Function),
  disabled: t.maybe(t.Boolean),
  size: t.maybe(t.union([t.String, t.Number])),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

export type ToggleDefaultProps = {
  /** the current value (`true` if checked) */
  value: boolean;
};

export type ToggleRequiredProps = {
  /** callback called when user clicks on the Toggle */
  onChange?: (value: boolean) => void;
  /** disable the onClick callback and renders with reduced opacity */
  disabled?: boolean;
  /** The size for the Toggle in whatever unit (px, em, rem ...). It will be used to compute `width`, `height` and `border-radius` as follows: `width: size`, `height: size / 2`, `border-radius: size / 2` */
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
};

export namespace Toggle {
  export type Props = ToggleRequiredProps & Partial<ToggleDefaultProps>;
}
type ToggleDefaultedProps = ToggleRequiredProps & ToggleDefaultProps;

/**
 * A nice animated Toggle rendered using only CSS
 */
@props(Props)
export class Toggle extends React.PureComponent<Toggle.Props> {
  private checkbox: HTMLInputElement | null;

  static defaultProps: ToggleDefaultProps = {
    value: false
  };

  componentDidMount() {
    this.updateCheckbox(this.props as ToggleDefaultedProps);
  }

  componentWillReceiveProps(nextProps: Toggle.Props) {
    this.updateCheckbox(nextProps as ToggleDefaultedProps);
  }

  updateCheckbox = (props: ToggleDefaultedProps) => {
    if (this.checkbox) {
      this.checkbox.checked = props.value;
    }
  };

  getHalfSize(size: string | number) {
    if (t.String.is(size)) {
      const unitMatch = /[a-z]+$/.exec(size); // only match characters at the end
      const number = parseFloat(size);
      const unit = unitMatch ? unitMatch[0] : "";
      if (isFinite(number)) {
        // we can still get NaN from parseFloat
        return `${number / 2}${unit}`;
      } else {
        warn("Invalid size");
        return 0;
      }
    } else {
      return size / 2;
    }
  }

  onButtonClick = () => {
    const { value, onChange } = this.props;
    onChange && onChange(!value);
  };

  render() {
    const { onButtonClick } = this;

    const { value, className: _className, size, style, disabled } = this
      .props as ToggleDefaultedProps;

    const buttonProps = {
      onClick: disabled ? undefined : onButtonClick,
      style: size
        ? {
            width: size,
            height: this.getHalfSize(size),
            borderRadius: this.getHalfSize(size)
          }
        : undefined
    };
    const className = cx("toggle", { disabled }, _className);

    return (
      <div {...{ className, style }}>
        <input
          className="toggle-input"
          type="checkbox"
          ref={c => {
            this.checkbox = c;
          }}
          value={value.toString()}
          readOnly
        />
        <label className="toggle-button" {...buttonProps} />
      </div>
    );
  }
}
