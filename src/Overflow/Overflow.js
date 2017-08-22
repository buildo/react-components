import React from 'react';
import ReactDOM from 'react-dom';
import { props, t, ReactNode } from '../utils';
import ResizeSensor from '../ResizeSensor/ResizeSensor';

export const Props = {
  content: ReactNode,
  contentIfOverflowing: ReactNode,
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/**
 * Util component to render a different react node if the original one overflows its parent.
 * @param content - react node initially rendered
 * @param contentIfOverflowing - react node rendered if `content` overflows its parent
 */
@props(Props)
export default class Overflow extends React.Component {

  state = { isOverflowing: false }

  componentDidMount() {
    this.verifyOverflow();
  }

  componentDidUpdate() {
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
        if (this.state.isOverflowing !== isOverflowing) {
          this.setState({ isOverflowing });
        }
      }
    }
  }

  onResize = () => this.verifyOverflow()

  render() {
    const { content, contentIfOverflowing, style, className, id } = this.props;
    const { isOverflowing } = this.state;

    return (
      <ResizeSensor debounce={10} onResize={this.onResize}>
        <div {...{ className, id }} style={{ ...style, width: '100%' }} ref={ref => { this.ref = ref; }}>
          {isOverflowing ? contentIfOverflowing : content}
        </div>
      </ResizeSensor>
    );
  }

}
