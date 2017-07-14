import { CSSProperties, PureComponent } from 'react';
import { Type } from 'tcomb';

export type FormattedTextProps = {
  children: string,
  id?: string,
  className?: string,
  style?: CSSProperties
}

export const Props: {
  [key: string]: Type<any>
}

export default class FormattedText extends PureComponent<FormattedTextProps> {}
