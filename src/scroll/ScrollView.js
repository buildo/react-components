import React from 'react';
import omit from 'lodash/object/omit';
import easing from './easingFunctions';

const propTypes = {
  children: React.PropTypes.func.isRequired,
  scrollX: React.PropTypes.bool,
  scrollY: React.PropTypes.bool,
  scrollPropagation: React.PropTypes.bool,
  style: React.PropTypes.object,
  easing: React.PropTypes.oneOf(Object.keys(easing))
};

export default React.createClass({

  propTypes: propTypes,

  getDefaultProps() {
    return {
      scrollX: true,
      scrollY: true,
      scrollPropagation: true,
      easing: 'easeInOutQuad',
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

  scrollTo(x, y, scrollDuration) {
    const { scrollTop, scrollLeft } = this.scrollView;
    x = x === null ? scrollLeft : x;
    y = y === null ? scrollTop : y;

    this._scrollTo(x, y, scrollDuration, Date.now(), scrollLeft, scrollTop);
  },

  _scrollTo(x, y, scrollDuration, startTime, startX, startY) {
    if (scrollDuration > 0) {
      const { scrollTop, scrollLeft } = this.scrollView;
      const time = Math.min(1, (Math.max(1, Date.now() - startTime) / scrollDuration));
      const easingFunction = easing[this.props.easing];

      if ((typeof x === 'number' && scrollLeft !== x) || (typeof y === 'number' && scrollTop !== y)) {
        const distanceX = startX > x ? (x - startX) : (startX - x);
        const distanceY = startY > y ? (y - startY) : (startY - y);
        this.scrollView.scrollLeft = startX + easingFunction(time, distanceX);
        this.scrollView.scrollTop = startY + easingFunction(time, distanceY);

        requestAnimationFrame(() => this._scrollTo(x, y, scrollDuration, startTime, startX, startY));
      }
    } else {
      this.scrollView.scrollLeft = x;
      this.scrollView.scrollTop = y;
    }
  },

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