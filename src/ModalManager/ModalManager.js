import React from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-transition-group/TransitionGroup';
import { warn } from '../utils/log';
import { props, t, ReactElement } from '../utils';
import FlexView from 'react-flexview';
import TransitionWrapper from '../TransitionWrapper/TransitionWrapper';

export const Props = {
  children: t.maybe(t.ReactElement),
  transitionStyles: t.maybe(t.Object),
  transitionEnterTimeout: t.maybe(t.Number),
  transitionLeaveTimeout: t.maybe(t.Number),
  getChildContext: t.maybe(t.Function),
  childContextTypes: t.maybe(t.Object)
};

/**
 * Component to manage modals flow/animations inside an app:
 * - creates a portal `div` on the page `body`
 * - renders one modal at a time
 * - supports animations (by using `TransitionWrapper`)
 * @param children - active modal component
 * @param transitionStyles - object with style for each transition event (used by TransitionWrapper)
 * @param transitionEnterTimeout - duration of enter transition in milliseconds (used by TransitionWrapper)
 * @param transitionLeaveTimeout - duration of leave transition in milliseconds (used by TransitionWrapper)
 * @param getChildContext - callback to get custom context for modals. Can't be updated
 * @param childContextTypes - static object to describe custom context object for modals. Can't be updated
 */
@props(Props)
export default class ModalManager extends React.Component {

  static defaultProps = {
    transitionStyles: {},
    transitionEnterTimeout: 0,
    transitionLeaveTimeout: 0,
    childContextTypes: {},
    getChildContext: () => ({})
  };

  componentWillMount() {
    const { childContextTypes, getChildContext } = this.props;

    const ContextWrapper = ({ children }) => children;

    ContextWrapper.childContextTypes = childContextTypes;
    ContextWrapper.getChildContext = getChildContext;

    props({ children: ReactElement })(ContextWrapper);

    this.ContextWrapper = ContextWrapper;
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
  };

  appendModalContainer = () => {
    if (!this.containerNode) {
      this.containerNode = document.createElement('div');
      document.body.appendChild(this.containerNode);
    }
  };

  removeModalContainer = () => {
    if (this.containerNode) {
      document.body.removeChild(this.containerNode);
      this.containerNode = null;
    }
  };

  getModalManager = () => {
    return (
      <div>
        <ReactTransitionGroup>
          {this.getModal()}
        </ReactTransitionGroup>
      </div>
    );
  };

  renderModals = () => {
    const Modal = this.getModalManager();
    const { ContextWrapper } = this;
    ReactDOM.render(<ContextWrapper>{Modal}</ContextWrapper>, this.containerNode);
  };

  render() {
    return null;
  }

  componentDidUpdate() {
    this.renderModals();
  }

}
