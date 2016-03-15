import React from 'react';
import { props, t, skinnable } from '../utils';
import FlexView from '../flex/FlexView';

/**
 * ### Creates a full-page dimmed background for its children nodes
 */
@props({
  /**
   * children nodes/elements
   */
  children: t.ReactNode,
  /**
   * background-color
   */
  color: t.maybe(t.String),
  /**
   * opacity
   */
  alpha: t.maybe(t.Number),
  /**
   * z-index (BackgroundDimmer has `position: fixed`)
   */
  zIndex: t.maybe(t.Number),
  /**
   * avoid propagation for scroll events
   */
  stopScrollPropagation: t.maybe(t.Boolean),
  /**
   * called when user clicks outside children
   */
  onClickOutside: t.maybe(t.Function),
  className: t.maybe(t.String),
  id: t.maybe(t.String),
  style: t.maybe(t.Object)
})
@skinnable()
export default class BackgroundDimmer extends React.Component {

  static defaultProps = {
    color: 'black',
    alpha: 0.5,
    zIndex: 99999
  };

  isEventOutsideChildren = (e) => {
    const el = e.target || e.srcElement;
    return el === React.findDOMNode(this.refs.flexWrapper);
  };

  onClick = (e) => {
    const { onClickOutside } = this.props;
    if (this.props.onClickOutside) {
      onClickOutside(e);
    }
  };

  stopPropagation = e => e.stopPropagation();

  preventDefault = (e) => e.preventDefault();

  stopScrollPropagation = (e) => {
    if (this.props.stopScrollPropagation && this.isEventOutsideChildren(e)) {
      this.preventDefault(e);
    }
  };

  getLocals() {
    const {
      onClick, stopPropagation, stopScrollPropagation,
      props: { zIndex, color, alpha, ...props }
    } = this;

    const fixedStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 };
    return {
      ...props,
      stopPropagation,
      overlayProps: {
        style: {
          ...fixedStyle,
          zIndex,
          backgroundColor: color,
          opacity: String(alpha)
        }
      },
      flexViewProps: {
        onClick,
        onWheel: stopScrollPropagation,
        onTouchMove: stopScrollPropagation,
        style: { ...fixedStyle, zIndex: (zIndex + 1) },
        vAlignContent: 'center',
        hAlignContent: 'center',
        ref: 'flexWrapper'
      }
    };
  }

  template({ children, overlayProps, flexViewProps, stopPropagation, ...locals }) {
    return (
      <div {...locals}>
        <div {...overlayProps} />
        <FlexView {...flexViewProps}>
          <div onClick={stopPropagation}>
            {children}
          </div>
        </FlexView>
      </div>
    );
  }

}
