import { ComponentType, CSSProperties, PureComponent } from 'react';
import { Type } from 'tcomb';
import { TextOverflowProps } from '../text-overflow';

export namespace ButtonProps {

  type ButtonState = 'ready' | 'not-allowed' | 'processing' | 'error' | 'success';
  type ButtonType = 'default' | 'primary' | 'positive' | 'negative' | 'flat';
  type ButtonSize = 'tiny' | 'small' | 'medium';

}
// TODO: props invariants validation
export type ButtonProps = {
  onClick: (e: React.SyntheticEvent<HTMLDivElement>) => void,
  buttonState?: ButtonProps.ButtonState,
  label?: string | { [key in ButtonProps.ButtonState]?: string },
  icon?: string | { [key in ButtonProps.ButtonState]?: string },
  children?: string,
  type?: ButtonProps.ButtonType,
  primary?: boolean,
  flat?: boolean,
  size?: ButtonProps.ButtonSize,
  fluid?: boolean,
  circular?: boolean,
  textOverflow?: ComponentType<any>, // TODO: should check for textOverflowProsp
  style?: CSSProperties,
  className?: string
}

export type ButtonPropTypes = ButtonProps;

export default class Button extends PureComponent<ButtonProps> {}

export const Props: {
  [key: string]: Type<any>
}

export const buttonStates: ButtonProps.ButtonState[];
export const buttonSizes: ButtonProps.ButtonSize[];
export const buttonTypes: ButtonProps.ButtonType[];

