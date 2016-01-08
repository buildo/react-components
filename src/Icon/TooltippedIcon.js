import React from 'react';
import { pure, props, t, skinnable } from '../utils';
import Icon from './Icon';
import Tooltip from '../Tooltip/Tooltip';
import cx from 'classnames';

@pure
@skinnable()
@props({
  icon: t.maybe(t.String),
  label: t.ReactNode,
  className: t.maybe(t.Str),
  style: t.maybe(t.Obj),
  onClick: t.maybe(t.Func)
})
export default class TooltippedIcon extends React.Component {

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

  template({ icon, label, className, style, onClick }) {
    return (
      icon ?
      <Tooltip
        className={cx('tooltipped-icon', className)}
        style={{ overflow: 'hidden', ...style }}
        popover={{ content: label, position: 'top', anchor: 'center' }}
      >
        <Icon icon={icon} onClick={onClick}/>
      </Tooltip>
      : null
    );
  }

}
