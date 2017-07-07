import { CSSProperties, ComponentClass, ComponentType } from 'react';
import { Type } from 'tcomb';

export type LoadingSpinnerProps = {
  size?: string | number,
  color?: string,
  message?: {
    content: string,
    color?: string,
    size?: string | number
  },
  overlayColor?: string,
  id?: string,
  className?: string,
  style?: CSSProperties
};

export const Props: {
  [key: string]: Type<any>
};

declare const LoadingSpinner: ComponentClass<LoadingSpinnerProps>;
export default LoadingSpinner;
