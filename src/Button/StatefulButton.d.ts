import { PureComponent } from 'react';
import { ButtonProps } from './Button';

export namespace StatefulButtonProps {
  type ButtonBaseState = 'ready' | 'success' | 'not-allowed';
}

export type StatefulButtonProps = ButtonProps & {
  onClick: (e: React.SyntheticEvent<HTMLDivElement>) => Promise<any>,
  baseState?: StatefulButtonProps.ButtonBaseState,
  stableSuccess?: boolean,
  timerMillis?: number
};

export default class StatefulButton extends PureComponent<StatefulButtonProps> {}
