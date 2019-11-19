import * as React from "react";
import * as cx from "classnames";
import View from "react-flexview";
import Button, { StatefulButton } from "../Button";
import { findDOMNode, Children } from "../utils";

export namespace Form {
  export type Props = View.Props & {
    render: (ref: React.RefObject<any>) => NonNullable<Children>;
    noSubmitOnEnter?: boolean;
  };
}

export class Form extends React.PureComponent<Form.Props> {
  buttonRef = React.createRef<Button | StatefulButton>();

  onFormSubmit: React.ReactEventHandler<HTMLFormElement> = e => {
    if (!this.props.noSubmitOnEnter && this.buttonRef.current) {
      const buttonDiv = findDOMNode(this.buttonRef.current);
      const clickable = buttonDiv.querySelector(".button-inner");
      if (clickable) {
        (clickable as HTMLDivElement).click();
      }
    }
    e.stopPropagation();
    e.preventDefault();
  };

  render() {
    const {
      className,
      style,
      render,
      noSubmitOnEnter,
      ...viewProps
    } = this.props;
    return (
      <form
        className={cx("form", className)}
        onSubmit={this.onFormSubmit}
        style={{ width: "100%", ...style }}
      >
        <View {...viewProps}>{render(this.buttonRef)}</View>
        <input type="submit" style={{ display: "none" }} />
      </form>
    );
  }
}
