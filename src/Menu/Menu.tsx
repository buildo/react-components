import * as React from 'react';
import { props, t, ReactChildren } from '../utils';
import { ActionsMenu, optionType } from './ActionsMenu';
import FlexView from 'react-flexview';
import { Icon } from '../Icon/Icon';
import * as cx from 'classnames';

export type MenuRequiredProps = {
  /** menu button content */
  children?: JSX.Element | string,
  /** renderer for menu items */
  menuRenderer?: (options: ActionsMenu.Option[]) => JSX.Element,
  /** menu options */
  options: ActionsMenu.Option[],
  /** className for menu button icon (if children is passed, this is ignored) */
  iconClassName?: string,
  /** called when menu is open */
  onOpen: () => void,
  /** called when menu is closed */
  onClose: () => void,
  /** the height of the menu button */
  size?: Menu.Size,
  /** menu button max-height */
  maxHeight?: number,
  className?: string
}

export type MenuDefaultProps = {
  /** whether the menu is open or not */
  isOpen: boolean,
  /** whether the menu should be closed when clicking outside */
  dismissOnClickOut: boolean
}

export namespace Menu {
  export type Size =  'small' | 'medium' | 'large';

  export type Props = MenuRequiredProps & Partial<MenuDefaultProps>;
}
type MenuDefaultedProps = MenuRequiredProps & MenuDefaultProps;

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
 *  A menu with actions
 */
@props(Props)
export class Menu extends React.PureComponent<Menu.Props> {

  static defaultProps: MenuDefaultProps = {
    isOpen: false,
    dismissOnClickOut: true
  };

  toggleMenu = () => {
    const { isOpen, onOpen, onClose } = this.props as MenuDefaultedProps;
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  onMenuClick = () => {
    this.toggleMenu();
  };

  getHeightFromSize = (size?: Menu.Size) => {
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
      <FlexView vAlignContent='center' className={cx('menu-icon-container', { isOpen })}>
        <Icon icon={iconClassName} className='menu-icon' />
      </FlexView>
    );
  };

  templateActionsMenu = ({ isOpen, options, height, onMenuClick }: {
    isOpen: boolean,
    options: ActionsMenu.Option[],
    height: number | null,
    onMenuClick: () => void
  }) => {
    return isOpen ? (
      <FlexView onClick={onMenuClick}>
        {this.props.menuRenderer ?
          this.props.menuRenderer(options) : <ActionsMenu options={options} style={{ maxHeight: height }} />
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
      dismissOnClickOut && isOpen ? <div className='menu-overlay' onClick={toggleMenu} /> : null
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
    } = this.props as MenuDefaultedProps;
    const { toggleMenu, onMenuClick } = this;

    const height = maxHeight || this.getHeightFromSize(size);

    return (
      <FlexView vAlignContent='center' className={cx('menu', className)} onClick={toggleMenu}>
        {this.templateOverlay({ isOpen, toggleMenu, dismissOnClickOut })}
        {this.templateToggler({ children, iconClassName, isOpen })}
        {this.templateActionsMenu({ isOpen, options, height, onMenuClick })}
      </FlexView>
    );
  }

}
