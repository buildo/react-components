import * as React from 'react';
import * as cx from 'classnames';
import { props, t, ReactChildren } from '../../utils';
import FlexView from 'react-flexview';
import { Cell as CellFDT } from 'fixed-data-table-2';

export namespace CellProps {
  export type Intrinsic<RT, CT> = {
    data: CT,
    rowData: RT,
    rowIndex: number,
    fixed: boolean
  }

  export type Default = {
    vAlignContent: 'top' | 'center' | 'bottom',
    hAlignContent: 'left' | 'center' | 'right',
    grow: boolean
  }

  export type Required<RT, CT> = {
    children?: React.ReactNode | ((data: CT, rowData?: RT, rowIndex?: number) => JSX.Element),
    backgroundColor?: React.CSSProperties['backgroundColor'],
    color?: React.CSSProperties['color'],
    contentStyle?: React.CSSProperties,
    style?: React.CSSProperties
  };
}

export type CellProps<RT, CT> = CellProps.Required<RT, CT> & Partial<CellProps.Default>;
export type CellIntrinsicProps<RT, CT> = CellProps<RT, CT> & CellProps.Intrinsic<RT, CT>;
type CellDefaultedIntrinsicProps<RT, CT> = CellProps.Required<RT, CT> & CellProps.Default & CellProps.Intrinsic<RT, CT>;

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

@props(propsTypes)
export default class Cell<RT, CT> extends React.PureComponent<CellProps<RT, CT>> {

  static defaultProps: CellProps.Default = {
    vAlignContent: 'center',
    hAlignContent: 'left',
    grow: true
  }

  render() {
    const {
      data,
      fixed,
      rowData,
      rowIndex,
      children,
      backgroundColor,
      color,
      vAlignContent,
      hAlignContent,
      grow,
      contentStyle,
      style
    } = this.props as CellDefaultedIntrinsicProps<RT, CT>;

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
}

export const defaultCell = <Cell>{dataCell => dataCell}</Cell>;
