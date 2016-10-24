import React from 'react';
import curry from 'lodash/curry';
import flatMap from 'lodash/flatMap';
import Column from './Column';
import ColumnGroup from '../ColumnGroup';
import { Children } from 'react';

// how to extract columns from children, update them and return new grid children
// useful in the `getLocals` of the several plugins

export const getColumnList = children => {
  const chArray = Children.toArray(children);
  const thereAreGroups = chArray.filter(ch => ch.type === ColumnGroup).length > 0;
  return thereAreGroups ? flatMap(chArray, ch => Children.toArray(ch.props.children)) : chArray;
};

export const updateColumns = curry((children, update) => {
  const updateIfColumn = (ch, index) => ch.type === Column ? update(ch, index) : ch;
  const chArray = Children.toArray(children);
  const thereAreGroups = chArray.filter(ch => ch.type === ColumnGroup).length > 0;

  const newChildren = thereAreGroups ?
    chArray.map((group, key) => React.cloneElement(group, {
      key,
      children: Children.map(group.props.children, updateIfColumn)
    })) :
    chArray.map(updateIfColumn);
  return newChildren;
});
