import React from 'react';
import { pure, skinnable, props, t } from '../utils';

const buttonBaseStates = ['ready', 'success', 'not-allowed'];
const buttonStates = buttonBaseStates.concat(['processing', 'error']);
export const buttonBaseState = t.enums.of(buttonBaseStates, 'buttonBaseState');
export const buttonState = t.enums.of(buttonStates, 'buttonStates');

// const PromiseType = t.irreducible('Promise', x => x instanceof Promise);

/**
 * A generic button wrapper; it handles processing/success/failure states
 *
 * If buttonState is passed in as a prop, all internal states are overridden.
 *
 * stableSuccess should not be changed for the lifetime of the component
 *
 * Otherwise, the following happens:
 *
 *   internalState = null
 *     |
 *     ? click
 *     | --> invoke onClick and grab promise
 *     V
 *   internalState = processing
 *     |                    \
 *     ? promise success     ------? promise failure
 *     |                            \
 *     V                             V
 *   internalState = success       internalState = error
 *     |                 \                           \
 *     |                  --------                    --------------------
 *     |                          \                                       \
 *     ? stableSuccess is true     ? stableSuccess is false                |
 *     |                           |                                       |
 *     O wait for prop change      * < wait for timerMillis milliseconds > *
 *                                 |                                      /
 *                                 |              ------------------------
 *                                 |             /
 *                                 V             V
 *                               internalState = null
 *
 */
@pure
@skinnable()
@props({
  buttonState: t.maybe(buttonState),
  baseState: t.maybe(buttonBaseState),
  // onClick: t.func([], PromiseType),
  onClick: t.Func,
  stableSuccess: t.Bool,
  children: t.Func, // TODO check usage of React.CloneElement
  timerMillis: t.Num
})
export default class ButtonLogic extends React.Component {

  constructor(props) {
    super(props);
    this.timeoutId = null;
    this.resetInternalStateAfterProcessing = false;
    this.state = {
      internalState: null
    };
  }

  doResetInternalState() {
    this.setState({
      internalState: null
    });
  }

  componentWillReceiveProps(props) {
    if (process.env.NODE_ENV !== 'production') {
      t.assert(props.stableSuccess === this.props.stableSuccess);
    }

    if (props.buttonState) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
    if (props.baseState !== this.props.baseState) {
      if (this.state.internalState === 'processing') {
        this.resetInternalStateAfterProcessing = true;
      } else {
        this.doResetInternalState();
      }
    }
  }

  doResetInternalStateAfterTimer() {
    this.timeoutId = setTimeout(() => {
      this.timeoutId = null;
      this.doResetInternalState();
    }, this.props.timerMillis);
  }

  attachPromiseHandlers(promise) {
    promise.then(() => {
      this.setState({
        internalState: 'success'
      }, () => {
        if (!this.props.stableSuccess) {
          this.doResetInternalStateAfterTimer();
        } else if (this.resetInternalStateAfterProcessing) {
          this.doResetInternalState();
        }
      });
    }).catch(() => {
      this.setState({
        internalState: 'error'
      }, () => this.doResetInternalStateAfterTimer() );
    });
  }

  getButtonState = () => (this.props.buttonState || this.state.internalState || this.props.baseState);

  onClick = () => {
    if (this.getButtonState() === 'ready') {
      this.resetInternalStateAfterProcessing = false;
      const promise = this.props.onClick();
      if (!this.props.buttonState) {
        this.setState({
          internalState: 'processing'
        }, () => this.attachPromiseHandlers(promise) );
      }
    }
  };

  getLocals() {
    return {
      buttonState: this.getButtonState(),
      onClick: this.onClick,
      child: this.props.children
    };
  }

  template({ buttonState, onClick, child }) {
    return child({ buttonState, onClick });
  }

}
