import React from 'react';
import { props, t, skinnable } from '../utils';
import Menu, { optionType } from './Menu';
import FlexView from 'react-flexview';
import Icon from '../Icon/Icon';
import cx from '../utils/classnames';

export const Props = {
  children: t.maybe(t.ReactChildren),
  menuRenderer: t.maybe(t.Function),
  options: t.list(optionType),
  iconClassName: t.maybe(t.Str), // if children is passed, this is ignored
  isOpen: t.maybe(t.Bool),
  onOpen: t.Func,
  onClose: t.Func,
  dismissOnClickOut: t.maybe(t.Bool),
  size: t.maybe(t.enums.of(['small', 'medium', 'large']), ''),
  maxHeight: t.maybe(t.Num),
  className: t.maybe(t.Str)
};

/** A toggleable dropdown menu
 * @param children - menu button content
 * @param menuRenderer - renderer for menu items
 * @param options - menu options
 * @param iconClassName - className for menu button icon (if children is passed, this is ignored)
 * @param isOpen - whether the menu is open or not
 * @param onOpen - called when menu is open
 * @param onClose - called when menu is closed
 * @param dismissOnClickOut - whether the menu should be closed when clicking outside the dropdown
 * @param size - small | medium | large
 * @param maxHeight - menu button max-height
 */
@skinnable()
@props(Props)
export default class DropdownMenu extends React.PureComponent {
  static defaultProps = {
    isOpen: false,
    dismissOnClickOut: true
  };

  toggleMenu = () => {
    if (this.props.isOpen) {
      this.props.onClose();
    } else {
      this.props.onOpen();
    }
  };

  onMenuClick = () => {
    this.toggleMenu();
  };

  getHeightFromSize = size => {
    switch (size) {
      case 'small': return 250;
      case 'medium': return 400;
      case 'large': return 600;
      default: return null;
    }
  };

  getLocals() {
    const {
      toggleMenu,
      onMenuClick,
      props: {
        iconClassName,
        children,
        options,
        dismissOnClickOut,
        maxHeight,
        className,
        size,
        isOpen
      }
    } = this;

    const height = maxHeight || this.getHeightFromSize(size);

    return {
      toggleMenu,
      iconClassName,
      children,
      options,
      isOpen,
      dismissOnClickOut,
      onMenuClick,
      className,
      height
    };
  }

  templateToggler = ({ children, iconClassName, toggleMenu, isOpen }) => {
    return (
      children || this.templateIconButton({ iconClassName, toggleMenu, isOpen })
    );
  };

  templateIconButton = ({ iconClassName, isOpen }) => {
    return (
      <FlexView vAlignContent='center' className={cx('dropdown-menu-icon-container', { isOpen })}>
        <Icon icon={iconClassName} className='dropdown-menu-icon' />
      </FlexView>
    );
  };

  templateMenu = ({ isOpen, options, height, onMenuClick }) => {
    return isOpen ? (
      <FlexView onClick={onMenuClick}>
        {this.props.menuRenderer ?
          this.props.menuRenderer(options) : <Menu options={options} style={{ maxHeight: height }} />
        }
      </FlexView>
    ) : null;
  };

  templateOverlay = ({ isOpen, toggleMenu, dismissOnClickOut }) => {
    return (
      dismissOnClickOut && isOpen ? <div className='dropdown-menu-overlay' onClick={toggleMenu} /> : null
    );
  };

  template({ iconClassName, toggleMenu, children, options, isOpen, dismissOnClickOut, className, onMenuClick, height }) {
    return (
      <FlexView vAlignContent='center' className={cx('dropdown-menu', className)} onClick={toggleMenu}>
        {this.templateOverlay({ isOpen, toggleMenu, dismissOnClickOut })}
        {this.templateToggler({ children, iconClassName, toggleMenu, isOpen })}
        {this.templateMenu({ isOpen, options, height, toggleMenu, onMenuClick })}
      </FlexView>
    );
  }

}
