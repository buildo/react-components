import React from 'react/addons';
import cx from 'classnames';
import TransitionWrapper from '../transition-wrapper/TransitionWrapper';
const { TransitionGroup: ReactTransitionGroup, cloneWithProps } = React.addons;

const Toaster = React.createClass({

  propTypes: {
    children: React.PropTypes.node.isRequired,
    attachTo: React.PropTypes.string,
    transitionStyles: React.PropTypes.object,
    transitionEnterTimeout: React.PropTypes.number.isRequired,
    transitionLeaveTimeout: React.PropTypes.number.isRequired,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      transitionGroup: {}
    };
  },

  componentWillMount() {
    this.appendToaster();
    this.renderToaster();
  },

  componentDidMount() {
    const { position } = this.props.attachTo ? this.toaster.style : this.getDOMNode().parentNode.style;
    if (position !== 'relative' && position !== 'absolute') {
      this.logWarning('Toaster\'s parent node should have "position: relative/absolute"');
    }
  },

  componentWillUnmount() {
    this.removeToaster();
  },

  logWarning(log) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(log);
    }
  },

  getTranslationStyle(i) {
    return {
      transform: `translateY(${100 * i}%)`,
      position: 'absolute',
      top: 0,
      right: 0
    };
  },

  getToasts() {
    const { children, transitionStyles, transitionEnterTimeout, transitionLeaveTimeout } = this.props;
    return React.Children.map(children, (el, i) => {
      return (
        <TransitionWrapper
          {...{ transitionStyles, transitionEnterTimeout, transitionLeaveTimeout }}
          style={this.getTranslationStyle(i)}
          key={el.key}>
            {cloneWithProps(el, { uniqueKey: el.key })}
        </TransitionWrapper>
      );
    });
  },

  appendToaster() {
    if (this.props.attachTo) {
      this.toaster = document.getElementById(this.props.attachTo);
    }
  },

  removeToaster() {
    if (this.toaster && this.props.attachTo) {
      this.toaster.innerHTML = ''; // stupid??
    }
  },

  getToaster() {
    const { style: styleProp, id, className } = this.props;
    const style = {
      position: 'absolute',
      right: 0,
      top: 0,
      height: '100%',
      ...styleProp
    };

    return (
      <div className={cx('toaster', className)} {...{ style, id }}>
        <ReactTransitionGroup {...this.props.transitionGroup}>
          {this.getToasts()}
        </ReactTransitionGroup>
      </div>
    );
  },

  renderToaster() {
    if (this.props.attachTo) {
      React.render(this.getToaster(), this.toaster);
    }
  },

  render() {
    if (this.props.attachTo) {
      return null;
    } else {
      return this.getToaster();
    }
  },

  componentDidUpdate() {
    this.renderToaster();
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.attachTo !== nextProps.attachTo) {
      this.logWarning('You can\'t change "attachTo" prop after the first render!');
    }
  }

});

export default Toaster;
