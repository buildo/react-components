import React from 'react';
import * as cx from 'classnames';
import { props, t } from '../../../utils';

import Column, { defaultColumns, updateColumns } from '../../Column';

const { maybe } = t;

const addSizeProps = ({ col }) => ( //eslint-disable-line
  <Column
    isResizable
    {...col.props}
  />
);

const propsTypes = {
  className: maybe(t.String),
  onColumnResize: maybe(t.Function),
  children: maybe(t.ReactChildren)
};

const getLocals = ({ onColumnResize, ...props }) => {

  // if `onColumnResize` is missing bypass this plugin
  if (!onColumnResize) {
    return props;
  }

  const { className, children, ...gridProps } = props;

  const onColumnResizeEndCallback = (width, key) => {
    onColumnResize({ width, key });
  };

  const _children = [].concat(children || defaultColumns(gridProps.data));

  const __children = updateColumns(_children, addSizeProps);

  return {
    className: cx('columns-resize', className),
    onColumnResizeEndCallback,
    isColumnResizing: false,
    children: __children,
    ...gridProps
  };

};

export default (Grid) => {
  class ColumnResizeGrid extends React.PureComponent {
    render() {
      return <Grid {...getLocals(this.props)} />;
    }
  }

  props(propsTypes, { strict: false })(ColumnResizeGrid);

  return ColumnResizeGrid;
};
