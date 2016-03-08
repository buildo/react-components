import React from 'react';
import omit from 'lodash/omit';
import { props, t } from '../utils';
import easing from './easingFunctions';

/**
 * ### Utility component to make scrolling easier:
 * - can stop scroll propagation
 * - smooth programmatic scroll with 22 easing functions (see `easingFunctions.js`)
 * - out of the box momentum scrolling on iOS
 */
const PropTypes = {
  /**
   * components/nodes content. If you need to scroll programmatically pass a function and save `scrollTo(x, y, milliseconds)` callback for later use (it will be passed as first argument) ex: `(scrollTo) => { this.scrollTo = scrollTo; return <MyScrollViewContent />; }`
   */
  children: t.union([ t.ReactNode, t.Function ]),
  /**
   * enable horizontal scrolling
   */
  scrollX: t.maybe(t.Boolean),
  /**
   * enable vertical scrolling
   */
  scrollY: t.maybe(t.Boolean),
  /**
   * enable scroll propagation
   */
  scrollPropagation: t.maybe(t.Boolean),
  /**
   * easing function used when scrolling with `scrollTo`
   */
  easing: t.maybe(t.enums.of(Object.keys(easing))),
  /**
   *  onScroll function that handle onScroll events
   */
  onScroll: t.maybe(t.Function),
  style: t.maybe(t.Object)
};

@props(PropTypes, { strict: false })
export default class ScrollView extends React.Component {

  static defaultProps = {
    scrollX: true,
    scrollY: true,
    scrollPropagation: true,
    easing: 'easeInOutQuad',
    onScroll: () => {}
  };

  getScrollView = () => React.findDOMNode(this.refs.scrollView);

  getEventListeners = () => {
    return {
      onWheel: this._onScroll,
      onScroll: this.props.onScroll,
      onTouchStart: this.initializeTouchEventDirection,
      onTouchEnd: this.clearTouchEventDirection,
      onTouchMove: this._onScroll
    };
  };

  isEventInsideScrollView = (el) => {
    if (el === this.getScrollView()) {
      return true;
    } else if (el.parentNode) {
      return this.isEventInsideScrollView(el.parentNode);
    } else {
      return false;
    }
  };

  initializeTouchEventDirection = (e) => {
    this.lastY = e.touches[0].clientY;
  };

  clearTouchEventDirection = () => {
    this.lastY = null;
  };

  stopScrollPropagation = ({ nativeEvent: e }) => {
    const el = e.target || e.srcElement;
    const isEventInsideScrollView = this.isEventInsideScrollView(el);
    if (isEventInsideScrollView) {

      // const { scrollTop, scrollHeight, offsetHeight } = this.getScrollView();

      let up;
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

  computeStyle = () => {
    const { scrollX, scrollY, style } = this.props;
    return {
      overflowY: scrollY ? 'scroll' : undefined, /* has to be scroll for iOS, not auto */
      overflowX: scrollX ? 'scroll' : undefined, /* has to be scroll for iOS, not auto */
      WebkitOverflowScrolling: 'touch',
      ...style
    };
  };

  scrollTo = (_x, _y, scrollDuration) => {
    const { scrollTop, scrollLeft } = this.getScrollView();
    const x = _x === null ? scrollLeft : _x;
    const y = _y === null ? scrollTop : _y;

    this._scrollTo(x, y, scrollDuration, Date.now(), scrollLeft, scrollTop);
  };

  _scrollTo = (x, y, scrollDuration, startTime, startX, startY) => {
    if (scrollDuration > 0) {
      const { scrollTop, scrollLeft } = this.getScrollView();
      const easingFunction = easing[this.props.easing];

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

  _onScroll = (e) => {
    if (!this.props.scrollPropagation) {
      this.stopScrollPropagation(e);
    }
  };

  render() {
    const props = omit(this.props, Object.keys(PropTypes));
    const { children } = this.props;
    return (
      <div { ...props } { ...this.getEventListeners() } style={this.computeStyle()} ref='scrollView'>
        {t.Function.is(children) ? children(this.scrollTo) : children}
      </div>
    );
  }

}
