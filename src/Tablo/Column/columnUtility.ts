import * as React from 'react';
import { Children } from 'react';
import curry = require('lodash/curry');
import flatMap = require('lodash/flatMap');
import Column, { ColumnProps } from './Column';
import ColumnGroup, { ColumnGroupProps } from '../ColumnGroup';

// how to extract columns from children, update them and return new grid children
// useful in the `getLocals` of the several plugins

export interface UpdateColumnsProps<T, K extends keyof T> {
  col: React.ReactElement<ColumnProps<T, K>>,
  index: number,
  colGroup?: React.ReactElement<ColumnGroupProps<T>>
};
export type UpdateColumnsHandler<T, K extends keyof T> = (c: UpdateColumnsProps<T, K>) => JSX.Element;
type TabloChildren<T, K extends keyof T> = React.ReactElement<ColumnProps<T, K>>[] | React.ReactElement<ColumnGroupProps<T>>[];

export const getColumnList = <T, K extends keyof T>(children: TabloChildren<T, K>) => {
  const chArray = Children.toArray(children) as React.ReactElement<any>[];
  const thereAreGroups = chArray.filter(ch => ch.type === ColumnGroup).length > 0;
  return thereAreGroups ? flatMap(chArray, ch => Children.toArray(ch.props.children)) : chArray;
};

export const updateColumns = curry(<T, K extends keyof T>(children: TabloChildren<T, K>, update: UpdateColumnsHandler<T, K>): JSX.Element[] => {
  const updateIfColumn = (colGroup?: React.ReactElement<ColumnGroupProps<T>>) => (col: React.ReactElement<ColumnProps<T, K>>, index: number) => col.type === Column ? update({ col , index, colGroup }) : col;
  const chArray = Children.toArray(children) as React.ReactElement<ColumnProps<T, K> | ColumnGroupProps<T>>[];
  const thereAreGroups = chArray.filter(ch => ch.type === ColumnGroup).length > 0;

  const newChildren = thereAreGroups ?
    (chArray as React.ReactElement<ColumnGroupProps<T>>[]).map((group, key: string | number) => React.cloneElement(group, {
      key,
      children: Children.map(group.props.children, updateIfColumn(group))
    })) :
    chArray.map(updateIfColumn());
  return newChildren;
});
