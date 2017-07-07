import { CSSProperties, ComponentClass, MouseEventHandler } from 'react';
import { Type } from 'tcomb';

export type IconProps = {
  icon?: string,
  color?: string,
  paths?: number, // it was PositiveInteger
  onClick?: MouseEventHandler<HTMLElement>,
  className?: string,
  style?: CSSProperties,
};

export const Props: {
  [key: string]: Type<any>
};

declare const Icon: ComponentClass<IconProps>;
export default Icon;
