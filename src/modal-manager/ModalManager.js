import React from 'react';
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';
import { warn } from '../utils/log';
import { props, t } from '../utils';
import FlexView from '../flex/FlexView';
import TransitionWrapper from '../transition-wrapper/TransitionWrapper';

/**
 * ### Component to manage modals flow/animations inside an app:
 * - creates a portal `div` on the page `body`
 * - renders one modal at a time
 * - supports animations (by using `TransitionWrapper`)
 */
@props({
  /**
   * active modal component
   */
  children: t.maybe(t.ReactElement),
  /**
   * object with style for each transition event (used by TransitionWrapper)
   */
  transitionStyles: t.maybe(t.Object),
  /**
   * duration of enter transition in milliseconds (used by TransitionWrapper)
   */
  transitionEnterTimeout: t.maybe(t.Number),
  /**
   * duration of leave transition in milliseconds (used by TransitionWrapper)
   */
  transitionLeaveTimeout: t.maybe(t.Number),
  /**
   * callback to get custom context for modals. Can't be updated
   */
  getChildContext: t.maybe(t.Function),
  /**
   * static object to describe custom context object for modals. Can't be updated
   */
  childContextTypes: t.maybe(t.Object)
})
export default class ModalManager extends React.Component {

  static defaultProps = {
    transitionStyles: {},
    transitionEnterTimeout: 0,
    transitionLeaveTimeout: 0,
    childContextTypes: {},
    getChildContext: () => ({})
  }

  componentWillMount() {
    const { childContextTypes, getChildContext } = this.props;
    this.ContextWrapper = class ContextWrapper extends React.Component { // eslint-disable-line react/no-multi-comp
      static propTypes = {
        children: React.PropTypes.element.isRequired
      }
      static childContextTypes = childContextTypes
      static getChildContext = getChildContext
      render = () => this.props.children
    };
  }

  componentDidMount() {
    this.appendModalContainer();
    this.renderModals();
  }

  componentWillUnmount() {
    this.removeModalContainer();
  }

  getModal = () => {
    const {
      transitionStyles,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      children
    } = this.props;

    const props = {
      transitionStyles,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      style: {
        height: '100%',
        width: '100%',
        position: 'fixed',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 999
      },
      className: 'modal-wrapper',
      component: FlexView,
      vAlignContent: 'center',
      hAlignContent: 'center'
    };

    return [].concat(children).filter(e => !!e).map(el => {
      if (!el.key) {
        warn('Each modal should have a unique "key" prop');
      }
      return (
        <TransitionWrapper {...props} key={el.key}>
          {children}
        </TransitionWrapper>
      );
    });
  }

  appendModalContainer = () => {
    if (!this.containerNode) {
      this.containerNode = document.createElement('div');
      document.body.appendChild(this.containerNode);
    }
  }

  removeModalContainer = () => {
    if (this.containerNode) {
      document.body.removeChild(this.containerNode);
      this.containerNode = null;
    }
  }

  getModalManager = () => {
    return (
      <div>
        <ReactTransitionGroup>
          {this.getModal()}
        </ReactTransitionGroup>
      </div>
    );
  }

  renderModals = () => {
    const Modal = this.getModalManager();
    React.render(<this.ContextWrapper>{Modal}</this.ContextWrapper>, this.containerNode);
  }

  render() {
    return null;
  }

  componentDidUpdate() {
    this.renderModals();
  }

}
