import { CSSProperties, PureComponent } from 'react';
import { Type } from 'tcomb';

export type BasicModalProps = {
  children: any,
  iconClose?: any,
  onDismiss?: () => void,
  background?: {
    color?: string,
    alpha?: number,
    stopScrollPropagation?: boolean
  },
  style?: CSSProperties,
  className?: string,
  id?: string
}

export const Props: {
  [key: string]: Type<any>
}

export default class BasicModal extends PureComponent<BasicModalProps> {}
