import { CSSProperties, PureComponent } from 'react';
import { Type } from 'tcomb';

export type TextOverflowProps = {
  children?: (self: JSX.Element, isOpen: boolean) => any,
  label: string,
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
