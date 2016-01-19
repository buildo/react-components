import React from 'react';
import { pure, skinnable, props, t } from '../utils';
import cx from 'classnames';


import './toggle.scss';

@pure
@skinnable()
@props({
  value: t.Boolean,
  onChange: t.Function,
  size: t.maybe(t.union([t.String, t.Number])),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
})
export default class Toggle extends React.Component {

  componentDidMount() {
    this.updateCheckbox(this.props);
  }

  updateCheckbox = ({ value }) => {
    const { checkbox } = this.refs;
    const checkboxNode = checkbox.nodeType === 1 ?
      checkbox :
      checkbox.getDOMNode();
    checkboxNode.checked = value;
  }

  getHalfSize(size) {
    if (t.String.is(size)) {
      const numberMatch = (/\d+/).exec(size);
      const unitMatch = (/[a-z]+/).exec(size);

      const number = numberMatch ? parseInt(numberMatch[0], 10) : '';
      const unit = unitMatch ? unitMatch[0] : '';
      return `${number / 2}${unit}`;
    } else {
      return size / 2
    }
  }

  getLocals() {
    const { className, size, onChange, ...props } = this.props;
    return {
      ...props,
      buttonProps: {
        onClick: onChange,
        style: size ? { width: size, height: this.getHalfSize(size) } : undefined
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
