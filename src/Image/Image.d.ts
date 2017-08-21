import { CSSProperties, ComponentType } from 'react';
import { TransitionWrapperProps } from '../TransitionWrapper/TransitionWrapper';
import { Type } from 'tcomb';

export type ImageProps = {
  src: string,
  width?: number,
  height?: number,
  quality?: number | 'auto',
  format?: 'jpeg' | 'png' | 'wdp' | 'gif' | 'auto',
}

declare const Image: ComponentType<ImageProps>;
export default Image;

export var Props: {
  [key: string]: Type<any>
}
