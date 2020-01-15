import * as React from "react";
import omit = require("lodash/omit");
import { Children } from "../utils";
import easing, { EasingType } from "./easingFunctions";

export type ScrollViewDefaultProps = {
  /** enable horizontal scrolling */
  scrollX: boolean;
  /** enable vertical scrolling */
  scrollY: boolean;
  /** enable scroll propagation */
  scrollPropagation: boolean;
  /** easing function used when scrolling with `scrollTo` */
  easing: EasingType;
  /** onScroll function that handle onScroll events */
  onScroll: React.WheelEventHandler<HTMLDivElement>;
  style: React.CSSProperties;
};

export type ScrollTo = (
  _x?: number | null,
  _y?: number | null,
  scrollDuration?: number
) => void;

export type ScrollViewRequiredProps = {
  /** components/nodes content. If you need to scroll programmatically pass a function and save `scrollTo(x, y, milliseconds)` callback for later use (it will be passed as first argument) ex: `(scrollTo) => { this.scrollTo = scrollTo; return <MyScrollViewContent />; }` */
  children: Children | ((scrollTo: ScrollTo) => Children);
};

export type ScrollViewDefaultedProps = ScrollViewRequiredProps &
  ScrollViewDefaultProps &
  React.HTMLAttributes<HTMLDivElement>;

export namespace ScrollView {
  export type Props = ScrollViewRequiredProps &
    Partial<ScrollViewDefaultProps> &
    React.HTMLAttributes<HTMLDivElement>;
}

const Props: Record<
  keyof ScrollViewRequiredProps | keyof ScrollViewDefaultProps,
  true
> = {
  children: true,
  scrollX: true,
  scrollY: true,
  scrollPropagation: true,
  easing: true,
  onScroll: true,
  style: true
};

/**
 * ### Utility component to make scrolling easier:
 * - can stop scroll propagation
 * - smooth programmatic scroll with 22 easing functions (see `easingFunctions.js`)
 * - out of the box momentum scrolling on iOS
 */
export class ScrollView extends React.Component<ScrollView.Props> {
  private scrollView: HTMLDivElement | null = null;
  private lastY: number = 0;

  static defaultProps: ScrollViewDefaultProps = {
    scrollX: true,
    scrollY: true,
    scrollPropagation: true,
    easing: "easeInOutQuad",
    onScroll: () => {},
    style: {}
  };

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
    if (el === this.scrollView) {
      return true;
    } else if (el.parentNode) {
      return this.isEventInsideScrollView(el.parentNode);
    } else {
      return false;
    }
  };

  initializeTouchEventDirection: React.TouchEventHandler<
    HTMLDivElement
  > = e => {
    this.lastY = e.touches[0].clientY;
  };

  clearTouchEventDirection: React.TouchEventHandler<HTMLDivElement> = () => {
    this.lastY = 0;
  };

  stopScrollPropagation: React.ReactEventHandler<HTMLDivElement> = ({
    nativeEvent: e
  }) => {
    const el = (e.target || e.srcElement) as Element;
    const isEventInsideScrollView = this.isEventInsideScrollView(el);
    if (isEventInsideScrollView) {
      // const { scrollTop, scrollHeight, offsetHeight } = this.scrollView;

      let up: boolean = false;
      if (e instanceof TouchEvent) {
        const { clientY } = e.touches[0];
        up = clientY > this.lastY;
        this.lastY = clientY;
      } else if (e instanceof WheelEvent) {
        // not sure why `wheelDelta` is not there
        up = (e as any).wheelDelta > 0;
      }
      const down = !up;

      if ((down && this.isAtBottom()) || (up && this.isAtTop())) {
        e.preventDefault();
      }
    }
  };

  isAtTop = () => this.scrollView && this.scrollView.scrollTop === 0;

  isAtBottom = () => {
    if (!this.scrollView) return false;
    const { scrollTop, scrollHeight, clientHeight } = this.scrollView;
    return scrollTop + clientHeight === scrollHeight;
  };

  computeStyle: () => React.CSSProperties = () => {
    const { scrollX, scrollY, style } = this.props;
    return {
      overflowY: scrollY
        ? "scroll"
        : undefined /* has to be scroll for iOS, not auto */,
      overflowX: scrollX
        ? "scroll"
        : undefined /* has to be scroll for iOS, not auto */,
      WebkitOverflowScrolling: "touch",
      ...style
    };
  };

  scrollTo: ScrollTo = (_x, _y, scrollDuration) => {
    if (!this.scrollView) return;
    const { scrollTop, scrollLeft } = this.scrollView;
    const x = _x || scrollLeft;
    const y = _y || scrollTop;

    this._scrollTo(
      x,
      y,
      scrollDuration || 0,
      Date.now(),
      scrollLeft,
      scrollTop
    );
  };

  _scrollTo = (
    x: number,
    y: number,
    scrollDuration: number,
    startTime: number,
    startX: number,
    startY: number
  ) => {
    if (!this.scrollView) return;
    const { easing: easingType } = this.props as ScrollViewDefaultedProps;
    if (scrollDuration > 0) {
      const { scrollTop, scrollLeft } = this.scrollView;
      const easingFunction = easing[easingType];

      if (
        (typeof x === "number" && scrollLeft !== x) ||
        (typeof y === "number" && scrollTop !== y)
      ) {
        const currentTime = Math.min(scrollDuration, Date.now() - startTime);
        const distanceX = x - startX;
        const distanceY = y - startY;
        this.scrollView.scrollLeft = easingFunction(
          currentTime,
          startX,
          distanceX,
          scrollDuration
        );
        this.scrollView.scrollTop = easingFunction(
          currentTime,
          startY,
          distanceY,
          scrollDuration
        );

        requestAnimationFrame(() =>
          this._scrollTo(x, y, scrollDuration, startTime, startX, startY)
        );
      }
    } else {
      this.scrollView.scrollLeft = x;
      this.scrollView.scrollTop = y;
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
      <div
        {...props}
        {...this.getEventListeners()}
        style={this.computeStyle()}
        ref={sv => {
          this.scrollView = sv;
        }}
      >
        {typeof children === "function"
          ? (children as any)(this.scrollTo)
          : children}
      </div>
    );
  }
}
