import { CSSProperties, ComponentClass, ComponentType, FocusEventHandler } from 'react';
import { Type } from 'tcomb';

export type FocusableViewProps = {
  children: any, // TODO(typo): t.ReactChildren | (focused: boolean) => JSX.Element
  onFocus?: FocusEventHandler<any>,
  onBlur?: FocusEventHandler<any>,
  tabIndex?: number,
  component?: ComponentType<any>,
  ignoreFocus?: boolean,
  debounce?: number,
  className?: string,
  style?: CSSProperties,
  [k: string]: any
};

export const Props: {
  [key: string]: Type<any>
};

declare const FocusableView: ComponentClass<FocusableViewProps>;
export default FocusableView;
