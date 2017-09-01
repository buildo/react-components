import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { props, t } from '../utils';
import cx from '../utils/classnames';
import { getValueLink } from '../LinkState';
import { warn } from '../utils/log';

export const Props = {
  value: t.maybe(t.Boolean),
  onChange: t.maybe(t.Function),
  disabled: t.maybe(t.Boolean),
  valueLink: t.maybe(t.struct({
    value: t.maybe(t.Boolean),
    requestChange: t.Function
  })),
  size: t.maybe(t.union([t.String, t.Number])),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

export type ToggleProps = {
  /** the current value (`true` if checked) */
  value?: boolean,
  /** callback called when user clicks on the Toggle */
  onChange?: (value: boolean) => void,
  /** disable the onClick callback and renders with reduced opacity */
  disabled?: boolean,
  /** to be used together with `linkState` */
  valueLink?: {
    value?: boolean,
    requestChange: (value: boolean) => void
  },
  /** The size for the Toggle in whatever unit (px, em, rem ...). It will be used to compute `width`, `height` and `border-radius` as follows: `width: size`, `height: size / 2`, `border-radius: size / 2` */
  size?: number |string,
  className?: string,
  style?: React.CSSProperties
};

/**
 * A nice animated Toggle rendered using only CSS
 */
@props(Props)
export default class Toggle extends React.PureComponent<ToggleProps> {

  componentDidMount() {
    this.updateCheckbox(this.props);
  }

  componentWillReceiveProps(nextProps: ToggleProps) {
    this.updateCheckbox(nextProps);
  }

  updateCheckbox = (props: ToggleProps) => {
    const { value } = getValueLink(this, props);
    const checkboxNode = ReactDOM.findDOMNode<HTMLInputElement>(this.refs.checkbox);
    checkboxNode.checked = value;
  };

  getHalfSize(size: string | number) {
    if (t.String.is(size)) {
      const unitMatch = (/[a-z]+$/).exec(size); // only match characters at the end
      const number = parseFloat(size);
      const unit = unitMatch ? unitMatch[0] : '';
      if (isFinite(number)) { // we can still get NaN from parseFloat
        return `${number / 2}${unit}`;
      } else {
        warn('Invalid size');
        return 0;
      }
    } else {
      return size / 2;
    }
  }

  onButtonClick = () => {
    const { value, requestChange } = getValueLink(this, this.props);
    requestChange(!value);
  };

  render() {
    const {
      props: { className: _className, size, style, disabled },
      onButtonClick
    } = this;

    const { value } = getValueLink(this, this.props);
    const buttonProps = {
      onClick: disabled ? undefined : onButtonClick,
      style: size ?
        { width: size, height: this.getHalfSize(size), borderRadius: this.getHalfSize(size) } :
        undefined
    };
    const className = cx('toggle', { disabled }, _className);

    return (
      <div {...{ className, style }}>
        <input className='toggle-input' type='checkbox' ref='checkbox' value={value} readOnly />
        <label className='toggle-button' {...buttonProps} />
      </div>
    );
  }

}
