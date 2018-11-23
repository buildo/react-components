import * as React from "react";
import * as cx from "classnames";
import { props, t, ReactChildren } from "../../utils";
import FlexView from "react-flexview";
import { Cell as CellFDT } from "fixed-data-table-2";

export type Intrinsic<T, K> = {
  data: K extends keyof T ? T[K] : never;
  rowData: T;
  rowIndex: number;
  fixed: boolean;
  setState: any;
  forceUpdate: any;
  render: any;
};

export type Default = {
  vAlignContent: "top" | "center" | "bottom";
  hAlignContent: "left" | "center" | "right";
  grow: boolean;
};

export type Required<T, K> = {
  render: (
    data: K extends keyof T ? T[K] : never,
    rowData: T,
    rowIndex: number
  ) => React.ReactNode;
  backgroundColor?: React.CSSProperties["backgroundColor"];
  color?: React.CSSProperties["color"];
  contentStyle?: React.CSSProperties;
  style?: React.CSSProperties;
};

export namespace Cell {
  export type Props<T, K extends keyof T | never> = Required<T, K> &
    Partial<Default>;
}
export type CellIntrinsicProps<T, K extends keyof T | never> = Cell.Props<
  T,
  K
> &
  Intrinsic<T, K>;
type CellDefaultedIntrinsicProps<T, K extends keyof T | never> = Required<
  T,
  K
> &
  Default &
  Intrinsic<T, K>;

const { maybe, enums, union } = t;

const propsTypes = {
  data: t.Any,
  fixed: maybe(t.Boolean),
  rowData: t.Any,
  rowIndex: maybe(t.Integer),
  render: union([t.Function, ReactChildren]),
  backgroundColor: maybe(t.String),
  color: maybe(t.String),
  vAlignContent: maybe(enums.of(["top", "center", "bottom"])),
  hAlignContent: maybe(enums.of(["left", "center", "right"])),
  contentStyle: maybe(t.Object),
  style: maybe(t.Object),
  grow: maybe(t.Boolean)
};

export function _Cell<T extends {}, K extends keyof T | never = never>(
  props: Cell.Props<T, K>
): React.ReactElement<Cell.Props<T, K>> {
  const {
    data,
    fixed,
    rowData,
    rowIndex,
    render,
    backgroundColor,
    color,
    vAlignContent = "center",
    hAlignContent = "left",
    grow = true,
    contentStyle,
    style
  } = props as CellDefaultedIntrinsicProps<T, K>;

  return (
    <CellFDT>
      <FlexView
        className={cx("tablo-cell", {
          "tablo-cell-fixed": fixed,
          "tablo-cell-even-row": rowIndex % 2 === 0,
          "tablo-cell-odd-row": rowIndex % 2 === 1
        })}
        style={{ backgroundColor, color, ...style }}
        grow={grow}
      >
        <FlexView
          style={contentStyle}
          className="content"
          grow={grow}
          vAlignContent={vAlignContent}
          hAlignContent={hAlignContent}
        >
          {t.Function.is(render) ? render(data, rowData, rowIndex) : render}
        </FlexView>
      </FlexView>
    </CellFDT>
  );
}

props(propsTypes)(_Cell);

export const Cell = _Cell;

export const defaultCell = <Cell<any, any> render={dataCell => dataCell} />;
