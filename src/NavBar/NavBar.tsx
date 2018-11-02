import * as React from "react";
import * as cx from "classnames";
import { props, t, ReactChildren } from "../utils";
import FlexView from "react-flexview";

export namespace NavBar {
  export type Props = {
    /** Left content: It doesn't shrink nor grow */
    /** Center content. It grows to use all the available space */
    /** Right content. It doesn't shrink nor grow */
    /** Max Width. For css `max-width` */
    content: {
      left?: React.ReactNode;
      center?: React.ReactNode;
      right?: React.ReactNode;
      maxWidth?: string | number;
    };
    /** to set `position: fixed` */
    fixed?: boolean;
    /** shorthand for css `height` */
    height?: string | number;
    /** shorthand for css `background` */
    background?: string;
    /** add class name */
    className?: string;
    /** add custom css style */
    style?: React.CSSProperties;
  };
}

export const Props = {
  content: t.struct({
    left: t.maybe(ReactChildren),
    center: t.maybe(ReactChildren),
    right: t.maybe(ReactChildren),
    maxWidth: t.maybe(t.union([t.String, t.Number]))
  }),
  fixed: t.maybe(t.Boolean),
  height: t.maybe(t.union([t.String, t.Number])),
  background: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

@props(Props)
export class NavBar extends React.PureComponent<NavBar.Props> {
  render() {
    const {
      className: _className,
      style: _style,
      fixed,
      height,
      background,
      content
    } = this.props;
    const style: React.CSSProperties = {
      ..._style,
      position: fixed ? "fixed" : undefined,
      top: fixed ? 0 : undefined,
      zIndex: fixed ? 99999 : undefined,
      width: "100%",
      height,
      background
    };
    const className = cx("nav-bar", _className);
    const { left, center, right, maxWidth } = content;

    return (
      <FlexView
        className={className}
        style={style}
        vAlignContent="center"
        hAlignContent="center"
      >
        <FlexView
          vAlignContent="center"
          hAlignContent="center"
          className="content"
          style={{ maxWidth }}
          grow
        >
          <FlexView
            vAlignContent="center"
            hAlignContent="center"
            className="left"
            marginRight="auto"
            shrink={false}
          >
            {left}
          </FlexView>
          <FlexView
            vAlignContent="center"
            hAlignContent="center"
            className="center"
            grow
          >
            {center}
          </FlexView>
          <FlexView
            vAlignContent="center"
            hAlignContent="center"
            className="right"
            marginLeft="auto"
            shrink={false}
          >
            {right}
          </FlexView>
        </FlexView>
      </FlexView>
    );
  }
}
