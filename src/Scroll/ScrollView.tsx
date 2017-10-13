import * as React from 'react';
import * as ReactDOM from 'react-dom';
import omit = require('lodash/omit');
import { props, t, ReactChildren } from '../utils';
import easing, { EasingType } from './easingFunctions';

export type ScrollViewDefaultProps = {
  /** enable horizontal scrolling */
  scrollX: boolean,
  /** enable vertical scrolling */
  scrollY: boolean,
  /** enable scroll propagation */
  scrollPropagation: boolean,
  /** easing function used when scrolling with `scrollTo` */
  easing: EasingType,
  /** onScroll function that handle onScroll events */
  onScroll: React.WheelEventHandler<HTMLDivElement>,
  style: React.CSSProperties
}

export type ScrollViewRequiredProps = {
  /** components/nodes content. If you need to scroll programmatically pass a function and save `scrollTo(x, y, milliseconds)` callback for later use (it will be passed as first argument) ex: `(scrollTo) => { this.scrollTo = scrollTo; return <MyScrollViewContent />; }` */
  children: React.ReactNode,
};

export type ScrollViewDefaultedProps = ScrollViewRequiredProps & ScrollViewDefaultProps & React.HTMLAttributes<HTMLDivElement>

export namespace ScrollView {
  export type Props = ScrollViewRequiredProps & Partial<ScrollViewDefaultProps> & React.HTMLAttributes<HTMLDivElement>
}


export const Props = {
  children: t.union([ReactChildren, t.Function]),
  scrollX: t.maybe(t.Boolean),
  scrollY: t.maybe(t.Boolean),
  scrollPropagation: t.maybe(t.Boolean),
  easing: t.maybe(t.enums.of(Object.keys(easing))),
  onScroll: t.maybe(t.Function),
  style: t.maybe(t.Object)
};

/**
 * ### Utility component to make scrolling easier:
 * - can stop scroll propagation
 * - smooth programmatic scroll with 22 easing functions (see `easingFunctions.js`)
 * - out of the box momentum scrolling on iOS
 */
@props(Props, { strict: false })
export class ScrollView extends React.Component<ScrollView.Props> {

  private lastY: number = 0;

  static defaultProps: ScrollViewDefaultProps = {
    scrollX: true,
    scrollY: true,
    scrollPropagation: true,
    easing: 'easeInOutQuad',
    onScroll: () => {},
    style: {}
  };

  getScrollView = () => ReactDOM.findDOMNode(this.refs.scrollView);

  getEventListeners = () => {
    return {
      onWheel: this._onScroll,
      onScroll: this.props.onScroll,
      onTouchStart: this.initializeTouchEventDirection,
      onTouchEnd: this.clearTouchEventDirection,
      onTouchMove: this._onScroll
    };
  };

  isEventInsideScrollView: (el: Node) => boolean = el => {
    if (el === this.getScrollView()) {
      return true;
    } else if (el.parentNode) {
      return this.isEventInsideScrollView(el.parentNode);
    } else {
      return false;
    }
  };

  initializeTouchEventDirection: React.TouchEventHandler<HTMLDivElement> = e => {
    this.lastY = e.touches[0].clientY;
  };

  clearTouchEventDirection: React.TouchEventHandler<HTMLDivElement> = () => {
    this.lastY = 0;
  };

  stopScrollPropagation: React.ReactEventHandler<HTMLDivElement> = ({ nativeEvent: e }) => {
    const el = (e.target || e.srcElement) as Element;
    const isEventInsideScrollView = this.isEventInsideScrollView(el);
    if (isEventInsideScrollView) {

      // const { scrollTop, scrollHeight, offsetHeight } = this.getScrollView();

      let up: boolean = false;
      if (e instanceof TouchEvent) {
        const { clientY } = e.touches[0];
        up = clientY > this.lastY;
        this.lastY = clientY;
      } else if (e instanceof WheelEvent) {
        up = e.wheelDelta > 0;
      }
      const down = !up;

      if ((down && this.isAtBottom()) || (up && this.isAtTop())) {
        e.preventDefault();
      }
    }
  };

  isAtTop = () => this.getScrollView().scrollTop === 0;

  isAtBottom = () => {
    const { scrollTop, scrollHeight, clientHeight } = this.getScrollView();
    return scrollTop + clientHeight === scrollHeight;
  };

  computeStyle: () => React.CSSProperties = () => {
    const { scrollX, scrollY, style } = this.props;
    return {
      overflowY: scrollY ? 'scroll' : undefined, /* has to be scroll for iOS, not auto */
      overflowX: scrollX ? 'scroll' : undefined, /* has to be scroll for iOS, not auto */
      WebkitOverflowScrolling: 'touch',
      ...style
    };
  };

  scrollTo = (_x?: number | null, _y?: number | null, scrollDuration?: number) => {
    const { scrollTop, scrollLeft } = this.getScrollView();
    const x = _x || scrollLeft;
    const y = _y || scrollTop;

    this._scrollTo(x, y, scrollDuration || 0, Date.now(), scrollLeft, scrollTop);
  };

  _scrollTo = (x: number, y: number, scrollDuration: number, startTime: number, startX: number, startY: number) => {
    const { easing: easingType } = this.props as ScrollViewDefaultedProps;
    if (scrollDuration > 0) {
      const { scrollTop, scrollLeft } = this.getScrollView();
      const easingFunction = easing[easingType];

      if ((t.Number.is(x) && scrollLeft !== x) || (t.Number.is(y) && scrollTop !== y)) {
        const currentTime = Math.min(scrollDuration, (Date.now() - startTime));
        const distanceX = (x - startX);
        const distanceY = (y - startY);
        this.getScrollView().scrollLeft = easingFunction(currentTime, startX, distanceX, scrollDuration);
        this.getScrollView().scrollTop = easingFunction(currentTime, startY, distanceY, scrollDuration);

        requestAnimationFrame(() => this._scrollTo(x, y, scrollDuration, startTime, startX, startY));
      }
    } else {
      this.getScrollView().scrollLeft = x;
      this.getScrollView().scrollTop = y;
    }
  };

  _onScroll: React.ReactEventHandler<HTMLDivElement> = e => {
    if (!this.props.scrollPropagation) {
      this.stopScrollPropagation(e);
    }
  };

  render() {
    const props = omit(this.props, Object.keys(Props));
    const { children } = this.props;
    return (
      <div {...props} {...this.getEventListeners()} style={this.computeStyle()} ref='scrollView'>
        {t.Function.is(children) ? children(this.scrollTo) : children}
      </div>
    );
  }

}
