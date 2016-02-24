import React from 'react';
import range from 'lodash/utility/range';
import { pure, skinnable, props, t } from '../utils';
import cx from 'classnames';

@pure
@skinnable()
@props({
  icon: t.maybe(t.Str),
  className: t.maybe(t.Str),
  style: t.maybe(t.Obj),
  paths: t.maybe(t.refinements(t.Number, x => x - Math.floor(x) === 0 && x > 0)),
  onClick: t.maybe(t.Func)
})
export default class Icon extends React.Component {

  static defaultProps = {
    className: '',
    paths: 1,
    style: {},
    onClick: () => {}
  };

  getLocals() {
    return {
      ...this.props
    };
  }

  template({ icon, className, style, onClick, paths }) {
    return icon ? (
      <i className={cx('icon', `icon-${icon}`, className)} style={style} onClick={onClick}>
        {paths === 1 ? null : range(paths).map(k => (
        <span className={`path${k+1}`} />
        ))}
      </i>
    )
    : null;
  }

}
