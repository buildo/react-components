import { ComponentType, CSSProperties, PureComponent } from 'react';
import { Type } from 'tcomb';

export namespace TransitionWrapperProps {
  type TransitionStyles = {
    enter?: CSSProperties,
    enterActive?: CSSProperties,
    default?: CSSProperties,
    leave?: CSSProperties,
    leaveActive?: CSSProperties
  }
}

export type TransitionWrapperProps<CP> = {
  children: any, // TODO: t.ReactChildren
  component: ComponentType<CP>,
  transitionStyles: TransitionWrapperProps.TransitionStyles,
  transitionEnterTimeout: number,
  transitionLeaveTimeout: number,
  onLeave?: () => void,
  className?: string,
  style?: CSSProperties
}

export default class TransitionWrapper extends PureComponent<TransitionWrapperProps> {}

export var Props: {
  [key: string]: Type<any>
}
