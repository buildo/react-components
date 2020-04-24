import * as React from 'react';
import { ObjectOmit } from '../utils';
import { Button } from './Button';
import { warn } from '../utils/log';

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

export interface StatefulButtonRequiredProps extends Button.Props {
  /** callback */
  onClick: (e: React.SyntheticEvent<HTMLDivElement>) => Promise<any>;
  /** ready, not-allowed, success, use it if you want button to be a functional component */
  baseState?: StatefulButton.ButtonBaseState;
}

export interface StatefulButtonDefaultProps {
  /** keep success state  */
  stableSuccess: boolean;
  /** time in millisecons to wait before state reset  */
  timerMillis: number;
}

export namespace StatefulButton {
  export type ButtonBaseState = 'ready' | 'success' | 'not-allowed';
  export type Props = ObjectOmit<Button.Props, 'onClick'> &
    StatefulButtonRequiredProps &
    Partial<StatefulButtonDefaultProps>;
}

export type State = {
  internalState: 'error' | 'processing' | 'success' | null;
};

export class StatefulButton extends React.PureComponent<StatefulButton.Props, State> {
  private timeoutId: number | null;
  private resetInternalStateAfterProcessing: boolean;
  private _isMounted: boolean = false;

  static defaultProps: StatefulButtonDefaultProps = {
    stableSuccess: false,
    timerMillis: 2000
  };

  state = {
    internalState: null
  };

  constructor(props: StatefulButton.Props) {
    super(props);
    this.timeoutId = null;
    this.resetInternalStateAfterProcessing = false;
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
  };

  componentDidUpdate(prevProps: StatefulButton.Props) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.stableSuccess !== prevProps.stableSuccess) {
        warn('StatefulButton: changing the "stableSuccess" prop is not supported');
      }
    }

    if (this.props.buttonState) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
    if (this.props.baseState !== prevProps.baseState) {
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
  };

  attachPromiseHandlers = (promise: Promise<void>) => {
    promise
      .then(() => {
        return (
          this._isMounted &&
          this.setState(
            {
              internalState: 'success'
            },
            () => {
              if (!this.props.stableSuccess) {
                this.doResetInternalStateAfterTimer();
              } else if (this.resetInternalStateAfterProcessing) {
                this.doResetInternalState();
              }
            }
          )
        );
      })
      .catch(() => {
        if (this._isMounted) {
          this.setState(
            {
              internalState: 'error'
            },
            () => this.doResetInternalStateAfterTimer()
          );
        }
      });
  };

  getButtonState = () => this.props.buttonState || this.state.internalState || this.props.baseState;

  onClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    if (this.getButtonState() === 'ready') {
      this.resetInternalStateAfterProcessing = false;
      const promise = this.props.onClick(e);
      if (!this.props.buttonState) {
        this.setState(
          {
            internalState: 'processing'
          },
          () => this.attachPromiseHandlers(promise)
        );
      }
    }
  };

  render() {
    const { baseState, stableSuccess, timerMillis, ...buttonProps } = this.props;

    return <Button {...buttonProps} onClick={this.onClick} buttonState={this.getButtonState()} />;
  }
}
