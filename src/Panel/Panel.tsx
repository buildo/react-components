import * as React from "react";
import * as cx from "classnames";
import { props, t, ReactChildren } from "../utils";
import { PanelHeader, HeaderSize } from "./PanelHeader";
import capitalize = require("lodash/capitalize");
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import FlexView from "react-flexview";

export type PanelDefaultProps = {
  style: React.CSSProperties;
  /** whether it's loading or not */
  loading: boolean;
  /** soft loading */
  softLoading: boolean;
  /** soft loading delay */
  softLoadingDelay: number; // TODO: should be non negative
  /** true if it should use dark theme */
  dark: boolean;
};

export type PanelRequiredProps = {
  /** panel content */
  children: React.ReactNode;
  /** The type of panel (docked or floating) */
  type: Panel.PanelType;
  /** header props (collapse, content, title, menu) */
  header?: Panel.Header;
  /** top | left | right | bottom */
  clearMargin?: Panel.ClearMargin;
  className?: string;
};

export type PanelDefaultedProps = PanelRequiredProps & PanelDefaultProps;

export namespace Panel {
  export type PanelType =
    | "docked-top"
    | "docked-left"
    | "docked-bottom"
    | "docked-bottom"
    | "floating";
  export type ClearMargin = "top" | "left" | "bottom" | "right";
  export type Header = {
    collapse?: {
      direction: "up" | "left" | "down" | "right";
      onExpand: () => void;
      onCollapse: () => void;
      isCollapsed?: boolean;
    };
    size?: PanelHeader.Props["size"];
    content?: any; // TODO: t.ReactChildren
    title?: any; // TODO(typo): wtf
    hideTitleWhenExpanded?: boolean;
    menu?: any; // TODO: t.ReactChildren
  };

  export type Props = PanelRequiredProps & Partial<PanelDefaultProps>;
}

export const Props = {
  type: t.enums.of([
    "docked-top",
    "docked-left",
    "docked-right",
    "docked-bottom",
    "floating"
  ]),
  header: t.maybe(
    t.struct({
      collapse: t.maybe(
        t.struct({
          direction: t.enums.of(["up", "left", "right", "down"]),
          onExpand: t.Function,
          onCollapse: t.Function,
          isCollapsed: t.maybe(t.Boolean)
        })
      ),
      size: t.maybe(HeaderSize),
      content: t.maybe(ReactChildren),
      title: t.maybe(ReactChildren),
      hideTitleWhenExpanded: t.maybe(t.Boolean),
      menu: t.maybe(ReactChildren)
    })
  ),
  loading: t.maybe(t.Boolean),
  dark: t.maybe(t.Boolean),
  softLoading: t.maybe(t.Boolean),
  softLoadingDelay: t.maybe(
    t.refinement(t.Number, v => v >= 0, "NonNegativeNumber")
  ),
  children: ReactChildren,
  className: t.maybe(t.String),
  clearMargin: t.maybe(t.enums.of(["top", "left", "right", "bottom"])),
  style: t.maybe(t.Object)
};

/** A simple component used to group elements in a box. */
@props(Props)
export class Panel extends React.PureComponent<Panel.Props> {
  static defaultProps: PanelDefaultProps = {
    style: {},
    loading: false,
    softLoading: false,
    softLoadingDelay: 0,
    dark: false
  };

  _softLoadingActive: boolean = false;
  _softLoadingTimer: number | null = null;

  updateSoftLoadingState(prevSoftLoading: boolean) {
    const { softLoading, softLoadingDelay } = this.props as PanelDefaultedProps;
    if (!softLoading) {
      if (this._softLoadingTimer) {
        clearTimeout(this._softLoadingTimer);
      }
      this._softLoadingActive = false;
      if (prevSoftLoading) {
        this.forceUpdate();
      }
    } else if (!prevSoftLoading && softLoading && softLoadingDelay > 0) {
      // delay === 0 is handled without timer
      this._softLoadingTimer = window.setTimeout(() => {
        this._softLoadingActive = true;
        this.forceUpdate();
      }, softLoadingDelay);
    }
  }

