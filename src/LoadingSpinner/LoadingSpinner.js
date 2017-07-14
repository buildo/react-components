import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { props, t, skinnable } from '../utils';
import { warn } from '../utils/log';

export const Props = {
  size: t.maybe(t.union([t.String, t.Number])),
  color: t.maybe(t.String),
  message: t.maybe(t.struct({
    content: t.String,
    color: t.maybe(t.String),
    size: t.maybe(t.union([t.String, t.Number]))
  })),
  overlayColor: t.maybe(t.String),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/**
 * Absolute dimmed layer with loading spinner in the center
 * @param size - spinner size
 * @param color - spinner main color
 * @param message - spinner message
 * @param overlayColor - dimmed-overlay color
 */
@props(Props)
@skinnable()
export default class LoadingSpinner extends React.Component {

  static defaultProps = {
    size: '3em',
    overlayColor: 'rgba(255, 255, 255, .9)'
  };

  componentDidMount() {
    this.logWarnings();
  }

  getMessage = () => {
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
    return undefined;
  };

  logWarnings = () => {
    warn(() => {
      const { parentNode } = ReactDOM.findDOMNode(this.refs.loadingSpinner);
      const { position } = window.getComputedStyle(parentNode);
      if (position !== 'relative' && position !== 'absolute') {
        return ['LoadingSpinner\'s parent node style should have "position: relative" or "position: absolute"', parentNode];
      }
      return undefined;
    });
  };

  getLocals() {
    const { size, color, overlayColor, id, className, style } = this.props;

    const overlayStyle = { backgroundColor: overlayColor };
    const spinnerStyle = {
      fontSize: size,
      color
    };
    const computedClassName = cx('loading-spinner', className);

    return {
      id,
      style,
      className: computedClassName,
      overlayStyle,
      spinnerStyle
    };
  }

  template({ id, style, className, overlayStyle, spinnerStyle }) {
    return (
      <div ref='loadingSpinner' className={className} style={style} id={id}>
        <div className='loading-spinner-overlay' style={overlayStyle}>
          <div className='spinner' style={spinnerStyle} />
          {this.getMessage()}
        </div>
      </div>
    );
  }

}
