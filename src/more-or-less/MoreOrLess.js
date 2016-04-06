import React from 'react';
import cx from 'classnames';
import { pure, props, t, skinnable } from '../utils';
import Icon from '../Icon/Icon';
import FlexView from '../flex/FlexView';


@pure
@skinnable()
@props({
  children: t.ReactChildren,
  expanded: t.Boolean,
  onExpandedChange: t.Function,
  icons: t.struct({
    expanded: t.String,
    collapsed: t.String
  }),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
})
export default class MoreOrLess extends React.Component {

  toggleExpanded = () => {
    this.props.onExpandedChange(!this.props.expanded);
  };

  getLocals() {
    const {
      props: { children, className, style, expanded, icons },
      toggleExpanded
    } = this;

    const panelState = expanded ? 'more' : 'less';
    const icon = expanded ? icons.expanded : icons.collapsed;
    return {
      children,
      style,
      icon,
      toggleExpanded,
      className: cx('more-or-less', panelState, className)
    };
  }

  templateExpandButton = ({ icon, toggleExpanded }) => {
    return (
      <FlexView
        hAlignContent='center'
        vAlignContent='center'
        className='expand-button'
        onClick={toggleExpanded}
      >
        <Icon icon={icon} className='expand-button-icon' />
      </FlexView>
    );
  };

  template({ children, className, style, icon, toggleExpanded }) {
    return (
      <div {...{ className, style }}>
        {children}
        {this.templateExpandButton({ icon, toggleExpanded })}
      </div>
    );
  }
}
