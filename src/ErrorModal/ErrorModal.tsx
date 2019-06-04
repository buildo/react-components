import * as React from "react";
import Modal from "../Modal";
import View from "react-flexview";
import ErrorIcon from "../ErrorMessage/ErrorIcon";

import "./errorModal.scss";

type Props = {
  /** error message */
  message: string | JSX.Element;
  /** optional title to be shown above the error message */
  title?: string | JSX.Element;
  /** icon to replace the default one */
  icon?: JSX.Element;
} & Modal.Props;

class ErrorModal extends React.Component<Props> {
  render() {
    const { title, message, icon, ...modalProps } = this.props;
    return (
      <Modal
        transitionEnterTimeout={0}
        transitionLeaveTimeout={0}
        className="error-modal"
        {...modalProps}
      >
        <View column hAlignContent="center">
          <View
            vAlignContent="center"
            hAlignContent="center"
            shrink={false}
            className="error-modal-icon"
          >
            {!!icon ? icon : <ErrorIcon />}
          </View>
          {!!title && <View className="error-modal-title">{title}</View>}
          <View className="error-modal-content">{message}</View>
        </View>
      </Modal>
    );
  }
}

export default ErrorModal;
