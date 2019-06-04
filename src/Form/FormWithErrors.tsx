import * as React from "react";
import { Form } from "./Form";
import { Errors } from "./Errors";

type Props<K extends string, T, F> = Pick<
  Form.Props,
  Exclude<keyof Form.Props, "children" | "error" | "onSubmit">
> &
  Pick<
    Errors.Props<K, T, F>,
    Exclude<keyof Errors.Props<K, T, F>, "children" | "render">
  > & {
    render: (
      onFieldChange: Errors.OnFieldChange<K, F>,
      inlineErrors: Errors.InlineErrors<K>
    ) => React.ReactNode;
  };

export default class FormWithErrors<
  K extends string,
  T,
  F
> extends React.PureComponent<Props<K, T, F>> {
  render() {
    const {
      onSubmit,
      onFieldChange,
      inlineErrors,
      inlineErrorRecap,
      render,
      genericErrorMessage,
      genericErrorTitle,
      genericErrorIcon,
      errorModalProps,
      ...props
    } = this.props;
    return (
      <Errors
        onSubmit={onSubmit}
        onFieldChange={onFieldChange}
        inlineErrors={inlineErrors}
        inlineErrorRecap={inlineErrorRecap}
        genericErrorMessage={genericErrorMessage}
        genericErrorTitle={genericErrorTitle}
        genericErrorIcon={genericErrorIcon}
        errorModalProps={errorModalProps}
        render={(onSubmit, onFieldChange, inlineErrors, formError) => (
          <Form error={formError} onSubmit={onSubmit} {...props}>
            {render(onFieldChange, inlineErrors)}
          </Form>
        )}
      />
    );
  }
}
