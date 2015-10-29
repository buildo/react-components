import React from 'react/addons';
import cx from 'classnames';
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const Toaster = React.createClass({

  propTypes: {
    children: React.PropTypes.node.isRequired,
    attachTo: React.PropTypes.string.isRequired,
    transitionGroup: React.PropTypes.object,
    moveTransition: React.PropTypes.shape({
      duration: React.PropTypes.number.isRequired,
      ease: React.PropTypes.string
    }),
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      animationClassNames: {},
      moveTransition: {
        duration: 0
      }
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
    const { duration, ease } = this.props.moveTransition;
    const transition = `transform ${duration}ms ${ease || ''}`;
    console.log(transition);

    return {
      transform: `translate3d(0,${100 * i}%,0)`,
      position: 'absolute',
      top: 0,
      right: 0,
      WebkitTransition: transition,
      transition
    };
  },

  getToasts() {
    const children = React.Children.map(this.props.children, (el, i) => {
      return (
        <div style={this.getTranslationStyle(i)} key={el.key}>
          {el}
        </div>
      );
    });

    return children;
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

    const toaster = (
      <div className={cx('toaster', className)} {...{ style, id }}>
        <ReactCSSTransitionGroup transitionName='toaster-anim'>
          {this.getToasts()}
        </ReactCSSTransitionGroup>
      </div>
    );

    return toaster;
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
