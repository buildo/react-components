import React from 'react/addons';
import cx from 'classnames';
import ToastWrapper from './ToastWrapper';
const { TransitionGroup: ReactTransitionGroup, cloneWithProps } = React.addons;

const Toaster = React.createClass({

  propTypes: {
    children: React.PropTypes.node.isRequired,
    attachTo: React.PropTypes.string.isRequired,
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
    const { position } = this.toaster.style;
    if (process.env.NODE_ENV !== 'production' && (position !== 'relative' && position !== 'absolute')) {
      console.warn('Toaster\'s parent node should have "position: relative/absolute"');
    }
  },

  componentWillUnmount() {
    this.removeToaster();
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
        <ToastWrapper
          {...{ transitionStyles, transitionEnterTimeout, transitionLeaveTimeout }}
          style={this.getTranslationStyle(i)}
          key={el.key}>
            {cloneWithProps(el, { uniqueKey: el.key })}
        </ToastWrapper>
      );
    });
  },

  appendToaster() {
    this.toaster = document.getElementById(this.props.attachTo);
  },

  removeToaster() {
    if (this.toaster) {
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
    React.render(this.getToaster(), this.toaster);
  },

  render() {
    return null;
  },

  componentDidUpdate() {
    this.renderToaster();
  }

});

export default Toaster;
