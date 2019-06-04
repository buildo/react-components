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
    title?: string | JSX.Element;
    /** icon to replace the default one */
    icon?: JSX.Element;
  };
}

export class ErrorMessage extends React.Component<ErrorMessage.Props> {
  render() {
    const { message, title, icon } = this.props;
    return (
      <View
        width="100%"
        className={cx("error-message", title ? "has-title" : undefined)}
      >
        <View
          vAlignContent="center"
          hAlignContent="center"
          shrink={false}
          className="error-message-icon"
        >
          {!!icon ? icon : <ErrorIcon />}
        </View>
        <View column vAlignContent="center" hAlignContent="left">
          {!!title && <View className="error-message-title">{title}</View>}
          <View shrink={false} className="error-message-content">
            {message}
          </View>
        </View>
      </View>
    );
  }
}
