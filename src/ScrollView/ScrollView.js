import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { skinnable, props, t } from '../utils';
import GeminiScrollbar from 'gemini-scrollbar';
import ResizeSensor from '../resize-sensor/ResizeSensor';

export const Props = {
  children: t.ReactChildren,
  autoshow: t.maybe(t.Boolean),
  forceGemini: t.maybe(t.Boolean),
  component: t.maybe(t.union([t.Function, t.String])),
  componentProps: t.maybe(t.Object),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/** A scrollable view
 * @param children - what to render inside the scroll view
 * @param autoshow - whether to automatically show scrollbars
 * @param forceGemini - force ScrollView to use `gemini-scrollbar`s
 * @param component - component to use as the wrapper
 * @param componentProps - props to pass to the wrapper component
 * @param className - className to pass to the wrapper component
 * @param style - style to pass to the wrapper component
 */
@skinnable()
@props(Props)
export default class ScrollView extends React.PureComponent {

  static defaultProps = {
    component: 'div',
    forceGemini: true
  }

  /**
   * Holds the reference to the GeminiScrollbar instance.
   * @property scrollbar <public> [Object]
   */
  scrollbar: null

  componentDidMount() {
    const { autoshow, forceGemini } = this.props;
    this.scrollbar = new GeminiScrollbar({
      autoshow,
      forceGemini,
      element: ReactDOM.findDOMNode(this),
      createElements: false
    }).create();
  }

  componentDidUpdate() {
    const scrollTop = this.scrollbar.getViewElement().scrollTop;
    this.scrollbar.update();
    this.scrollbar.getViewElement().scrollTop = scrollTop;
  }

  componentWillUnmount() {
    this.scrollbar.destroy();
    this.scrollbar = null;
  }

  wrapperRenderer = ({ children, ...wrapperProps }) => React.createElement(
    this.props.component,
    wrapperProps,
    children
  );

  getLocals() {
    const { componentProps, className, style, children } = this.props;

    return {
      children,
      Wrapper: this.wrapperRenderer,
      wrapperProps: {
        ...componentProps,
        style,
        className: cx('scrollview', className)
      }
    };
  }

  template({ children, Wrapper, wrapperProps }) {
    return (
      <ResizeSensor onResize={() => this.forceUpdate()}>
        <Wrapper {...wrapperProps}>
          <div className='gm-scrollbar -vertical'>
            <div className='thumb' />
          </div>
          <div className='gm-scrollbar -horizontal'>
            <div className='thumb' />
          </div>
          <div className='gm-scroll-view'>
            <ResizeSensor onResize={() => this.forceUpdate()}>
              <div>
                {children}
              </div>
            </ResizeSensor>
          </div>
        </Wrapper>
      </ResizeSensor>
    );
  }
}
