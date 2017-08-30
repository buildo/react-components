import * as React from 'react';
import * as ReactDOM from 'react-dom';
import cx from '../utils/classnames';
import debounce = require('lodash/debounce');
import uniq = require('lodash/uniq');
import { props, t, ReactChildren, getContextWrapper } from '../utils';

const NO_SIZE_WRAPPER = 'no-size-wrapper';

export const Props = {
  children: ReactChildren,
  popover: t.struct({
    content: ReactChildren,
    auto: t.maybe(t.Boolean),
    attachToBody: t.maybe(t.Boolean),
    position: t.maybe(t.enums.of(['top', 'bottom', 'left', 'right'])),
    anchor: t.maybe(t.enums.of(['start', 'center', 'end'])),
    event: t.maybe(t.enums.of(['click', 'hover'])),
    onShow: t.maybe(t.Function),
    onHide: t.maybe(t.Function),
    onToggle: t.maybe(t.Function),
    dismissOnScroll: t.maybe(t.Boolean),
    dismissOnClickOutside: t.maybe(t.Boolean),
    className: t.maybe(t.String),
    style: t.maybe(t.Object),
    id: t.maybe(t.String),
    maxWidth: t.maybe(t.union([t.Number, t.String])),
    distance: t.maybe(t.Number),
    offsetX: t.maybe(t.Number),
    offsetY: t.maybe(t.Number),
    isOpen: t.maybe(t.Boolean),
    delay: t.maybe(t.union([
      t.Integer,
      t.interface({ whenClosed: t.maybe(t.Integer), whenOpen: t.maybe(t.Integer) })
    ])),
    contextTypes: t.maybe(t.Object),
    context: t.maybe(t.Object)
  }),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

export namespace PopoverProps {

  export type Position = 'top' | 'bottom' | 'left' | 'right';
  export type Anchor = 'start' | 'center' | 'end';
  export type Event = 'click' | 'hover';

  export type Delay = number | { whenClosed?: number, whenOpen?: number };

  export type Popover = {
    content: React.ReactNode,
    attachToBody?: boolean,
    auto?: boolean,
    position?: Position,
    anchor?: Anchor,
    event?: Event,
    onShow?: () => void,
    onHide?: () => void,
    onToggle?: () => void,
    dismissOnScroll?: boolean,
    dismissOnClickOutside?: boolean,
    className?: string,
    style?: React.CSSProperties,
    id?: string,
    maxWidth?: number | string,
    distance?: number,
    offsetX?: number,
    offsetY?: number,
    isOpen?: boolean,
    delay?: Delay,
    contextTypes?: React.ValidationMap<any>,
    context?: object
  };

};
  
export type PopoverProps = {
  /** the trigger node. It's always visible */
  children: React.ReactNode,
  /** popover settings. The popover is **not** always visible */
  popover: PopoverProps.Popover,
  className?: string,
  style?: React.CSSProperties,
  id?: string
};

export type PopoverElement = {
  width: number,
  height: number,
  x: number,
  y: number
};

export type PopoverState = {
  isOpen: boolean,
  popover?: PopoverElement,
  child?: PopoverElement
};

type PopoverStyle = React.CSSProperties & {
  _computedAnchor?: PopoverProps.Anchor,
  _computedPosition?: PopoverProps.Position
};

/**
 * Composed of two children: trigger (children) and popover. After a particular event on the trigger
 * (usually "hover" or "click") it renders the popover and positions it relative to it.
 */
@props(Props)
export default class Popover extends React.Component<PopoverProps, PopoverState> {

  private initialized: boolean;
  private containerNode: Element | null;
  private popoverNode: Element | null;
  private onMouseEventDebouncedWhenOpen: ((_: string) => void) & _.Cancelable | null;
  private onMouseEventDebouncedWhenClosed: ((_: string) => void) & _.Cancelable | null;
  private ContextWrapper: React.ComponentType<{ context?: { [_: string]: any }, children: any }>;

  // LIFECYCLE

  state: PopoverState = { isOpen: false };

  componentDidMount() {
    this.ContextWrapper = getContextWrapper(this.getPopoverProps().contextTypes);
    this.updateDebouncedMousedEvents();
    this.saveValuesFromNodeTree();
    this.initialized = true;
    if (this.isOpen()) {
      this.onPopoverOpenChange(this.props);
    }
  }

  componentWillReceiveProps(nextProps: PopoverProps) {
    this.updateDebouncedMousedEvents(nextProps);
    this.saveValuesFromNodeTree();

    const isOpenChanged = this.getPopoverProps().isOpen !== this.getPopoverProps(nextProps).isOpen;

    if (!this.isStateful() && isOpenChanged) {
      this.onPopoverOpenChange(nextProps);
    }
  }

  componentDidUpdate() {
    if (this.containerNode) {
      const popover = this.getVisiblePopover();
      const { context } = this.getPopoverProps();
      const { ContextWrapper } = this;
      ReactDOM.render(<ContextWrapper context={context}>{popover}</ContextWrapper>, this.containerNode);
    }
  }

  componentWillUnmount() {
    this.removePopover();
    this.removeListeners();
    if (this.onMouseEventDebouncedWhenOpen) {
      this.onMouseEventDebouncedWhenOpen.cancel();
    }
    if (this.onMouseEventDebouncedWhenClosed) {
      this.onMouseEventDebouncedWhenClosed.cancel();
    }
  }

  // LISTENERS

  addOnClickListener = () => {
    if (this.getPopoverProps().dismissOnClickOutside) {
      window.addEventListener('click', this.onClickOutside, false);
    }
  };

  removeOnClickListener = () => {
    if (this.getPopoverProps().dismissOnClickOutside) {
      window.removeEventListener('click', this.onClickOutside, false);
    }
  };

  onClickOutside = (e: MouseEvent) => {
    const childrenNode = ReactDOM.findDOMNode(this.refs.children);
    const popoverNode = this.isAbsolute() ? this.containerNode : childrenNode.children[1];
    // It's safe to assume that the target is going to be a DOM Element
    // See also: https://stackoverflow.com/questions/28900077/why-is-event-target-not-element-in-typescript
    const el = (e.target || e.srcElement) as Element;
    if (!this.isEventInsideTarget(el, childrenNode) && (!popoverNode || !this.isEventInsideTarget(el, popoverNode))) {
      this.hidePopover();
    }
  };

  addOnScrollListener = () => {
    if (this.getPopoverProps().dismissOnScroll) {
      window.addEventListener('mousewheel', this.onScroll, false);
    }
  };

  removeOnScrollListener = () => {
    if (this.getPopoverProps().dismissOnScroll) {
      window.removeEventListener('mousewheel', this.onScroll, false);
    }
  };

  onScroll = () => this.hidePopover();

  addListeners = () => {
    this.addOnScrollListener();
    this.addOnClickListener();
  };

  removeListeners = () => {
    this.removeOnScrollListener();
    this.removeOnClickListener();
  };

  // UTILS

  // extend with default values
  getPopoverProps = (_props?: PopoverProps) => {
    const props = _props || this.props;
    return {
      position: 'top' as PopoverProps.Position,
      anchor: 'center' as PopoverProps.Anchor,
      event: 'hover' as PopoverProps.Event,
      onShow: () => {},
      onHide: () => {},
      onToggle: () => {},
      dismissOnClickOutside: true,
      dismissOnScroll: true,
      className: '',
      distance: 5,
      offsetX: 0,
      offsetY: 0,
      ...props.popover
    };
  };

  getPopoverNode = (): Element => {
    let popover: Element;
    if (this.isAbsolute()) {
      popover = this.popoverNode!;
    } else {
      const childrenNode = ReactDOM.findDOMNode(this.refs.children);
      popover = childrenNode.children[1];
    }
    return (popover && popover.id === NO_SIZE_WRAPPER) ? popover.children[0] : popover;
  };

  getOffsetRect = (target: Element) => {
    const box = target.getBoundingClientRect();

    const body = document.body;
    const docElem = document.documentElement;

    const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    const clientTop = docElem.clientTop || body.clientTop || 0;
    const clientLeft = docElem.clientLeft || body.clientLeft || 0;

    const top = Math.round(box.top + scrollTop - clientTop);
    const left = Math.round(box.left + scrollLeft - clientLeft);

    return { top, left };
  };

  saveValuesFromNodeTree = () => {
    const childrenNode = ReactDOM.findDOMNode(this.refs.children);
    const popoverNode = this.getPopoverNode();

    if (popoverNode) {
      const { clientWidth: childWidth, clientHeight: childHeight } = childrenNode;
      const { clientHeight: popoverHeight, clientWidth: popoverWidth } = popoverNode;
      const { top: childY, left: childX } = this.getOffsetRect(childrenNode);
      const { top: popoverY, left: popoverX } = this.getOffsetRect(popoverNode);

      this.setState({
        child: {
          width: childWidth,
          height: childHeight,
          x: childX,
          y: childY
        },
        popover: {
          width: popoverWidth,
          height: popoverHeight,
          x: popoverX,
          y: popoverY
        }
      });
    }
  };

  isStateful = (props?: PopoverProps) => typeof this.getPopoverProps(props).isOpen === 'undefined';

  isOpen = (props?: PopoverProps) => this.isStateful() ? this.state.isOpen : this.getPopoverProps(props).isOpen;

  isEventInsideTarget = (el: Node, target: Node): boolean => {
    if (!el) {
      return false;
    } else if (el === target) {
      return true;
    } else if (el.parentNode) {
      return this.isEventInsideTarget(el.parentNode, target);
    } else {
      return false;
    }
  };

  // VISIBILITY CHANGE

  appendPopover = () => {
    // create container node
    this.containerNode = document.createElement('div');
    document.body.appendChild(this.containerNode);

    // render invisible popover
    const hiddenPopover = this.getHiddenPopover();
    const { context } = this.getPopoverProps();
    const { ContextWrapper } = this;
    ReactDOM.render(<ContextWrapper context={context}>{hiddenPopover}</ContextWrapper>, this.containerNode);

    // add pointer to popover node
    this.popoverNode = this.containerNode.children[0];

    // save popover size (visible popover will be rendered in componentDidUpdate)
    this.saveValuesFromNodeTree();
  };

  removePopover = () => {
    if (this.containerNode) {
      document.body.removeChild(this.containerNode);
      this.containerNode = null;
    }
  };

  onPopoverOpenChange = (props?: PopoverProps) => {
    if (this.isOpen(props)) {
      if (this.isAbsolute()) {
        this.appendPopover();
      }
      this.addListeners();
    } else {
      if (this.isAbsolute()) {
        this.removePopover();
      }
      this.removeListeners();
    }
  };

  onPopoverStateChange = () => {
    const { onShow, onHide, onToggle } = this.getPopoverProps();
    if (this.state.isOpen) {
      onShow();
    } else {
      onHide();
    }
    onToggle();
    this.onPopoverOpenChange();
  };

  eventWrapper = <E extends React.SyntheticEvent<HTMLElement>>(cb: (e: E) => void) => (e: E) => {
    const { event } = this.getPopoverProps();
    const childrenNode = ReactDOM.findDOMNode(this.refs.children).children[0];
    // It's safe to assume that the target is going to be a DOM Element
    // See also: https://stackoverflow.com/questions/28900077/why-is-event-target-not-element-in-typescript
    const el = e.target as Element;
    if (this.isAbsolute() || (event === 'hover') || this.isEventInsideTarget(el, childrenNode)) {
      cb(e);
    }
  };

  getDelayWhenClosed = (delay?: PopoverProps.Delay) => (typeof delay === 'number') ? delay : (delay || {}).whenClosed;

  getDelayWhenOpen = (delay?: PopoverProps.Delay) => (typeof delay === 'number') ? delay : (delay || {}).whenOpen;

  updateDebouncedMousedEvents = (nextProps?: PopoverProps) => {
    const { delay } = this.getPopoverProps(nextProps);
    const delayWhenClosed = this.getDelayWhenClosed(delay);
    const delayWhenOpen = this.getDelayWhenOpen(delay);

    const { delay: previousDelay } = this.getPopoverProps();
    const previousDelayWhenClosed = this.getDelayWhenClosed(previousDelay);
    const previousDelayWhenOpen = this.getDelayWhenOpen(previousDelay);

    if (!nextProps || previousDelayWhenClosed !== delayWhenClosed) {
      this.onMouseEventDebouncedWhenClosed = delayWhenClosed ? debounce(this._onMouseEvent, delayWhenClosed) : null;
    }

    if (!nextProps || previousDelayWhenOpen !== delayWhenOpen) {
      this.onMouseEventDebouncedWhenOpen = delayWhenOpen ? debounce(this._onMouseEvent, delayWhenOpen) : null;
    }
  };

  _onMouseEvent = (type: string) => {
    if (type === 'mouseenter') {
      this.showPopover();
    } else if (type === 'mouseleave') {
      this.hidePopover();
    }
  };

  onMouseEvent: React.MouseEventHandler<any> = ({ type }) => {
    const { delay } = this.getPopoverProps();
    const delayWhenClosed = this.getDelayWhenClosed(delay);
    const delayWhenOpen = this.getDelayWhenOpen(delay);

    if (this.isOpen()) {
      return delayWhenOpen ? this.onMouseEventDebouncedWhenOpen && this.onMouseEventDebouncedWhenOpen(type) : this._onMouseEvent(type);
    } else {
      return delayWhenClosed ? this.onMouseEventDebouncedWhenClosed && this.onMouseEventDebouncedWhenClosed(type) : this._onMouseEvent(type);
    }
  };

  showPopover = () => this.setIsOpen(true);

  hidePopover = () => this.setIsOpen(false);

  togglePopover = () => this.setIsOpen(!this.isOpen());

  setIsOpen = (isOpen: boolean) => {
    if (this.isStateful()) {
      this.setState({ isOpen }, this.onPopoverStateChange);
    } else {
      const { onShow, onHide, onToggle } = this.getPopoverProps();
      const cb = isOpen ? onShow : onHide;
      cb();
      onToggle();
    }
  };

  // LOCALES

  popoverTemplate = ({ _computedAnchor, _computedPosition, ..._style }: PopoverStyle) => {
    const { position: _position, className, anchor: _anchor, content, id, event, style } = this.getPopoverProps();
    const anchor = _computedAnchor || _anchor;
    const position = _computedPosition || _position;
    const { eventWrapper, onMouseEvent, isAbsolute } = this;
    const positionClass = `position-${position}`;
    const anchorClass = `anchor-${anchor}`;
    const _className = `popover-content ${positionClass} ${anchorClass} ${className}`;
    const events = !isAbsolute() && event === 'hover' ? { onMouseEnter: eventWrapper(onMouseEvent) } : undefined;
    return (
      <div className={_className} id={id} style={{ ...style, ..._style }} {...events}>
        {content}
      </div>
    );
  };

  getVisiblePopover = () => {
    const popover = this.state.popover!;
    const popoverProps = this.getPopoverProps();

    if (popoverProps.auto) {
      // give priority to the position passed by the user as _.uniq should maintain the order
      const positions = uniq<PopoverProps.Position>([popoverProps.position, 'top', 'bottom', 'left', 'right']);

      const popoverStyle: PopoverStyle | null = positions.reduce((acc, p) => {
        if (acc === null) {
          // give priority to the couple position/anchor passed by the user as _.uniq should maintain the order
          const anchors = uniq(
            (p === popoverProps.position ? [popoverProps.anchor] : []).concat(['center', 'start', 'end'])
          );

          return anchors.reduce((workingPopoverStyle, a) => {
            if (workingPopoverStyle === null) {
              const _popoverStyle = this.computePopoverStyle(p, a);

              // not enough space
              if (
                _popoverStyle.top < 0 || _popoverStyle.top + popover.height > window.innerHeight ||
                _popoverStyle.left < 0 || _popoverStyle.left + popover.width > window.innerWidth
              ) {
                return null;
              }

              return {
                ..._popoverStyle,
                _computedPosition: p,
                _computedAnchor: a
              };
            }

            return workingPopoverStyle;
          }, null);
        }
        return acc;
      }, null);

      return this.popoverTemplate(popoverStyle || this.computePopoverStyle(popoverProps.position, popoverProps.anchor));
    }

    return this.popoverTemplate(this.computePopoverStyle(popoverProps.position, popoverProps.anchor));
  }

  getHiddenPopover = () => {
    const style: React.CSSProperties = { width: '100%', height: '100%', top: 0, left: 0, position: 'absolute', overflow: 'hidden', pointerEvents: 'none' };
    return (
      <div id={NO_SIZE_WRAPPER} style={style}>
        {this.popoverTemplate({ position: 'absolute', visibility: 'hidden' })}
      </div>
    );
  };

  isAbsolute = () => this.getPopoverProps().attachToBody === true;

  getEventCallbacks = () => {
    const { event } = this.getPopoverProps();
    const onHover = event === 'hover';
    const onClick = event === 'click';
    const { eventWrapper, onMouseEvent, togglePopover } = this;
    return {
      onMouseEnter: onHover ? eventWrapper(onMouseEvent) : undefined,
      onMouseLeave: onHover ? eventWrapper(onMouseEvent) : undefined,
      onClick: onClick ? eventWrapper(togglePopover) : undefined
    };
  };

  computePopoverStyle = (position: PopoverProps.Position, anchor: PopoverProps.Anchor): PopoverStyle => {
    const child = this.state.child!;
    const popover = this.state.popover!;
    const { maxWidth, offsetX, offsetY, distance } = this.getPopoverProps();

    const isAbsolute = this.isAbsolute();
    const isHorizontal = position === 'top' || position === 'bottom';
    const isVertical = position === 'right' || position === 'left';

    const anchorOffset = { top: 0, left: 0 };
    const positionOffset = { top: 0, left: 0 };

    switch (position) {
      case 'top':
        positionOffset.top = -(popover.height + distance);
        break;
      case 'bottom':
        positionOffset.top = child.height + distance;
        break;
      case 'left':
        positionOffset.left = -(popover.width + distance);
        break;
      case 'right':
        positionOffset.left = child.width + distance;
        break;
    }

    switch (anchor) {
      case 'start':
        // default -> { top: 0, left: 0 }
        break;
      case 'center':
        anchorOffset.left = isHorizontal ? (child.width - popover.width) / 2 : 0;
        anchorOffset.top = isVertical ? (child.height - popover.height) / 2 : 0;
        break;
      case 'end':
        anchorOffset.left = isHorizontal ? (child.width - popover.width) : 0;
        anchorOffset.top = isVertical ? (child.height - popover.height) : 0;
        break;
    }

    return {
      position: 'absolute',
      top: (isAbsolute ? child.y : 0) + (positionOffset.top + anchorOffset.top + offsetY),
      left: (isAbsolute ? child.x : 0) + (positionOffset.left + anchorOffset.left + offsetX),
      maxWidth
    };
  };

  getLocals() {
    const isRelative = !this.isAbsolute();
    const isOpen = this.isOpen();
    const popover = isRelative && (this.initialized && isOpen ? this.getVisiblePopover() : this.getHiddenPopover());
    const style: React.CSSProperties = {
      display: 'inline-block',
      position: isRelative ? 'relative' : undefined,
      ...this.props.style
    };
    return {
      ...this.props,
      style,
      className: cx('react-popover', this.props.className, { 'is-open': isOpen, 'is-closed': !isOpen }),
      eventCallbacks: this.getEventCallbacks(),
      popover
    };
  }

  // RENDER

  render() {
    const { children, style, className, id, eventCallbacks, popover } = this.getLocals();
    return (
      <div {...{ id, className, style }} {...eventCallbacks} ref='children'>
        {children}
        {popover}
      </div>
    );
  }
}
