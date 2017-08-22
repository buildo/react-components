import React from 'react';
import ReactDOM from 'react-dom';
import cx from '../utils/classnames';
import { props, t, ReactChildren } from '../utils';
import FlexView from 'react-flexview';
import omit from 'lodash.omit';

export const Props = {
  children: ReactChildren,
  color: t.maybe(t.String),
  alpha: t.maybe(t.Number),
  zIndex: t.maybe(t.Number),
  stopScrollPropagation: t.maybe(t.Boolean),
  onClickOutside: t.maybe(t.Function),
  width: t.maybe(t.union([t.String, t.Number])),
  maxWidth: t.maybe(t.union([t.String, t.Number])),
  height: t.maybe(t.union([t.String, t.Number])),
  maxHeight: t.maybe(t.union([t.String, t.Number])),
  className: t.maybe(t.String),
  id: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/**
 * Creates a full-page dimmed background for its children nodes
 * @param children - children nodes/elements
 * @param color - background-color
 * @param alpha - opacity
 * @param zIndex - z-index (BackgroundDimmer has `position: fixed`)
 * @param stopScrollPropagation - avoid propagation for scroll events
 * @param onClickOutside - called when user clicks outside children
 * @param width - centeredContentWrapper width
 * @param maxWidth - centeredContentWrapper max-width
 * @param height - centeredContentWrapper height
 * @param maxHeight - centeredContentWrapper max-height
 */
@props(Props)
export default class BackgroundDimmer extends React.Component {

  static defaultProps = {
    color: 'black',
    alpha: 0.5,
    zIndex: 99999,
    width: 'auto',
    maxWidth: '90%',
    height: 'auto',
    maxHeight: '90%'
  };

  isEventOutsideChildren = (e) => {
    const el = e.target || e.srcElement;
    return el === ReactDOM.findDOMNode(this.refs.mainContentWrapper);
  };

  onClick = (e) => {
    const { onClickOutside } = this.props;
    if (onClickOutside) {
      onClickOutside(e);
    }
  };

  stopPropagation = e => e.stopPropagation();

  preventDefault = e => e.preventDefault();

  stopScrollPropagation = (e) => {
    if (this.props.stopScrollPropagation && this.isEventOutsideChildren(e)) {
      this.preventDefault(e);
    }
  };

  render() {
    const {
      onClick, stopPropagation, stopScrollPropagation,
      props: { className, zIndex, color, alpha, width, maxWidth, height, maxHeight, children, ...props }
    } = this;

    const fixedStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 };
    const overlayProps = {
      style: {
        ...fixedStyle,
        zIndex,
        backgroundColor: color,
        opacity: String(alpha)
      }
    };
    const mainContentWrapperProps = {
      onClick,
      onWheel: stopScrollPropagation,
      onTouchMove: stopScrollPropagation,
      style: { ...fixedStyle, zIndex: (zIndex + 1) },
      className: 'main-content-wrapper',
      vAlignContent: 'center',
      hAlignContent: 'center',
      ref: 'mainContentWrapper'
    };
    const centeredContentWrapperProps = {
      className: 'centered-content-wrapper',
      style: { width, maxWidth, height, maxHeight },
      onClick: stopPropagation,
      column: true
    };

    return (
      <div className={cx('background-dimmer', className)} {...omit(props, ['onClickOutside'])}>
        <div {...overlayProps} />
        <FlexView {...mainContentWrapperProps}>
          <FlexView {...centeredContentWrapperProps}>
            {children}
          </FlexView>
        </FlexView>
      </div>
    );
  }

}
