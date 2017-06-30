import { CSSProperties, PureComponent } from 'react';
import { TransitionWrapperProps } from '../transition-wrapper';
import { Type } from 'tcomb';

export type ToasterProps = {
  children: any, // TODO: t.ReactChildren
  attachTo?: string,
  transitionGroup?: object,
  transitionStyles?: TransitionWrapperProps.TransitionStyles,
  transitionEnterTimeout: number,
  transitionLeaveTimeout: number,
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  id?: string,
  className?: string,
  style?: CSSProperties
}

export default class Toaster extends PureComponent<ToasterProps> {}

export var Props: {
  [key: string]: Type<any>
}
