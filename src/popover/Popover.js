import React from 'react';
import cx from 'classnames';

const Popover = React.createClass({

  propTypes: {
    children: React.PropTypes.node.isRequired,
    popover: React.PropTypes.shape({
      content: React.PropTypes.node.isRequired,
      type: React.PropTypes.oneOf(['absolute', 'relative']),
      position: React.PropTypes.oneOf(['top', 'bottom']),
      anchor: React.PropTypes.oneOf(['left', 'center', 'right']),
      event: React.PropTypes.oneOf(['click', 'hover']),
      onShow: React.PropTypes.func,
      onHide: React.PropTypes.func,
      dismissOnScroll: React.PropTypes.bool,
      className: React.PropTypes.string,
      id: React.PropTypes.string,
      maxWidth: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
      ])
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
  getPopoverProps() {
    return {
      type: 'relative',
      position: 'top',
      anchor: 'center',
      event: 'hover',
      onShow: () => {},
      onHide: () => {},
      dismissOnScroll: true,
      className: '',
      ...this.props.popover
    };
  },

  componentWillUnmount() {
    if (this.isAbsolute()) {
      this.removePopover();
    }
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
    return {
      top,
      left
    };
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
    return this.popoverTemplate({position: 'absolute', visibility: 'hidden'});
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

  onPopoverStateChange() {
    const { onShow, onHide } = this.getPopoverProps();
    const isAbsolute = this.isAbsolute();
    if (this.state.isOpen) {
      onShow();
      if (isAbsolute) {
        this.appendPopover();
      }
      this.addOnScrollListener();
    } else {
      onHide();
      if (isAbsolute) {
        this.removePopover();
      }
      this.removeOnScrollListener();
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
    const { event } = this.getPopoverProps();
    const onHover = event === 'hover';
    const onClick = event === 'click';
    return {
      onMouseEnter: onHover ? this.showPopover : undefined,
      onMouseLeave: onHover ? this.hidePopover : undefined,
      onClick: onClick ? this.togglePopover : undefined
    };
  },

  isAbsolute() {
    return this.getPopoverProps().type === 'absolute';
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
    const { anchor, position, maxWidth } = this.getPopoverProps();
    const isAbsolute = this.isAbsolute();

    let deltaX;
    switch (anchor) {
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
    switch (position) {
      case 'top':
        deltaY = isAbsolute ? -(popoverHeight + 5) : (childHeight + 5); //eslint-disable-line space-infix-ops
        break;
      case 'bottom':
        deltaY = childHeight + 5;
        break;
    }

    const valueY = (isAbsolute ? offsetTop : 0) + deltaY;
    const valueX = (isAbsolute ? offsetLeft : 0) + deltaX;
    return {
      position: 'absolute',
      top: isAbsolute || position === 'bottom' ? valueY : undefined,
      bottom: !isAbsolute && position === 'top' ? valueY : undefined,
      left: valueX,
      maxWidth: maxWidth
    };
  },

  getLocals() {
    const isRelative = this.getPopoverProps().type === 'relative';
    const { isOpen } = this.state;
    const popover = isRelative && (isOpen ? this.getVisiblePopover() : this.getHiddenPopover());
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

  componentWillReceiveProps() {
    this.saveValuesFromNodeTree();
  }

});

export default Popover;
