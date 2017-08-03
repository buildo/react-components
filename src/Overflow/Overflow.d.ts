import { CSSProperties, ComponentClass } from 'react';
import { Type } from 'tcomb';

export type OverflowProps = {
  children: any,
  onChange: (isOverflowing: boolean) => void,
  id?: string,
  className?: string,
  style?: CSSProperties
}

declare const Overflow: ComponentClass<OverflowProps>;
export default Overflow;

export const Props: {
  [key: string]: Type<any>
}
