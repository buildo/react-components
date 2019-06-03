import * as React from "react";
import * as cx from "classnames";
import View from "react-flexview";
import Button from "../Button";

export namespace Form {
  export type Props = {
    /** submit button label */
    submitLabel: string;
    /** callback function called on submit event */
    onSubmit: () => Promise<void>;
    /** optional props to pass to the wrapping View */
    viewProps?: View.Props;
    /** an optional class name to pass to first inner element of the component */
    className?: string;
    /** an optional label to replace the submit button label when in status 'processing' */
    submitProcessingLabel?: string;
    /** an optional callback to display a custom submit section */
    renderSubmit?: (buttonProps: Button.Props) => JSX.Element;
    /** optional props to pass to the submit button and override the existing ones */
    submitButtonProps?: Button.Props;
    /** prop to disable submit on enter*/
    disableSubmitOnEnter?: boolean;
  };
}

type State = {
  status: "ready" | "loading";
};

export class Form extends React.PureComponent<Form.Props, State> {
  state: State = { status: "ready" };

  mounted = true;

  componentWillUnmount() {
    this.mounted = false;
  }

  setStatus = (status: State["status"]) => {
    this.setState({ status });
  };

  onSubmit = () => {
    this.setStatus("loading");
    this.props.onSubmit().then(result => {
      if (this.mounted) {
        this.setStatus("ready");
      }
      return result;
    });
  };

  onFormSubmit: React.ReactEventHandler<HTMLFormElement> = e => {
    if (!this.props.disableSubmitOnEnter) {
      this.onSubmit();
    }
    e.stopPropagation();
    e.preventDefault();
  };

  renderSubmit = (props: Button.Props): JSX.Element =>
    this.props.renderSubmit ? (
      this.props.renderSubmit(props)
    ) : (
      <Button {...props} />
    );

  render() {
    const {
      submitLabel,
      submitProcessingLabel,
      className,
      children,
      submitButtonProps,
      viewProps: _viewProps
    } = this.props;

    const submitButtonState: Button.ButtonState =
      this.state.status === "loading" ? "processing" : "ready";

    const defaultSubmitButtonProps: Button.Props = {
      primary: true,
      onClick: this.onSubmit,
      label: {
        ready: submitLabel,
        processing: submitProcessingLabel || submitLabel
      },
      buttonState: submitButtonState,
      ...submitButtonProps
    };

    const viewProps = { column: true, _viewProps };
    return (
      <View {...viewProps} className={cx("form", className)}>
        <form onSubmit={this.onFormSubmit} style={{ width: "100%" }}>
          <View {...viewProps}>
            {children}
            {this.renderSubmit(defaultSubmitButtonProps)}
          </View>
          <input type="submit" style={{ display: "none" }} />
        </form>
      </View>
    );
  }
}
