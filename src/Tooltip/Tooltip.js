import React from 'react';
import { pure, props, skinnable, t } from '../utils';
import Popover from '../popover';
import cx from 'classnames';

import './tooltip.scss';

@pure
@skinnable()
@props({
  children: t.ReactNode,
  popover: t.struct({
    content: t.Str,
    attachToBody: t.maybe(t.Bool),
    position: t.maybe(t.Str),
    anchor: t.maybe(t.Str),
    onShow: t.maybe(t.Func),
    onHide: t.maybe(t.Func),
    dismissOnScroll: t.maybe(t.Bool),
    className: t.maybe(t.Str),
    id: t.maybe(t.Str),
    maxWidth: t.maybe(t.union([t.Num, t.Str]))
  }),
  className: t.maybe(t.Str),
  id: t.maybe(t.Str),
  style: t.maybe(t.Obj)
})
export default class Tooltip extends React.Component {

  getLocals() {
    const { children, ...props } = this.props;
    const popover = {
      ...props.popover,
      event: 'hover',
      className: cx('tooltip', props.popover.className)
    };
    return {
      props: {
        ...props,
        popover
      },
      children
    };
  }

  template({ props, children }) {
    return (
      <Popover { ...props }>
        {children}
      </Popover>
    );
  }

}
