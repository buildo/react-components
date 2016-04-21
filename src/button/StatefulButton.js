import React from 'react';
import pick from 'lodash/pick';
import { pure, skinnable, props, t } from '../utils';
import Button, { ButtonPropTypes } from './Button';

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

 /**
 * ready or not-allowed; use it if you want button to handle its internal state and onClick is a promise
 */

@pure
@skinnable()
@props({
  ...ButtonPropTypes,
  baseState: t.maybe(t.enums.of(['ready', 'success', 'not-allowed'])),
  stableSuccess: t.Boolean,
  timerMillis: t.Number
})
export default class StatefulButton extends React.Component {

  constructor(props) {
    super(props);
    this.timeoutId = null;
    this.resetInternalStateAfterProcessing = false;
    this.state = {
      internalState: null
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  doResetInternalState = () => {
    if (this._isMounted) {
      this.setState({
        internalState: null
      });
    }
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

  doResetInternalStateAfterTimer = () => {
    this.timeoutId = setTimeout(() => {
      this.timeoutId = null;
      this.doResetInternalState();
    }, this.props.timerMillis);
  }

  attachPromiseHandlers = (promise) => {
    promise.then(() => {
      if (this._isMounted) {
        this.setState({
          internalState: 'success'
        }, () => {
          if (!this.props.stableSuccess) {
            this.doResetInternalStateAfterTimer();
          } else if (this.resetInternalStateAfterProcessing) {
            this.doResetInternalState();
          }
        });
      }
    }).catch(() => {
      if (this._isMounted) {
        this.setState({
          internalState: 'error'
        }, () => this.doResetInternalStateAfterTimer() );
      }
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
    const buttonProps = pick(this.props, Object.keys(ButtonPropTypes));
    return {
      ...buttonProps,
      buttonState: this.getButtonState()
    };
  }

  template(props) {
    return <Button {...props} />;
  }

}
