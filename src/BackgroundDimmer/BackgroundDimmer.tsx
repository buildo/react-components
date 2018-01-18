import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cx from 'classnames';
import { props, t, ReactChildren } from '../utils';
import FlexView from 'react-flexview';
import omit = require('lodash/omit');

export type BackgroundDimmerRequiredProps = {
  /** children nodes/elements */
  children: any, // TODO: t.ReactChildren
  /** called when user clicks outside children */
  onClickOutside?: (e: React.SyntheticEvent<HTMLDivElement>) => void,
  /** component's class */
  className?: string,
  /** component's id */
  id?: string,
  /** component's style */
  style?: React.CSSProperties
};

export type BackgroundDimmerDefaultProps = {
  /** background-color */
  color: string,
  /** opacity */
  alpha: number,
  /** z-index (BackgroundDimmer has `position: fixed`) */
  zIndex: number,
  /** centeredContentWrapper width */
  width: string | number,
  /** centeredContentWrapper max-width */
  maxWidth: string | number,
  /** centeredContentWrapper height */
  height: string | number,
  /** centeredContentWrapper max-height */
  maxHeight: string | number,
  /** avoid propagation for scroll events */
  stopScrollPropagation: boolean,
};

type BackgroundDimmerDefaultedProps = BackgroundDimmerRequiredProps & BackgroundDimmerDefaultProps;

export namespace BackgroundDimmer {
  export type Props = BackgroundDimmerRequiredProps & Partial<BackgroundDimmerDefaultProps>;
}

export const Props = {
  children: ReactChildren,
  color: t.maybe(t.String),
  alpha: t.maybe(t.Number),
  zIndex: t.maybe(t.Number),
  stopScrollPropagation: t.maybe(t.Boolean),
  onClickOutside: t.maybe(t.Function),
  width: t.maybe<string | number>(t.union([t.String, t.Number])),
  maxWidth: t.maybe<string | number>(t.union([t.String, t.Number])),
  height: t.maybe<string | number>(t.union([t.String, t.Number])),
  maxHeight: t.maybe<string | number>(t.union([t.String, t.Number])),
  className: t.maybe(t.String),
  id: t.maybe(t.String),
  style: t.maybe(t.Object)
};

@props(Props)
export class BackgroundDimmer extends React.PureComponent<BackgroundDimmer.Props> {

  static defaultProps: BackgroundDimmerDefaultProps = {
    color: 'black',
    alpha: 0.5,
    zIndex: 99999,
    width: 'auto',
    maxWidth: '90%',
    height: 'auto',
    maxHeight: '90%',
    stopScrollPropagation: false
  };

  // srcElement is not declared in React.SyntheticEvent cause it's a key used by old
  // IE versions: https://msdn.microsoft.com/en-us/library/ms534638(v=vs.85).aspx
  // TODO: should be removed in the future
  isEventOutsideChildren = (e: React.SyntheticEvent<HTMLDivElement> & { srcElement?: EventTarget }) => {
    const el = e.target || e.srcElement;
    return el === ReactDOM.findDOMNode(this.refs.mainContentWrapper);
  };

  onClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const { onClickOutside } = this.props;
    if (onClickOutside) {
      onClickOutside(e);
    }
  };

  stopPropagation = (e: React.SyntheticEvent<HTMLDivElement>) => e.stopPropagation();

  preventDefault = (e: React.SyntheticEvent<HTMLDivElement>) => e.preventDefault();

  stopScrollPropagation = (e: React.SyntheticEvent<HTMLDivElement>) => {
    if (this.props.stopScrollPropagation && this.isEventOutsideChildren(e)) {
      this.preventDefault(e);
    }
  };

  render() {

    const {
      className, zIndex, color, alpha: opacity, width, maxWidth, height, maxHeight, children, ...props
    } = this.props as BackgroundDimmerDefaultedProps;
    const { onClick, stopPropagation, stopScrollPropagation } = this;

    const fixedStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 };
    const overlayProps = {
      style: {
        ...fixedStyle,
        zIndex,
        backgroundColor: color,
        opacity
      }
    };
    const mainContentWrapperProps: FlexView.Props & { ref: string } = {
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
      <div className={cx('background-dimmer', className)} {...omit(props, ['onClickOutside', 'stopScrollPropagation'])}>
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
