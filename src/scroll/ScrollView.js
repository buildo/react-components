import React from 'react';
import omit from 'lodash/object/omit';
import easing from './easingFunctions';

/**
 * ### Utility component to make scrolling easier:
 * - can stop scroll propagation
 * - smooth programmatic scroll with 22 easing functions (see `easingFunctions.js`)
 * - out of the box momentum scrolling on iOS
 */
const propTypes = {
  /**
   * components/nodes content. If you need to scroll programmatically pass a function and save `scrollTo(x, y, milliseconds)` callback for later use (it will be passed as first argument) ex: `(scrollTo) => { this.scrollTo = scrollTo; return <MyScrollViewContent />; }`
   */
  children: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.node
  ]).isRequired,
  /**
   * enable horizontal scrolling
   */
  scrollX: React.PropTypes.bool,
  /**
   * enable vertical scrolling
   */
  scrollY: React.PropTypes.bool,
  /**
   * enable scroll propagation
   */
  scrollPropagation: React.PropTypes.bool,
  /**
   * easing function used when scrolling with `scrollTo`
   */
  easing: React.PropTypes.oneOf(Object.keys(easing)),
  style: React.PropTypes.object
};

export default class ScrollView extends React.Component {

  static propTypes = propTypes

  static defaultProps = {
    scrollX: true,
    scrollY: true,
    scrollPropagation: true,
    easing: 'easeInOutQuad'
  }

  componentDidMount() {
    if (!this.props.scrollPropagation) {
      this.disableScrollPropagation();
    }
  }

  getScrollView = () => React.findDOMNode(this.refs.scrollView)

  enableScrollPropagation = () => {
    this.getScrollView().removeEventListener('wheel', this.stopScrollPropagation);
    this.getScrollView().removeEventListener('touchstart', this.initializeTouchEventDirection);
    this.getScrollView().removeEventListener('touchend', this.clearTouchEventDirection);
    this.getScrollView().removeEventListener('touchmove', this.stopScrollPropagation);
  }

  disableScrollPropagation = () => {
    this.getScrollView().addEventListener('wheel', this.stopScrollPropagation);
    this.getScrollView().addEventListener('touchstart', this.initializeTouchEventDirection);
    this.getScrollView().addEventListener('touchend', this.clearTouchEventDirection);
    this.getScrollView().addEventListener('touchmove', this.stopScrollPropagation);
  }

  isEventInsideScrollView = (el) => {
    if (el === this.getScrollView()) {
      return true;
    } else if (el.parentNode) {
      return this.isEventInsideScrollView(el.parentNode);
    } else {
      return false;
    }
  }

  initializeTouchEventDirection = (e) => {
    this.lastY = e.touches[0].clientY;
  }

  clearTouchEventDirection = () => {
    this.lastY = null;
  }

  stopScrollPropagation = (e) => {
    const el = e.target || e.srcElement;
    const isEventInsideScrollView = this.isEventInsideScrollView(el);
    if (isEventInsideScrollView) {

      // const { scrollTop, scrollHeight, offsetHeight } = this.getScrollView();

      let up;
      let down;

      if (e instanceof TouchEvent) {
        const { clientY } = e.touches[0];
        up = clientY > this.lastY;
        this.lastY = clientY;
      } else if (e instanceof WheelEvent) {
        up = e.wheelDelta > 0;
      }
      down = !up;

      if((down && this.isAtBottom()) || (up && this.isAtTop())) {
        e.preventDefault();
      }
    }
  }

  isAtTop = () => this.getScrollView().scrollTop === 0

  isAtBottom = () => {
    const { scrollTop, scrollHeight, offsetHeight } = this.getScrollView();
    return scrollTop + offsetHeight === scrollHeight;
  }

  computeStyle = () => {
    const { scrollX, scrollY, style } = this.props;
    return {
      overflowY: scrollY ? 'scroll' : undefined, /* has to be scroll for iOS, not auto */
      overflowX: scrollX ? 'scroll' : undefined, /* has to be scroll for iOS, not auto */
      WebkitOverflowScrolling: 'touch',
      ...style
    };
  }

  scrollTo = (_x, _y, scrollDuration) => {
    const { scrollTop, scrollLeft } = this.getScrollView();
    const x = _x === null ? scrollLeft : _x;
    const y = _y === null ? scrollTop : _y;

    this._scrollTo(x, y, scrollDuration, Date.now(), scrollLeft, scrollTop);
  }

  _scrollTo = (x, y, scrollDuration, startTime, startX, startY) => {
    if (scrollDuration > 0) {
      const { scrollTop, scrollLeft } = this.getScrollView();
      const easingFunction = easing[this.props.easing];

      if ((typeof x === 'number' && scrollLeft !== x) || (typeof y === 'number' && scrollTop !== y)) {
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
  }

  render() {
    const props = omit(this.props, Object.keys(propTypes));
    const { children } = this.props;
    const isFunction = typeof children === 'function';
    return (
      <div { ...props } style={this.computeStyle()} ref='scrollView'>
        {isFunction ? children(this.scrollTo) : children}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollPropagation && !this.props.scrollPropagation) {
      this.enableScrollPropagation();
    } else if (!nextProps.scrollPropagation && this.props.scrollPropagation) {
      this.disableScrollPropagation();
    }
  }

  componentWillUnmount() {
    if (!this.props.scrollPropagation) {
      this.enableScrollPropagation();
    }
  }

}
