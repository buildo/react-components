import React from 'react';
import cx from 'classnames';

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

  getDefaultProps() {
    return {
      id: '',
      className: '',
      style: {}
    };
  },

  getInitialState() {
    return {
      isOpen: false
    };
  },

  componentDidMount() {
    this.saveValuesFromNodeTree();
  },

  componentWillReceiveProps(nextProps) {
    this.saveValuesFromNodeTree();
    if (!this.isStatefull() && this.isAbsolute() && this.getPopoverProps().isOpen !== this.getPopoverProps(nextProps).isOpen) {
      this.onPopoverOpenChange(nextProps);
    }
  },

  componentWillUnmount() {
    this.removePopover();
    this.removeListeners();
  },

  // LISTENERS

  addOnClickListener() {
    if (this.getPopoverProps().dismissOnClickOutside) {
      window.addEventListener('click', this.onClickOutside, false);
    }
  },

  removeOnClickListener() {
    if (this.getPopoverProps().dismissOnScroll) {
      window.removeEventListener('click', this.onClickOutside, false);
    }
  },

  onClickOutside(e) {
    const { child, popover } = this.state;
    if (!this.isEventInsideTarget(child, e) && !this.isEventInsideTarget(popover, e)) {
      this.hidePopover();
    }
  },

  addOnScrollListener() {
    if (this.getPopoverProps().dismissOnScroll) {
      window.addEventListener('mousewheel', this.onScroll, false);
    }
  },

  removeOnScrollListener() {
    if (this.getPopoverProps().dismissOnScroll) {
      window.removeEventListener('mousewheel', this.onScroll, false);
    }
  },

  onScroll() {
    this.hidePopover();
  },

  addListeners() {
    this.addOnScrollListener();
    this.addOnClickListener();
  },

  removeListeners() {
    this.removeOnScrollListener();
    this.removeOnClickListener();
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
      dismissOnScroll: true,
      className: '',
      distance: 5,
      offsetX: 0,
      offsetY: 0,
      ...props.popover
    };
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
    const popoverNode = this.isAbsolute() ? this.popoverNode : childrenNode.childNodes[1];

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

  isStatefull(props) {
    return typeof this.getPopoverProps(props).isOpen === 'undefined';
  },

  isOpen(props) {
    return this.isStatefull() ? this.state.isOpen : this.getPopoverProps(props).isOpen;
  },

  isEventInsideTarget(target, e) {
    const { pageX: x, pageY: y } = e;
    return (x >= target.x && x <= target.x + target.width && y >= target.y && y <= target.y + target.height);
  },

  // VISIBILITY CHANGE

  appendPopover() {
    const hiddenPopover = this.getHiddenPopover();
    this.containerNode = document.createElement('div');
    this.containerNode.innerHTML = React.renderToString(hiddenPopover);
    this.popoverNode = this.containerNode.childNodes[0];
    document.body.appendChild(this.containerNode);

    this.saveValuesFromNodeTree(() => {
      const popover = this.getVisiblePopover();
      this.containerNode.innerHTML = React.renderToString(popover);
    });
  },

  removePopover() {
    if (this.containerNode) {
      document.body.removeChild(this.containerNode);
      this.containerNode = null;
    }
  },

  onPopoverOpenChange(props) {
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
  },

  onPopoverStateChange() {
    const { onShow, onHide } = this.getPopoverProps();
    if (this.state.isOpen) {
      onShow();
    } else {
      onHide();
    }
    this.onPopoverOpenChange();
  },

  eventWrapper(cb) {
    return (e) => {
      const { event } = this.getPopoverProps();
      if (this.isAbsolute() || event === 'hover' || this.isEventInsideTarget(this.state.child, e)) {
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
    if (this.isStatefull()) {
      this.setState({ isOpen }, this.onPopoverStateChange);
    } else {
      const { onShow, onHide } = this.getPopoverProps();
      const cb = isOpen ? onShow : onHide;
      cb();
    }
  },

  // LOCALES

  popoverTemplate(style) {
    const { position, anchor, className, content, id } = this.getPopoverProps();
    const positionClass = `position-${position}`;
    const anchorClass = `anchor-${anchor}`;
    const _className = `popover-content ${positionClass} ${anchorClass} ${className}`;
    return (
      <div className={_className} id={id} style={style}>
        {content}
      </div>
    );
  },

  getVisiblePopover() {
    return this.popoverTemplate(this.computePopoverStyle());
  },

  getHiddenPopover() {
    return this.popoverTemplate({ position: 'absolute', visibility: 'hidden' });
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
    const popover = isRelative && (this.isOpen() ? this.getVisiblePopover() : this.getHiddenPopover());
    return {
      ...this.props,
      style: {
        display: 'inline-block',
        position: isRelative ? 'relative' : undefined,
        ...this.props.style
      },
      className: cx('react-popover', this.props.className),
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
