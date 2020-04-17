import * as React from 'react';
import * as cx from 'classnames';
import includes = require('lodash/includes');
import { Tablo } from '../../Tablo';
import { Table } from 'fixed-data-table-2';

export default <T extends {}>(
  Grid: React.ComponentClass<Tablo.Props<T>>
): React.ComponentClass<Tablo.Props<T>> => {
  return class SelectableGrid extends React.PureComponent<Tablo.Props<T>> {
    render() {
      const {
        selectedRows = [],
        onRowsSelect,
        selectionType = 'none',
        className,
        rowClassNameGetter: rcnGetter = () => '',
        ...gridProps
      } = this.props;

      const onRowClick = ({ ctrlKey, metaKey }: React.MouseEvent<Table>, index: number) => {
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

      const rowClassNameGetter = (index: number) =>
        cx(rcnGetter(index), {
          selected: includes(selectedRows, index)
        });

      const scrollToRow = !gridProps.scrollTop ? selectedRows[0] : undefined;

      const tabloProps = {
        className: cx('selectable-tablo', { selectable: selectionType !== 'none' }, className),
        scrollToRow,
        onRowClick,
        rowClassNameGetter,
        ...gridProps
      };

      return <Grid {...tabloProps} />;
    }
  };
};
