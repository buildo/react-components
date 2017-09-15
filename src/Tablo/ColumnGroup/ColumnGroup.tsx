import * as React from 'react';
import { t, ReactChildren } from '../../utils';
import find = require('lodash/find');

import { ColumnGroup as ColumnGroupFDT } from 'fixed-data-table-2';

import Header, { defaultHeader } from '../Header';
import Column, { ColumnProps } from '../Column';

export namespace ColumnGroupProps {
  export type Intrinsic = {
    key: string | number,
    fixed: boolean,
  }
}

export type ColumnGroupProps<T> = {
  children: React.ReactElement<ColumnProps<T, keyof T>>[]
}

type ColumnIntrinsicProps<T> = ColumnGroupProps<T> & ColumnGroupProps.Intrinsic;

const { union, maybe, struct } = t;
const argsTypes = struct({
  key: union([t.String, t.Number]),
  fixed: maybe(t.Boolean),
  children: ReactChildren
}, { strict: true, name: 'ColumnGroupProps' });

export default class ColumnGroup<T> extends React.PureComponent<ColumnGroupProps<T>> {
  render() {
    const {
      key,
      fixed,
      children
    } = argsTypes(this.props) as ColumnIntrinsicProps<T>;

    const header = find(children, child => child.type === Header) || defaultHeader('');
    const columns = children
      .filter(ch => ch.type === Column)
      .map((col, key) => {
        const colProps: ColumnProps<T, keyof T> = {
          key,
          ...col.props,
          fixed
        };
        const SpecificColumn: new() => Column<T, keyof T> = Column;
        return <SpecificColumn {...colProps} />;
      });

    return (
      <ColumnGroupFDT
        key={key}
        header={header}
        fixed={fixed}
      >
        {columns}
      </ColumnGroupFDT>
    );
  }
}
