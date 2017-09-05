import React from 'react';
import ReactDOM from 'react-dom';
import * as cx from 'classnames';
import { skinnable, props, t, ReactChildren } from '../utils';
import GeminiScrollbar from 'gemini-scrollbar';
import ResizeSensor from '../ResizeSensor/ResizeSensor';

export const Props = {
  children: ReactChildren,
  autoshow: t.maybe(t.Boolean),
  forceGemini: t.maybe(t.Boolean),
  component: t.maybe(t.union([t.Function, t.String])),
  componentProps: t.maybe(t.Object),
  innerComponent: t.maybe(t.union([t.Function, t.String])),
  innerComponentProps: t.maybe(t.Object),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/** A scrollable view
 * @param children - what to render inside the scroll view
 * @param autoshow - whether to automatically show scrollbars
 * @param forceGemini - force ScrollView to use `gemini-scrollbar`s
 * @param component - component to use as the wrapper
 * @param componentProps - props to pass to the wrapper component
 * @param innerComponent - component to use as the inner wrapper
 * @param innerComponentProps - props to pass to the inner wrapper component
 * @param className - className to pass to the wrapper component
 * @param style - style to pass to the wrapper component
 */
@skinnable()
@props(Props)
export default class ScrollView extends React.PureComponent {

  static defaultProps = {
    component: 'div',
    forceGemini: true,
    innerComponent: 'div'
  }

  state = {
    isVerticalScrollbarVisible: false,
    isHorizontalScrollbarVisible: false
  }

  /**
   * Holds the reference to the GeminiScrollbar instance.
   * @property scrollbar <public> [Object]
   */
  scrollbar = null

  componentDidMount() {
    const { autoshow, forceGemini } = this.props;
    this.scrollbar = new GeminiScrollbar({
      autoshow,
      forceGemini,
      element: ReactDOM.findDOMNode(this),
      createElements: false
    }).create();
    this.saveScrollbarsState();
  }

  componentDidUpdate() {
    const scrollTop = this.scrollbar.getViewElement().scrollTop;
    this.scrollbar.update();
    this.scrollbar.getViewElement().scrollTop = scrollTop;
    this.saveScrollbarsState();
  }

  componentWillUnmount() {
    this.scrollbar.destroy();
    this.scrollbar = null;
  }

  saveScrollbarsState() {
    const isVerticalScrollbarVisible = !!(this.verticalThumb && this.verticalThumb.style.height && this.verticalThumb.style.height !== '0px');
    const isHorizontalScrollbarVisible = !!(this.horizontalThumb && this.horizontalThumb.style.width && this.horizontalThumb.style.width !== '0px');

    if (this.state.isVerticalScrollbarVisible !== isVerticalScrollbarVisible || this.state.isHorizontalScrollbarVisible !== isHorizontalScrollbarVisible) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        isVerticalScrollbarVisible,
        isHorizontalScrollbarVisible
      });
    }
  }

  wrapperRenderer = ({ children, ...wrapperProps }) => React.createElement(
    this.props.component,
    wrapperProps,
    children
  );

  innerWrapperRenderer = ({ children, ...innerWrapperProps }) => React.createElement(
    this.props.innerComponent,
    innerWrapperProps,
    children
  );

  getLocals() {
    const { componentProps, innerComponentProps, className, style, children } = this.props;
    const { isVerticalScrollbarVisible, isHorizontalScrollbarVisible } = this.state;

    return {
      children,
      isVerticalScrollbarVisible,
      isHorizontalScrollbarVisible,
      Wrapper: this.wrapperRenderer,
      InnerWrapper: this.innerWrapperRenderer,
      innerWrapperProps: innerComponentProps,
      wrapperProps: {
        ...componentProps,
        style,
        className: cx('scrollview', className)
      }
    };
  }

  template({ children, Wrapper, wrapperProps, InnerWrapper, innerWrapperProps, isVerticalScrollbarVisible, isHorizontalScrollbarVisible }) {
    return (
      <ResizeSensor onResize={() => this.forceUpdate()}>
        <Wrapper {...wrapperProps}>
          <div className={cx('gm-scrollbar -vertical', { visible: isVerticalScrollbarVisible })}>
            <div className='thumb' ref={ref => { this.verticalThumb = ref; }} />
          </div>
          <div className={cx('gm-scrollbar -horizontal', { visible: isHorizontalScrollbarVisible })}>
            <div className='thumb' ref={ref => { this.horizontalThumb = ref; }} />
          </div>
          <div className='gm-scroll-view'>
            <ResizeSensor onResize={() => this.forceUpdate()}>
              <InnerWrapper {...innerWrapperProps}>
                {children}
              </InnerWrapper>
            </ResizeSensor>
          </div>
        </Wrapper>
      </ResizeSensor>
    );
  }
}
