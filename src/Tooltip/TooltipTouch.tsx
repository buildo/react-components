import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cx from 'classnames';
import Tooltip, { TooltipProps, TooltipDefaultProps, TooltipRequiredProps, Props  } from './Tooltip';
import View from 'react-flexview';
import { props } from '../utils';


export type TooltipTouchState = {
  tooltipLeft: number,
  tooltipTop: number,
  tooltipBottom: number,
  tooltipRight: number,
  isOpen: boolean
}

type TooltipTouchDefaultedProps = TooltipRequiredProps & TooltipDefaultProps;

@props(Props)
export default class TooltipTouch extends React.PureComponent<TooltipProps, TooltipTouchState> {

  static defaultProps: TooltipDefaultProps = {
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

  private ref: HTMLDivElement

  timeout: number

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

    this.timeout = window.setTimeout(() => {
      this.setState({
        tooltipLeft,
        tooltipTop,
        tooltipBottom,
        tooltipRight,
        isOpen: true
      });
    }, 200);
  }

  onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
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

  render() {
    const { popover: _popover, children, className, id, style, type, size } = this.props as TooltipTouchDefaultedProps;
    const { isOpen } = this.state;
    const popover = {
      ..._popover,
      isOpen,
      className: cx(_popover.className, 'tooltip-touch')
    };
    const spanStyle: React.CSSProperties = {
      display: 'hidden',
      position: 'fixed',
      top: -1000
    };

    return (
      <View
        vAlignContent='center'
        className={className}
        ref={r => { if (r) { this.ref = ReactDOM.findDOMNode(r); } }}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        onTouchMove={isOpen ? this.onTouchMove : undefined}
      >
        <span style={spanStyle}>{children}</span>
        {isOpen && (
          <Tooltip
            id={id}
            className={className}
            style={style}
            type={type}
            size={size}
            popover={popover}
          >
            {children}
          </Tooltip>
        )}
      </View>
    );
  }
}

export { Props };
