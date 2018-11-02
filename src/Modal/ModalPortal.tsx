import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactTransitionGroup from "react-transition-group/TransitionGroup";
import { props, t, ReactChildren } from "../utils";
import TransitionWrapper from "../TransitionWrapper";

let containerNode: Element | null = null;

export namespace ModalPortal {
  export type Props = {
    children: JSX.Element;
    /** transition enter timeout */
    transitionEnterTimeout: number;
    /** transition leave timeout */
    transitionLeaveTimeout: number;
    /** context types to pass to the modal React tree */
    childContextTypes?: React.ValidationMap<any>;
    /** should return context values to pass to the modal React tree */
    getChildContext?: () => object;
    className?: string;
  };
}

export const Props = {
  children: ReactChildren,
  transitionEnterTimeout: t.Number,
  transitionLeaveTimeout: t.Number,
  className: t.maybe(t.String),
  childContextTypes: t.maybe(t.Object),
  getChildContext: t.maybe(t.Function)
};

type ContextWrapperProps = {
  modal: () => JSX.Element;
  getChildContext?: () => object;
};

@props(Props)
export class ModalPortal extends React.Component<ModalPortal.Props> {
  private isOpen: boolean;

  render() {
    return null;
  }

  _ContextWrapper = (() => {
    const childContextTypes = this.props.childContextTypes || {};
    const getChildContext = this.props.getChildContext || (() => ({}));
    return class ContextWrapper extends React.Component<ContextWrapperProps> {
      // eslint-disable-line react/no-multi-comp
      static childContextTypes = childContextTypes;
      getChildContext = getChildContext;
      render() {
        return this.props.modal();
      }
    };
  })();

  componentDidMount() {
    this.isOpen = true;
    this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  componentWillUnmount() {
    this.isOpen = false;
    this._render();
  }

  _cleanup() {
    if (containerNode) {
      ReactDOM.unmountComponentAtNode(containerNode);
      document.body.removeChild(containerNode);
      containerNode = null;
    }
  }

  _onLeave = () => setTimeout(this._cleanup); // setTimeout is needed to avoid conflicts with ReactTransitionGroup setState

  _render() {
    if (!containerNode) {
      containerNode = document.createElement("div");
      document.body.appendChild(containerNode);
    }

    const modal = this._renderModal();
    const ContextWrapper = this._ContextWrapper;
    ReactDOM.render(<ContextWrapper modal={modal} />, containerNode);
  }

  _renderModal() {
    const {
      className,
      children,
      transitionEnterTimeout,
      transitionLeaveTimeout
    } = this.props;

    return () => (
      <ReactTransitionGroup>
        {this.isOpen ? (
          <TransitionWrapper
            key={0}
            className={className}
            onLeave={this._onLeave}
            transitionEnterTimeout={transitionEnterTimeout}
            transitionLeaveTimeout={transitionLeaveTimeout}
          >
            {children}
          </TransitionWrapper>
        ) : null}
      </ReactTransitionGroup>
    );
  }
}
