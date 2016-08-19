import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import includes from 'lodash/includes';
import { skinnable, t, props, pure } from '../utils';
import FlexView from '../flex/FlexView';
import ResizeSensor from '../resize-sensor/ResizeSensor';
import { Table as FixedDataTable } from 'fixed-data-table';
import { warn } from '../utils/log';

import './patch-fixed-data-table';

export const checkPropsInvariants = (props) => {
  const {
    selectionType, onRowsSelect,
    width, height, autoSize
  } = props;
  const multipleSelectionEnabled = selectionType === 'multi';
  let toReturn = true;
  if (!multipleSelectionEnabled && onRowsSelect) {
    warn('\'multipleSelectionEnabled\' is false, so \'onRowsSelect\' will never be called. Use \'onRowSelect\' (singular) instead.');
    toReturn = false;
  }

  if ((!width && !height) && !autoSize) {
    warn('when \'autoSize=false\' you must pass \'width\' and \'height\' otherwise the table will be sizeless.');
    toReturn = false;
  }

  return toReturn;
};

const Props = t.subtype(t.struct({
  height: t.maybe(t.Number),
  width: t.maybe(t.Number),
  autoSize: t.maybe(t.Boolean),
  autoSizeColumns: t.maybe(t.Boolean),
  rowHeight: t.maybe(t.Number),
  headerHeight: t.maybe(t.Number),
  groupHeaderHeight: t.maybe(t.Number),
  footerHeight: t.maybe(t.Number),
  rowGetter: t.Function,
  rowsCount: t.maybe(t.Number),
  cellRenderer: t.Function,
  children: t.ReactChildren,
  sort: t.maybe(t.struct({
    by: t.maybe(t.String),
    dir: t.maybe(t.enums.of(['asc', 'desc'], 'sortDir'))
  })),
  selectedColumns: t.maybe(t.list(t.String)),
  selectedRows: t.maybe(t.list(t.Number)),
  onRowSelect: t.maybe(t.Function),
  onRowsSelect: t.maybe(t.Function),
  selectionType: t.enums.of(['none', 'single', 'multi'], 'selectionType'),
  onColumnResizeEndCallback: t.maybe(t.Function),
  isColumnResizing: t.maybe(t.Boolean),
  columns: t.maybe(t.list(t.Object)),
  className: t.maybe(t.String),
  style: t.maybe(t.Object),
  id: t.maybe(t.String)
}), checkPropsInvariants, 'FixedDataTableWrapperProps');

/** A table component based on fixed-data-table
 * @param height - the desired height of the table
 * @param width - the desired width of the table
 * @param autoSize - if true, the table will fit the container if width and height
 * @param autoSizeColumns - if true, the columns will split evenly the width, avoiding horizontal scrollbars
 * @param rowHeight - height in pixel of every row
 * @param headerHeight - height in pixel of header
 * @param groupHeaderHeight - height in pixel of groupHeader
 * @param footerHeight - height in pixel of footer
 * @param rowGetter - method to get the desired row of data
 * @param rowsCount number of row displayed in the table
 * @param cellRenderer - method to render cells
 * @param children - content
 * @param sort - the desired sorting field and direction
 * @param selectedColumns - selected columns
 * @param selectedRows - selected rows
 * @param onRowSelect - called when a row is selected
 * @param onRowsSelect - called when multiple rows are selected
 * @param selectionType - none | sigle | multi
 * @param onColumnResizeEndCallback - called after a column has been resized
 * @param isColumnResizing - whether a column is currently being resized
 * @param columns - list of columns
 */
@pure
@skinnable()
@props(Props)
export default class Table extends React.Component {

  constructor(props) {
    super(props);
    const { height, width } = props;
    this.state = {
      height,
      width
    };
  }

  static defaultProps = {
    width: 0,
    height: 0,
    selectedRows: [],
    selectedColumns: [],
    isColumnResizing: false
  };

  getNode = () => ReactDOM.findDOMNode(this.refs.wrapper);

