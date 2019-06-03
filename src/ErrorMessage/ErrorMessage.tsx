import * as React from "react";
import View from "react-flexview";
import * as cx from "classnames";

import "./errorMessage.scss";

export namespace ErrorMessage {
  export type Props = {
    /** error message */
    message: string;
    /** optional title to be shown above the error */
    title?: string;
    /** icon to replace the default one */
    icon?: JSX.Element;
  };
}

const defaultIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      transform="matrix(1 0 0 -1 -4 20)"
      d="M11.2 16h1.6v-4.8h-1.6V16zM12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.4c-3.52 0-6.4-2.88-6.4-6.4 0-3.52 2.88-6.4 6.4-6.4 3.52 0 6.4 2.88 6.4 6.4 0 3.52-2.88 6.4-6.4 6.4zm-.8-8.8h1.6V8h-1.6v1.6z"
    />
  </svg>
);

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
          {!!icon ? icon : defaultIcon}
        </View>
        <View column vAlignContent="center" hAlignContent="left">
          {title && <View className="error-message-title">{title}</View>}
          <View
            shrink={false}
            className="error-message-content"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </View>
      </View>
    );
  }
}
