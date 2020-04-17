import * as React from 'react';
import * as cx from 'classnames';
import { stateClassUtil, ObjectOverwrite, Children } from '../utils';
import { FormattedText } from '../FormattedText/FormattedText';
import { Popover } from '../Popover/Popover';

export type TooltipRequiredProps = {
  /** the element over which the tooltip is shown */
  children: Children;
  /** popover props */
  popover: ObjectOverwrite<
    Popover.Props['popover'],
    {
      content: string;
      event?: undefined;
    }
  >;
  /** add class name */
  className?: string;
  /** add id */
  id?: string;
  /** add custom css style */
  style?: React.CSSProperties;
};

export type TooltipDefaultProps = {
  /** type - light | dark */
  type: Tooltip.Type;
  /** size - small | big */
  size: Tooltip.Size;
};

export namespace Tooltip {
  export type Type = 'light' | 'dark';
  export type Size = 'small' | 'big';

  export type Props = TooltipRequiredProps & Partial<TooltipDefaultProps>;
}

type TooltipDefaultedProps = TooltipRequiredProps & TooltipDefaultProps;

export class Tooltip extends React.PureComponent<Tooltip.Props> {
  static defaultProps: TooltipDefaultProps = {
    type: 'dark',
    size: 'small'
  };

  render() {
    const { children, type, size, popover: _popover, className, id, style } = this
      .props as TooltipDefaultedProps;
    const popover: Popover.Props['popover'] = {
      ..._popover,
      content: <FormattedText>{_popover.content}</FormattedText>,
      event: 'hover',
      className: cx('tooltip', stateClassUtil([type, size]), _popover.className)
    };

    return (
      <Popover className={className} id={id} style={style} popover={popover}>
        {children}
      </Popover>
    );
  }
}