  componentDidMount() {
    if (this.props.autoSize) {
      this.updateSize();
    } else {
      setTimeout(() => {
        this.scrollToSelectedRow();
        this.scrollToSelectedColumn();
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedRows[0] !== this.props.selectedRows[0]) {
      this.scrollToSelectedRow();
    }
    if (prevProps.selectedColumns[0] !== this.props.selectedColumns[0]) {
      this.scrollToSelectedColumn();
    }
  }

  updateSize = () => {
    const node = this.getNode();
    if (node) {
      const { clientHeight: height, clientWidth: width } = node;
      const { height: currentHeight, width: currentWidth } = this.state;
      if ((height !== currentHeight) || (width !== currentWidth)) {
        this.setState({ height, width }, this.scrollToSelectedRow);
      }
    }
  };

  scrollToSelectedRow = () => {
    this.setState({
      scrollToRow: this.props.selectedRows[0]
    });
  };

  scrollToSelectedColumn = () => {
    this.setState({
      scrollToColumn: this.props.columns.map(c => c.key).indexOf(this.props.selectedColumns[0])
    });
  };

  onScrollStart = () => {
    this.setState({
      scrollToRow: null,
      scrollToColumn: null
    });
  };

  onRowClick = ({ ctrlKey, metaKey }, index) => {
    const { selectedRows, selectionType } = this.props;
    if (selectionType === 'none') {
      return;
    }
    const multipleSelectionEnabled = selectionType === 'multi';

    if (multipleSelectionEnabled && (ctrlKey || metaKey)) {
      if (includes(selectedRows, index)) {
        this.props.onRowsSelect(selectedRows.filter(idx => idx !== index));
      } else {
        this.props.onRowsSelect([index, ...selectedRows]);
      }
    } else if (multipleSelectionEnabled) {
      this.props.onRowsSelect([index]);
    } else {
      this.props.onRowSelect(index);
    }
  };

  cellRenderer = (cellData, cellDataKey, rowData, rowIndex) => {
    const selected = this.props.selectedRows.indexOf(rowIndex) !== -1;
    return this.props.cellRenderer(cellData, selected, cellDataKey, rowData, rowIndex);
  };

  getLocals() {
    const {
      onRowClick,
      cellRenderer,
      onScrollStart,
      updateSize,
      props: {
        rowHeight, headerHeight, footerHeight, rowGetter, rowsCount, groupHeaderHeight,
        selectionType,
        onColumnResizeEndCallback, isColumnResizing,
        id, children, autoSizeColumns, autoSize
      },
      state: { height, width, scrollToRow, scrollToColumn }
    } = this;

    const tabIndex = selectionType !== 'none' ? '0' : null;

    const numberOfColumns = [].concat(children).length;
    const footerDataGetter = () => []; /*because https://github.com/facebook/fixed-data-table/issues/172*/

    const columnWidth = autoSizeColumns ? { width: width / numberOfColumns } : {};
    const columnProps = { ...columnWidth, cellRenderer, headerClassName: 'fixed-data-table-wrapper-header' };
    const addProps = column => React.cloneElement(column, { ...columnProps });
    const columns = numberOfColumns === 1 ? addProps(children) : [].concat(children).map(addProps);

    const style = {
      ...this.props.style,
      position: 'absolute'
    };

    const className = cx('fixed-data-table-wrapper', this.props.className, { selectable: selectionType !== 'none' });

    return {
      columns,
      wrapperProps: { id, style, grow: true, className, tabIndex, ref: 'wrapper', width: '100%', height: '100%' },
      tableProps: {
        width: width + 2, height: height + 2, // as long as FDT counts the borders to calculate size
        scrollToRow, onRowClick, onScrollStart, scrollToColumn,
        onColumnResizeEndCallback, isColumnResizing,
        rowHeight, headerHeight, footerHeight, rowGetter, rowsCount, footerDataGetter, groupHeaderHeight
      },
      resizeSensorProps: autoSize && {
        onResize: updateSize,
        debounce: 100
      }
    };
  }

  templateContent = ({ wrapperProps, tableProps, columns }) => (
    <FlexView {...wrapperProps}>
      <FixedDataTable {...tableProps}>
        {columns}
      </FixedDataTable>
    </FlexView>
  )

  template({ resizeSensorProps, ...locals }) {
    return (
      resizeSensorProps ?
        <ResizeSensor {...resizeSensorProps}>{this.templateContent(locals)}</ResizeSensor> :
        this.templateContent(locals)
    );
  }
}
