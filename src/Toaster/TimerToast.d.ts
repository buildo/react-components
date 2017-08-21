import { CSSProperties, ComponentType } from 'react';
import { TransitionWrapperProps } from '../TransitionWrapper/TransitionWrapper';
import { Type } from 'tcomb';

export type TimerToastProps = {
  children: any,
  onTimeout: (uniqueKey?: string) => void,
  duration: number,
  uniqueKey?: string,
  id?: string,
  className?: string,
  style?: CSSProperties
}

declare const TimerToast: ComponentType<TimerToastProps>;
export default TimerToast;

export var Props: {
  [key: string]: Type<any>
}
