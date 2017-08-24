import * as React from 'react';
import cx from '../utils/classnames';
import { props, t, ReactChildren, ReactChild } from '../utils';
import FlexView from 'react-flexview';
import Icon from '../Icon/Icon';

export type CollapsibleSectionDefaultProps = {
  /** called when panel is expanded */
  onOpen: () => void,
  /** called when panel is collapsed */
  onClose: () => void,
};

export type CollapsibleSectionRequiredProps = {
  /** panel content (visible only when expanded) */
  children: JSX.Element,
  /** true if panel is expanded */
  isOpen: boolean,
  /** true if panel has focus */
  isSelected?: boolean,
  /** called when panel is toggled */
  onChange: (isOpen: boolean) => void,
  /** header content (the only visible part when panel is collapsed) */
  header?: JSX.Element,
  /** icons for open/closed panel */
  icons?: {
    open?: string,
    closed?: string
  },
  /** an optional class name to pass to top level element of the component */
  className?: string,
  /** an optional style object to pass to top level element of the component */
  style?: React.CSSProperties,
  id?: string,
};

export type CollapsibleSectionProps = Partial<CollapsibleSectionDefaultProps> & CollapsibleSectionRequiredProps;

export const Props = {
  children: ReactChildren,
  isOpen: t.Boolean,
  isSelected: t.maybe(t.Boolean),
  onChange: t.Function,
  onOpen: t.maybe(t.Function),
  onClose: t.maybe(t.Function),
  header: t.maybe(ReactChild),
  icons: t.maybe(t.struct({
    open: t.maybe(t.String),
    closed: t.maybe(t.String)
  })),
  className: t.maybe(t.String),
  style: t.maybe(t.Object),
  id: t.maybe(t.String)
};

const defaultProps: CollapsibleSectionDefaultProps = {
  onOpen: () => {},
  onClose: () => {}
};

/** A collapsible panel, allowing you to toggle more/less content */
@props(Props)
export default class CollapsibleSection extends React.PureComponent<CollapsibleSectionProps> {

  getProps() {
    return { ...defaultProps, ...this.props };
  }

  onChange = () => {
    const { onChange, onOpen, onClose, isOpen } = this.getProps();
    onChange(!isOpen);
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  render() {
    const {
      isOpen, isSelected,
      children, header, icons,
      className, id, style
    } = this.getProps();
    const { onChange } = this;

    const wrapperProps = {
      id,
      style,
      className: cx(className, 'collapsible-section', { 'is-open': isOpen, 'is-selected': isSelected })
    };

    return (
      <FlexView {...wrapperProps} column>
        <FlexView className='content' vAlignContent='center' onClick={onChange}>
          {header}
          <FlexView marginLeft='auto' shrink={false}>
            {icons && <Icon icon={isOpen ? icons.open : icons.closed} />}
          </FlexView>
        </FlexView>
        {isOpen && children}
      </FlexView>
    );
  }

}
