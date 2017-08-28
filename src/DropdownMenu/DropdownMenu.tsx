import * as React from 'react';
import { props, t, ReactChildren } from '../utils';
import Menu, { optionType } from './Menu';
import FlexView from 'react-flexview';
import Icon from '../Icon/Icon';
import cx from '../utils/classnames';
import { MenuProps } from './Menu';

export namespace DropdownMenuProps {
  export type size =  'small' | 'medium' | 'large';
}

export type DropdownMenuRequiredProps = {
  /** menu button content */
  children?: JSX.Element | string,
  /** renderer for menu items */
  menuRenderer?: (options: MenuProps.Option[]) => JSX.Element,
  /** menu options */
  options: MenuProps.Option[],
  /** className for menu button icon (if children is passed, this is ignored) */
  iconClassName?: string,
  /** called when menu is open */
  onOpen: () => void,
  /** called when menu is closed */
  onClose: () => void,
  /** the height of the menu button */
  size?: DropdownMenuProps.size,
  /** menu button max-height */
  maxHeight?: number,
  className?: string
}

export type DropdownMenuDefaultProps = {
  /** whether the menu is open or not */
  isOpen: boolean,
  /** whether the menu should be closed when clicking outside the dropdown */
  dismissOnClickOut: boolean
}

export type DropdownMenuProps = DropdownMenuRequiredProps & Partial<DropdownMenuDefaultProps>;
type DropdownMenuDefaultedProps = DropdownMenuRequiredProps & DropdownMenuDefaultProps;

export const Props = {
  children: t.maybe(ReactChildren),
  menuRenderer: t.maybe(t.Function),
  options: t.list(optionType),
  iconClassName: t.maybe(t.String), // if children is passed, this is ignored
  isOpen: t.maybe(t.Boolean),
  onOpen: t.Function,
  onClose: t.Function,
  dismissOnClickOut: t.maybe(t.Boolean),
  size: t.maybe(t.enums.of(['small', 'medium', 'large']), ''),
  maxHeight: t.maybe(t.Number),
  className: t.maybe(t.String)
};

/**
 *  A toggleable dropdown menu
 */
@props(Props)
export default class DropdownMenu extends React.PureComponent<DropdownMenuProps> {

  static defaultProps: DropdownMenuDefaultProps = {
    isOpen: false,
    dismissOnClickOut: true
  };

  toggleMenu = () => {
    const { isOpen, onOpen, onClose } = this.props as DropdownMenuDefaultedProps;
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  onMenuClick = () => {
    this.toggleMenu();
  };

  getHeightFromSize = (size?: DropdownMenuProps.size) => {
    switch (size) {
      case 'small': return 250;
      case 'medium': return 400;
      case 'large': return 600;
      default: return null;
    }
  };

  templateToggler = ({ children, iconClassName, isOpen }: {
    children?: JSX.Element | string,
    iconClassName?: string,
    isOpen: boolean
  }) => {
    return (
      children || this.templateIconButton({ iconClassName, isOpen })
    );
  };

  templateIconButton = ({ iconClassName, isOpen }: { iconClassName?: string, isOpen: boolean }) => {
    return (
      <FlexView vAlignContent='center' className={cx('dropdown-menu-icon-container', { isOpen })}>
        <Icon icon={iconClassName} className='dropdown-menu-icon' />
      </FlexView>
    );
  };

  templateMenu = ({ isOpen, options, height, onMenuClick }: {
    isOpen: boolean,
    options: MenuProps.Option[],
    height: number | null,
    onMenuClick: () => void
  }) => {
    return isOpen ? (
      <FlexView onClick={onMenuClick}>
        {this.props.menuRenderer ?
          this.props.menuRenderer(options) : <Menu options={options} style={{ maxHeight: height }} />
        }
      </FlexView>
    ) : null;
  };

  templateOverlay = ({ isOpen, toggleMenu, dismissOnClickOut }: {
    isOpen: boolean,
    toggleMenu: () => void,
    dismissOnClickOut: boolean
  }) => {
    return (
      dismissOnClickOut && isOpen ? <div className='dropdown-menu-overlay' onClick={toggleMenu} /> : null
    );
  };

  render() {
    const {
      iconClassName,
      children,
      options,
      dismissOnClickOut,
      maxHeight,
      className,
      size,
      isOpen
    } = this.props as DropdownMenuDefaultedProps;
    const { toggleMenu, onMenuClick } = this;

    const height = maxHeight || this.getHeightFromSize(size);

    return (
      <FlexView vAlignContent='center' className={cx('dropdown-menu', className)} onClick={toggleMenu}>
        {this.templateOverlay({ isOpen, toggleMenu, dismissOnClickOut })}
        {this.templateToggler({ children, iconClassName, isOpen })}
        {this.templateMenu({ isOpen, options, height, onMenuClick })}
      </FlexView>
    );
  }

}
