import * as React from 'react';
import cx from 'classnames';
import Column, { defaultColumns, updateColumns } from '../../Column';
import { Tablo, TabloDefaultedIntrinsicProps } from '../../Tablo';
import { UpdateColumnsProps } from '../../Column/columnUtility';
import { getArrayChildren } from '../../utils';

const addSizeProps = <T extends {}>(
  { col }: UpdateColumnsProps<T> //eslint-disable-line
) => <Column isResizable {...col.props} />;

const getLocals = <T extends {}>({
  onColumnResize,
  ...props
}: Tablo.Props<T>): TabloDefaultedIntrinsicProps<T> | Tablo.Props<T> => {
  // if `onColumnResize` is missing bypass this plugin
  if (!onColumnResize) {
    return props;
  }

  const { className, children, ...gridProps } = props;

  const onColumnResizeEndCallback = (width: number, key: string) => {
    onColumnResize({ width, key });
  };

  const _children = getArrayChildren(children) || defaultColumns(gridProps.data);

  const __children = updateColumns(_children, addSizeProps);

  return {
    className: cx('columns-resize', className),
    onColumnResizeEndCallback,
    isColumnResizing: false,
    children: __children,
    ...gridProps
  } as Tablo.Props<T>; // TODO: remove cast -> error on `onColumnsResizeEndCallback`
};

export default <T extends {}>(
  Grid: React.ComponentClass<Tablo.Props<T>>
): React.ComponentClass<Tablo.Props<T>> => {
  return class ColumnResizeGrid extends React.PureComponent<Tablo.Props<T>> {
    render() {
      return <Grid {...getLocals(this.props)} />;
    }
  };
};
