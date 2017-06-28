import { PureComponent } from 'react';

export type TextOverflowProps = {
  label?: string | number,
  popover?: object, // TODO(typo): Omit?
  lazy?: boolean,
  id?: string,
  className?: string,
  style?: object
}

export default class TextOverflow extends PureComponent<TextOverflowProps, void> {}
