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
    const { disabled, value, id, className, text, style } = this.props;

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
          tabIndex={1}
          className="checkbox-ui"
          onClick={this.onToggleCheckbox}
        >
          {value && (
            <svg viewBox="0 0 28 28">
              <path d="M26.109 8.844q0 0.625-0.438 1.062l-13.438 13.438q-0.438 0.438-1.062 0.438t-1.062-0.438l-7.781-7.781q-0.438-0.438-0.438-1.062t0.438-1.062l2.125-2.125q0.438-0.438 1.062-0.438t1.062 0.438l4.594 4.609 10.25-10.266q0.438-0.438 1.062-0.438t1.062 0.438l2.125 2.125q0.438 0.437 0.438 1.062z" />
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
