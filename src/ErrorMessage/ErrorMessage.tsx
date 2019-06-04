import * as React from "react";
import View from "react-flexview";
import * as cx from "classnames";
import ErrorIcon from "./ErrorIcon";

import "./errorMessage.scss";

export namespace ErrorMessage {
  export type Props = {
    /** error message */
    message: string | JSX.Element;
    /** optional title to be shown above the error message */
    messageTitle?: string | JSX.Element;
    /** icon to replace the default one */
    errorIcon?: JSX.Element;
  };
}

export class ErrorMessage extends React.PureComponent<ErrorMessage.Props> {
  render() {
    const { message, messageTitle, errorIcon } = this.props;
    return (
      <View
        width="100%"
        className={cx("error-message", messageTitle ? "has-title" : undefined)}
      >
        <View
          vAlignContent="center"
          hAlignContent="center"
          shrink={false}
          className="error-message-icon"
        >
          {!!errorIcon ? errorIcon : <ErrorIcon />}
        </View>
        <View column vAlignContent="center" hAlignContent="left">
          {!!messageTitle && (
            <View className="error-message-title">{messageTitle}</View>
          )}
          <View shrink={false} className="error-message-content">
            {message}
          </View>
        </View>
      </View>
    );
  }
}
