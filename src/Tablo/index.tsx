import * as React from 'react';
import _Tablo, { TabloProps } from './Tablo';
import { autosize, columnsResize, columnsReorder, scrollable, selectable, sortable } from './plugins';

export { TabloProps };
import ColumnGroup, { ColumnGroupProps } from './ColumnGroup';
export { ColumnGroup, ColumnGroupProps };
import Column, { ColumnProps } from './Column';
export { Column, ColumnProps };
import Cell, { CellProps } from './Cell';
export { Cell, CellProps };
import Header, { HeaderProps } from './Header';
export { Header, HeaderProps };
import Footer, { FooterProps } from './Footer';
export { Footer, FooterProps };

const Component = autosize(columnsResize(columnsReorder(scrollable(selectable(sortable(_Tablo))))));
export default function Tablo<T, K extends keyof T>(props: TabloProps<T, K>): React.ReactElement<TabloProps<T, K>> {
  return <Component {...props} />;
}
