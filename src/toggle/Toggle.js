import React from 'react';
import { pure, skinnable, props, t } from '../utils';
import cx from 'classnames';


import './toggle.scss';

@pure
@skinnable()
@props({
  value: t.Boolean,
  onChange: t.Function,
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

  getLocals() {
    const { className, ...props } = this.props;
    return {
      ...props,
      className: cx('toggle', className)
    };
  }

  template({ value, onChange, className, style }) {
    return (
      <div {...{ className, style }}>
        <input className='toggle-input' type='checkbox' ref='checkbox' value={value} readOnly />
        <label className='toggle-button' onClick={onChange} />
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.updateCheckbox(nextProps);
  }

}
