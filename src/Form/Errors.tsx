import * as React from "react";
import { Option, none, some } from "fp-ts/lib/Option";
import { Either, left } from "fp-ts/lib/Either";
import { isEmpty, mapWithKey, compact } from "fp-ts/lib/Record";
import ErrorModal from "../ErrorModal";
import ErrorMessage from "../ErrorMessage";

export namespace Errors {
  export interface GenericAsyncError {
    // represents an async error for which we don't want to display a specific error message,
    // such as "network disconnected", "500 server error" or "decryption failed"
    type: "GenericAsyncError";
  }
  export interface SpecificAsyncError {
    // represents an async error for which we have a specific message to display,
    // such as "invalid credentials" or "invalid email provided"
    type: "SpecificAsyncError";
    message: string;
    title?: string;
  }

  export type AsyncError = GenericAsyncError | SpecificAsyncError;

  export type OnSubmit<T> = () => Promise<Either<Option<AsyncError>, T>>;

  export type OnFieldChange<K extends string, F> = (
    field: K
  ) => (value: F) => void;

  export type InlineErrors<K extends string> = Record<K, Option<string>>;

  export type FormError = Option<ErrorMessage.Props>;

  export type Props<K extends string, T, F> = {
    onSubmit: OnSubmit<T>;
    onFieldChange: OnFieldChange<K, F>;
    inlineErrors: InlineErrors<K>;
    inlineErrorRecap: Option<string>;
    genericErrorMessage: string | JSX.Element;
    genericErrorTitle?: string | JSX.Element;
    genericErrorIcon?: JSX.Element;
    errorModalProps?: Partial<ErrorModal.Props>;
    render: (
      onSubmit: () => Promise<void>,
      onFieldChange: OnFieldChange<K, F>,
      inlineErrors: InlineErrors<K>,
      formError: FormError
    ) => React.ReactNode;
  };
}

export const genericAsyncError: Errors.AsyncError = {
  type: "GenericAsyncError"
};
export function isGenericAsyncError(
  error: Errors.AsyncError
): error is Errors.GenericAsyncError {
  return error.type === "GenericAsyncError";
}

export function specificAsyncError(
  message: string,
  title?: string
): Errors.AsyncError {
  return { type: "SpecificAsyncError", message, title };
}
export function isSpecificAsyncError(
  error: Errors.AsyncError
): error is Errors.SpecificAsyncError {
  return error.type === "SpecificAsyncError";
}

type State<K extends string> =
  | {
      status: "editBeforeFirstSubmit"; // don't show inline errors in this case
    }
  | {
      status: "editAfterFirstSubmit"; // show inline errors for fields that haven't been edited yet
      touchedFields: Array<K>;
    }
  | {
      status: "justSubmitted"; // show the top-level / recap error until any field is edited
      error: Option<Errors.AsyncError>;
    };

export class Errors<K extends string, T, F> extends React.PureComponent<
  Errors.Props<K, T, F>,
  State<K>
> {
  state: State<K> = { status: "editBeforeFirstSubmit" };

  mounted = true;

  componentWillUnmount() {
    this.mounted = false;
  }

  setEditing = (key: K) => {
    this.setState(s =>
      s.status === "editAfterFirstSubmit" || s.status === "justSubmitted"
        ? {
            status: "editAfterFirstSubmit",
            touchedFields:
              s.status === "editAfterFirstSubmit"
                ? s.touchedFields.concat(key)
                : [key]
          }
        : {
            status: "editBeforeFirstSubmit"
          }
    );
  };

  setSubmitted = (error: Option<Errors.AsyncError>, callback?: () => void) => {
    this.setState({ status: "justSubmitted", error }, callback);
  };

  onSubmit = (): Promise<void> =>
    new Promise(resolve => {
      this.setSubmitted(none, () => {
        const inlineError = isEmpty(compact(this.props.inlineErrors))
          ? none
          : some(undefined);
        const promise: Promise<
          Either<Option<Errors.AsyncError>, T>
        > = inlineError.foldL(this.props.onSubmit, () =>
          Promise.resolve(
            left<Option<Errors.AsyncError>, T>(
              this.props.inlineErrorRecap.map(specificAsyncError)
            )
          )
        );
        promise.then(ret => {
          if (this.mounted) {
            ret.fold(this.setSubmitted, () => this.setSubmitted(none));
          }
          resolve();
        });
      });
    });

  onFieldChange: Errors.OnFieldChange<K, F> = key => value => {
    this.setEditing(key);
    this.props.onFieldChange(key)(value);
  };

  inlineErrors = (): Errors.InlineErrors<K> =>
    mapWithKey(this.props.inlineErrors, (key: K, error) =>
      error.filter(() => this.shouldShowInlineErrorForKey(key))
    );

  shouldShowInlineErrorForKey = (key: K) =>
    this.state.status === "justSubmitted" ||
    (this.state.status === "editAfterFirstSubmit" &&
      this.state.touchedFields.every(k => k !== key));

  dismissGenericError = () => {
    this.setState({ status: "justSubmitted", error: none });
  };

  render() {
    const {
      render,
      genericErrorMessage,
      genericErrorTitle,
      errorModalProps,
      genericErrorIcon
    } = this.props;
    const submitError: Option<Errors.AsyncError> =
      this.state.status === "justSubmitted" ? this.state.error : none;
    const formError = submitError.filter(isSpecificAsyncError);
    const genericError = submitError.filter(isGenericAsyncError);

    return (
      <>
        {genericError.fold(null, () => (
          <ErrorModal // TODO pass render from outside?
            messageTitle={genericErrorTitle}
            message={genericErrorMessage}
            errorIcon={genericErrorIcon}
            onDismiss={this.dismissGenericError}
            transitionEnterTimeout={0}
            transitionLeaveTimeout={0}
            {...errorModalProps}
          />
        ))}
        {render(
          this.onSubmit,
          this.onFieldChange,
          this.inlineErrors(),
          formError
        )}
      </>
    );
  }
}
