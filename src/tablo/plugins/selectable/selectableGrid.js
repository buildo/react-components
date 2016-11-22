import React from 'react';
import cx from 'classnames';
import { pure, skinnable, props, t, contains } from '../../../utils';
import includes from 'lodash/includes';

const { list, maybe, enums } = t;

const propsTypes = {
  className: maybe(t.String),
  selectedRows: maybe(list(t.Integer)),
  onRowsSelect: maybe(t.Function),
  selectionType: maybe(enums.of(['multi', 'single', 'none'])),
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
    'tablo-row', {
      selected: includes(selectedRows, index),
      hover: index === hoveredRowIndex
    }
  );

  const scrollToRow = !gridProps.scrollTop ? selectedRows[0] : undefined;

  return {
    className: cx('selectable-tablo', { selectable: selectionType !== 'none' }, className),
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
