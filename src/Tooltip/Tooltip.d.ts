import { Type } from 'tcomb';
import { CSSProperties ,PureComponent } from 'react';
import { PopoverProps } from '../popover/Popover';

export namespace TooltipProps {
  type Type = 'light' | 'dark';
  type Size = 'small' | 'big';
}

export type TooltipProps = {
  children: any, // TODO: t.ReactChildren
  popover: PopoverProps,
  type: TooltipProps.Type,
  size: TooltipProps.Size,
  className?: string,
  id?: string,
  style?: CSSProperties
}

export default class Tooltip extends PureComponent<TooltipProps> {}

export const Props: {
  [key: string]: Type<any>
}
