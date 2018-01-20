import * as React from 'react';
import * as ReactDOM from 'react-dom';
import omit = require('lodash/omit');
import debounce = require('lodash/debounce');
import { props, t } from '../utils';
import { warn } from '../utils/log';
import { ResizeSensor } from '../ResizeSensor/ResizeSensor';
import { ObjectOverwrite } from 'typelevel-ts';
import { Popover } from '../Popover/Popover';

export const Props = {
  children: t.maybe(t.Function),
  label: t.maybe(t.union([t.String, t.Number])),
  popover: t.maybe(t.interface({
    position: t.maybe(t.enums.of(['top', 'bottom', 'left', 'right'])),
    content: t.Nil
  })),
  lazy: t.maybe(t.Boolean),
  delayWhenLazy: t.maybe(t.Integer),
  id: t.maybe(t.String),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

export type TextOverflowDefaultProps = {
  /** tooltip delay if the component is lazy */
  delayWhenLazy: number
  /** whether the tooltip appearance should be delayed after mouse entering or not */
  lazy: boolean
};

export type TextOverflowRequiredProps = {
  /** in case you want to use a custom component (like a `Tooltip`) to render the full content which is passed as the first argument */
  children?: (self: JSX.Element, isOpen?: boolean) => any,
  /** this is the full string */
  label?: string | number,
  /** additional props for Popover component used to display the entire text */
  popover?: ObjectOverwrite<Popover.Props['popover'], {
    content?: undefined
  }>,
  id?: string,
  className?: string,
  style?: React.CSSProperties
};

export namespace TextOverflow {
  export type Props = TextOverflowRequiredProps & Partial<TextOverflowDefaultProps>;
}
type TextOverflowDefaultedProps = TextOverflowRequiredProps & TextOverflowDefaultProps;

export type State = {
  isOverflowing: boolean,
  isHovering: boolean
};

/**
 * Text view which, if string content is too large, trims it and shows the full content on "hover".
 */
@props(Props, { strict: false })
export class TextOverflow extends React.Component<TextOverflow.Props, State> {

  static defaultProps: TextOverflowDefaultProps = {
    delayWhenLazy: 100,
    lazy: false
  };

  state = { isOverflowing: false, isHovering: false };

  componentDidMount() {
    !this.props.lazy && this.verifyOverflow();
  }

  componentWillReceiveProps(nextProps: TextOverflow.Props) {
    if (!this.props.lazy && nextProps.label !== this.props.label) {
      this.reset();
    }
  };

  reset = () => this.setState({
    isOverflowing: false
  }, () => this.verifyOverflow({ force: true, reset: true }));

  logWarnings = () => {
    warn(() => {
      const node = ReactDOM.findDOMNode(this.refs.text);
      if (node) {
        const styleNode = node.parentElement!.parentElement!;
        const { width, flex } = styleNode.style;
        const flexBasis = flex ? flex.split(' ')[2] : null;
        if (width !== '100%' && flexBasis !== '100%') {
          return ['WARNING: TextOverflow\'s parent doesn\'t have "width: 100%" nor "flex-basis: 100%"', styleNode];
        }
      }
      return undefined;
    });
  };

  getElementWidth = (element?: Element): number => {
    if (element && typeof window !== 'undefined') {
      const width = window.getComputedStyle(element).width;
      return width ? parseFloat(width) : 0;
    }
    return 0;
  };

  verifyOverflow = ({ force, reset }: { force?: boolean, reset?: boolean } = {}) => {
    if ((force || (!this.props.lazy && this.state.isOverflowing === false)) && typeof window !== 'undefined') {
      const text = ReactDOM.findDOMNode(this.refs.text);
      const textWithoutEllipsis = ReactDOM.findDOMNode(this.refs.textWithoutEllipsis);

      if (text && textWithoutEllipsis) {
        const textWidth = this.getElementWidth(text);
        const textWithoutEllipsisWidth = this.getElementWidth(textWithoutEllipsis);

        const isOverflowing = (textWidth < textWithoutEllipsisWidth);
        if (isOverflowing && !this.state.isOverflowing) {
          this.setState({ isOverflowing: true }, this.logWarnings);
        } else if (!isOverflowing && reset && this.state.isOverflowing) {
          this.setState({ isOverflowing: false }, this.logWarnings);
        } else {
          this.logWarnings();
        }
      }
    }
  };

  _onMouseEvent = (type: string) => (type === 'mouseenter') && this.onMouseEnter();

  onMouseEventDebounced: ((type: string) => false | void) & _.Cancelable = debounce(this._onMouseEvent, this.props.delayWhenLazy);

  onMouseEvent: React.MouseEventHandler<Element> = ({ type }) => {
    this.props.delayWhenLazy ? this.onMouseEventDebounced(type) : this._onMouseEvent(type)
  };

  onMouseEnter = () => {
    if (!this.state.isHovering) {
      this.setState({
        isHovering: true
      }, () => this.props.lazy && this.verifyOverflow({ force: true, reset: true }));
    }
  };

  onMouseLeave: React.MouseEventHandler<Element> = () => {
    this.state.isHovering && this.setState({ isHovering: false })
  };

  onResize = () => this.verifyOverflow({ force: true, reset: true });

  getContent = () => {
    const { onMouseEvent, onMouseLeave, props: { label, lazy } } = this;
    const styleText: React.CSSProperties = {
      display: 'block',
      whiteSpace: 'nowrap',
      width: '100%',
      overflow: 'hidden',
      OTextOverflow: 'ellipsis', // Opera
      textOverflow: 'ellipsis'
    };
    const styleTextWithoutEllipsis: React.CSSProperties = {
      position: 'fixed',
      visibility: 'hidden',
      pointerEvents: 'none',
      top: 0,
      left: 0
    };
    const events = lazy && {
      onMouseEnter: onMouseEvent,
      onMouseLeave: (e: React.MouseEvent<Element>) => {
        onMouseEvent(e);
        onMouseLeave(e);
      }
    };

    const text = <span ref='text' {...events} style={styleText}>{label}</span>;
    return (
      <div>
        {lazy ? text : <ResizeSensor onResize={this.onResize}>{text}</ResizeSensor>}
        <span ref='textWithoutEllipsis' style={styleTextWithoutEllipsis}>{label}</span>
      </div>
    );
  };

  templateOverflow = () => {
    const { state: { isHovering } } = this;
    const {
      children, label, style, lazy, popover, ...other
    } = this.props as TextOverflowDefaultedProps;

    if (children) {
      return children(this.getContent(), lazy ? isHovering : undefined);
    } else {
      const props: Popover.Props = {
        ...omit(other, ['delayWhenLazy']),
        popover: {
          ...popover,
          content: label,
          event: 'hover',
          isOpen: lazy ? isHovering : undefined
        },
        style: {
          width: '100%',
          ...style
        }
      };

      return <Popover {...props}>{this.getContent()}</Popover>;
    }
  };

  templeteStandard = () => {
    const { style, ...other } = this.props;
    const props = {
      ...omit(other, ['children', 'label', 'lazy', 'delayWhenLazy', 'popover']),
      style: {
        width: '100%',
        ...style
      }
    };

    return <div {...props}>{this.getContent()}</div>;
  };

  render() {
    return this.state.isOverflowing ? this.templateOverflow() : this.templeteStandard();
  }

}
