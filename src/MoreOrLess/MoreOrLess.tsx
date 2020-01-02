import * as React from "react";
import * as cx from "classnames";
import FlexView from "react-flexview";
import { Children } from "../utils";

export namespace MoreOrLess {
  export type Props = {
    /** panel content */
    children: Children;
    /** whether the panel should be expanded or not */
    expanded: boolean;
    /** called on toggle */
    onExpandedChange: (expanded: boolean) => void;
    /** icons for expanded and collapsed panel */
    icons: {
      expanded: JSX.Element;
      collapsed: JSX.Element;
    };
    /** props for wrapper FlexView */
    wrapperProps?: object;
    /** an optional class name to pass to the component */
    className?: string;
    /** an optional style object to pass to the component */
    style?: React.CSSProperties;
  };
}

/**
 * A panel used to alternately display short or long version of the content
 */
export class MoreOrLess extends React.PureComponent<MoreOrLess.Props> {
  toggleExpanded = () => {
    this.props.onExpandedChange(!this.props.expanded);
  };

  templateExpandButton = (
    icon: JSX.Element,
    toggleExpanded: React.EventHandler<React.SyntheticEvent<HTMLDivElement>>
  ) => {
    return (
      <FlexView
        hAlignContent="center"
        vAlignContent="center"
        className="expand-button"
        onClick={toggleExpanded}
        shrink={false}
      >
        {icon}
      </FlexView>
    );
  };

  render() {
    const {
      props: { children, className, style, expanded, icons, wrapperProps },
      toggleExpanded
    } = this;

    const panelState = expanded ? "more" : "less";
    const icon = expanded ? icons.expanded : icons.collapsed;

    return (
      <FlexView
        column
        shrink={false}
        {...wrapperProps}
        style={style}
        className={cx("more-or-less", panelState, className)}
      >
        {children}
        {this.templateExpandButton(icon, toggleExpanded)}
      </FlexView>
    );
  }
}
