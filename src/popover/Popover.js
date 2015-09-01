import React from 'react';
import cx from 'classnames';

const Popover = React.createClass({

  propTypes: {
    children: React.PropTypes.node.isRequired,
    content: React.PropTypes.node.isRequired,
    event: React.PropTypes.oneOf(['click', 'hover']),
    position: React.PropTypes.oneOf(['top', 'bottom']),
    anchor: React.PropTypes.oneOf(['left', 'center', 'right']),
    onShow: React.PropTypes.func,
    onHide: React.PropTypes.func,
    popoverClassName: React.PropTypes.string,
    popoverMaxWidth: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    dismissOnScroll: React.PropTypes.bool,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      event: 'hover',
      position: 'top',
      anchor: 'center',
      onShow: () => {},
      onHide: () => {},
      popoverClassName: '',
      dismissOnScroll: true,
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

  componentWillUnmount() {
    this.removePopover();
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
    return {
      top,
      left
    };
  },

  appendPopover() {
    const positionClass = `position-${this.props.position}`;
    const anchorClass = `anchor-${this.props.anchor}`;
    const className = `popover-content ${positionClass} ${anchorClass} ${this.props.popoverClassName}`;

    const hiddenPopover = (
      <div
        className={className}
        style={{position: 'absolute', visibility: 'hidden'}}>
        {this.props.content}
      </div>
    );
    this.containerNode = document.createElement('div');
    this.containerNode.innerHTML = React.renderToString(hiddenPopover);
    this.popoverNode = this.containerNode.childNodes[0];

    document.body.appendChild(this.containerNode);

    const style = this.computePopoverStyle();
    const popover = (
      <div
        className={className}
        style={style}>
        {this.props.content}
      </div>
    );

    this.containerNode.innerHTML = React.renderToString(popover);
    this.addOnScrollListener();
  },

  removePopover() {
    if (this.containerNode) {
      document.body.removeChild(this.containerNode);
      this.containerNode = null;
      this.removeOnScrollListener();
    }
  },

  addOnScrollListener() {
    if (this.props.dismissOnScroll) {
      if (window.attachEvent) {
        //Internet Explorer
        window.attachEvent('onmousewheel', this.onScroll);
      } else if(window.addEventListener) {
        window.addEventListener('mousewheel', this.onScroll, false);
      }
    }
  },

  removeOnScrollListener() {
    if (this.props.dismissOnScroll) {
      if (window.detachEvent) {
        //Internet Explorer
        window.detachEvent('onmousewheel', this.onScroll);
      } else if(window.removeEventListener) {
        window.removeEventListener('mousewheel', this.onScroll, false);
      }
    }
  },

  onPopoverStateChange() {
    if (this.state.isOpen) {
      this.props.onShow();
      this.appendPopover();
    } else {
      this.props.onHide();
      this.removePopover();
    }
  },

  showPopover() {
    this.setState(
      {isOpen: true},
      this.onPopoverStateChange
    );
  },

  hidePopover() {
    this.setState(
      {isOpen: false},
      this.onPopoverStateChange
    );
  },

  togglePopover() {
    this.setState(
      {isOpen: !this.state.isOpen},
      this.onPopoverStateChange
    );
  },

  onScroll() {
    this.hidePopover();
  },

  getEventCallbacks() {
    const onHover = this.props.event === 'hover';
    const onClick = this.props.event === 'click';
    return {
      onMouseEnter: onHover ? this.showPopover : undefined,
      onMouseLeave: onHover ? this.hidePopover : undefined,
      onClick: onClick ? this.togglePopover : undefined
    };
  },

  computePopoverStyle() {
    const { clientWidth: childWidth, clientHeight: childHeight } = this.refs.children.getDOMNode();
    const { clientHeight: popoverHeight, clientWidth: popoverWidth } = this.popoverNode;
    const { top, left } = this.getOffsetRect();

    let deltaX;
    switch (this.props.anchor) {
      case 'left':
        deltaX = 0;
        break;
      case 'center':
        deltaX = (childWidth - popoverWidth) / 2;
        break;
      case 'right':
        deltaX = childWidth - popoverWidth;
        break;
    }

    let deltaY;
    switch (this.props.position) {
      case 'top':
        deltaY = -(popoverHeight + 5);
        break;
      case 'bottom':
        deltaY = childHeight + 5;
        break;
    }

    return {
      position: 'absolute',
      top: top + deltaY,
      left: left + deltaX,
      maxWidth: this.props.popoverMaxWidth
    };
  },

  getLocals() {
    return {
      ...this.props,
      style: {
        display: 'inline-block',
        ...this.props.style
      },
      className: cx('react-popover', this.props.className),
      eventCallbacks: this.getEventCallbacks()
    };
  },

  render() {
    const { children, style, className, id, eventCallbacks } = this.getLocals();
    return (
      <div {...{ id, className, style }} {...eventCallbacks} ref='children'>
        {children}
      </div>
    );
  }

});

export default Popover;
