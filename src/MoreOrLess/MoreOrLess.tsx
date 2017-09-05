import * as React from 'react';
import cx = require('classnames');
import { props, t, ReactChildren } from '../utils';
import Icon from '../Icon/Icon';
import FlexView from 'react-flexview';

export type MoreOrLessProps = {
  /** panel content */
  children: any, // TODO: t.ReactChildren
  /** whether the panel should be expanded or not */
  expanded: boolean,
  /** called on toggle */
  onExpandedChange: (expanded: boolean) => void,
  /** icons for expanded and collapsed panel */
  icons: {
    expanded: string,
    collapsed: string
  },
  /** props for wrapper FlexView */
  wrapperProps?: object,
  /** an optional class name to pass to the component */
  className?: string,
  /** an optional style object to pass to the component */
  style?: React.CSSProperties
};

export const Props = {
  children: ReactChildren,
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
 */
@props(Props)
export default class MoreOrLess extends React.PureComponent<MoreOrLessProps> {

  toggleExpanded = () => {
    this.props.onExpandedChange(!this.props.expanded);
  };

  templateExpandButton = (icon: string, toggleExpanded: React.EventHandler<React.SyntheticEvent<HTMLDivElement>>) => {
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

  render() {
    const {
      props: { children, className, style, expanded, icons, wrapperProps },
      toggleExpanded
    } = this;

    const panelState = expanded ? 'more' : 'less';
    const icon = expanded ? icons.expanded : icons.collapsed;

    return (
      <FlexView column shrink={false} {...wrapperProps}
        style={style}
        className={cx('more-or-less', panelState, className)}
      >
        {children}
        {this.templateExpandButton(icon, toggleExpanded)}
      </FlexView>
    );
  }
}
