import * as React from "react";
import * as cx from "classnames";
import FlexView from "react-flexview";
import { props, t } from "../utils";

export type CheckboxRequiredProps = {
  /** value */
  value: boolean;
  /** onChange */
  onChange: (value: boolean) => void;
  /** text displayed on the right of the checkbox */
  text?: string;
  /** called when the input is focused */
  onFocus?: React.FocusEventHandler<HTMLElement>;
  /** called when the input is blurred */
  onBlur?: React.FocusEventHandler<HTMLElement>;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

export type CheckboxDefaultProps = {
  /** true if disabled */
  disabled: boolean;
  /** true if readOnly */
  readOnly: boolean;
};

export namespace Checkbox {
  export type Props = CheckboxRequiredProps & Partial<CheckboxDefaultProps>;
}

export const Props = {
  value: t.Boolean,
  onChange: t.Function,
  text: t.maybe(t.String),
  disabled: t.maybe(t.Boolean),
  readOnly: t.maybe(t.Boolean),
  className: t.maybe(t.String),
  id: t.maybe(t.String),
  style: t.maybe(t.Object)
};

@props(Props)
export class Checkbox extends React.PureComponent<Checkbox.Props> {
  static defaultProps: CheckboxDefaultProps = {
    disabled: false,
    readOnly: false
  };

  onToggleCheckbox = () => this.props.onChange(!this.props.value);

  render() {
    const {
      disabled,
      value,
      id,
      className,
      text,
      style,
      onFocus,
      onBlur
    } = this.props;

    return (
      <FlexView
        shrink={false}
        vAlignContent="center"
        className={cx(
          "checkbox",
          {
            "is-disabled": disabled,
            "is-checked": value
          },
          className
        )}
        id={id}
        style={style}
      >
        <FlexView
          shrink={false}
          vAlignContent="center"
          hAlignContent="center"
          className="checkbox-ui"
          onClick={this.onToggleCheckbox}
          tabIndex={0}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {value && (
            <svg viewBox="0 0 19 14">
              <defs>
                <path
                  id="brc-check-icon"
                  d="M20.889 7.961l-10.53 10.53a1.733 1.733 0 0 1-2.453 0l-4.399-4.397A1.736 1.736 0 0 1 5.96 11.64l3.172 3.172 9.304-9.303a1.733 1.733 0 0 1 2.453 0 1.733 1.733 0 0 1 0 2.452"
                />
              </defs>
              <use
                fillRule="evenodd"
                transform="translate(-3 -5)"
                xlinkHref="#brc-check-icon"
              />
            </svg>
          )}
        </FlexView>

        {text && (
          <span className="text" onClick={this.onToggleCheckbox}>
            {text}
          </span>
        )}
      </FlexView>
    );
  }
}
