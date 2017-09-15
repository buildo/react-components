import * as React from 'react';
import find = require('lodash/find');
import { t, ReactChildren } from '../../utils';

import { Column as ColumnFDT } from 'fixed-data-table-2';

import Cell, { defaultCell, CellProps, CellIntrinsicProps } from '../Cell';
import Header, { defaultHeader, HeaderProps, HeaderIntrinsicProps } from '../Header';
import Footer, { FooterProps } from '../Footer';

export namespace ColumnProps {

  export type ColumnChildren<RT, CT> = (
    React.ReactElement<HeaderProps> |
    React.ReactElement<FooterProps> |
    React.ReactElement<CellProps<RT, CT>>
  )[]

  export type Intrinsic<RT> = {
    data?: RT[],
  }

  export type Default = {
    width: number,
    allowCellsRecycling: boolean
    fixed: boolean
  }

  export type Required<RT, CT> = {
    key?: string | number
    name: keyof RT,
    isResizable?: boolean,
    flexGrow?: number,
    children?: ColumnChildren<RT, CT>
  }
};

export type ColumnProps<RT, CT> = ColumnProps.Required<RT, CT> & Partial<ColumnProps.Default>;
type ColumnDefaultedIntrinsicProps<RT, CT> = ColumnProps.Required<RT, CT> & ColumnProps.Default & ColumnProps.Intrinsic<RT>;

const { union, maybe, struct } = t;
export const defaultWidth = 200;

const argsTypes = struct({
  key: union([t.String, t.Number]),
  width: maybe(t.Number),
  data: maybe(t.Array),
  name: t.String,
  fixed: maybe(t.Boolean),
  flexGrow: maybe(t.Number),
  children: ReactChildren,
  allowCellsRecycling: maybe(t.Boolean),

  isResizable: maybe(t.Boolean)
}, { strict: true });

export default class Column<RT, CT> extends React.PureComponent<ColumnProps<RT, CT>> {

  static defaultProps: ColumnProps.Default = {
    width: defaultWidth,
    allowCellsRecycling: true,
    fixed: false
  };

  render() {
    const {
      key,
      width,
      flexGrow,
      data = [],
      name,
      fixed,
      isResizable,
      children = [],
      allowCellsRecycling
    } = argsTypes(this.props) as ColumnDefaultedIntrinsicProps<RT, CT>;

    const cell = ({ rowIndex, columnKey }: { rowIndex: number, columnKey: string | number}) => {
      const elem: React.ReactElement<CellIntrinsicProps<RT, CT>> = find(children, child => child.type === Cell) || defaultCell;
      const rowData = data[rowIndex] || {};
      const dataCell = rowData[columnKey];
      return React.cloneElement<CellIntrinsicProps<RT, CT>, CellProps.Intrinsic<RT, CT>>(elem, { data: dataCell, rowData, rowIndex, fixed });
    };

    const header = React.cloneElement<HeaderIntrinsicProps<RT>, HeaderProps.Intrinsic<RT>>(find(children, child => child.type === Header) || defaultHeader(name), { fixed });
    const footer = find(children, child => child.type === Footer) as React.ReactElement<FooterProps> | undefined; // TODO onFooterClick

    return (
      <ColumnFDT
        key={key}
        columnKey={name}
        header={header}
        cell={cell}
        footer={footer}
        width={width}
        flexGrow={flexGrow}
        fixed={fixed}
        isResizable={isResizable}
        allowCellsRecycling={allowCellsRecycling}
      />
    );
  }
}

export function defaultColumns<RT, CT>(data: RT[]) {
  return Object.keys(data[0] || {}).map((columnName: keyof RT) => {
    const SpecificColumn: new() => Column<RT, CT> = Column;
    return <SpecificColumn name={columnName} />;
  });
};
