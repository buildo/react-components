import * as React from 'react';
import { Modal } from './Modal';
import { ObjectOmit } from 'typelevel-ts';

type ContextProps = {
  childContextTypes: React.ValidationMap<any>,
  getChildContext: () => object
};

type ContextWrapperProps = ObjectOmit<Modal.Props, keyof ContextProps>;

export const modalWithContext = (contextTypes: React.ValidationMap<any>) =>
  class ContextWrapper extends React.Component<ContextWrapperProps> {
    static contextTypes = contextTypes;

    render() {
      const contextProps: ContextProps = {
        childContextTypes: contextTypes,
        getChildContext: () => this.context
      };
      return <Modal {...this.props} {...contextProps} />;
    }
  };

