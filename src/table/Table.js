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

import 'fixed-data-table/dist/fixed-data-table-base.min.css';

export const checkPropsInvariants = (props) => {
  const {
    selectionType, onRowsSelect, onRowSelect,
    width, height, autoSize
  } = props;
  const multipleSelectionEnabled = selectionType === 'multi';
  let toReturn = true;
  if (onRowSelect && onRowsSelect) {
    warn('\'onRowSelect\' and \'onRowsSelect\' are exclusive. Use the former if \'multipleSelectionEnabled\' is true, or the latter if it\'s false');
    toReturn = false;
  } else if (multipleSelectionEnabled && onRowSelect) {
    warn('\'multipleSelectionEnabled\' is true, so \'onRowSelect\' will never be called. Use \'onRowsSelect\' (plural) instead.');
    toReturn = false;
  } else if (!multipleSelectionEnabled && onRowsSelect) {
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
  /** the desired height of the table */
  height: t.maybe(t.Number),
  /** the desired width of the table */
  width: t.maybe(t.Number),
  /** if true, the table will fit the container if width and height */
  autoSize: t.maybe(t.Boolean),
  /** if true, the columns will split evenly the width, avoiding horizontal scrollbars */
  autoSizeColumns: t.maybe(t.Boolean),
  /** height in pixel of every row */
  rowHeight: t.maybe(t.Number),
  /** height in pixel of header */
  headerHeight: t.maybe(t.Number),
  /** height in pixel of groupHeader */
  groupHeaderHeight: t.maybe(t.Number),
  /** height in pixel of footer */
  footerHeight: t.maybe(t.Number),
  /** method to get the desired row of data */
  rowGetter: t.Function,
  /** number of row displayed in the table */
  rowsCount: t.maybe(t.Number),
  cellRenderer: t.Function,
  children: t.ReactChildren,
  sort: t.maybe(t.struct({
    by: t.maybe(t.String),
    dir: t.maybe(t.enums.of(['asc', 'desc'], 'sortDir'))
  })),

  selectedRows: t.maybe(t.list(t.Number)),
  onRowSelect: t.maybe(t.Function),
  onRowsSelect: t.maybe(t.Function),
  selectionType: t.enums.of(['none', 'single', 'multi'], 'selectionType'),
  onColumnResizeEndCallback: t.maybe(t.Function),
  isColumnResizing: t.maybe(t.Boolean),
  scrollToColumn: t.maybe(t.Number),
  scrollToRow: t.maybe(t.Number),

  className: t.maybe(t.String),
  style: t.maybe(t.Object),
  id: t.maybe(t.String)
}), checkPropsInvariants, 'FixedDataTableWrapperProps');

@pure
@skinnable()
@props(Props)
export default class Table extends React.Component {

  constructor(props) {
    super(props);
    const { height, width, scrollToRow } = props;
    this.state = {
      height,
      width,
      scrollToRow
    };
  }

  static defaultProps = {
    width: 0,
    height: 0,
    selectedRows: [],
    isColumnResizing: false,
    scrollToColumn: 0,
    scrollToRow: 0
  };

  getNode = () => ReactDOM.findDOMNode(this.refs.wrapper);

  componentDidMount() {
    if (this.props.autoSize) {
      this.updateSize();
    } else {
      setTimeout(this.scrollToSelectedRow);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedRows[0] !== this.props.selectedRows[0]) {
      this.scrollToSelectedRow();
    }
  }

  componentWillReceiveProps({ scrollToRow }) {
    this.setState({ scrollToRow });
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

  onScrollStart = () => {
    this.setState({
      scrollToRow: null
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

  cellRenderer = (scrollToRow) => (cellData, cellDataKey, rowData, rowIndex, width) => {
    const selected = this.props.selectedRows.indexOf(rowIndex) !== -1;
    const isScrollTarget = scrollToRow === rowIndex;
    return this.props.cellRenderer(cellData, selected, cellDataKey, rowData, rowIndex, width, isScrollTarget);
  }


  getLocals() {
    const {
      onRowClick,
      cellRenderer: _cellRenderer,
      onScrollStart,
      updateSize,
      props: {
        rowHeight, headerHeight, footerHeight, rowGetter, rowsCount, groupHeaderHeight,
        selectionType,
        onColumnResizeEndCallback, isColumnResizing,
	scrollToColumn,
        id, children, autoSizeColumns, autoSize
      },
      state: { height, width, scrollToRow }
    } = this;

    const tabIndex = selectionType !== 'none' ? '0' : null;

    const numberOfColumns = [].concat(children).length;
    const footerDataGetter = () => []; /*because https://github.com/facebook/fixed-data-table/issues/172*/

    const columnWidth = autoSizeColumns ? { width: width / numberOfColumns } : {};
    const columnProps = {
      ...columnWidth,
      cellRenderer: _cellRenderer(scrollToRow),
      headerClassName: 'fixed-data-table-wrapper-header'
    };

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
        scrollToColumn, scrollToRow, onRowClick, onScrollStart,
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
