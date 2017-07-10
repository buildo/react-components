import React from 'react';
import { props, t } from '../../../utils';

import cx from 'classnames';
import find from 'lodash/find';
import sortBy from 'lodash/sortBy';
import findIndex from 'lodash/findIndex';
import once from 'lodash/once';
import uniqueId from 'lodash/uniqueId';

import dragDropContextHTML5Backend from './htmlBackend';
import Column, { defaultColumns, updateColumns } from '../../Column';
import ColumnGroup from '../../ColumnGroup';
import Header, { defaultHeader } from '../../Header';
import DNDHeader from './DNDHeader';

const { maybe, list } = t;

export default (Grid) =>
  @dragDropContextHTML5Backend
  @props({
    // transform, manipulate
    className: maybe(t.String),
    // add
    columnsOrder: maybe(list(t.String)),
    onColumnsReorder: maybe(t.Function)
  }, { strict: false })
  // @skinnable(contains(Grid))
  class ColumnsReorderGrid extends React.PureComponent {

    constructor() {
      super();
      this.uniqueId = uniqueId('tablo_');
    }

    getLocals({ className, children, columnsOrder = [], onColumnsReorder, ...gridProps }) {

      const _children = [].concat(children || defaultColumns(gridProps.data));

      const thereAreGroups = _children.filter(c => c.type === ColumnGroup).length > 0;
      if (thereAreGroups || !onColumnsReorder) {
        return {              // no reordering of columns if there are groups
          className,
          children: _children,
          ...gridProps
        };
      }

      const doOrderColumns = (child) => {
        if (child.type === Header) {
          return -1;
        }
        const index = findIndex(columnsOrder, n => n === child.props.name);
        return index === -1 ? Infinity : index;
      };

      const orderedChildren = sortBy(_children, doOrderColumns);

      const moveColumn = (list = [], source, target) => {
        const source_index = list.indexOf(source);
        const target_index = list.indexOf(target);
        if (source_index <= target_index) {
          return [...list.slice(0, source_index), ...list.slice(source_index + 1, target_index + 1), source, ...list.slice(target_index + 1)];
        } else {
          return [...list.slice(0, target_index), source, ...list.slice(target_index, source_index), ...list.slice(source_index + 1)];
        }
      };

      const onColumnsSwitch = (sourceName, targetName) => {
        if (onColumnsReorder && sourceName && targetName && sourceName !== targetName) {
          const newColumnsOrder = moveColumn(orderedChildren.map(c => c.props.name), sourceName, targetName);
          return onColumnsReorder(newColumnsOrder);
        }
        return undefined;
      };

      const isDragAllowed = ({ props: { fixed } }) => !fixed;
      const isDropAllowed = (fixed) => (source, target) => !fixed && source !== target;

      const overrideHeader = ({ col, index }) => { //eslint-disable-line
        const { name, fixed } = col.props;
        const header = find([].concat(col.props.children), { type: Header }) || defaultHeader(col.props.name);
        const otherChildren = col.props.children ? [].concat(col.props.children).filter(ch => ch.type !== Header) : [];
        const oncedOnColumnsSwitch = once(onColumnsSwitch, 200);
        const dndHeader = (
          <Header {...header.props}>
            <DNDHeader
              onDragHover={oncedOnColumnsSwitch}
              key={index}
              index={index}
              name={name}
              isDragAllowed={isDragAllowed(col)}
              isDropAllowed={isDropAllowed(fixed)}
              tabloUniqueId={this.uniqueId}
            >
              {header.props.children}
            </DNDHeader>
          </Header>
        );
        const children = [dndHeader, ...otherChildren].map((el, index) => React.cloneElement(el, { key: index }));
        return (
          <Column {...col.props} key={name}>
            {children}
          </Column>
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

  };
