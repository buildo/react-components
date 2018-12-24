import * as React from "react";
import * as cx from "classnames";
import FlexView from "react-flexview";
import { props, t } from "../utils";

export type RadioOption = {
  label: string;
  value: string;
};

export type RadioGroupRequiredProps = {
  /** name for the group */
  name: string;
  /** value */
  value?: string;
  /** onChange */
  onChange: (value: string) => void;
  /** text displayed on the right of the checkbox */
  options: Array<RadioOption>;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

export type RadioGroupDefaultProps = {
  /** true if disabled */
  disabled: boolean;
};

export namespace RadioGroup {
  export type Props = RadioGroupRequiredProps & Partial<RadioGroupDefaultProps>;
}

export const Props = {
  value: t.maybe(t.String),
  onChange: t.Function,
  options: t.list(t.interface({ label: t.String, value: t.String })),
  disabled: t.maybe(t.Boolean),
  className: t.maybe(t.String),
  id: t.maybe(t.String),
  style: t.maybe(t.Object)
};

@props(Props)
export class RadioGroup extends React.PureComponent<RadioGroup.Props> {
  static defaultProps: RadioGroupDefaultProps = {
    disabled: false
  };

  onChange = (option: RadioOption): React.EventHandler<any> => {
    return e => {
      e.stopPropagation();
      this.props.onChange(option.value);
    };
  };

  render() {
    const { id, className, style, disabled, options, name, value } = this.props;
    return (
      <FlexView
        shrink={false}
        id={id}
        style={style}
        role="radiogroup"
        className={cx(
          "radio-group",
          {
            "is-disabled": disabled
          },
          className
        )}
      >
        {options.map(option => (
          <FlexView
            key={option.value}
            vAlignContent="center"
            className={cx("radio-group-option", {
              "is-checked": option.value === value
            })}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              onChange={this.onChange(option)}
              checked={option.value === value}
            />
            <FlexView
              className="radio-group-label"
              onClick={this.onChange(option)}
            >
              {option.label}
            </FlexView>
          </FlexView>
        ))}
      </FlexView>
    );
  }
}
