import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

const dragDropContextHTML5Backend: <P>(
  componentClass: React.ComponentClass<P> | React.StatelessComponent<P>
) => __ReactDnd.ContextComponentClass<P> = DragDropContext(HTML5Backend);
export default dragDropContextHTML5Backend;
