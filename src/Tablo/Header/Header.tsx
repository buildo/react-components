import * as React from "react";
import * as cx from "classnames";
import { props, t, ReactChildren } from "../../utils";
import FlexView from "react-flexview";

export type FDTIntrinsic = {
  columnKey: string;
};

export type Intrinsic = {
  fixed: boolean;
  onClick?: () => void;
};

export namespace Header {
  export type Props = {
    children?: React.ReactNode;
  };
}
export type HeaderIntrinsicProps = Header.Props & Intrinsic & FDTIntrinsic;

const { maybe } = t;

const propsTypes = {
  children: ReactChildren,
  rowIndex: maybe(t.Number),
  columnKey: maybe(t.String),
  width: maybe(t.Number),
  fixed: maybe(t.Boolean),
  height: maybe(t.Number),
  onClick: maybe(t.Function)
};

@props(propsTypes)
export class Header extends React.PureComponent<Header.Props> {
  render() {
    const { fixed, onClick: onClick, children } = this
      .props as HeaderIntrinsicProps;

    return (
      <FlexView
        className={cx("tablo-header", { "tablo-header-fixed": fixed })}
        height="100%"
        width="100%"
        vAlignContent="center"
        onClick={onClick}
        grow
      >
        <FlexView vAlignContent="center" grow height="100%">
          {children}
        </FlexView>
      </FlexView>
    );
  }
}

export function defaultHeader(columnKey: string | number | symbol) {
  return <Header>{columnKey}</Header>;
}
