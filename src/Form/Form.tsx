import * as React from "react";
import * as cx from "classnames";
import { StatefulButton } from "../Button/StatefulButton";
import View from "react-flexview";

export namespace Form {
  export type Props = View.Props & {
    onSubmit: () => Promise<void>;
    submitLabel: string;
    submitProcessingLabel?: string;
    renderSubmit?: (buttonProps: StatefulButton.Props) => JSX.Element;
  };
}

export class Form extends React.PureComponent<Form.Props> {
  formRef = React.createRef<HTMLFormElement>();

  onFormSubmit: React.ReactEventHandler<HTMLFormElement> = e => {
    if (this.formRef.current) {
      const button = this.formRef.current.querySelector<HTMLDivElement>(
        ".button .button-inner"
      );
      if (button) {
        button.click();
      }
    }
    e.stopPropagation();
    e.preventDefault();
  };

  renderSubmit = (props: StatefulButton.Props): JSX.Element =>
    this.props.renderSubmit ? (
      this.props.renderSubmit(props)
    ) : (
      <StatefulButton {...props} />
    );

  render() {
    const {
      children,
      className,
      submitLabel,
      submitProcessingLabel,
      onSubmit,
      renderSubmit,
      ...props
    } = this.props;
    const submitButtonProps: StatefulButton.Props = {
      style: { marginTop: "12px" },
      primary: true,
      baseState: "ready",
      onClick: this.props.onSubmit,
      label: {
        ready: submitLabel,
        processing: submitProcessingLabel || submitLabel
      }
    };

    return (
      <form
        className={cx("form", className)}
        onSubmit={this.onFormSubmit}
        style={{ width: "100%" }}
        ref={this.formRef}
      >
        <View {...props}>
          {children}
          {this.renderSubmit(submitButtonProps)}
        </View>
        <input type="submit" style={{ display: "none" }} />
      </form>
    );
  }
}
