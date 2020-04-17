import * as React from 'react';
import * as cx from 'classnames';
import omitBy = require('lodash/omitBy');
import {
  defaultColumns,
  updateColumns,
  UpdateColumnsHandler,
  ColumnIntrinsicProps
} from '../../Column';
import cSortable from './columnSortable';
import ColumnGroup from '../../ColumnGroup';
import { Tablo, TabloDefaultedIntrinsicProps } from '../../Tablo';
import { getArrayChildren } from '../../utils';

export const clean = <T extends {}>(
  columnProps: ColumnIntrinsicProps<T>
): ColumnIntrinsicProps<T> => omitBy(columnProps, x => typeof x === 'undefined') as any;

const getLocals = <T extends {}>({
  className,
  sortBy,
  sortDir,
  onSortChange,
  children,
  ...gridProps
}: Tablo.Props<T>): TabloDefaultedIntrinsicProps<T> | Tablo.Props<T> => {
  const nextSort = (newSortBy: string): Tablo.Sort<string> => {
    const prevSortDir = newSortBy === sortBy ? sortDir : undefined;
    const newSortDir = (() => {
      switch (prevSortDir) {
        case 'asc':
          return 'desc';
        case 'desc':
          return undefined;
        default:
          return 'asc';
      }
    })();
    return {
      sortBy: newSortDir ? newSortBy : undefined,
      sortDir: newSortDir
    };
  };

  const onHeaderClick = (columnKey: string) => () => {
    if (!onSortChange) {
      return;
    }
    const { sortBy, sortDir } = nextSort(columnKey);
    onSortChange({ sortBy, sortDir });
  };

  const _children = getArrayChildren(children) || defaultColumns(gridProps.data);

  const addSortableProps: UpdateColumnsHandler<T> = ({ col, colGroup }) => {
    const colGroupSortable = colGroup ? colGroup.props.sortable : undefined;
    return cSortable(
      clean({
        key: col.props.name as any,
        sortable: typeof colGroupSortable !== 'undefined' ? colGroupSortable : !!onSortChange,
        ...col.props,
        onHeaderClick: onHeaderClick(col.props.name),
        sortDir: sortBy === col.props.name || col.type === ColumnGroup ? sortDir : undefined
      })
    );
  };

  const __children = updateColumns(_children, addSortableProps);

  return {
    className: cx('sortable-tablo', className),
    children: __children,
    ...gridProps
  };
};

export default <T extends {}>(
  Grid: React.ComponentClass<Tablo.Props<T>>
): React.ComponentClass<Tablo.Props<T>> => {
  return class SortableGrid extends React.PureComponent<Tablo.Props<T>> {
    render() {
      return <Grid {...getLocals(this.props)} />;
    }
  };
};
