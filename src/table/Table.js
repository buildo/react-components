import React from 'react';
import cx from 'classnames';
import includes from 'lodash/collection/includes';
import { skinnable, t, props, pure } from '../utils';
import FlexView from '../flex/FlexView';
import { Table as FixedDataTable } from 'fixed-data-table';
import warn from '../utils/log';

import './patch-fixed-data-table';

import 'fixed-data-table/dist/fixed-data-table-base.min.css';
import './table.scss';

const ARROW_UP = 38;
const ARROW_DOWN = 40;

export const isInvariantSatisfied = ({ selectionType, onRowsSelect, onRowSelect }) => {
  const multipleSelectionEnabled = selectionType === 'multi';
  /* eslint-disable no-console, quotes */
  if (onRowSelect && onRowsSelect) {
    warn("'onRowSelect' and 'onRowsSelect' are exclusive. Use the former if 'multipleSelectionEnabled' is true, or the latter if it's false");
    return false;
  } else if (multipleSelectionEnabled && onRowSelect) {
    warn("'multipleSelectionEnabled' is true, so 'onRowSelect' will never be called. Use 'onRowsSelect' (plural) instead.");
    return false;
  } else if (!multipleSelectionEnabled && onRowsSelect) {
    warn("'multipleSelectionEnabled' is false, so 'onRowsSelect' will never be called. Use 'onRowSelect' (singular) instead.");
    return false;
  }
  return true;
  /* eslint-enable no-console, quotes */
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
  children: t.ReactNode,
  sort: t.maybe(t.struct({
    by: t.maybe(t.String),
    dir: t.maybe(t.enums.of(['asc', 'desc'], 'sortDir'))
  })),

  selectedRows: t.maybe(t.list(t.Num)),
  onRowSelect: t.maybe(t.Func),
  onRowsSelect: t.maybe(t.Func),
  selectionType: t.enums.of(['none', 'single', 'multi'], 'selectionType'),

  className: t.maybe(t.String),
  style: t.maybe(t.Object),
  id: t.maybe(t.String)
}), isInvariantSatisfied, 'FixedDataTableWrapperProps');

@pure
@skinnable()
@props(Props)
export default class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      height: this.props.height,
      width: this.props.width,
      scrollToRow: this.props.selectedRows[0]
    };
  }

  static defaultProps = {
    width: 400,
    height: 400,
    selectedRows: []
  };

  componentDidMount() {
    this.node = React.findDOMNode(this.refs.wrapper);
    if (this.props.selectionType !== 'none') {
      this.attachKeyPressListener();
      this.scrollToSelectedRow();
    }
    if (this.props.autoSize) {
      this.autoSize();
      this.startAutoSizeInterval();
    }
  }

  componentDidUpdate(newProps) {
    if (newProps.selectedRows[0] !== this.props.selectedRows[0]) {
      this.scrollToSelectedRow();
    }
  }

  componentWillUnmount() {
    this.removeKeyPressListener();
    this.stopAutoSizeInterval();
  }

  startAutoSizeInterval = () => {
    this.autoSizeInterval = setInterval(this.autoSize, 200);
  };

  stopAutoSizeInterval = () => {
    clearInterval(this.autoSizeInterval);
  };

  autoSize = () => {
    const { height: currentHeight, width: currentWidth } = this.state;
    const { clientHeight: height, clientWidth: width } = this.node;
    if ((height !== currentHeight) || (width !== currentWidth)) {
      this.setState({ height, width }, this.scrollToSelectedRow);
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

  getDirectionFromKeyCode = (keyCode) => {
    switch (keyCode) {
      case ARROW_UP: return -1;
      case ARROW_DOWN: return 1;
      default: return null;
    }
  };

  selectAdjacentRow = (direction) => {
    const { selectedRows, selectionType, onRowSelect, onRowsSelect } = this.props;
    if (!direction || selectedRows.length !== 1) {
      return;
    }
    const rowIndexToSelect = selectedRows[0] + direction;
    if (rowIndexToSelect < 0 || rowIndexToSelect >= this.props.rowsCount) {
      return;
    }
    const multipleSelectionEnabled = selectionType === 'multi';
    if (multipleSelectionEnabled) {
      onRowsSelect([rowIndexToSelect]);
    } else {
      onRowSelect(rowIndexToSelect);
    }
  };

  onKeyPress = ({ which, keyCode }) => {
    const direction = this.getDirectionFromKeyCode(which | keyCode);
    return direction && this.selectAdjacentRow(direction);
  };

  attachKeyPressListener = () => {
    return this.node.addEventListener('keydown', this.onKeyPress, false);
  };

  removeKeyPressListener = () => {
    return this.node.removeEventListener('keydown', this.onKeyPress, false);
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
    return this.props.cellRenderer(cellData, selected, cellDataKey, rowData);
  };

  getLocals() {
    const {
      onRowClick,
      cellRenderer,
      onScrollStart,
      props: {
        rowHeight, headerHeight, footerHeight, rowGetter, rowsCount, groupHeaderHeight,
        selectionType,
        id, children, autoSizeColumns
      },
      state: { height, width, scrollToRow }
    } = this;

    const tabIndex = selectionType !== 'none' ? '0' : null;

    const numberOfColumns = [].concat(children).length;
    const footerDataGetter = () => true; /*because https://github.com/facebook/fixed-data-table/issues/172*/

    const columnWidth = autoSizeColumns ? { width: width/numberOfColumns } : {};
    const columnProps = { ...columnWidth, cellRenderer, headerClassName: 'fixed-data-tablew-wrapper-header' };
    const addProps = column => React.cloneElement(column, { ...columnProps });
    const columns = numberOfColumns === 1 ? addProps(children) : [].concat(children).map(addProps);

    const style = {
      ...this.props.style,
      position: 'absolute'
    };

    const className = cx('fixed-data-table-wrapper', this.props.className, { selectable: selectionType !== 'none' });

    return {
      wrapperProps: { id, style, grow: true, className, tabIndex, ref: 'wrapper', width: '100%', height: '100%' },
      tableProps: {
        width: width + 2, height: height + 2, // as long as FDT counts the borders
        scrollToRow, onRowClick, onScrollStart,
        rowHeight, headerHeight, footerHeight, rowGetter, rowsCount, footerDataGetter, groupHeaderHeight
      },
      columns
    };
  }

  template({ wrapperProps, tableProps, columns }) {
    return (
      <FlexView {...wrapperProps}>
        <FixedDataTable {...tableProps}>
          {columns}
        </FixedDataTable>
      </FlexView>
    );
  }
}
