import React from 'react';
import cx from '../../../utils/classnames';
import { findDOMNode } from 'react-dom';
import { DropTarget, DragSource } from 'react-dnd';
import { skinnable, props, t, ReactChildren } from '../../../utils';
import FlexView from 'react-flexview';
import flowRight from 'lodash/flowRight';
import identity from 'lodash/identity';

const columnTarget = {
  canDrop({ isDropAllowed, name: target }, monitor) {
    const source = monitor.getItem().name;
    return isDropAllowed(source, target);
  },
  hover({ isDropAllowed, onDragHover, name: target, index: hoverIndex }, monitor, component) {

    const source = monitor.getItem().name;
    if (onDragHover && isDropAllowed(source, target)) {
      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      const dragIndex = monitor.getItem().index;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      onDragHover(source, target);
      monitor.getItem().index = hoverIndex;
    }
  },
  drop({ isDropAllowed, name: target, onDrop, canDrop }, monitor) {
    const source = monitor.getItem().name;
    if (onDrop && isDropAllowed(source, target)) {
      onDrop(source, target);
    }
  }
};

const collectTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

const columnSource = {
  beginDrag({ name, index }) {
    return { name, index };
  },
  isDragging({ name }, monitor) {
    return name === monitor.getItem().name;
  },
  canDrag({ isDragAllowed }) {
    return isDragAllowed;
  }
};

const collectSource = (connect, monitor) => {
  return ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  });
};

const columnType = ({ tabloUniqueId }) => `${tabloUniqueId}_column`;

@DragSource(columnType, columnSource, collectSource)
@DropTarget(columnType, columnTarget, collectTarget)
@skinnable()
@props({
  connectDragSource: t.Function,
  connectDragPreview: t.Function,
  isDragAllowed: t.Boolean,
  isDragging: t.Boolean,
  //
  connectDropTarget: t.Function,
  isOver: t.Boolean,
  canDrop: t.Boolean,
  onDrop: t.maybe(t.Function),
  onDragHover: t.maybe(t.Function),
  //
  name: t.String,
  index: t.Integer,
  isDropAllowed: t.Function,
  tabloUniqueId: t.String,
  children: ReactChildren
})
export default class DNDHeader extends React.PureComponent {

  getLocals({ connectDragSource, connectDropTarget, isDragAllowed, ...props }) {
    const dndWrapper = isDragAllowed ? flowRight(connectDropTarget, connectDragSource) : identity;
    return {
      dndWrapper,
      ...props
    };
  }

  template({ dndWrapper, isDragging, canDrop, isOver, children }) {
    return dndWrapper(
      <div className={cx('dndHeader', { isDragging, canDrop, isOver })}>
        <FlexView vAlignContent='center' width='100%' height='100%'>
          <FlexView grow height='100%' vAlignContent='center'>
            {children}
          </FlexView>
        </FlexView>
      </div>
    );
  }
}
