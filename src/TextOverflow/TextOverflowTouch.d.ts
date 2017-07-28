import { CSSProperties, PureComponent } from 'react';
import { Type } from 'tcomb';
import { ObjectOverwrite } from 'typelevel-ts';
import { PopoverProps } from '../Popover/Popover';

export type TextOverflowTouchProps = {
  label?: string | number,
  popover?: ObjectOverwrite<PopoverProps.Popover, {
    position?: PopoverProps.Position,
    content?: void & string
  }>,
  id?: string,
  style?: object
}

export default class TextOverflowTouch extends PureComponent<TextOverflowTouchProps> {}

export const Props: {
  [key: string]: Type<any>
}
