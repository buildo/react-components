import * as React from 'react';
import * as cx from 'classnames';
import omitBy = require ('lodash/omitBy');
import { defaultColumns, updateColumns, UpdateColumnsHandler, ColumnIntrinsicProps } from '../../Column';
import cSortable from './columnSortable';
import ColumnGroup from '../../ColumnGroup';
import { Tablo, TabloDefaultedIntrinsicProps } from '../../Tablo';
import { getArrayChildren } from '../../utils';

export const clean = <T, K extends string = keyof T>(columnProps: ColumnIntrinsicProps<T, K>): ColumnIntrinsicProps<T, K> => omitBy(columnProps, x => typeof x === 'undefined');

const getLocals = <T, K extends string>({
  className,
  sortBy,
  sortDir,
  onSortChange,
  children,
  ...gridProps
}: Tablo.Props<T, K>): TabloDefaultedIntrinsicProps<T, K> | Tablo.Props<T, K> => {

  const nextSort = (newSortBy: K): Tablo.Sort<K> => {
    const prevSortDir = newSortBy === sortBy ? sortDir : undefined;
    const newSortDir = (() => {
      switch (prevSortDir) {
        case 'asc': return 'desc';
        case 'desc': return undefined;
        default: return 'asc';
      }
    })();
    return {
      sortBy: newSortDir ? newSortBy : undefined,
      sortDir: newSortDir
    };
  };

  const onHeaderClick = (columnKey: K) => () => {
    if (!onSortChange) {
      return;
    }
    const { sortBy, sortDir } = nextSort(columnKey);
    onSortChange({ sortBy, sortDir });
  };

  const _children = getArrayChildren(children) || defaultColumns(gridProps.data);

  const addSortableProps: UpdateColumnsHandler<T, K> = ({ col, colGroup }) => { //eslint-disable-line
    const colGroupSortable = colGroup ? colGroup.props.sortable : undefined;
    return cSortable(clean({
      key: col.props.name, // TODO(frag) think about how to handle this stuff
      sortable: typeof colGroupSortable !== 'undefined' ? colGroupSortable : !!onSortChange,
      ...col.props,
      onHeaderClick: onHeaderClick(col.props.name),
      sortDir: (sortBy === col.props.name || col.type === ColumnGroup) ? sortDir : undefined
    }));
  };

  const __children = updateColumns(_children, addSortableProps);

  return {
    className: cx('sortable-tablo', className),
    children: __children,
    ...gridProps
  };

};

export default <T, K extends string = keyof T>(Grid: React.ComponentClass<Tablo.Props<T, K>>): React.ComponentClass<Tablo.Props<T, K>> => {

  return class SortableGrid extends React.PureComponent<Tablo.Props<T, K>> {
    render() {
      return <Grid {...getLocals(this.props)} />;
    }
  }

};
