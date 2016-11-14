import Tablo from './Tablo';
import { autosize, columnsResize, columnsReorder, scrollable, selectable, sortable } from './plugins';

export ColumnGroup from './ColumnGroup';
export Column from './Column';
export Cell from './Cell';
export Header from './Header';
export Footer from './Footer';

export default autosize(columnsResize(columnsReorder(scrollable(selectable(sortable(Tablo))))));
