import * as React from 'react';
import { ActionsMenu } from './ActionsMenu';
import FlexView from 'react-flexview';
import { Popover } from '../Popover/Popover';
import cx from 'classnames';

export type MenuRequiredProps = {
  /** custom content for the menu trigger */
  children?: JSX.Element | string;
  /** custom renderer for menu items. if none is passed, it renders ActionsMenu */
  menuRenderer?: (options: ActionsMenu.Option[]) => JSX.Element;
  /** menu options */
  options: ActionsMenu.Option[];
  /** called when menu is opened */
  onOpen: () => void;
  /** called when menu is closed */
  onClose: () => void;
  /** set of built-in max heights for the menu (if maxHeight is passed, this is ignored) */
  size?: Menu.Size;
  /** custom max height for the menu */
  maxHeight?: number;
  className?: string;
};

export type MenuDefaultProps = {
  /** whether the menu is open or not */
  isOpen: boolean;
  /** whether the menu should be closed when clicking outside */
  dismissOnClickOutside: boolean;
  /** whether the menu should be rendered on top or at the bottom of the trigger (bottom by default) */
  position: 'top' | 'bottom';
  /** whether the menu should be aligned with the start, the end or the center of the trigger (end by default) */
  anchor: Popover.Props['popover']['anchor'];
};

export namespace Menu {
  export type Size = 'small' | 'medium' | 'large';

  export type Props = MenuRequiredProps & Partial<MenuDefaultProps>;
}
type MenuDefaultedProps = MenuRequiredProps & MenuDefaultProps;

/**
 *  A menu with actions
 */
export class Menu extends React.PureComponent<Menu.Props> {
  getActionsMenuMaxHeight = (): number | undefined => {
    if (this.props.maxHeight) {
      return this.props.maxHeight;
    }

    if (this.props.size) {
      switch (this.props.size) {
        case 'small':
          return 250;
        case 'medium':
          return 400;
        case 'large':
          return 600;
      }
    }

    return undefined;
  };

  render() {
    const {
      children,
      dismissOnClickOutside,
      className,
      options,
      menuRenderer,
      isOpen,
      onClose,
      onOpen,
      position,
      anchor
    } = this.props as MenuDefaultedProps;

    const maxHeight = this.getActionsMenuMaxHeight();

    return (
      <Popover
        popover={{
          isOpen,
          dismissOnClickOutside,
          position: position ? position : 'bottom',
          anchor: anchor ? anchor : 'end',
          onShow: onOpen,
          onHide: onClose,
          event: 'click',
          className: 'actions-menu-popover',
          dismissOnScroll: false,
          content: menuRenderer ? (
            menuRenderer(options)
          ) : (
            <ActionsMenu onClick={onClose} options={options} maxHeight={maxHeight} />
          )
        }}
      >
        <FlexView vAlignContent="center" className={cx('menu', className)}>
          {children}
        </FlexView>
      </Popover>
    );
  }
}
