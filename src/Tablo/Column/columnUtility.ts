import * as React from 'react';
import { Children } from 'react';
import curry = require('lodash/curry');
import flatMap = require('lodash/flatMap');
import { Column } from './Column';
import ColumnGroup from '../ColumnGroup';

// how to extract columns from children, update them and return new grid children
// useful in the `getLocals` of the several plugins

export interface UpdateColumnsProps<T, K extends string> {
  col: React.ReactElement<Column.Props<T, K>>,
  index: number,
  colGroup?: React.ReactElement<ColumnGroup.Props<T, K>>
};
export type UpdateColumnsHandler<T, K extends string> = (c: UpdateColumnsProps<T, K>) => JSX.Element;
type TabloChildren<T, K extends string> = React.ReactElement<Column.Props<T, K>>[] | React.ReactElement<ColumnGroup.Props<T, K>>[];

export const getColumnList = <T, K extends string>(children: TabloChildren<T, K>) => {
  const chArray = Children.toArray(children) as React.ReactElement<any>[];
  const thereAreGroups = chArray.filter(ch => ch.type === ColumnGroup).length > 0;
  return thereAreGroups ? flatMap(chArray, ch => Children.toArray(ch.props.children)) : chArray;
};

export const updateColumns = curry(<T, K extends string>(children: TabloChildren<T, K>, update: UpdateColumnsHandler<T, K>): JSX.Element[] => {
  const updateIfColumn = (colGroup?: React.ReactElement<ColumnGroup.Props<T, K>>) => (col: React.ReactElement<Column.Props<T, K>>, index: number) => col.type === Column ? update({ col , index, colGroup }) : col;
  const chArray = Children.toArray(children) as React.ReactElement<Column.Props<T, K> | ColumnGroup.Props<T, K>>[];
  const thereAreGroups = chArray.filter(ch => ch.type === ColumnGroup).length > 0;

  const newChildren = thereAreGroups ?
    (chArray as React.ReactElement<ColumnGroup.Props<T, K>>[]).map((group, key: string | number) => React.cloneElement(group, {
      key,
      children: Children.map(group.props.children, updateIfColumn(group))
    })) :
    chArray.map(updateIfColumn());
  return newChildren;
});
