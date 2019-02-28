import * as React from "react";
import { props, t, stateClassUtil, ReactChildren } from "../utils";
import FlexView from "react-flexview";
import * as cx from "classnames";

export type PanelHeaderDefaultProps = {
  size: PanelHeader.HeaderSize;
};

export type PanelHeaderRequiredProps = {
  collapse?: PanelHeader.Collapse;
  content?: React.ReactNode;
  title?: React.ReactNode;
  menu?: React.ReactNode;
};

export type PanelHeaderDefaultedProps = PanelHeaderRequiredProps &
  PanelHeaderDefaultProps;

export namespace PanelHeader {
  export type CollapseDirection = "up" | "left" | "down" | "right";
  export type HeaderSize = "tiny" | "small" | "medium";
  export type Collapse = {
    direction: CollapseDirection;
    onToggleExpanded: () => void;
    isExpanded?: boolean;
  };

  export type Props = PanelHeaderRequiredProps &
    Partial<PanelHeaderDefaultProps>;
}

const angleUpIcon = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 0 18 28"
    className="expand-icon"
  >
    <path d="M16.797 18.5q0 0.203-0.156 0.359l-0.781 0.781q-0.156 0.156-0.359 0.156t-0.359-0.156l-6.141-6.141-6.141 6.141q-0.156 0.156-0.359 0.156t-0.359-0.156l-0.781-0.781q-0.156-0.156-0.156-0.359t0.156-0.359l7.281-7.281q0.156-0.156 0.359-0.156t0.359 0.156l7.281 7.281q0.156 0.156 0.156 0.359z" />
  </svg>
);
const angleDownIcon = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 0 18 28"
    className="expand-icon"
  >
    <path d="M16.797 11.5q0 0.203-0.156 0.359l-7.281 7.281q-0.156 0.156-0.359 0.156t-0.359-0.156l-7.281-7.281q-0.156-0.156-0.156-0.359t0.156-0.359l0.781-0.781q0.156-0.156 0.359-0.156t0.359 0.156l6.141 6.141 6.141-6.141q0.156-0.156 0.359-0.156t0.359 0.156l0.781 0.781q0.156 0.156 0.156 0.359z" />
  </svg>
);
const angleLeftIcon = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 0 11 28"
    className="expand-icon"
  >
    <path d="M9.797 8.5q0 0.203-0.156 0.359l-6.141 6.141 6.141 6.141q0.156 0.156 0.156 0.359t-0.156 0.359l-0.781 0.781q-0.156 0.156-0.359 0.156t-0.359-0.156l-7.281-7.281q-0.156-0.156-0.156-0.359t0.156-0.359l7.281-7.281q0.156-0.156 0.359-0.156t0.359 0.156l0.781 0.781q0.156 0.156 0.156 0.359z" />
  </svg>
);
const angleRightIcon = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 0 10 28"
    className="expand-icon"
  >
    <path d="M9.297 15q0 0.203-0.156 0.359l-7.281 7.281q-0.156 0.156-0.359 0.156t-0.359-0.156l-0.781-0.781q-0.156-0.156-0.156-0.359t0.156-0.359l6.141-6.141-6.141-6.141q-0.156-0.156-0.156-0.359t0.156-0.359l0.781-0.781q0.156-0.156 0.359-0.156t0.359 0.156l7.281 7.281q0.156 0.156 0.156 0.359z" />
  </svg>
);

const icons = {
  up: [angleUpIcon, angleDownIcon],
  left: [angleLeftIcon, angleRightIcon],
  down: [angleDownIcon, angleUpIcon],
  right: [angleRightIcon, angleLeftIcon]
};

const headerSizes = ["tiny", "small", "medium"];
export const HeaderSize = t.enums.of(headerSizes, "HeaderSize");

@props({
  collapse: t.maybe(
    t.struct({
      isExpanded: t.Boolean,
      direction: t.enums.of(Object.keys(icons)),
      onToggleExpanded: t.Function
    })
  ),
  size: HeaderSize,
  title: t.maybe(ReactChildren),
  content: t.maybe(ReactChildren),
  menu: t.maybe(ReactChildren)
})
export class PanelHeader extends React.PureComponent<PanelHeader.Props> {
  static defaultProps: PanelHeaderDefaultProps = {
    size: "small"
  };

  getIcon = (collapse: PanelHeader.Collapse) => {
    const { direction, isExpanded } = collapse;
    return isExpanded ? icons[direction][0] : icons[direction][1];
  };

  render() {
    const { collapse, size, content, title, menu } = this
      .props as PanelHeaderDefaultedProps;
    const verticalDirection =
      !!collapse &&
      (collapse.direction === "up" || collapse.direction === "down");
    const renderInnerHeader =
      !collapse || (collapse && (collapse.isExpanded || verticalDirection));
    const renderTitle = !!title && renderInnerHeader;
    const renderContent = !!content && renderInnerHeader;
    const renderMenu = menu && renderInnerHeader;
    const height =
      size === HeaderSize("tiny")
        ? 40
        : size === HeaderSize("medium")
        ? 56
        : 48;
    const className = cx("panel-header", stateClassUtil([size]));

    return (
      <FlexView className={className} basis={height}>
        {this.templateTitle({ renderTitle, title, collapse })}
        {this.templateContent({ renderContent, content })}
        {renderMenu && menu}
      </FlexView>
    );
  }

  templateExpandIcon = (collapse: PanelHeader.Collapse) => {
    return (
      <FlexView
        vAlignContent="center"
        hAlignContent="center"
        className="panel-header-icon"
      >
        {this.getIcon(collapse)}
      </FlexView>
    );
  };

  templateTitle = ({
    renderTitle,
    title,
    collapse
  }: {
    renderTitle: boolean;
    title: React.ReactNode;
    collapse?: PanelHeader.Collapse;
  }) => {
    return (
      <FlexView
        vAlignContent="center"
        shrink={false}
        onClick={
          !!collapse && collapse.isExpanded
            ? collapse.onToggleExpanded
            : undefined
        }
        className="panel-header-title-wrapper"
      >
        {collapse && this.templateExpandIcon(collapse)}
        {renderTitle && (
          <FlexView className="panel-header-title">{title}</FlexView>
        )}
      </FlexView>
    );
  };

  templateContent = ({
    renderContent,
    content
  }: {
    renderContent: boolean;
    content: React.ReactNode;
  }) => {
    return renderContent ? (
      <FlexView
        className="panel-header-content"
        vAlignContent="center"
        grow
        shrink={false}
      >
        {content}
      </FlexView>
    ) : null;
  };
}
