import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { skinnable, props, t } from '../utils';
import GeminiScrollbar from 'gemini-scrollbar';
import FlexView from 'react-flexview';

export const Props = {
  children: t.ReactChildren,
  autoshow: t.maybe(t.Boolean),
  forceGemini: t.maybe(t.Boolean),
  componentProps: t.maybe(t.Object),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/** A scrollable view
 * @param children - what to render inside the scroll view
 * @param autoshow - whether to automatically show scrollbars
 * @param forceGemini - force ScrollView to use `gemini-scrollbar`s
 * @param componentProps - props to pass to the wrapper component
 * @param className - className to pass to the wrapper component
 * @param style - style to pass to the wrapper component
 */
@skinnable()
@props(Props)
export default class ScrollView extends React.PureComponent {

  static defaultProps = {
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

  innerWrapperRenderer = ({ children, ...innerWrapperProps }) => React.createElement(
    this.props.innerComponent,
    innerWrapperProps,
    children
  );

  template({ children, className, style, componentProps }) {
    return (
      <FlexView style={style} className={cx('scrollview', className)} {...componentProps}>
        <FlexView className='gm-scrollbar -vertical'>
          <FlexView className='thumb' />
        </FlexView>
        <FlexView className='gm-scrollbar -horizontal'>
          <FlexView className='thumb' />
        </FlexView>
        <FlexView column className='gm-scroll-view'>
          <FlexView column shrink={false}>
            {children}
          </FlexView>
        </FlexView>
      </FlexView>
    );
  }
}
