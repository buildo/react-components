import React from 'react';
import cx from 'classnames';
import { props, t } from '../utils';
import { warn } from '../utils/log';

/**
 * ### Absolute dimmed layer with loading spinner in the center
 */
@props({
  /**
  * spinner size
  */
  size: t.maybe(t.union([t.String, t.Number])),
  /**
  * spinner main color
  */
  color: t.maybe(t.String),
  /**
  * spinner message
  */
  message: t.maybe(t.struct({
   content: t.String,
   color: t.maybe(t.String),
   size: t.maybe(t.union([t.String, t.Number]))
  })),
  /**
  * dimmed-overlay color
  */
  overlayColor: t.maybe(t.String),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
})
export default class LoadingSpinner extends React.Component {

  static defaultProps = {
    size: '3em',
    overlayColor: 'rgba(255, 255, 255, .9)'
  }

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
  }

  logWarnings = () => {
    warn(() => {
      const { parentNode } = React.findDOMNode(this.refs.loadingSpinner);
      const { position } = window.getComputedStyle(parentNode);
      if (position !== 'relative' && position !== 'absolute') {
        return ['LoadingSpinner\'s parent node style should have "position: relative" or "position: absolute"', parentNode];
      }
    });
  }

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

}
