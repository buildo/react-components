import * as React from 'react';
import * as cx from 'classnames';
import FlexView from 'react-flexview';

export type RadioOption<T = string> = {
  label: string;
  value: T;
};

export type RadioGroupRequiredProps<T = string> = {
  /** value */
  value?: T;
  /** onChange */
  onChange: (value: T) => void;
  getValueKey?: (value: T) => string;
  /** text displayed on the right of the checkbox */
  options: Array<RadioOption<T>>;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

export type RadioGroupDefaultProps = {
  /** true if disabled */
  disabled: boolean;
  /** true if should layout options horizontally */
  horizontal: boolean;
};

export namespace RadioGroup {
  export type Props<T> = RadioGroupRequiredProps<T> & Partial<RadioGroupDefaultProps>;
}

export class RadioGroup<T> extends React.PureComponent<RadioGroup.Props<T>> {
  static defaultProps: RadioGroupDefaultProps = {
    disabled: false,
    horizontal: false
  };

  onChange = (option: RadioOption<T>): React.EventHandler<any> => {
    return e => {
      e.stopPropagation();
      if (!this.props.disabled) {
        this.props.onChange(option.value);
      }
    };
  };

  render() {
    const { id, className, style, disabled, options, value, horizontal } = this.props;
    const defaultedGetValueKey = this.props.getValueKey
      ? this.props.getValueKey
      : (value: T) => value;
    return (
      <FlexView
        shrink={false}
        id={id}
        style={style}
        column={!horizontal}
        role="radiogroup"
        className={cx(
          'radio-group',
          {
            'is-disabled': disabled,
            'is-horizontal': horizontal
          },
          className
        )}
      >
        {options.map(option => (
          <FlexView
            key={option.label}
            vAlignContent="center"
            className={cx('radio-group-option', {
              'is-checked':
                value && defaultedGetValueKey(option.value) === defaultedGetValueKey(value)
            })}
          >
            <svg viewBox="0 0 16 16" onClick={this.onChange(option)}>
              <g>
                <circle className="radio-group-circle-outer" cx="8" cy="8" r="8" />
                <circle className="radio-group-circle" cx="8" cy="8" r="7" />
                <circle className="radio-group-circle-inner" cx="8" cy="8" r="5" />
              </g>
            </svg>
            <FlexView className="radio-group-label" onClick={this.onChange(option)}>
              {option.label}
            </FlexView>
          </FlexView>
        ))}
      </FlexView>
    );
  }
}
