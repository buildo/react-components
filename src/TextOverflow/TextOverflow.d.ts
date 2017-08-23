import { CSSProperties, PureComponent } from 'react';
import { Type } from 'tcomb';
import { ObjectOverwrite } from 'typelevel-ts';
import { PopoverProps } from '../Popover/Popover';

export type TextOverflowProps = {
  children?: (self: JSX.Element, isOpen: boolean) => any,
  label?: string | number,
  popover?: ObjectOverwrite<PopoverProps.Popover, {
    position?: PopoverProps.Position,
    content?: void & string
  }>,
  lazy?: boolean,
  delayWhenLazy?: number,
  id?: string,
  className?: string,
  style?: CSSProperties
}

export default class TextOverflow extends PureComponent<TextOverflowProps> {}

export const Props: {
  [key: string]: Type<any>
}
