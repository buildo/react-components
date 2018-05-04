import * as React from 'react';
import { props, t, ReactElement } from '../utils';
import { ResizeSensor } from '../ResizeSensor/ResizeSensor';

export namespace Overflow {
  export type Props = {
    /** react node initially rendered */
    content: JSX.Element,
    /** react node rendered if `content` overflows its parent */
    contentIfOverflowing: JSX.Element,
    id?: string,
    className?: string,
    style?: React.CSSProperties
  };
}

export type State = {
  isOverflowing: boolean
};

export const Props = {
  content: ReactElement,
  contentIfOverflowing: ReactElement,
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/** Util component to render a different react node if the original one overflows its parent. */
@props(Props)
export class Overflow extends React.Component<Overflow.Props, State> {

  private ref: HTMLDivElement | null

  state = { isOverflowing: false }

  componentDidMount() {
    this.verifyOverflow();
  }

  componentDidUpdate() {
    this.verifyOverflow();
  }

  getElementWidth(element: Element): number {
    if (element && typeof window !== 'undefined') {
      return parseFloat(window.getComputedStyle(element).width || '');
    }
    return 0;
  }

  verifyOverflow() {
    if (typeof window !== 'undefined') {
      const node = this.ref;

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
