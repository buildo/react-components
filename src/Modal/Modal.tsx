import * as React from "react";
import * as cx from "classnames";
import omit = require("lodash/omit");
import { ModalPortal } from "./ModalPortal";
import FlexView from "react-flexview";
import { BackgroundDimmer } from "./BackgroundDimmer";

export type ModalDefaultProps = {
  /** whether the modal should be dismissed when clicking outside it */
  dismissOnClickOutside: boolean;
  /** called when modal is dismissed */
  onDismiss: (e: React.SyntheticEvent<HTMLDivElement>) => void;
  /** specify 'color' and 'alpha' for the overlay layer */
  overlay:
    | {
        color: string;
        alpha?: number;
      }
    | {
        color?: string;
        alpha: number;
      };
};

export type ModalRequiredProps = {
  /** modal content */
  children: JSX.Element;
  /** modal title */
  title?: string;
  /** modal footer */
  footer?: JSX.Element;
  /** close icon */
  iconClose?: JSX.Element;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
};

export type ModalDefaultedProps = ModalPortal.Props &
  ModalRequiredProps &
  ModalDefaultProps;

export namespace Modal {
  export type Props = ModalPortal.Props &
    ModalRequiredProps &
    Partial<ModalDefaultProps>;
}

const LocalProps = {
  children: ReactChildren,
  title: t.maybe(t.String),
  footer: t.maybe(ReactChildren),
  iconClose: t.maybe(ReactChild),
  overlay: t.interface({
    color: t.maybe(t.String),
    alpha: t.maybe(t.Number)
  }),
  dismissOnClickOutside: t.maybe(t.Boolean),
  onDismiss: t.maybe(t.Function),
  className: t.maybe(t.String),
  style: t.maybe(t.Object),
  id: t.maybe(t.String)
};

export const Props = {
  ...PortalProps,
  ...LocalProps
};

@props(Props)
export class Modal extends React.Component<Modal.Props> {
  static defaultProps: ModalDefaultProps = {
    onDismiss: () => {},
    dismissOnClickOutside: true,
    overlay: {
      color: "black",
      alpha: 0.85
    }
  };

  render() {
    const {
      className,
      style,
      id,
      title,
      iconClose,
      footer,
      overlay,
      dismissOnClickOutside,
      onDismiss,
      children,
      ...props
    } = this.props as ModalDefaultedProps;
    const shouldRenderHeader = !!title || !!iconClose;
    const shouldRenderFooter = !!footer;

    const modalPortalProps: ModalPortal.Props = {
      ...omit(props, Object.keys(LocalProps)),
      className: cx("modal", className)
    } as ModalPortal.Props;

    return (
      <ModalPortal {...modalPortalProps}>
        <BackgroundDimmer
          {...{ ...overlay, style, id }}
          onClickOutside={dismissOnClickOutside ? onDismiss : undefined}
          maxWidth={950}
        >
          <FlexView className="modal-content" column grow>
            {shouldRenderHeader && (
              <FlexView
                className="modal-header"
                shrink={false}
                vAlignContent="center"
              >
                <FlexView className={cx("modal-title")} grow>
                  {title}
                </FlexView>
                {iconClose && (
                  <FlexView
                    className="modal-icon-close"
                    shrink={false}
                    marginLeft="auto"
                    onClick={onDismiss}
                  >
                    {iconClose}
                  </FlexView>
                )}
              </FlexView>
            )}
            <FlexView className="modal-body" column grow>
              {children}
            </FlexView>
            {shouldRenderFooter && (
              <FlexView className="modal-footer" column shrink={false}>
                {footer}
              </FlexView>
            )}
          </FlexView>
        </BackgroundDimmer>
      </ModalPortal>
    );
  }
}
