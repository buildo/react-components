import * as React from "react";
import * as cx from "classnames";
import {
  DropTarget,
  DragSource,
  DropTargetSpec,
  DropTargetCollector,
  DragSourceSpec,
  DragSourceCollector
} from "react-dnd";
import { Children } from "../../../utils";
import FlexView from "react-flexview";
import { findDOMNode } from "../../../utils";

export namespace DNDHeader {
  export type Props = {
    onDragHover?: (source: string, target: string) => void;
    index: number;
    name: string;
    isDragAllowed: boolean;
    isDropAllowed: (source: string, target: string) => boolean;
    tabloUniqueId: string;
    children: Children;
  };
}

export type DNDHeaderIntrinsicProps = DNDHeader.Props & {
  connectDragSource: __ReactDnd.ConnectDragSource;
  connectDragPreview: __ReactDnd.ConnectDragPreview;
  connectDropTarget: __ReactDnd.ConnectDropTarget;
  isDragging: boolean;
  isOver: boolean;
  canDrop: boolean;
  onDrop?: (source: string, target: string) => void;
};

type DNDMonitorItem = {
  name: string;
  index: number;
};

const columnTarget: DropTargetSpec<DNDHeaderIntrinsicProps> = {
  canDrop({ isDropAllowed, name: target }, monitor) {
    if (monitor) {
      const source = (monitor.getItem() as DNDMonitorItem).name;
      return isDropAllowed(source, target);
    } else {
      return false;
    }
  },
  hover(
    { isDropAllowed, onDragHover, name: target, index: hoverIndex },
    monitor,
    component
  ) {
    if (monitor && component) {
      const item = monitor.getItem() as DNDMonitorItem;
      const source = item.name;
      if (onDragHover && isDropAllowed(source, target)) {
        const hoverBoundingRect = findDOMNode(
          component
        ).getBoundingClientRect();
        const hoverMiddleX =
          (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;
        const dragIndex = item.index;

        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
          return;
        }
        onDragHover(source, target);
        item.index = hoverIndex;
      }
    }
  },
  drop({ isDropAllowed, name: target, onDrop }, monitor) {
    if (monitor) {
      const source = (monitor.getItem() as DNDMonitorItem).name;
      if (onDrop && isDropAllowed(source, target)) {
        onDrop(source, target);
      }
    }
  }
};

const collectTarget: DropTargetCollector = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

const columnSource: DragSourceSpec<DNDHeaderIntrinsicProps> = {
  beginDrag({ name, index }) {
    return { name, index };
  },
  isDragging({ name }, monitor) {
    if (!monitor) return false;
    return name === (monitor.getItem() as DNDMonitorItem).name;
  },
  canDrag({ isDragAllowed }) {
    return isDragAllowed;
  }
};

const collectSource: DragSourceCollector = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
};

const columnType = ({ tabloUniqueId }: DNDHeader.Props) =>
  `${tabloUniqueId}_column`;

@(DragSource(columnType, columnSource, collectSource) as any)
@(DropTarget(columnType, columnTarget, collectTarget) as any)
export default class DNDHeader extends React.PureComponent<DNDHeader.Props> {
  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragAllowed,
      isDragging,
      canDrop,
      isOver,
      children
    } = this.props as DNDHeaderIntrinsicProps;

    const header = (
      <div className={cx("dndHeader", { isDragging, canDrop, isOver })}>
        <FlexView vAlignContent="center" width="100%" height="100%">
          <FlexView grow height="100%" vAlignContent="center">
            {children}
          </FlexView>
        </FlexView>
      </div>
    );

    return isDragAllowed
      ? connectDropTarget(connectDragSource(header))
      : (header as any);
  }
}
