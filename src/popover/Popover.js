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

  saveValuesFromNodeTree(cb) {
    const childrenNode = this.refs.children.getDOMNode();
    const popoverNode = this.isAbsolute() ? this.popoverNode : childrenNode.childNodes[1];

    if (popoverNode) {
      const { clientWidth: childWidth, clientHeight: childHeight } = childrenNode;
      const { clientHeight: popoverHeight, clientWidth: popoverWidth } = popoverNode;
      const { top: offsetTop, left: offsetLeft } = this.getOffsetRect();
      this.setState({
        childWidth,
        childHeight,
        popoverWidth,
        popoverHeight,
        offsetTop,
        offsetLeft
      }, cb);
    }
  },

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

  componentWillUnmount() {
    this.removePopover();
    this.removeOnScrollListener();
  },

  getOffsetRect() {
    const target = this.refs.children.getDOMNode();
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

  addOnScrollListener() {
    if (this.getPopoverProps().dismissOnScroll) {
      if (window.attachEvent) {
        //Internet Explorer
        window.attachEvent('onmousewheel', this.onScroll);
      } else if(window.addEventListener) {
        window.addEventListener('mousewheel', this.onScroll, false);
      }
    }
  },

  removeOnScrollListener() {
    if (this.getPopoverProps().dismissOnScroll) {
      if (window.detachEvent) {
        //Internet Explorer
        window.detachEvent('onmousewheel', this.onScroll);
      } else if(window.removeEventListener) {
        window.removeEventListener('mousewheel', this.onScroll, false);
      }
    }
  },

  isStatefull(props) {
    return typeof this.getPopoverProps(props).isOpen === 'undefined';
  },

  isOpen(props) {
    return this.isStatefull() ? this.state.isOpen : this.getPopoverProps(props).isOpen;
  },

  onPopoverOpenChange(props) {
    if (this.isOpen(props)) {
      if (this.isAbsolute()) {
        this.appendPopover();
      }
      this.addOnScrollListener();
    } else {
      if (this.isAbsolute()) {
        this.removePopover();
      }
      this.removeOnScrollListener();
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
    console.log(isOpen);
    if (this.isStatefull()) {
      this.setState({ isOpen }, this.onPopoverStateChange);
    } else {
      const { onShow, onHide } = this.getPopoverProps();
      const cb = isOpen ? onShow : onHide;
      cb();
    }
  },

  onScroll() {
    this.hidePopover();
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

  isAbsolute() {
    return this.getPopoverProps().attachToBody === true;
  },

  computePopoverStyle() {
    const {
      childWidth,
      childHeight,
      popoverWidth,
      popoverHeight,
      offsetTop,
      offsetLeft
    } = this.state;
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
        anchorOffset.left = isHorizontal ? (childWidth - popoverWidth) / 2 : 0;
        anchorOffset.top = isVertical ? (childHeight - popoverHeight) / 2 : 0;
        break;
      case 'end':
        anchorOffset.left = isHorizontal ? (childWidth - popoverWidth) : 0;
        anchorOffset.top = isVertical ? (childHeight - popoverHeight) : 0;
        break;
    }

    switch (position) {
      case 'top':
        positionOffset.top = -(popoverHeight + distance);
        break;
      case 'bottom':
        positionOffset.top = childHeight + distance;
        break;
      case 'left':
        positionOffset.left = -(popoverWidth + distance);
        break;
      case 'right':
        positionOffset.left = childWidth + distance;
        break;
    }

    return {
      position: 'absolute',
      top: (isAbsolute ? offsetTop : 0) + (positionOffset.top + anchorOffset.top + offsetY),
      left: (isAbsolute ? offsetLeft : 0) + (positionOffset.left + anchorOffset.left + offsetX),
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

  render() {
    const { children, style, className, id, eventCallbacks, popover } = this.getLocals();
    return (
      <div {...{ id, className, style }} {...eventCallbacks} ref='children'>
        {children}
        {popover}
      </div>
    );
  },

  componentWillReceiveProps(nextProps) {
    this.saveValuesFromNodeTree();
    if (!this.isStatefull() && this.isAbsolute() && this.getPopoverProps().isOpen !== this.getPopoverProps(nextProps).isOpen) {
      this.onPopoverOpenChange(nextProps);
    }
  }

});

export default Popover;
