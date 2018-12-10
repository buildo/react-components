import * as React from "react";
import { Modal } from "./Modal";
import { ObjectOmit } from "../utils";

type ContextProps = {
  childContextTypes: React.ValidationMap<any>;
  getChildContext: () => object;
};

type ContextWrapperProps = ObjectOmit<Modal.Props, keyof ContextProps>;

type ModalWithContext = (
  contextTypes: React.ValidationMap<any>
) => React.ComponentType<ContextWrapperProps>;

export const modalWithContext: ModalWithContext = contextTypes =>
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
