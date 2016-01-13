import React from 'react';
import { pure, props, t, skinnable } from 'revenge';
import { Icon } from 'Basic';

import './moreOrLess.scss';

@pure
@skinnable()
@props({
  children: t.ReactNode,
  className: t.maybe(t.Str),
  expanded: t.Bool,
  onExpandedChange: t.Func
})
export default class MoreOrLess extends React.Component {

  toggleExpanded = () => {
    this.props.onExpandedChange(!this.props.expanded);
  }

  getLocals() {
    const panelState = this.props.expanded ? 'more' : 'less';
    const className = `more-or-less ${panelState} ${this.props.className}`;
    const { toggleExpanded } = this;
    const icon = this.props.expanded ? 'angle-up' : 'angle-down';
    return {
      content: this.props.children,
      className,
      icon,
      toggleExpanded
    };
  }

  templateExpandButton = ({ icon, toggleExpanded }) => {
    return (
      <div className="expand-button" onClick={toggleExpanded}>
        <Icon icon={icon} className="expand-button-icon" />
      </div>
    );
  }

  template({ className, content, icon, toggleExpanded }) {
    return (
      <div className={className}>
        {content}
        {this.templateExpandButton({ icon, toggleExpanded })}
      </div>
    );
  }
}
