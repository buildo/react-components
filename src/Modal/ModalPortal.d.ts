import { PureComponent } from 'react';

export type ModalPortalProps = {
  children: any, // TODO: t.ReactChildren
  transitionEnterTimeout: number,
  transitionLeaveTimeout: number,
  className?: string,
  childContextTypes?: object,
  getChildContext?: () => object
}

export default class ModalProps extends PureComponent<ModalPortalProps, void> {}
