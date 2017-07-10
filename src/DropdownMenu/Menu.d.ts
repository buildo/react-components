import { CSSProperties, PureComponent } from 'react';

export namespace MenuProps {
  type Option = {
    type: 'title' | 'item' | 'divider',
    title?: any, // TODO: t.ReactChildren
    metadata?: any,
    selected?: boolean,
    disabled?: boolean,
    onClick?: (option: MenuProps.Option) => void
  }
}

export type MenuProps = {
  options?: MenuProps.Option[],
  maxHeight?: number,
  onClick?: () => void,
  style?: CSSProperties
}

export default class Menu extends PureComponent<MenuProps> {}
