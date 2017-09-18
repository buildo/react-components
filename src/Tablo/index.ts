import Tablo from './Tablo';
import { autosize, columnsResize, columnsReorder, scrollable, selectable, sortable } from './plugins';

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

export default autosize(columnsResize(columnsReorder(scrollable(selectable(sortable(Tablo))))));
