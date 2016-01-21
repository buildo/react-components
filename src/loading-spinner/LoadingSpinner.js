import React from 'react';
import cx from 'classnames';
import { warn } from '../utils/log';

/**
 * ### Absolute dimmed layer with loading spinner in the center
 */
const LoadingSpinner = React.createClass({

  propTypes: {
    /**
     * spinner size
     */
    size: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    /**
     * spinner main color
     */
    color: React.PropTypes.string,
    /**
     * spinner message
     */
    message: React.PropTypes.shape({
      content: React.PropTypes.string.isRequired,
      color: React.PropTypes.string,
      size: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ])
    }),
    /**
     * dimmed-overlay color
     */
    overlayColor: React.PropTypes.string,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      size: '3em',
      overlayColor: 'rgba(255, 255, 255, .9)'
    };
  },

  componentDidMount() {
    this.logWarnings();
  },

  getMessage() {
    if (this.props.message) {
      const { message, size } = this.props;
      const messageStyle = {
        marginTop: size,
        fontSize: message.size || 16,
        color: message.color
      };

      return (
        <div className='message' style={messageStyle}>
          {message.content}
        </div>
      );
    }
  },

  logWarnings() {
    warn(() => {
      const { position } = this.refs.loadingSpinner.getDOMNode().parentNode.style;
      if (position !== 'relative' && position !== 'absolute') {
        return 'LoadingSpinner\'s parent node style should have "position: relative" or "position: absolute"';
      }
    });
  },

  render() {
    const { size, color, overlayColor, id, className, style } = this.props;

    const overlayStyle = { backgroundColor: overlayColor };
    const spinnerStyle = {
      fontSize: size,
      color
    };

    return (
      <div ref='loadingSpinner' className={cx('loading-spinner', className)} {...{ style, id }}>
        <div className='loading-spinner-overlay' style={overlayStyle}>
          <div className='spinner' style={spinnerStyle}/>
          {this.getMessage()}
        </div>
      </div>
    );
  }

});

export default LoadingSpinner;
