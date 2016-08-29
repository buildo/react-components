import React from 'react';
import cx from 'classnames';
import { pure, props, t, skinnable } from '../utils';
import Icon from '../Icon/Icon';
import FlexView from '../flex/FlexView';

export const Props = {
  children: t.ReactChildren,
  expanded: t.Boolean,
  onExpandedChange: t.Function,
  icons: t.struct({
    expanded: t.String,
    collapsed: t.String
  }),
  wrapperProps: t.maybe(t.Object),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
};

/**
 * A panel used to alternately display short or long version of the content
 * @param children - panel content
 * @param expanded - whether the panel should be expanded or not
 * @param onExpandedChange - called on toggle
 * @param icons - icons for expanded and collapsed panel
 * @param wrapperProps - props for wrapper FlexView
 */
@pure
@skinnable()
@props(Props)
export default class MoreOrLess extends React.Component {

  toggleExpanded = () => {
    this.props.onExpandedChange(!this.props.expanded);
  };

  getLocals() {
    const {
      props: { children, className, style, expanded, icons, wrapperProps },
      toggleExpanded
    } = this;

    const panelState = expanded ? 'more' : 'less';
    const icon = expanded ? icons.expanded : icons.collapsed;
    return {
      children,
      icon,
      toggleExpanded,
      wrapperProps: {
        ...wrapperProps,
        style,
        className: cx('more-or-less', panelState, className)
      }
    };
  }

  templateExpandButton = ({ icon, toggleExpanded }) => {
    return (
      <FlexView
        hAlignContent='center'
        vAlignContent='center'
        className='expand-button'
        onClick={toggleExpanded}
        shrink={false}
      >
        <Icon icon={icon} className='expand-button-icon' />
      </FlexView>
    );
  };

  template({ children, wrapperProps, icon, toggleExpanded }) {
    return (
      <FlexView column shrink={false} {...wrapperProps}>
        {children}
        {this.templateExpandButton({ icon, toggleExpanded })}
      </FlexView>
    );
  }
}
