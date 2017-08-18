import React from 'react';
import cx from '../utils/classnames';
import { props, t, skinnable } from '../utils';
import FlexView from 'react-flexview';

export const Props = {
  content: t.struct({
    /** Left content. It doesn't shrink nor grow */
    left: t.maybe(t.ReactChildren),
    /** Center content. It grows to use all the available space */
    center: t.maybe(t.ReactChildren),
    /** Right content. It doesn't shrink nor grow */
    right: t.maybe(t.ReactChildren),
    /** shorthand for css `max-width` */
    maxWidth: t.maybe(t.union([t.String, t.Number]))
  }),
  fixed: t.maybe(t.Boolean),
  height: t.maybe(t.union([t.String, t.Number])),
  background: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/**
 * A NavBar container built with FlexView:
 * - easy positioning of content (left, center and right columns)
 * - lets you define basic css style from JS
 * @param content - props used to define the NavBar content (defines left, center, right, maxWidth).
 * @param fixed - to set `position: fixed`
 * @param height - shorthand for css `height`
 * @param background - shorthand for css `background`
 */
@skinnable()
@props(Props)
export default class NavBar extends React.Component {

  getLocals() {
    const { className, style, fixed, height, background, ...props } = this.props;
    const valueOrUndefined = (validator, value) => validator ? value : undefined;

    return {
      ...props,
      style: {
        ...style,
        position: valueOrUndefined(fixed, 'fixed'),
        top: valueOrUndefined(fixed, 0),
        zIndex: valueOrUndefined(fixed, 99999),
        width: '100%',
        height,
        background
      },
      className: cx('nav-bar', className),
      flexProps: { hAlignContent: 'center', vAlignContent: 'center' }
    };
  }

  template({ content: { left, center, right, maxWidth }, className, style, flexProps }) {
    return (
      <FlexView {...{ className, style, ...flexProps }}>
        <FlexView {...flexProps} className='content' style={{ maxWidth }} grow>
          <FlexView {...flexProps} className='left' marginRight='auto' shrink={false}>
            {left}
          </FlexView>
          <FlexView {...flexProps} className='center' grow>
            {center}
          </FlexView>
          <FlexView {...flexProps} className='right' marginLeft='auto' shrink={false}>
            {right}
          </FlexView>
        </FlexView>
      </FlexView>
    );
  }
}
