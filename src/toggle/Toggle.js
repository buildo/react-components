import React from 'react';
import ReactDOM from 'react-dom';
import { pure, skinnable, props, t } from '../utils';
import cx from 'classnames';
import { getValueLink } from '../link-state';
import { warn } from '../utils/log';


/**
 * A nice animated Toggle rendered using only CSS
 */
@pure
@skinnable()
@props({
  /** The current value (`true` if checked) */
  value: t.maybe(t.Boolean),
  /** Callback called when user clicks on the Toggle */
  onChange: t.maybe(t.Function),
  /** To be used together with `linkState` */
  valueLink: t.maybe(t.struct({
    value: t.maybe(t.Boolean),
    requestChange: t.Function
  })),
  /**
   * The size for the Toggle in whatever unit (px, em, rem ...).
   * It will be used to compute `width`, `height` and `border-radius` as follows:
   * `width: size`, `height: size / 2`, `border-radius: size / 2`
   */
  size: t.maybe(t.union([t.String, t.Number])),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
})
export default class Toggle extends React.Component {

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
