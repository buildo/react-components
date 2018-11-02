import * as React from "react";
import FlexView from "react-flexview";
import { props, t, ReactChildren } from "../../utils";

export namespace Footer {
  export type Props = {
    children: React.ReactNode;
  };
}

const { maybe } = t;

const propsTypes = {
  columnKey: maybe(t.String),
  width: maybe(t.Number),
  height: maybe(t.Number),
  children: ReactChildren
};

@props(propsTypes)
export class Footer extends React.PureComponent<Footer.Props> {
  render() {
    const { children } = this.props;

    return (
      <FlexView
        className="tablo-footer"
        height="100%"
        width="100%"
        vAlignContent="center"
        grow
      >
        {children}
      </FlexView>
    );
  }
}
