import React from 'react';
import { pure, skinnable, props, t } from '../utils';
import cx from 'classnames';

@pure
@skinnable()
@props({
  icon: t.maybe(t.Str),
  className: t.maybe(t.Str),
  style: t.maybe(t.Obj),
  onClick: t.maybe(t.Func)
})
export default class Icon extends React.Component {

  static defaultProps = {
    className: '',
    style: {},
    onClick: () => {}
  }

  getLocals() {
    return {
      ...this.props
    };
  }

  template({ icon, className, style, onClick }) {
    return icon ?
      <i className={cx('icon', `icon-${icon}`, className)} style={style} onClick={onClick}/>
    : null;
  }

}