  isSoftLoading(softLoading: boolean, softLoadingDelay: number) {
    return this._softLoadingActive || (softLoading && softLoadingDelay === 0); // optimization for the default delay === 0;
  }

  componentDidMount() {
    this.updateSoftLoadingState(false);
  }

  componentDidUpdate(oldProps: PanelDefaultedProps) {
    this.updateSoftLoadingState(oldProps.softLoading);
  }

  componentWillUnmount() {
    if (this._softLoadingTimer) {
      clearTimeout(this._softLoadingTimer);
    }
  }

  toggleExpanded = () => {
    if (this.props.header && this.props.header.collapse) {
      const { isCollapsed, onExpand, onCollapse } = this.props.header.collapse;
      if (isCollapsed) {
        onExpand();
      } else {
        onCollapse();
      }
    }
  };

  getStyle = () => {
    const style = {};
    if (this.props.clearMargin) {
      const marginToClear = `margin${capitalize(this.props.clearMargin)}`;
      style[marginToClear] = 0;
    }
    return {
      ...this.props.style,
      ...style
    };
  };

  templateSoftLoading = ({
    softLoading,
    isExpanded
  }: {
    softLoading: boolean;
    isExpanded: boolean;
  }) => {
    return softLoading && isExpanded ? (
      <div className="panel-soft-loader">
        <div className="loader gradient" />
        <div className="loader" />
      </div>
    ) : null;
  };

  templateHeader = ({
    header,
    isExpanded,
    toggleExpanded
  }: {
    header?: Panel.Header;
    isExpanded: boolean;
    toggleExpanded: () => void;
  }) => {
    return header ? (
      <PanelHeader
        title={
          header.hideTitleWhenExpanded && isExpanded ? undefined : header.title
        }
        size={header.size}
        content={header.content}
        menu={header.menu}
        collapse={
          header.collapse
            ? {
                direction: header.collapse.direction,
                isExpanded,
                onToggleExpanded: toggleExpanded
              }
            : undefined
        }
      />
    ) : null;
  };

  templateExpandedContent = ({
    children,
    loading
  }: {
    children: React.ReactNode;
    loading: boolean;
  }) => {
    return (
      <FlexView
        className="panel-content"
        column
        grow
        style={{ position: "relative" }}
      >
        {children}
        {loading && <LoadingSpinner />}
      </FlexView>
    );
  };

  templateCollapsedContent = ({
    header,
    verticalDirection
  }: {
    header?: Panel.Header;
    verticalDirection?: boolean;
  }) => {
    return !verticalDirection && header && header.title ? (
      <FlexView className="panel-content" column grow>
        <FlexView grow className="panel-content-title">
          {header.title}
        </FlexView>
      </FlexView>
    ) : null;
  };

  render() {
    const {
      header,
      children,
      loading,
      softLoading: _softLoading,
      softLoadingDelay,
      type,
      className: _className,
      dark
    } = this.props as PanelDefaultedProps;
    const collapsable = !!header && !!header.collapse;
    const isExpanded = !collapsable || !header!.collapse!.isCollapsed;
    const panelState = isExpanded ? "expanded" : "collapsed";
    const directionClass = collapsable
      ? `collapse-${header!.collapse!.direction}`
      : "";
    const verticalDirection =
      collapsable &&
      (header!.collapse!.direction === "up" ||
        header!.collapse!.direction === "down");
    const themeType = dark ? "is-dark" : "is-light";
    const className = cx(
      "panel",
      type,
      { collapsable },
      themeType,
      directionClass,
      panelState,
      _className
    );
    const style = this.getStyle();
    const toggleExpanded = this.toggleExpanded;
    const softLoading = this.isSoftLoading(_softLoading, softLoadingDelay);

    return (
      <FlexView
        className={className}
        grow
        style={style}
        column
        onClick={!isExpanded ? toggleExpanded : undefined}
      >
        {this.templateSoftLoading({ softLoading, isExpanded })}
        {this.templateHeader({ header, isExpanded, toggleExpanded })}
        {isExpanded
          ? this.templateExpandedContent({ children, loading })
          : this.templateCollapsedContent({ header, verticalDirection })}
      </FlexView>
    );
  }
}
