import * as React from 'react';
import * as cx from 'classnames';
import { props, t, ReactChildren } from '../../utils';
import FlexView from 'react-flexview';
import { Cell as CellFDT } from 'fixed-data-table-2';
import { If, StringContains, StringIntersection } from 'typelevel-ts';

export type PickIfExists<T, K extends string> = If<StringContains<keyof T, K>, T[StringIntersection<keyof T, K>], undefined>;

export type Intrinsic<T, K extends string> = {
  data: PickIfExists<T, K>,
  rowData: T,
  rowIndex: number,
  fixed: boolean
}

export type Default = {
  vAlignContent: 'top' | 'center' | 'bottom',
  hAlignContent: 'left' | 'center' | 'right',
  grow: boolean
}

export type Required<T, K extends string> = {
  children?: React.ReactNode | ((data: PickIfExists<T, K>, rowData: T, rowIndex: number) => JSX.Element),
  backgroundColor?: React.CSSProperties['backgroundColor'],
  color?: React.CSSProperties['color'],
  contentStyle?: React.CSSProperties,
  style?: React.CSSProperties
};

export namespace Cell {
  export type Props<T, K extends string> = Required<T, K> & Partial<Default>;
}
export type CellIntrinsicProps<T, K extends string> = Cell.Props<T, K> & Intrinsic<T, K>;
type CellDefaultedIntrinsicProps<T, K extends string> = Required<T, K> & Default & Intrinsic<T, K>;

const { maybe, enums, union } = t;

const propsTypes = {
  data: t.Any,
  fixed: maybe(t.Boolean),
  rowData: t.Any,
  rowIndex: maybe(t.Integer),
  children: union([t.Function, ReactChildren]),
  backgroundColor: maybe(t.String),
  color: maybe(t.String),
  vAlignContent: maybe(enums.of(['top', 'center', 'bottom'])),
  hAlignContent: maybe(enums.of(['left', 'center', 'right'])),
  contentStyle: maybe(t.Object),
  style: maybe(t.Object),
  grow: maybe(t.Boolean)
};

function Cell<T, K extends string>(props: Cell.Props<T, K>): React.ReactElement<Cell.Props<T, K>> {

  const {
    data,
    fixed,
    rowData,
    rowIndex,
    children,
    backgroundColor,
    color,
    vAlignContent = 'center',
    hAlignContent = 'left',
    grow = true,
    contentStyle,
    style
  } = props as CellDefaultedIntrinsicProps<T, K>;

  return (
    <CellFDT>
      <FlexView
        className={cx('tablo-cell', { 'tablo-cell-fixed': fixed, 'tablo-cell-even-row': rowIndex % 2 === 0, 'tablo-cell-odd-row': rowIndex % 2 === 1 })}
        style={{ backgroundColor, color, ...style }}
        grow={grow}
      >
        <FlexView
          style={contentStyle}
          className='content'
          grow={grow}
          vAlignContent={vAlignContent}
          hAlignContent={hAlignContent}
        >
          {t.Function.is(children) ? children(data, rowData, rowIndex) : children}
        </FlexView>
      </FlexView>
    </CellFDT>
  );
}

props(propsTypes)(Cell);

export { Cell }

export const defaultCell = <Cell>{dataCell => dataCell}</Cell>;
