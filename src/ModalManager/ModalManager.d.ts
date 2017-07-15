import { PureComponent } from 'react';
import { Type } from 'tcomb';
import { TransitionWrapperProps } from '../TransitionWrapper/TransitionWrapper';

export type ModalManagerProps = {
  children?: any,
  transitionStyles?: TransitionWrapperProps.TransitionStyles,
  transitionEnterTimeout?: number,
  transitionLeaveTimeout?: number,
  getChildContext?: () => object,
  childContextTypes?: object
}

export const Props: {
  [key: string]: Type<any>
}

export default class ModalManager extends PureComponent<ModalManagerProps> {}
