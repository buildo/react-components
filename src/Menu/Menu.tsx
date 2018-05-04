import * as React from 'react';
import { props, t, ReactChildren } from '../utils';
import { ActionsMenu, optionType } from './ActionsMenu';
import FlexView from 'react-flexview';
import { Icon } from '../Icon/Icon';
import { Popover } from '../Popover/Popover';
import * as cx from 'classnames';

export type MenuRequiredProps = {
  /** custom content for the menu trigger */
  children?: JSX.Element | string,
  /** custom renderer for menu items. if none is passed, it renders ActionsMenu */
  menuRenderer?: (options: ActionsMenu.Option[]) => JSX.Element,
  /** menu options */
  options: ActionsMenu.Option[],
  /** className for the buil-in icon rendered in the menu trigger (if children is passed, this is ignored) */
  iconClassName?: string,
  /** called when menu is opened */
  onOpen: () => void,
  /** called when menu is closed */
  onClose: () => void,
  /** the a set of built-in max heights for the menu (if maxHeight is passed, this is ignored) */
  size?: Menu.Size,
  /** custom max height for the menu */
  maxHeight?: number,
  className?: string
}

export type MenuDefaultProps = {
  /** whether the menu is open or not */
  isOpen: boolean,
  /** whether the menu should be closed when clicking outside */
  dismissOnClickOutside: boolean
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
  dismissOnClickOutside: t.maybe(t.Boolean),
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
    dismissOnClickOutside: true
  };

  toggleMenu = () => {
    const { isOpen, onOpen, onClose } = this.props as MenuDefaultedProps;
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  getActionsMenuMaxHeight = (): number | undefined => {
    if (this.props.maxHeight) {
      return this.props.maxHeight;
    }

    if (this.props.size) {
      switch (this.props.size) {
        case 'small': return 250;
        case 'medium': return 400;
        case 'large': return 600;
      }
    }
  };

  render() {
    const {
      iconClassName,
      children,
      dismissOnClickOutside,
      className,
      isOpen,
      onClose,
      options,
      menuRenderer
    } = this.props as MenuDefaultedProps;
    const { toggleMenu } = this;

    const maxHeight = this.getActionsMenuMaxHeight();

    return (
      <Popover
        popover={{
          isOpen,
          dismissOnClickOutside,
          event: 'click',
          anchor: 'end',
          position: 'bottom',
          className: 'actions-menu-popover',
          content:  menuRenderer ?
            menuRenderer(options) :
            <ActionsMenu onClick={onClose} options={options} maxHeight={maxHeight} />
        }}
      >
        <FlexView vAlignContent='center' className={cx('menu', className)} onClick={toggleMenu}>
          {dismissOnClickOutside && isOpen && (
            <div className='menu-overlay' onClick={onClose} />
          )}
          {children || (
            <FlexView vAlignContent='center' className={cx('menu-icon-container', { isOpen })}>
              <Icon icon={iconClassName} className='menu-icon' />
            </FlexView>
          )}
        </FlexView>
      </Popover>
    );
  }

}
