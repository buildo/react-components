import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import { props, t, getContextWrapper } from '../utils';

const NO_SIZE_WRAPPER = 'no-size-wrapper';

export const Props = {
  children: t.ReactChildren,
  popover: t.struct({
    content: t.ReactChildren,
    attachToBody: t.maybe(t.Boolean),
    position: t.maybe(t.enums.of(['top', 'bottom', 'left', 'right'])),
    anchor: t.maybe(t.enums.of(['start', 'center', 'end', 'auto'])),
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


/**
 * Composed of two children: trigger (children) and popover. After a particular event on the trigger (usually "hover" or "click") it renders the popover and positions it relative to it.
 * @param children - the trigger node. It's always visible
 * @param popover - popover settings. The popover is **not** always visible
 */
@props(Props)
export default class Popover extends React.Component {

  // LIFECYCLE

  state = { isOpen: false };

  componentDidMount() {
    this.updateDebouncedMousedEvents();
    this.saveValuesFromNodeTree();
    this.initialized = true;
    if (this.isOpen()) {
      this.onPopoverOpenChange(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateDebouncedMousedEvents(nextProps);
    this.saveValuesFromNodeTree();
    if (!this.isStateful() && this.getPopoverProps().isOpen !== this.getPopoverProps(nextProps).isOpen) {
      this.onPopoverOpenChange(nextProps);
    }
  }

  componentDidUpdate() {
    if (this.containerNode) {
      const popover = this.getVisiblePopover();
      const { contextTypes, context } = this.getPopoverProps();
      const ContextWrapper = getContextWrapper(contextTypes);
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

  onClickOutside = (e) => {
    const childrenNode = ReactDOM.findDOMNode(this.refs.children);
    const popoverNode = this.isAbsolute() ? this.containerNode : childrenNode.childNodes[1];
    const el = e.target || e.srcElement;
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
  getPopoverProps = (_props) => {
    const props = _props || this.props;
    return {
      type: 'relative',
      position: 'top',
      anchor: 'center',
      event: 'hover',
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

  getPopoverNode = () => {
    let popover;
    if (this.isAbsolute()) {
      popover = this.popoverNode;
    } else {
      const childrenNode = ReactDOM.findDOMNode(this.refs.children);
      popover = childrenNode.childNodes[1];
    }
    return (popover && popover.id === NO_SIZE_WRAPPER) ? popover.childNodes[0] : popover;
  };

  getOffsetRect = (target) => {
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

  saveValuesFromNodeTree = (cb) => {
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
      }, cb);
    }
  };

  isStateful = (props) => typeof this.getPopoverProps(props).isOpen === 'undefined';

  isOpen = (props) => this.isStateful() ? this.state.isOpen : this.getPopoverProps(props).isOpen;

  isEventInsideTarget = (el, target) => {
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
    const { contextTypes, context } = this.getPopoverProps();
    const ContextWrapper = getContextWrapper(contextTypes);
    ReactDOM.render(<ContextWrapper context={context}>{hiddenPopover}</ContextWrapper>, this.containerNode);

    // add pointer to popover node
    this.popoverNode = this.containerNode.childNodes[0];

    // save popover size (visible popover will be rendered in componentDidUpdate)
    this.saveValuesFromNodeTree();
  };

  removePopover = () => {
    if (this.containerNode) {
      document.body.removeChild(this.containerNode);
      this.containerNode = null;
    }
  };

  onPopoverOpenChange = (props) => {
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


  eventWrapper = cb => e => {
    const { event } = this.getPopoverProps();
    const childrenNode = ReactDOM.findDOMNode(this.refs.children).childNodes[0];
    const el = e.target || e.srcElement;
    if (this.isAbsolute() || (event === 'hover') || this.isEventInsideTarget(el, childrenNode)) {
      cb(e);
    }
  };

  getDelayWhenClosed = delay => (delay || {}).whenClosed || delay;

  getDelayWhenOpen = delay => (delay || {}).whenOpen || delay;

  updateDebouncedMousedEvents = (nextProps) => {
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

  _onMouseEvent = (type) => {
    if (type === 'mouseenter') {
      this.showPopover();
    } else if (type === 'mouseleave') {
      this.hidePopover();
    }
  };

  onMouseEvent = ({ type }) => {
    const { delay } = this.getPopoverProps();
    const delayWhenClosed = this.getDelayWhenClosed(delay);
    const delayWhenOpen = this.getDelayWhenOpen(delay);

    if (this.isOpen()) {
      return delayWhenOpen ? this.onMouseEventDebouncedWhenOpen(type) : this._onMouseEvent(type);
    } else {
      return delayWhenClosed ? this.onMouseEventDebouncedWhenClosed(type) : this._onMouseEvent(type);
    }
  };

  showPopover = () => this.setIsOpen(true);

  hidePopover = () => this.setIsOpen(false);

  togglePopover = () => this.setIsOpen(!this.isOpen());

  setIsOpen = (isOpen) => {
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

  popoverTemplate = ({ _realAnchor, ..._style }) => {
    const { position, className, content, id, event, style } = this.getPopoverProps();
    const { eventWrapper, onMouseEvent, isAbsolute } = this;
    const positionClass = `position-${position}`;
    const anchorClass = `anchor-${_realAnchor}`;
    const _className = `popover-content ${positionClass} ${anchorClass} ${className}`;
    const events = !isAbsolute() && event === 'hover' ? { onMouseEnter: eventWrapper(onMouseEvent) } : undefined;
    return (
      <div className={_className} id={id} style={{ ...style, ..._style }} {...events}>
        {content}
      </div>
    );
  };

  getVisiblePopover = () => this.popoverTemplate(this.computePopoverStyle());

  getHiddenPopover = () => {
    const style = { width: '100%', height: '100%', top: 0, left: 0, position: 'absolute', overflow: 'hidden', pointerEvents: 'none' };
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

  computePopoverStyle = () => {
    const { child, popover } = this.state;
    const { anchor, position, maxWidth, offsetX, offsetY, distance } = this.getPopoverProps();

    const isAbsolute = this.isAbsolute();
    const isHorizontal = position === 'top' || position === 'bottom';
    const isVertical = position === 'right' || position === 'left';

    const anchorOffset = { top: 0, left: 0 };
    const positionOffset = { top: 0, left: 0 };
    let _realAnchor = anchor;

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
      case 'auto':
        _realAnchor = 'center';
        if (isHorizontal) {
          const scrollX = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0);
          // center the popover horizontally as first step
          anchorOffset.left = (child.width - popover.width) / 2;

          // check its x boundary doesn't overflow on right
          const popoverXBoundary = child.x + anchorOffset.left + popover.width + distance;
          if (popoverXBoundary > (window.innerWidth + scrollX)) {
            anchorOffset.left = child.width - popover.width;
            _realAnchor = 'end';
          }

          // check it doesn't overflow on left
          const leftAvailableSpace = child.x - scrollX + (child.width / 2);
          if ((popover.width / 2) > leftAvailableSpace) {
            _realAnchor = 'start';
            anchorOffset.left = 0;
          }
        }

        if (isVertical) {
          const scrollY = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0);
          // center the popover vertically as first step
          anchorOffset.top = (child.height - popover.height) / 2 ;

          // check its y boundary doesn't overflow on bottom
          const popoverYBoundary = child.y + anchorOffset.top + popover.height + distance;
          if (popoverYBoundary > (window.innerHeight + scrollY)) {
            anchorOffset.top = child.height - popover.height;
            _realAnchor = 'end';
          }

          // check it doesn't overflow on top
          const topAvailableSpace = child.y - scrollY + (child.height / 2);
          if ((popover.height / 2) > topAvailableSpace) {
            _realAnchor = 'start';
            anchorOffset.top = 0;
          }
        }
        break;
    }

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

    return {
      position: 'absolute',
      top: (isAbsolute ? child.y : 0) + (positionOffset.top + anchorOffset.top + offsetY),
      left: (isAbsolute ? child.x : 0) + (positionOffset.left + anchorOffset.left + offsetX),
      maxWidth,
      _realAnchor
    };
  };

  getLocals() {
    const isRelative = !this.isAbsolute();
    const isOpen = this.isOpen();
    const popover = isRelative && (this.initialized && isOpen ? this.getVisiblePopover() : this.getHiddenPopover());
    return {
      ...this.props,
      style: {
        display: 'inline-block',
        position: isRelative ? 'relative' : undefined,
        ...this.props.style
      },
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
