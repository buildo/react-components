import React from 'react';

export default React.createClass({

  propTypes: {
    children: React.PropTypes.func.isRequired,
    scrollX: React.PropTypes.bool,
    scrollY: React.PropTypes.bool,
    scrollPropagation: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      scrollX: true,
      scrollY: true,
      scrollPropagation: false
    };
  },

  componentDidMount() {
    if (!this.props.scrollPropagation) {
      this.disableScrollPropagation();
    }
  },

  enableScrollPropagation() {
    const scroll = this.refs.scroll.getDOMNode();
    const unbindEvent = scroll.removeEventListener || scroll.detachEvent;
    const event = (scroll.removeEventListener ? '' : 'on') + 'mousewheel';

    unbindEvent(event, this.stopScrollPropagation);
  },

  disableScrollPropagation() {
    const scroll = this.refs.scroll.getDOMNode();
    const bindEvent = scroll.addEventListener || scroll.attachEvent;
    const event = (scroll.addEventListener ? '' : 'on') + 'mousewheel';

    bindEvent(event, this.stopScrollPropagation);
  },

  stopScrollPropagation(e) {
    const up = e.originalEvent.wheelDelta > 0;
    const down = e.originalEvent.wheelDelta < 0;

    const scrollTop = scroll.get(0).scrollTop;
    const scrollHeight = scroll.get(0).scrollHeight;
    const offsetHeight = scroll.get(0).offsetHeight;

    if((scrollTop + offsetHeight === scrollHeight && down) || (scrollTop === 0 && up)) {
      e.preventDefault();
    }
  },

  // scrollTo(x, y, time) {

  // },

  render() {
    return (
      <div ref='scroll'>
        {this.props.children(this.scrollTo)}
      </div>
    );
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollPropagation && !this.props.scrollPropagation) {
      this.enableScrollPropagation();
    } else if (!nextProps.scrollPropagation && this.props.scrollPropagation) {
      this.disableScrollPropagation();
    }
  },

  componentWillUnmount() {
    if (!this.props.scrollPropagation) {
      this.enableScrollPropagation();
    }
  }

});