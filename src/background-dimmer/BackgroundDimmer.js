import React from 'react';
import { props, t } from '../utils';
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
export default class BackgroundDimmer extends React.Component {

  static defaultProps = {
    color: 'black',
    alpha: 0.5,
    zIndex: 99999
  };

  isEventOutsideChildren = (e) => {
    const el = e.target || e.srcElement;
    return el === React.findDOMNode(this.refs.dimmedBackground);
  };

  onClick = (e) => {
    const { onClickOutside } = this.props;
    if (onClickOutside && this.isEventOutsideChildren(e)) {
      onClickOutside(e);
    }
  };

  preventDefault = (e) => e.preventDefault();

  stopScrollPropagation = (e) => {
    const { stopScrollPropagation } = this.props;
    if (stopScrollPropagation && this.isEventOutsideChildren(e)) {
      this.preventDefault(e);
    }
  };

  getDimmedBackground = () => {
    const { color, alpha, zIndex } = this.props;
    const style = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: color,
      opacity: String(alpha),
      zIndex
    };
    return <div style={style} onClick={this.onClick} ref='dimmedBackground' />;
  };

  render() {
    const { style, className, id, children, zIndex } = this.props;
    const props = {
      style: { position: 'relative', ...style },
      className,
      id
    };
    const flexViewProps = {
      style: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: (zIndex + 1), pointerEvents: 'none'
      },
      vAlignContent: 'center',
      hAlignContent: 'center'
    };
    const childrenWrapperProps = {
      style: { pointerEvents: 'auto' },
      ref: 'childrenWrapper'
    };

    return (
      <div {...props}>
        {this.getDimmedBackground()}
        <FlexView {...flexViewProps}>
          <div {...childrenWrapperProps}>
            {children}
          </div>
        </FlexView>
      </div>
    );
  }

}
