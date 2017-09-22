import * as React from 'react';
import * as cx from 'classnames';
import Column, { defaultColumns, updateColumns } from '../../Column';
import { TabloProps, TabloDefaultedIntrinsicProps } from '../../Tablo';
import { UpdateHandler } from '../../Column/columnUtility';

const addSizeProps: UpdateHandler<any, any> = ({ col }) => ( //eslint-disable-line
  <Column
    isResizable
    {...col.props}
  />
);

const getLocals = <T, K extends keyof T>({ onColumnResize, ...props }: TabloProps<T, K>): TabloDefaultedIntrinsicProps<T, K> | TabloProps<T, K> => {

  // if `onColumnResize` is missing bypass this plugin
  if (!onColumnResize) {
    return props;
  }

  const { className, children, ...gridProps } = props;

  const onColumnResizeEndCallback = (width: number, key: K) => {
    onColumnResize({ width, key });
  };

  const _children = children ? (Array.isArray(children) ? children : [children]) : defaultColumns(gridProps.data);

  const __children = updateColumns(_children, addSizeProps);

  return {
    className: cx('columns-resize', className),
    onColumnResizeEndCallback,
    isColumnResizing: false,
    children: __children,
    ...gridProps
  };

};

export default <T, K extends keyof T>(Grid: React.ComponentClass<TabloProps<T, K>>) => {

  return class ColumnResizeGrid extends React.PureComponent<TabloProps<T, K>> {

    render() {
      return <Grid {...getLocals(this.props)} />;
    }

  }

};
