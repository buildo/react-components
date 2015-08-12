import React from 'react';
import cx from 'classnames';

const LoadingSpinner = React.createClass({

  propTypes: {
    size: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    color: React.PropTypes.string,
    message: React.PropTypes.shape({
      content: React.PropTypes.string.isRequired,
      color: React.PropTypes.string,
      size: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ])
    }),
    overlayColor: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      size: '3em',
      color: 'grey',
      overlayColor: 'rgba(255, 255, 255, .9)'
    };
  },

  getMessage() {
    if (this.props.message) {
      const {message, size} = this.props;
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

  render() {
    const {size, color, overlayColor, className, style} = this.props;

    const overlayStyle = {backgroundColor: overlayColor};
    const spinnerStyle = {
      fontSize: size,
      color: color
    };

    return (
      <div className={cx('loading-spinner', className)} style={style}>
        <div className='loading-spinner-overlay' style={overlayStyle}>
          <div className='spinner' style={spinnerStyle}/>
          {this.getMessage()}
        </div>
      </div>
    );
  }

});

export default LoadingSpinner;
