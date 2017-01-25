import React from 'react';
import cx from 'classnames';
import { pure, skinnable, props, t, contains } from '../../../utils';
import includes from 'lodash/includes';
import constant from 'lodash/constant';

const { list, maybe, enums } = t;

const propsTypes = {
  className: maybe(t.String),
  selectedRows: maybe(list(t.Integer)),
  onRowsSelect: maybe(t.Function),
  selectionType: maybe(enums.of(['multi', 'single', 'none']))
};

const getLocals = ({
  selectedRows = [],
  onRowsSelect,
  selectionType = 'none',
  className,
  rowClassNameGetter: rcnGetter = constant(''),
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

  const rowClassNameGetter = (index) => cx(rcnGetter(index), {
    selected: includes(selectedRows, index)
  });

  const scrollToRow = !gridProps.scrollTop ? selectedRows[0] : undefined;

  return {
    className: cx('selectable-tablo', { selectable: selectionType !== 'none' }, className),
    scrollToRow,
    onRowClick,
    rowClassNameGetter,
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
