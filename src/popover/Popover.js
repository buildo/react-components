import React from 'react';
import BackgroundDimmer from '../background-dimmer';
import cx from 'classnames';

const NO_SIZE_WRAPPER = 'no-size-wrapper';

const Popover = React.createClass({

  propTypes: {
    children: React.PropTypes.node.isRequired,
    popover: React.PropTypes.shape({
      content: React.PropTypes.node.isRequired,
      attachToBody: React.PropTypes.bool,
      position: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
      anchor: React.PropTypes.oneOf(['start', 'center', 'end']),
      event: React.PropTypes.oneOf(['click', 'hover']),
      onShow: React.PropTypes.func,
      onHide: React.PropTypes.func,
      onToggle: React.PropTypes.func,
      dismissOnScroll: React.PropTypes.bool,
      dismissOnClickOutside: React.PropTypes.bool,
      className: React.PropTypes.string,
      id: React.PropTypes.string,
      maxWidth: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ]),
      distance: React.PropTypes.number,
      offsetX: React.PropTypes.number,
      offsetY: React.PropTypes.number,
      isOpen: React.PropTypes.bool
    }).isRequired,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  // LIFECYCLE

  getInitialState() {
    return { isOpen: false };
  },

  componentDidMount() {
    this.saveValuesFromNodeTree();
    this.initialized = true;
    if (this.isOpen()) {
      this.forceUpdate();
    }
  },

  componentWillReceiveProps(nextProps) {
    this.saveValuesFromNodeTree();
    if (!this.isStateful() && this.getPopoverProps().isOpen !== this.getPopoverProps(nextProps).isOpen) {
      this.onPopoverOpenChange(nextProps);
    }
  },

  componentWillUnmount() {
    this.removePopover();
  },

  // UTILS

  // extend with default values
  getPopoverProps(props) {
    props = props || this.props;
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
  },

  getPopoverNode() {
    let popover;
    if (this.isAbsolute()) {
      popover = this.popoverNode;
    } else {
      const childrenNode = this.refs.children.getDOMNode();
      popover = childrenNode.childNodes[1];
    }
    return (popover && popover.id === NO_SIZE_WRAPPER) ? popover.childNodes[0] : popover;
  },

  getOffsetRect(target) {
    target = this.refs.children.getDOMNode();
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
  },

  saveValuesFromNodeTree(cb) {
    const childrenNode = this.refs.children.getDOMNode();
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
  },

  isStateful(props) {
    return typeof this.getPopoverProps(props).isOpen === 'undefined';
  },

  isOpen(props) {
    return this.isStateful() ? this.state.isOpen : this.getPopoverProps(props).isOpen;
  },

  isEventInsideTarget(el, target) {
    if (!el) {
      return false;
    } else if (el === target) {
      return true;
    } else if (el.parentNode) {
      return this.isEventInsideTarget(el.parentNode, target);
    } else {
      return false;
    }
  },

  // VISIBILITY CHANGE

  appendPopover() {
    this.containerNode = document.createElement('div');
    React.render(this.getHiddenPopover(), this.containerNode);
    this.popoverNode = this.containerNode.childNodes[0];
    document.body.appendChild(this.containerNode);

    this.saveValuesFromNodeTree(() => {
      React.render(this.getVisiblePopover(), this.containerNode);
    });
  },

  removePopover() {
    if (this.containerNode) {
      document.body.removeChild(this.containerNode);
      this.containerNode = null;
    }
  },

  onPopoverOpenChange(props) {
    if (this.isAbsolute() && this.isOpen(props)) {
      this.appendPopover();
    } else if (this.isAbsolute()) {
      this.removePopover();
    }
  },

  onPopoverStateChange() {
    const { onShow, onHide, onToggle } = this.getPopoverProps();
    if (this.state.isOpen) {
      onShow();
    } else {
      onHide();
    }
    onToggle();
    this.onPopoverOpenChange();
  },

  eventWrapper(cb) {
    return (e) => {
      const { event } = this.getPopoverProps();
      const childrenNode = this.refs.children.getDOMNode().childNodes[0];
      const el = e.target || e.srcElement;
      if (this.isAbsolute() || (event === 'hover') || this.isEventInsideTarget(el, childrenNode)) {
        cb();
      }
    };
  },

  showPopover() {
    this.setIsOpen(true);
  },

  hidePopover() {
    this.setIsOpen(false);
  },

  togglePopover() {
    this.setIsOpen(!this.isOpen());
  },

  setIsOpen(isOpen) {
    if (this.isStateful()) {
      this.setState({ isOpen }, this.onPopoverStateChange);
    } else {
      const { onShow, onHide, onToggle } = this.getPopoverProps();
      const cb = isOpen ? onShow : onHide;
      cb();
      onToggle();
    }
  },

  // LOCALES

  popoverTemplate(style) {
    const { position, anchor, className: propsClassName, content, id, event, dismissOnScroll, dismissOnClickOutside } = this.getPopoverProps();
    const { eventWrapper, hidePopover, isAbsolute } = this;

    const positionClass = `position-${position}`;
    const anchorClass = `anchor-${anchor}`;
    const className = `popover-content ${positionClass} ${anchorClass} ${propsClassName}`;

    const events = !isAbsolute() && event === 'hover' ? { onMouseEnter: eventWrapper(hidePopover) } : undefined;
    const backgroundDimmerProps = {
      alpha: 0,
      onScrollOutside: dismissOnScroll ? this.hidePopover : undefined,
      onClickOutside: dismissOnClickOutside ? this.hidePopover : undefined
    };
    const component = event === 'hover' ? 'div' : BackgroundDimmer;

    return React.createElement(
      component,
      { className, id, style, ...backgroundDimmerProps, ...events },
      content
    );
  },

  getVisiblePopover() {
    return this.popoverTemplate(this.computePopoverStyle());
  },

  getHiddenPopover() {
    return (
      <div id={NO_SIZE_WRAPPER} style={{ width: 0, height: 0, position: 'absolute', overflow: 'hidden' }}>
        {this.popoverTemplate({ position: 'absolute', visibility: 'hidden' })}
      </div>
    );
  },

  isAbsolute() {
    return this.getPopoverProps().attachToBody === true;
  },

  getEventCallbacks() {
    const { event } = this.getPopoverProps();
    const onHover = event === 'hover';
    const onClick = event === 'click';
    const { eventWrapper, showPopover, hidePopover, togglePopover } = this;
    return {
      onMouseEnter: onHover ? eventWrapper(showPopover) : undefined,
      onMouseLeave: onHover ? eventWrapper(hidePopover) : undefined,
      onClick: onClick ? eventWrapper(togglePopover) : undefined
    };
  },

  computePopoverStyle() {
    const { child, popover } = this.state;
    const { anchor, position, maxWidth, offsetX, offsetY, distance } = this.getPopoverProps();

    const isAbsolute = this.isAbsolute();
    const isHorizontal = position === 'top' || position === 'bottom';
    const isVertical = position === 'right' || position === 'left';

    const anchorOffset = { top: 0, left: 0 };
    const positionOffset = { top: 0, left: 0 };

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
      maxWidth
    };
  },

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
  },

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

});

export default Popover;
