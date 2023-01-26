import * as React from 'react';
import cx from 'classnames';
import { Tooltip, TooltipDefaultProps, TooltipRequiredProps } from './Tooltip';
import View from 'react-flexview';
import { findDOMNode } from '../utils';

export type State = {
  tooltipLeft: number;
  tooltipTop: number;
  tooltipBottom: number;
  tooltipRight: number;
  isOpen: boolean;
};

export namespace TooltipTouch {
  export type Props = Tooltip.Props;
}

type TooltipTouchDefaultedProps = TooltipRequiredProps & TooltipDefaultProps;

export class TooltipTouch extends React.PureComponent<Tooltip.Props, State> {
  static defaultProps: TooltipDefaultProps = {
    type: 'dark',
    size: 'small'
  };

  state = {
    tooltipLeft: 0,
    tooltipTop: 0,
    tooltipBottom: 0,
    tooltipRight: 0,
    isOpen: false
  };

  private ref!: HTMLDivElement;

  timeout!: number;

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
  };

  onTouchMove: React.TouchEventHandler<HTMLDivElement> = e => {
    const { tooltipLeft, tooltipTop, tooltipBottom, tooltipRight, isOpen } = this.state;

    if (isOpen) {
      const { pageX: eventX, pageY: eventY } = e.touches[0];

      if (
        !(
          eventX <= tooltipRight &&
          eventX >= tooltipLeft &&
          eventY <= tooltipBottom &&
          eventY >= tooltipTop
        )
      ) {
        this.closeTooltip();
      }
    }
  };

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
  };

  render() {
    const { popover, children, className, ..._tooltipProps } = this
      .props as TooltipTouchDefaultedProps;
    const { isOpen } = this.state;
    const tooltipProps = {
      ..._tooltipProps,
      popover: {
        ...popover,
        isOpen,
        className: cx(popover.className, 'tooltip-touch')
      },
      children
    };
    const spanStyle: React.CSSProperties | undefined = isOpen
      ? {
          display: 'hidden',
          position: 'fixed',
          top: -1000
        }
      : undefined;

    return (
      <View
        vAlignContent="center"
        className={className}
        ref={r => {
          if (r) {
            this.ref = findDOMNode<HTMLDivElement>(r);
          }
        }}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        onTouchMove={isOpen ? this.onTouchMove : undefined}
      >
        <span style={spanStyle}>{children}</span>
        {isOpen && <Tooltip {...tooltipProps} />}
      </View>
    );
  }
}
