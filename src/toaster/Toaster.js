import React from 'react';
import cx from 'classnames';

const Toaster = React.createClass({

  propTypes: {
    children: React.PropTypes.node.isRequired,
    attachTo: React.PropTypes.string.isRequired,
    animationClassNames: React.PropTypes.shape({
      onEnter: React.PropTypes.string,
      onLeave: React.PropTypes.string,
      onMove: React.PropTypes.string
    }),
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      animationClassNames: {}
    };
  },

  componentWillMount() {
    this.appendToaster();
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
      transform: `translate3d(0,${100 * i}%,0)`,
      position: 'absolute',
      top: 0,
      right: 0
    };
  },

  getToasts() {
    const children = [].concat(this.props.children).map((el, i) => {
      return (
        <div style={this.getTranslationStyle(i)} key={i}>
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

  renderToaster() {
    const { style: styleProp, id, className } = this.props;
    const style = {
      position: 'absolute',
      right: 0,
      top: 0,
      height: '100%',
      ...styleProp
    };

    const toaster = (
      <div ref='toaster' className={cx('toaster', className)} {...{ style, id }}>
        {this.getToasts()}
      </div>
    );

    this.toaster.innerHTML = React.renderToString(toaster);
  },

  render() {
    this.renderToaster();
    return null;
  }

});

export default Toaster;
