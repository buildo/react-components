import React from 'react';
import cx from 'classnames';
import omitBy from 'lodash/fp/omitBy';
import { defaultColumns, updateColumns } from '../../Column';
import cSortable from './columnSortable';
import ColumnGroup from '../../ColumnGroup';
import { skinnable, props, t, contains } from '../../../utils';

const { maybe, enums } = t;

export const clean = omitBy(x => typeof x === 'undefined');

const propsTypes = {
  // transform
  className: maybe(t.String),
  data: t.Array,
  children: t.ReactChildren,
  // add
  sortBy: maybe(t.String),
  sortDir: maybe(enums.of(['asc', 'desc'])),
  onSortChange: maybe(t.Function)
};

const getLocals = ({
  className,
  sortBy,
  sortDir,
  onSortChange,
  children,
  ...gridProps
}) => {

  const nextSort = (newSortBy) => {
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

  const onHeaderClick = (columnKey) => () => {
    if (!onSortChange) {
      return;
    }
    const { sortBy, sortDir } = nextSort(columnKey);
    onSortChange({ sortBy, sortDir });
  };

  const _children = [].concat(children || defaultColumns(gridProps.data));

  const addSortableProps = ({ col, colGroup } ) => { //eslint-disable-line
    const colGroupSortable = colGroup ? colGroup.props.sortable : undefined;
    return cSortable(clean({
      key: col.name, // TODO(frag) think about how to handle this stuff
      sortable: typeof colGroupSortable !== 'undefined' ? colGroupSortable : !!onSortChange,
      ...col.props,
      onHeaderClick,
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

export default (Grid) =>

  @skinnable(contains(Grid))
  @props(propsTypes, { strict: false })
  class SortableGrid extends React.PureComponent {

    getLocals = getLocals

  };
