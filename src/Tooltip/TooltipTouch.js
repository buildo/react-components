import React from 'react';
import ReactDOM from 'react-dom';
import * as cx from 'classnames';
import Tooltip, { Props } from './Tooltip';
import View from 'react-flexview';
import { props, skinnable } from '../utils';

@skinnable()
@props(Props)
export default class TooltipTouch extends React.PureComponent {

  static defaultProps = {
    type: 'dark',
    size: 'small'
  }

  state = {
    tooltipLeft: 0,
    tooltipTop: 0,
    tooltipBottom: 0,
    tooltipRight: 0,
    isOpen: false
  };

  componentWillUnmount() {
    if (typeof this.timeout !== 'undefined') {
      clearTimeout(this.timeout);
    }
  }

  onTouchStart = () => {
    const {
      left: tooltipLeft,
      top: tooltipTop,
      bottom: tooltipBottom,
      right: tooltipRight
    } = this.ref.getBoundingClientRect();

    this.timeout = setTimeout(() => {
      this.setState({
        tooltipLeft,
        tooltipTop,
        tooltipBottom,
        tooltipRight,
        isOpen: true
      });
    }, 200);
  }

  onTouchMove = (e) => {
    const {
      tooltipLeft,
      tooltipTop,
      tooltipBottom,
      tooltipRight,
      isOpen
    } = this.state;

    if (isOpen) {
      const { pageX: eventX, pageY: eventY } = e.touches[0];

      if (!(eventX <= tooltipRight && eventX >= tooltipLeft && eventY <= tooltipBottom && eventY >= tooltipTop)) {
        this.closeTooltip();
      }
    }
  }

  onTouchEnd = () => this.closeTooltip();

  closeTooltip = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.setState({
      tooltipLeft: 0,
      tooltipTop: 0,
      tooltipBottom: 0,
      tooltipRight: 0,
      isOpen: false
    });
  }

  getLocals({ popover, ...props }) {
    const { isOpen } = this.state;

    return {
      ...props,
      isOpen,
      touchListeners: {
        onTouchStart: this.onTouchStart,
        onTouchEnd: this.onTouchEnd,
        onTouchMove: isOpen ? this.onTouchMove : undefined
      },
      popover: {
        ...popover,
        isOpen,
        className: cx(popover.className, 'tooltip-touch')
      },
      spanStyle: isOpen ? {
        display: 'hidden',
        position: 'fixed',
        top: -1000
      } : undefined
    };
  }

  template({ children, className, isOpen, touchListeners, spanStyle, ...locals }) {
    return (
      <View
        vAlignContent='center'
        className={className}
        ref={r => { if (r) { this.ref = ReactDOM.findDOMNode(r); } }}
        {...touchListeners}
      >
        <span style={spanStyle}>{children}</span>
        {isOpen && <Tooltip {...locals}>{children}</Tooltip>}
      </View>
    );
  }
}

export { Props };
