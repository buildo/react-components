import * as React from 'react';
import { props, t } from '../../../utils';

import * as cx from 'classnames';
import find = require('lodash/find');
import sortBy = require('lodash/sortBy');
import findIndex = require('lodash/findIndex');
import once = require('lodash/once');
import uniqueId = require('lodash/uniqueId');

import { Tablo } from '../../Tablo';
import dragDropContextHTML5Backend from './htmlBackend';
import Column, { defaultColumns, updateColumns, UpdateColumnsHandler } from '../../Column';
import ColumnGroup from '../../ColumnGroup';
import Header, { defaultHeader } from '../../Header';
import DNDHeader from './DNDHeader';
import { getArrayChildren } from "../../utils";

const { maybe, list } = t;

export default <T, K extends string = keyof T>(Grid: React.ComponentClass<Tablo.Props<T, K>>): React.ComponentClass<Tablo.Props<T, K>>  => {

  class ColumnsReorderGrid extends React.PureComponent<Tablo.Props<T, K>> {

    private uniqueId: string = uniqueId('tablo_')

    getLocals({ className, children, columnsOrder = [], onColumnsReorder, ...gridProps }: Tablo.Props<T, K>) {

      const _children = getArrayChildren(children) || defaultColumns(gridProps.data);

      const thereAreGroups = _children.filter(c => c.type === ColumnGroup).length > 0;
      if (thereAreGroups || !onColumnsReorder) {
        return {              // no reordering of columns if there are groups
          className,
          children: _children,
          ...gridProps
        };
      }

      const doOrderColumns = (child: React.ReactElement<Column.Props<T, K>>) => {
        if (child.type === Header) {
          return -1;
        }
        const index = findIndex(columnsOrder, n => n === child.props.name);
        return index === -1 ? Infinity : index;
      };

      const orderedChildren = sortBy(_children, doOrderColumns);

      const moveColumn = (list: K[] = [], source: K, target: K) => {
        const source_index = list.indexOf(source);
        const target_index = list.indexOf(target);
        if (source_index <= target_index) {
          return [...list.slice(0, source_index), ...list.slice(source_index + 1, target_index + 1), source, ...list.slice(target_index + 1)];
        } else {
          return [...list.slice(0, target_index), source, ...list.slice(target_index, source_index), ...list.slice(source_index + 1)];
        }
      };

      const onColumnsSwitch = (sourceName: K, targetName: K) => {
        if (onColumnsReorder && sourceName && targetName && sourceName !== targetName) {
          const newColumnsOrder = moveColumn(orderedChildren.map(c => c.props.name), sourceName, targetName);
          return onColumnsReorder(newColumnsOrder);
        }
        return undefined;
      };

      const isDragAllowed = ({ props: { fixed } }: React.ReactElement<Column.Props<T, K>>) => !fixed;
      const isDropAllowed = (fixed: boolean) => (source: K, target: K) => !fixed && source !== target;

      const overrideHeader: UpdateColumnsHandler<T, K> = ({ col, index }) => {
        const { name, fixed } = col.props;
        const header = find(getArrayChildren(col.props.children), { type: Header }) || defaultHeader(col.props.name);
        const otherChildren = (getArrayChildren(col.props.children) || []).filter(ch => ch.type !== Header);
        const oncedOnColumnsSwitch = once(onColumnsSwitch);
        const dndHeader = (
          <Header {...header.props}>
            <DNDHeader
              onDragHover={oncedOnColumnsSwitch}
              key={index}
              index={index}
              name={name}
              isDragAllowed={isDragAllowed(col)}
              isDropAllowed={isDropAllowed(!!fixed)}
              tabloUniqueId={this.uniqueId}
            >
              {header.props.children}
            </DNDHeader>
          </Header>
        );
        const children = [dndHeader, ...otherChildren].map((el, index) => React.cloneElement(el, { key: index }));
        const Col: React.SFC<Column.Props<T, K>> = Column;
        return (
          <Col {...col.props} key={name}>
            {children}
          </Col>
        );
      };

      const __children = updateColumns(orderedChildren, overrideHeader);

      return {
        className: cx('columns-reorderable-tablo', className),
        children: __children,
        ...gridProps
      };

    }

    render() {
      return <Grid {...this.getLocals(this.props)} />;
    }

  }

  props({
    // transform, manipulate
    className: maybe(t.String),
    // add
    columnsOrder: maybe(list(t.String)),
    onColumnsReorder: maybe(t.Function)
  }, { strict: false })(ColumnsReorderGrid);

  return dragDropContextHTML5Backend(ColumnsReorderGrid);
};
