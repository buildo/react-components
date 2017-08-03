import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';
import { props, t } from '../utils';
import ResizeSensor from '../ResizeSensor/ResizeSensor';

export const Props = {
  children: t.ReactChild,
  onChange: t.Function,
  verifyOverflowOn: t.maybe(t.enums.of(['resize', 'hover'])),
  debounceVerifyOverflow: t.maybe(t.Number),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/**
 * Util component which accepts calls a callback whenever the content starts or stop overflowing.
 * @param children - a function that will be called with the argument
 * @param onChange - tooltip delay if the component is lazy
 * @param verifyOverflowOn - check if the content is overflowing on one of the following events: "resize" | "hover"
 * @param debounceVerifyOverflow - use this to debounce the calls to verify if the content is overflowing
 */
@props(Props)
export default class Overflow extends React.Component {

  static defaultProps = {
    verifyOverflowOn: 'resize'
  }

  state = { isOverflowing: null };

  componentDidMount() {
    this.verifyOverflow({ force: true });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.verifyOverflowOn === 'resize' && nextProps.children !== this.props.children) {
      this.reset();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOverflowing } = this.state;
    if (isOverflowing !== prevState.isOverflowing) {
      this.props.onChange(isOverflowing);
    }
  }

  reset = () => this.setState({
    isOverflowing: false
  }, () => this.verifyOverflow({ force: true, reset: true }));

  getElementWidth(element) {
    if (element && typeof window !== 'undefined') {
      return parseFloat(window.getComputedStyle(element).width);
    }
    return null;
  }

  verifyOverflow({ force, reset } = {}) {
    const { verifyOverflowOn } = this.props;
    const { isOverflowing: wasOverflowing } = this.state;

    if ((force || (verifyOverflowOn === 'resize' && wasOverflowing === false)) && typeof window !== 'undefined') {
      const node = ReactDOM.findDOMNode(this);

      if (node && node.children && node.parentNode) {
        const childrenWidth = this.getElementWidth(node.children[0]);
        const parentWidth = this.getElementWidth(node.parentNode);

        const isOverflowing = (childrenWidth > parentWidth);
        if (isOverflowing && !wasOverflowing) {
          this.setState({ isOverflowing: true });
        } else if (!isOverflowing && reset && wasOverflowing) {
          this.setState({ isOverflowing: false });
        }
      }
    }
  }

  _onMouseEvent = (type) => (type === 'mouseenter') && this.onMouseEnter()

  onMouseEventDebounced = debounce(this._onMouseEvent, this.props.debounceVerifyOverflow)

  onMouseEvent = ({ type }) => (
    this.props.debounceVerifyOverflow ? this.onMouseEventDebounced(type) : this._onMouseEvent(type)
  )

  onMouseEnter = () => {
    if (!this.state.isHovering) {
      this.setState({
        isHovering: true
      }, () => this.props.verifyOverflowOn === 'hover' && this.verifyOverflow({ force: true, reset: true }));
    }
  }

  onMouseLeave = () => this.state.isHovering && this.setState({ isHovering: false })

  onResize = () => this.verifyOverflow({ force: true, reset: true })

  render() {
    const {
      props: { children, verifyOverflowOn, style, className, id },
      onMouseEvent,
      onMouseLeave
    } = this;

    const events = verifyOverflowOn === 'hover' && {
      onMouseEnter: onMouseEvent,
      onMouseLeave: e => {
        onMouseEvent(e);
        onMouseLeave(e);
      }
    };

    return (
      <div {...events} {...{ className, id }} style={{ ...style, width: '100%' }}>
        {verifyOverflowOn === 'hover' ?
          children :
          <ResizeSensor onResize={this.onResize}>{children}</ResizeSensor>
        }
      </div>
    );
  }

}
