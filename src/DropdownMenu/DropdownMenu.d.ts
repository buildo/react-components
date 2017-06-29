import { PureComponet } from 'react';
import { MenuProps } from './Menu';

export type DropdownMenuProps = {
  children?: any, // TODO: t.ReactChildren
  menuRenderer?: (options: MenuProps.Option) => JSX.Element,
  options: MenuProps.Option[],
  iconClassName?: string,
  isOpen?: boolean,
  onOpen: () => void,
  onClose: () => void,
  dismissOnClickOut?: boolean,
  size?: 'small' | 'medium' | 'large',
  maxHeight?: number,
  className?: string
}

export default class DropdownMenu extends PureComponent<DropdownMenuProps> {}
