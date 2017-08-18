import Tablo from './Tablo';
import { autosize, columnsResize, columnsReorder, scrollable, selectable, sortable } from './plugins';

import ColumnGroup from './ColumnGroup';
export { ColumnGroup };
import Column from './Column';
export { Column };
import Cell from './Cell';
export { Cell };
import Header from './Header';
export { Header };
import Footer from './Footer';
export { Footer };

export default autosize(columnsResize(columnsReorder(scrollable(selectable(sortable(Tablo))))));
