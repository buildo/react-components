import React from 'react';
import omit from 'lodash/object/omit';

const propTypes = {
  children: React.PropTypes.func.isRequired,
  scrollX: React.PropTypes.bool,
  scrollY: React.PropTypes.bool,
  scrollPropagation: React.PropTypes.bool,
  style: React.PropTypes.object
};

export default React.createClass({

  propTypes: propTypes,

  getDefaultProps() {
    return {
      scrollX: true,
      scrollY: true,
      scrollPropagation: true,
      style: {}
    };
  },

  componentDidMount() {
    this.scrollView = this.refs.scrollView.getDOMNode();
    if (!this.props.scrollPropagation) {
      this.disableScrollPropagation();
    }
  },

  enableScrollPropagation() {
    const unbindEvent = this.scrollView.removeEventListener || this.scrollView.detachEvent;
    const event = (this.scrollView.removeEventListener ? '' : 'on') + 'mousewheel';

    unbindEvent(event, this.stopScrollPropagation);
  },

  disableScrollPropagation() {
    const bindEvent = this.scrollView.addEventListener || this.scrollView.attachEvent;
    const event = (this.scrollView.addEventListener ? '' : 'on') + 'mousewheel';

    bindEvent(event, this.stopScrollPropagation);
  },

  stopScrollPropagation(e) {
    if (e.srcElement === this.scrollView) {
      const up = e.wheelDelta > 0;
      const down = e.wheelDelta < 0;

      const scrollTop = this.scrollView.scrollTop;
      const scrollHeight = this.scrollView.scrollHeight;
      const offsetHeight = this.scrollView.offsetHeight;

      if((scrollTop + offsetHeight === scrollHeight && down) || (scrollTop === 0 && up)) {
        e.preventDefault();
      }
    }
  },

  computeStyle() {
    const { scrollX, scrollY, style } = this.props;
    return {
      overflowY: scrollY ? 'scroll' : undefined, /* has to be scroll for iOS, not auto */
      overflowX: scrollX ? 'scroll' : undefined, /* has to be scroll for iOS, not auto */
      WebkitOverflowScrolling: 'touch',
      ...style
    };
  },

  // scrollTo(x, y, time) {

  // },

  render() {
    const props = omit(this.props, Object.keys(propTypes));
    return (
      <div { ...props } style={this.computeStyle()} ref='scrollView'>
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