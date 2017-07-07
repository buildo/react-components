import { CSSProperties, PureComponent } from 'react';
import { Type } from 'tcomb';

export namespace DividerProps {
  type Orientation = 'horizontal' | 'vertical'
  type Size = 'small' | 'medium' | 'large' | 'no-margin'
}

export type DividerProps = {
  orientation?: DividerProps.Orientation,
  style?: CSSProperties,
  size?: DividerProps.Size
}

export default class Divider extends PureComponent<DividerProps> {}

export const Props: {
  [key: string]: Type<any>
}
