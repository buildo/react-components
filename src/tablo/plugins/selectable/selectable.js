import React from 'react';
import t, { list, maybe, enums } from 'tcomb';
import cx from 'classnames';
import { props  } from 'tcomb-react';
import { pure, skinnable, contains } from 'revenge';
import includes from 'lodash/includes';

import './selectableGrid.scss';

const propsTypes = {
  className: maybe(t.String),
  selectedRows: maybe(list(t.Integer)),
  onRowsSelect: maybe(t.Function),
  selectionType: enums.of('multi single none'),
  hoveredRowIndex: maybe(t.Integer),
  onHoveredRowChange: maybe(t.Function)
};

const getLocals = ({
  selectedRows = [],
  onRowsSelect,
  selectionType = 'none',
  className,
  onHoveredRowChange,
  hoveredRowIndex,
  ...gridProps }) => {

  const onRowClick = ({ ctrlKey, metaKey }, index) => {
    if (selectionType === 'none' || !onRowsSelect) {
      return;
    }
    if (selectionType === 'multi' && (ctrlKey || metaKey)) {
      if (includes(selectedRows, index)) {
        onRowsSelect(selectedRows.filter(idx => idx !== index));
      } else {
        onRowsSelect([index, ...selectedRows]);
      }
    } else {
      onRowsSelect([index]);
    }
  };

  const onRowMouseEnter = (_, index) => {
    onHoveredRowChange && onHoveredRowChange(index);
  };

  const onRowMouseLeave = () => {
    onHoveredRowChange && onHoveredRowChange(null);
  };

  const rowClassNameGetter = (index) => cx(
    'grid-row', {
      selected: includes(selectedRows, index),
      hover: index === hoveredRowIndex
    }
  );

  const scrollToRow = !gridProps.scrollTop ? selectedRows[0] : undefined;

  return {
    className: cx('selectable-grid', { selectable: selectionType !== 'none' }, className),
    scrollToRow,
    onRowClick,
    rowClassNameGetter,
    onRowMouseEnter,
    onRowMouseLeave,
    ...gridProps
  };
};

export default (Grid) =>

  @skinnable(contains(Grid))
  @pure
  @props(propsTypes, { strict: false })
  class SelectableGrid extends React.Component {

    getLocals = getLocals

  };
