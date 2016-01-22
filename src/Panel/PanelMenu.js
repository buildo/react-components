import React from 'react';
import { props, t, skinnable, pure } from '../utils';
import compact from 'lodash/array/compact';
import flatten from 'lodash/array/flatten';
import omit from 'lodash/object/omit';
import partial from 'lodash/function/partial';
import DropdownMenu, { Props as dropdownMenuProps } from '../DropdownMenu/DropdownMenu';
import Divider from '../Divider/Divider';
import TooltippedIcon from '../Icon/TooltippedIcon';
import Tooltip from '../Tooltip/Tooltip';
import FlexView from '../flex/FlexView';
import cx from 'classnames';

import './panelMenu.scss';

export const Props = {
  actionsGroups: t.list(t.struct({
    name: t.maybe(t.Str),
    actions: t.list(t.subtype(t.struct({
      name: t.Str,
      callBack: t.Func,
      shortcut: t.maybe(t.struct({
        label: t.Str,
        keyCode: t.Str
      })),
      featured: t.maybe(t.struct({
        icon: t.Str,
        color: t.maybe(t.Str)
      })),
      disabled: t.maybe(t.struct({
        reason: t.Str
      })),
      selected: t.maybe(t.Bool)
      // handling either disabled or selected for each action
    }), ({ disabled, selected }) => !(disabled && selected)))
  })),
  ...omit(dropdownMenuProps, ['children', 'options', 'iconClassName'])
};

@pure
@skinnable()
@props(Props)
export default class PanelMenu extends React.Component {

  static defaultProps = {
    isOpen: false
  }

  makeActionItem = action => ({
    type: 'item',
    title: (() => {
      if (typeof action.selected !== 'undefined') {
        return this.makeSelectableAction(action);
      } else {
        return action.disabled ? this.makeDisabledAction(action) : action.name;
      }
    })(),
    onClick: action.disabled ? () => {} : action.callBack,
    metadata: action.shortcut && action.shortcut.label,
    disabled: !!action.disabled
  })

  makeDisabledAction = action => (
    <Tooltip
      popover={{ content: `${action.disabled.reason}`, position: 'top', anchor: 'start' }}
      style={{ display: 'inline-block', cursor: 'not-allowed', width: '100%' }}
    >
      <div style={{ opacity: '.5' }}>{action.name}</div>
    </Tooltip>
  )

  makeSelectableAction = ({ name, selected }) => (
    <FlexView row vAlignContent="center">
      <i
        style={{
          marginRight: 6,
          marginTop: 4
        }}
        className={cx('icon', {
          'icon-square-o': !selected,
          'icon-check-in': selected
        })}
      />
      <div>{name}</div>
    </FlexView>
  )

  makeOptions = actionsGroups => {
    return compact(flatten(
      actionsGroups.map((actionsGroup, index) => []
        .concat(actionsGroup.name && { type: 'title', title: actionsGroup.name })
        .concat(actionsGroup.actions
          .map(this.makeActionItem)
        )
        .concat(index !== actionsGroups.length - 1 && { type: 'divider' })
      )
    ));
  }

  makeActionIcon = action => ({
    label: action.name,
    disabled: action.disabled,
    onClick: partial(action.callBack, action),
    ...action.featured
  })

  makeActionIcons = actionsGroups => {
    return flatten(
      actionsGroups.map(actionsGroup => actionsGroup.actions
        .filter( action => action.featured )
        .map(this.makeActionIcon)
      )
    ).slice(0, 5);
  }

  getLocals() {

    const { actionsGroups } = this.props;
    const iconClassName = 'widget-menu';
    const options = this.makeOptions(actionsGroups);
    const actionIcons = this.makeActionIcons(actionsGroups);

    return {
      options,
      iconClassName,
      actionIcons,
      ...this.props
    };
  }

  template(locals) {
    return (
      <FlexView className='panel-menu' marginLeft='auto' vAlignContent='center'>
        {locals.actionIcons.map( ({ icon, color, label, disabled, onClick }, i) => (
        <TooltippedIcon
          className='panel-menu-action-icon'
          label={disabled ? `${label} is disabled because ${disabled.reason}` : label}
          icon={icon}
          style={{ color, opacity: disabled ? '.5' : '1', cursor: disabled ? 'not-allowed' : 'pointer' }}
          onClick={disabled ? null : onClick}
          key={`${icon}-${i}`}
        />
        ))}
        <Divider orientation='horizontal' size='no-margin' style={{ height: 26 }} />
        <DropdownMenu
          options={locals.options}
          isOpen={locals.isOpen}
          onOpen={locals.onOpen}
          onClose={locals.onClose}
          iconClassName={locals.iconClassName}
          size={locals.size}
          maxHeight={locals.maxHeight}
          dismissOnClickOut={locals.dismissOnClickOut}
        />
      </FlexView>
    );
  }

}
