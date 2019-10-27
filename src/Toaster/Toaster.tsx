import * as React from "react";
import * as ReactDOM from "react-dom";
import * as cx from "classnames";
import * as ReactTransitionGroup from "react-transition-group/TransitionGroup";
import { props, t, ReactChildren, findDOMNode, Children } from "../utils";
import { warn } from "../utils/log";
import { TransitionWrapper } from "../TransitionWrapper/TransitionWrapper";

export const Props = {
  children: ReactChildren,
  attachTo: t.maybe(t.String),
  transitionGroup: t.maybe(t.Object),
  transitionStyles: t.maybe(t.Object),
  transitionEnterTimeout: t.Number,
  transitionLeaveTimeout: t.Number,
  position: t.enums.of([
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right"
  ]),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

export type ToasterDefaultProps = {
  /** custom settings for `ReactTransitionGroup` */
  transitionGroup: ReactTransitionGroup.TransitionGroupProps;
  /** toaster position on screen */
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export type ToasterRequiredProps = {
  /** list of toasts (any node with a unique key) */
  children: Children[];
  /** id of the element you want to render the `Toaster` in */
  attachTo?: string;
  /** object with style for each transition event (used by `TransitionWrapper`) */
  transitionStyles?: TransitionWrapper.TransitionStyles;
  /** duration of enter transition in milliseconds (used by `TransitionWrapper`) */
  transitionEnterTimeout: number;
  /** duration of leave transition in milliseconds (used by `TransitionWrapper`) */
  transitionLeaveTimeout: number;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
};

export namespace Toaster {
  export type Props = ToasterRequiredProps & Partial<ToasterDefaultProps>;
}
type ToasterDefaultedProps = ToasterRequiredProps & ToasterDefaultProps;

/**
 * Renders and animates toasts (children) inline or in a portal
 */
@props(Props)
export class Toaster extends React.Component<Toaster.Props> {
  private toaster: HTMLElement | null = null;

  static defaultProps: ToasterDefaultProps = {
    transitionGroup: {},
    position: "top-right"
  };

  componentWillMount() {
    this.appendToaster();
    this.renderToaster();
  }

  componentDidMount() {
    const node = this.props.attachTo
      ? this.toaster!
      : findDOMNode(this).parentElement!;
    const { position } = window.getComputedStyle(node);
    if (position !== "relative" && position !== "absolute") {
      warn([
        'Toaster\'s parent node should have "position: relative/absolute"',
        node
      ]);
    }
  }

  componentWillUnmount() {
    this.removeToaster();
  }

  getTranslationStyle(i: number): React.CSSProperties {
    const { position } = this.props as ToasterDefaultedProps;
    const isTop = position.indexOf("top") !== -1;
    const isRight = position.indexOf("right") !== -1;
    const translationBase = isTop ? 100 : -100;
    return {
      transform: `translateY(${translationBase * i}%)`,
      position: "absolute",
      right: isRight ? 0 : undefined,
      left: isRight ? undefined : 0,
      bottom: isTop ? undefined : 0,
      top: isTop ? 0 : undefined
    };
  }

  getToasts = () => {
    const {
      children,
      transitionStyles,
      transitionEnterTimeout,
      transitionLeaveTimeout
    } = this.props;
    return React.Children.map(children, (_el, i) => {
      const el = _el as React.ReactElement<any>;
      return (
        <TransitionWrapper
          {...{
            transitionStyles,
            transitionEnterTimeout,
            transitionLeaveTimeout
          }}
          style={this.getTranslationStyle(i)}
          key={el.key || undefined}
        >
          {React.cloneElement(el, { uniqueKey: el.key })}
        </TransitionWrapper>
      );
    });
  };

  appendToaster = () => {
    if (this.props.attachTo) {
      this.toaster = document.getElementById(this.props.attachTo);
    }
  };

  removeToaster = () => {
    if (this.toaster && this.props.attachTo) {
      this.toaster.innerHTML = ""; // stupid??
    }
  };

  getToaster = () => {
    const { style: styleProp, id, className, position } = this
      .props as ToasterDefaultedProps;
    const isTop = position.indexOf("top") !== -1;
    const isRight = position.indexOf("right") !== -1;
    const style: React.CSSProperties = {
      position: "absolute",
      right: isRight ? 0 : undefined,
      left: isRight ? undefined : 0,
      bottom: isTop ? undefined : 0,
      top: isTop ? 0 : undefined,
      height: "100%",
      ...styleProp
    };

    return (
      <div className={cx("toaster", className)} {...{ style, id }}>
        <ReactTransitionGroup {...this.props.transitionGroup}>
          {this.getToasts()}
        </ReactTransitionGroup>
      </div>
    );
  };

  renderToaster = () => {
    if (this.props.attachTo) {
      ReactDOM.render(this.getToaster(), this.toaster);
    }
  };

  render() {
    if (this.props.attachTo) {
      return null;
    } else {
      return this.getToaster();
    }
  }

  componentDidUpdate() {
    this.renderToaster();
  }

  componentWillReceiveProps(nextProps: Toaster.Props) {
    if (this.props.attachTo !== nextProps.attachTo) {
      warn('You can\'t change "attachTo" prop after the first render!');
    }
  }
}
