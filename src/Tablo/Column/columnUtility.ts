import * as React from 'react';
import { Children } from 'react';
import curry = require('lodash/curry');
import flatMap = require('lodash/flatMap');
import { Column } from './Column';
import ColumnGroup from '../ColumnGroup';

// how to extract columns from children, update them and return new grid children
// useful in the `getLocals` of the several plugins

export interface UpdateColumnsProps<T> {
  col: React.ReactElement<Column.Props<T>>;
  index: number;
  colGroup?: React.ReactElement<ColumnGroup.Props<T>>;
}
export type UpdateColumnsHandler<T> = (c: UpdateColumnsProps<T>) => JSX.Element;
type TabloChildren<T> =
  | React.ReactElement<Column.Props<T>>[]
  | React.ReactElement<ColumnGroup.Props<T>>[];

export const getColumnList = <T>(children: TabloChildren<T>) => {
  const chArray = Children.toArray(children as any) as React.ReactElement<any>[];
  const thereAreGroups = chArray.filter(ch => ch.type === ColumnGroup).length > 0;
  return thereAreGroups ? flatMap(chArray, ch => Children.toArray(ch.props.children)) : chArray;
};

export const updateColumns: _.CurriedFunction2<{}, {}, JSX.Element[]> = curry(
  <T extends {}>(children: TabloChildren<T>, update: UpdateColumnsHandler<T>): JSX.Element[] => {
    const updateIfColumn = (colGroup?: React.ReactElement<ColumnGroup.Props<T>>) => (
      col: React.ReactElement<Column.Props<T>>,
      index: number
    ) => (col.type === Column ? update({ col, index, colGroup }) : col);
    const chArray = Children.toArray(children as any) as React.ReactElement<
      Column.Props<T> | ColumnGroup.Props<T>
    >[];
    const thereAreGroups = chArray.filter(ch => ch.type === ColumnGroup).length > 0;

    const newChildren = thereAreGroups
      ? (chArray as React.ReactElement<ColumnGroup.Props<T>>[]).map((group, key: string | number) =>
          React.cloneElement(group, {
            key,
            children: Children.map(group.props.children, updateIfColumn(group))
          })
        )
      : chArray.map(updateIfColumn() as any);
    return newChildren as any;
  }
);
