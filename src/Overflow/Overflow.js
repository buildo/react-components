import React from 'react';
import ReactDOM from 'react-dom';
import { props, t } from '../utils';
import ResizeSensor from '../ResizeSensor/ResizeSensor';

export const Props = {
  children: t.ReactChild,
  onChange: t.Function,
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/**
 * Util component which accepts calls a callback whenever the content starts or stop overflowing.
 * @param children - a function that will be called with the argument
 * @param onChange - tooltip delay if the component is lazy
 */
@props(Props)
export default class Overflow extends React.Component {

  isOverflowing = false

  componentDidMount() {
    this.verifyOverflow();
  }

  getElementWidth(element) {
    if (element && typeof window !== 'undefined') {
      return parseFloat(window.getComputedStyle(element).width);
    }
    return null;
  }

  verifyOverflow() {
    if (typeof window !== 'undefined') {
      const node = ReactDOM.findDOMNode(this.ref);

      if (node && node.children) {
        const childrenWidth = this.getElementWidth(node.children[0]);
        const parentWidth = this.getElementWidth(node);

        const isOverflowing = (childrenWidth > parentWidth);
        if (this.isOverflowing !== isOverflowing) {
          this.isOverflowing = isOverflowing;
          this.props.onChange(isOverflowing);
        }
      }
    }
  }

  onResize = () => this.verifyOverflow()

  render() {
    const { children, style, className, id } = this.props;

    return (
      <ResizeSensor debounce={10} onResize={this.onResize}>
        <div {...{ className, id }} style={{ ...style, width: '100%' }} ref={ref => { this.ref = ref; }}>
          {children}
        </div>
      </ResizeSensor>
    );
  }

}
