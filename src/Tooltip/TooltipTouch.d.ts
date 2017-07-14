import { Type } from 'tcomb';
import { PureComponent } from 'react';
import { TooltipProps } from './Tooltip';

type TooltipTouchState = {
  tooltipLeft: number,
  tooltipTop: number,
  tooltipBottom: number,
  tooltipRight: number,
  isOpen: boolean
}

export default class TooltipTouch extends PureComponent<TooltipProps, TooltipTouchState> {}

export const Props: {
  [key: string]: Type<any>
}
