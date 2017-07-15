import React from 'react';
import ReactDOM from 'react-dom';
import { skinnable, props, t } from '../utils';
import cx from 'classnames';
import { getValueLink } from '../LinkState';
import { warn } from '../utils/log';

export const Props = {
  value: t.maybe(t.Boolean),
  onChange: t.maybe(t.Function),
  valueLink: t.maybe(t.struct({
    value: t.maybe(t.Boolean),
    requestChange: t.Function
  })),
  size: t.maybe(t.union([t.String, t.Number])),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/**
 * A nice animated Toggle rendered using only CSS
 * @param value - the current value (`true` if checked)
 * @param onChange - callback called when user clicks on the Toggle
 * @param valueLink - to be used together with `linkState`
 * @param size - The size for the Toggle in whatever unit (px, em, rem ...). It will be used to compute `width`, `height` and `border-radius` as follows: `width: size`, `height: size / 2`, `border-radius: size / 2`
 */
@skinnable()
@props(Props)
export default class Toggle extends React.PureComponent {

  componentDidMount() {
    this.updateCheckbox(this.props);
  }

  updateCheckbox = (props) => {
    const { value } = getValueLink(this, props);
    const checkboxNode = ReactDOM.findDOMNode(this.refs.checkbox);
    checkboxNode.checked = value;
  };

  getHalfSize(size) {
    if (t.String.is(size)) {
      const unitMatch = (/[a-z]+$/).exec(size); // only match characters at the end
      const number = parseFloat(size, 10);
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

  getLocals() {
    const {
      props: { className, size, style },
      onButtonClick
    } = this;
    const { value } = getValueLink(this, this.props);
    return {
      style,
      value,
      buttonProps: {
        onClick: onButtonClick,
        style: size ?
          { width: size, height: this.getHalfSize(size), borderRadius: this.getHalfSize(size) } :
          undefined
      },
      className: cx('toggle', className)
    };
  }

  template({ value, className, style, buttonProps }) {
    return (
      <div {...{ className, style }}>
        <input className='toggle-input' type='checkbox' ref='checkbox' value={value} readOnly />
        <label className='toggle-button' {...buttonProps} />
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.updateCheckbox(nextProps);
  }

}
