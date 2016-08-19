import React from 'react';
import cx from 'classnames';
import { pure, props, skinnable, t, stateClassUtil } from '../utils';
import Popover from '../popover/Popover';

/** Tooltip that appears when the mouse is over an element
 * @param children - the element over which the tooltip is shown
 * @param popover - popover props
 * @param type - light - dark
 * @param size - small - big
 */
@pure
@skinnable()
@props({
  children: t.ReactChildren,
  popover: t.refinement(t.Object, p => t.String.is(p.content) && t.Nil.is(p.event)),
  type: t.enums.of(['light', 'dark']),
  size: t.enums.of(['small', 'big']),
  className: t.maybe(t.String),
  id: t.maybe(t.String),
  style: t.maybe(t.Object)
})
export default class Tooltip extends React.Component {

  static defaultProps = {
    type: 'dark',
    size: 'small'
  }

  getLocals() {
    const { children, type, size, ...props } = this.props;
    const popover = {
      ...props.popover,
      event: 'hover',
      className: cx('tooltip', stateClassUtil([type, size]), props.popover.className)
    };
    return {
      children,
      type, size,
      popoverProps: { ...props, popover }
    };
  }

  template({ popoverProps, children }) {
    return (
      <Popover { ...popoverProps }>
        {children}
      </Popover>
    );
  }

}
