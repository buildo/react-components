import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cx from 'classnames';
import { props, t } from '../utils';
import { warn } from '../utils/log';

export type LoadingSpinnerDefaultProps = {
  /** spinner size */
  size: string | number,
  /** dimmed-overlay color */
  overlayColor: string,
  style: React.CSSProperties
};

export type LoadingSpinnerRequiredProps = {
  /** spinner main color */
  color?: string,
  /** spinner message */
  message?: {
    content: string,
    color?: string,
    size?: string | number
  },
  id?: string,
  className?: string,
};

export type LoadingSpinnerProps = LoadingSpinnerRequiredProps & Partial<LoadingSpinnerDefaultProps>;
type LoadingSpinnerDefaultedProps = LoadingSpinnerRequiredProps & LoadingSpinnerDefaultProps;

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
 */
@props(Props)
export default class LoadingSpinner extends React.PureComponent<LoadingSpinnerProps> {

  static defaultProps: LoadingSpinnerDefaultProps = {
    size: '3em',
    overlayColor: 'rgba(255, 255, 255, .9)',
    style: {}
  };

  componentDidMount() {
    this.logWarnings();
  }

  getMessage = () => {
    const { message, size } = this.props as LoadingSpinnerDefaultedProps;
    if (message) {
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
      const { parentElement } = ReactDOM.findDOMNode(this.refs.loadingSpinner);
      const { position } = window.getComputedStyle(parentElement!);
      if (position !== 'relative' && position !== 'absolute') {
        return ['LoadingSpinner\'s parent node style should have "position: relative" or "position: absolute"', parentElement];
      }
      return undefined;
    });
  };

  render() {
    const { size, color, overlayColor, id, className: _className, style } = this.props as LoadingSpinnerDefaultedProps;

    const overlayStyle = { backgroundColor: overlayColor };
    const spinnerStyle = {
      fontSize: size,
      color
    };
    const className = cx('loading-spinner', _className);

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
