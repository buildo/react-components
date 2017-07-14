import { CSSProperties, PureComponent, SyntheticEvent } from 'react';
import { ModalPortalProps } from './ModalPortal';
import { Type } from 'tcomb';

export type ModalProps = ModalPortalProps & {
  children: any, // TODO: t.ReactChildren
  title?: string,
  footer?: any,  // TODO: t.ReactChildren
  iconClose?: any,  // TODO: t.ReactChildren
  overlay: {
    color?: string,
    alpha?: number
  },
  dismissOnClickOutside?: boolean,
  onDismiss?: (e: SyntheticEvent<HTMLDivElement>) => void,
  className?: string,
  style?: CSSProperties,
  id?: string
};

export default class Modal extends PureComponent<ModalProps> {}

export var Props: {
  [key: string]: Type<any>
}
