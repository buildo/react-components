import { CSSProperties, ComponentClass } from 'react';
import { Type } from 'tcomb';

export type OverflowProps = {
  content: JSX.Element | string,
  contentIfOverflowing: JSX.Element | string,
  id?: string,
  className?: string,
  style?: CSSProperties
}

declare const Overflow: ComponentClass<OverflowProps>;
export default Overflow;

export const Props: {
  [key: string]: Type<any>
}
