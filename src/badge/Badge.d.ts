import { PureComponent } from 'react';

export type BadgeProps = {
  label: any,
  active?: boolean,
  className?: string,
  style?: object
}

export default class Badge extends PureComponent<BadgeProps> {}
