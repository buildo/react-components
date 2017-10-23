import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as cx from 'classnames';
import { props, t, ReactChildren } from '../utils';
import  GeminiScrollbar = require('gemini-scrollbar');
import { ResizeSensor } from '../ResizeSensor/ResizeSensor';

export type ScrollViewDefaultProps<CP extends React.HTMLAttributes<any>, ICP extends React.HTMLAttributes<any>> = {
  /** component to use as the wrapper */
  component: keyof React.ReactHTML | React.ComponentType<CP>,
  /** props to pass to the wrapper component */
  componentProps: CP,
  /** component to use as the inner wrapper */
  innerComponent: keyof React.ReactHTML | React.ComponentType<ICP>,
  /** props to pass to the inner wrapper component */
  innerComponentProps: ICP,
  /** force ScrollView to use `gemini-scrollbar`s */
  forceGemini: boolean,
  /** style to pass to the wrapper component */
  style: React.CSSProperties
};

export type ScrollViewRequiredProps = {
  /** what to render inside the scroll view */
  children: any,
  /** whether to automatically show scrollbars */
  autoshow?: boolean,
  /** className to pass to the wrapper component */
  className?: string,
}

export type State = {
  isVerticalScrollbarVisible: boolean,
  isHorizontalScrollbarVisible: boolean
};

export type ScrollViewDefaultedProps<CP, ICP> = ScrollViewRequiredProps & ScrollViewDefaultProps<CP, ICP>;

export namespace ScrollView {
  export type Props<CP, ICP> = ScrollViewRequiredProps & Partial<ScrollViewDefaultProps<CP, ICP>>;
}

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

/** A scrollable view */
@props(Props)
export class ScrollView<CP extends React.HTMLAttributes<any>, ICP extends React.HTMLAttributes<any>> extends React.PureComponent<ScrollView.Props<CP, ICP>, State> {

  static defaultProps: ScrollViewDefaultProps<React.HTMLAttributes<HTMLDivElement>, React.HTMLAttributes<HTMLDivElement>> = {
    component: 'div',
    componentProps: {},
    forceGemini: true,
    innerComponent: 'div',
    innerComponentProps: {},
    style: {}
  }

  state = {
    isVerticalScrollbarVisible: false,
    isHorizontalScrollbarVisible: false
  }

  private scrollbar: GeminiScrollbar | null = null;
  private verticalThumb: HTMLDivElement | null = null;
  private horizontalThumb: HTMLDivElement | null = null;

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
    const scrollbar = this.scrollbar!;
    const scrollTop = scrollbar.getViewElement().scrollTop;
    scrollbar.update();
    scrollbar.getViewElement().scrollTop = scrollTop;
    this.saveScrollbarsState();
  }

  componentWillUnmount() {
    this.scrollbar!.destroy();
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

  wrapperRenderer = (props: CP) => {
    const { children, ...wrapperProps } = props as React.HTMLAttributes<any>;
    const { component } = this.props as ScrollViewDefaultedProps<CP, ICP>;
    return React.createElement(
      component as any,
      wrapperProps,
      children
    );
  }

  innerWrapperRenderer = (props: ICP) => {
    const { children, ...innerWrapperProps } = props as React.HTMLAttributes<any>;
    const { innerComponent } = this.props as ScrollViewDefaultedProps<CP, ICP>;
    return React.createElement(
      innerComponent as any,
      innerWrapperProps,
      children
    );
  }

  render() {
    const { componentProps, innerComponentProps, className, style, children } = this.props as ScrollViewDefaultedProps<CP, ICP>;
    const { isVerticalScrollbarVisible, isHorizontalScrollbarVisible } = this.state;
    const { wrapperRenderer: Wrapper, innerWrapperRenderer: InnerWrapper } = this;

    return (
      <ResizeSensor onResize={() => this.forceUpdate()}>
        <Wrapper {...componentProps} style={style} className={cx('scrollview', className)}>
          <div className={cx('gm-scrollbar -vertical', { visible: isVerticalScrollbarVisible })}>
            <div className='thumb' ref={ref => { this.verticalThumb = ref; }} />
          </div>
          <div className={cx('gm-scrollbar -horizontal', { visible: isHorizontalScrollbarVisible })}>
            <div className='thumb' ref={ref => { this.horizontalThumb = ref; }} />
          </div>
          <div className='gm-scroll-view'>
            <ResizeSensor onResize={() => this.forceUpdate()}>
              <InnerWrapper {...innerComponentProps}>
                {children}
              </InnerWrapper>
            </ResizeSensor>
          </div>
        </Wrapper>
      </ResizeSensor>
    );
  }
}
