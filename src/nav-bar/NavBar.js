import React from 'react';
import cx from 'classnames';
import { props, t, skinnable } from '../utils';
import { FlexView } from '../flex';


/**
 * A NavBar container built with FlexView:
 * - easy positioning of content (left, center and right columns)
 * - lets you define basic css style from JS
 */
@skinnable()
@props({
  /** Props used to define the NavBar content */
  content: t.struct({
    /** Left content. It doesn't shrink nor grow */
    left: t.maybe(t.ReactNode),
    /** Center content. It grows to use all the available space */
    center: t.maybe(t.ReactNode),
    /** Right content. It doesn't shrink nor grow */
    right: t.maybe(t.ReactNode),
    /** shorthand for css `max-width` */
    maxWidth: t.maybe(t.union([ t.String, t.Number ]))
  }),
  /** To set `position: fixed` */
  fixed: t.maybe(t.Boolean),
  /** shorthand for css `height` */
  height: t.maybe(t.union([ t.String, t.Number ])),
  /** shorthand for css `background` */
  background: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
})
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
      <FlexView {...{ className, style }} {...flexProps}>
        <FlexView grow style={{ maxWidth }} className='content' {...flexProps}>
          <FlexView className='left' marginRight='auto' shrink={false} {...flexProps}>
            {left}
          </FlexView>
          <FlexView className='center' grow {...flexProps}>
            {center}
          </FlexView>
          <FlexView className='right' marginLeft='auto' shrink={false} {...flexProps}>
            {right}
          </FlexView>
        </FlexView>
      </FlexView>
    );
  }
}
