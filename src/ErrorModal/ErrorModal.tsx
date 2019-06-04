import * as React from "react";
import Modal from "../Modal";
import View from "react-flexview";
import ErrorIcon from "../ErrorMessage/ErrorIcon";

import "./errorModal.scss";

export namespace ErrorModal {
  export type Props = {
    /** error message */
    message: string | JSX.Element;
    /** optional title to be shown above the error message */
    messageTitle?: string | JSX.Element;
    /** icon to replace the default one */
    errorIcon?: JSX.Element;
  } & Partial<Exclude<Modal.Props, "children">>;
}

export class ErrorModal extends React.Component<ErrorModal.Props> {
  render() {
    const { messageTitle, message, errorIcon, ...modalProps } = this.props;
    return (
      <Modal
        className="error-modal"
        transitionEnterTimeout={0}
        transitionLeaveTimeout={0}
        {...modalProps}
      >
        <View column hAlignContent="center">
          <View
            vAlignContent="center"
            hAlignContent="center"
            shrink={false}
            className="error-modal-icon"
          >
            {!!errorIcon ? errorIcon : <ErrorIcon />}
          </View>
          {!!messageTitle && (
            <View className="error-modal-title">{messageTitle}</View>
          )}
          <View className="error-modal-content">{message}</View>
        </View>
      </Modal>
    );
  }
}
