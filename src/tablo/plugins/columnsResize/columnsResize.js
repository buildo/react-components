import React from 'react';
import t, { maybe } from 'tcomb';
import cx from 'classnames';
import { props  } from 'tcomb-react';
import { pure, skinnable, contains } from 'revenge';

import Column, { defaultColumns, updateColumns } from '../../Column';

// import './columnsResize.scss';

const addSizeProps = ({ col }) => ( //eslint-disable-line
  <Column
    isResizable
    {...col.props}
  />
);

const propsTypes = {
  className: maybe(t.String),
  onColumnResize: t.Function,
  children: maybe(t.ReactChildren)
};

const getLocals = ({  className, children, onColumnResize, ...gridProps }) => {

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

export default (Grid) =>

  @skinnable(contains(Grid))
  @pure
  @props(propsTypes, { strict: false })
  class ColumnResizeGrid extends React.Component {

    getLocals = getLocals

  };
