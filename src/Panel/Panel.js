import React from 'react';
import cx from 'classnames';
import { props, t, skinnable, pure } from '../utils';
import PanelHeader from './PanelHeader';
import capitalize from 'lodash/string/capitalize';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import FlexView from '../flex/FlexView';

import './panel.scss';

export const Props = {
  type: t.enums.of(['docked-top', 'docked-left', 'docked-right', 'docked-bottom', 'floating']),
  header: t.maybe(t.struct({
    collapse: t.maybe(t.struct({
      direction: t.enums.of(['up', 'left', 'right', 'down']),
      onExpand: t.Func,
      onCollapse: t.Func,
      isCollapsed: t.maybe(t.Bool)
    })),
    content: t.maybe(t.ReactNode),
    title: t.maybe(t.ReactNode),
    hideTitleWhenExpanded: t.maybe(t.Bool),
    menu: t.maybe(t.ReactNode)
  })),
  loading: t.maybe(t.Bool),
  softLoading: t.maybe(t.Bool),
  softLoadingDelay: t.maybe(t.refinement(t.Num, v => v >= 0, 'NonNegativeNumber')),
  children: t.ReactNode,
  className: t.maybe(t.Str),
  clearMargin: t.maybe(t.enums.of(['top', 'left', 'right', 'bottom'])),
  style: t.maybe(t.Obj)
};

@pure
@skinnable()
@props(Props)
export default class Panel extends React.Component {
  static defaultProps = {
    style: {},
    loading: false,
    softLoading: false,
    softLoadingDelay: 0
  };

  _softLoadingActive = false;
  _softLoadingTimer = null;

  updateSoftLoadingState({ softLoading: prevSoftLoading }) {
    const { softLoading, softLoadingDelay } = this.props;
    if (!softLoading) {
      if (this._softLoadingTimer) {
        clearTimeout(this._softLoadingTimer);
      }
      this._softLoadingActive = false;
      if (prevSoftLoading) {
        this.forceUpdate();
      }
    } else if (!prevSoftLoading && softLoading && softLoadingDelay > 0) { // delay === 0 is handled without timer
      this._softLoadingTimer = setTimeout(() => {
        this._softLoadingActive = true;
        this.forceUpdate();
      }, softLoadingDelay);
    }
  }

  isSoftLoading({ softLoading, softLoadingDelay }) {
    return this._softLoadingActive || (softLoading && softLoadingDelay === 0); // optimization for the default delay === 0;
  }

  componentDidMount() {
    this.updateSoftLoadingState({ softLoading: false });
  }

  componentDidUpdate(oldProps) {
    this.updateSoftLoadingState(oldProps);
  }

  componentWillUnmount() {
    if (this._softLoadingTimer) {
      clearTimeout(this._softLoadingTimer);
    }
  }

  toggleExpanded = () => {
    const { isCollapsed, onExpand, onCollapse } = this.props.header.collapse;
    if (isCollapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  getStyle = () => {
    const style = {};
    if (this.props.clearMargin) {
      const marginToClear = `margin${capitalize(this.props.clearMargin)}`;
      style[marginToClear] = 0;
    }
    return {
      ...this.props.style,
      ...style
    };
  };

  getLocals() {
    const { header, children, loading, softLoading, softLoadingDelay, type, className } = this.props;
    const collapsable = header && header.collapse;
    const isExpanded = !collapsable || !header.collapse.isCollapsed;
    const panelState = isExpanded ? 'expanded' : 'collapsed';
    const directionClass = collapsable ? (`collapse-${header.collapse.direction}`) : '';
    const verticalDirection = collapsable && (collapsable.direction === 'up' || collapsable.direction === 'down');

    return {
      header,
      className: cx('panel', type, { collapsable }, directionClass, panelState, className),
      style: this.getStyle(),
      isExpanded,
      toggleExpanded: this.toggleExpanded,
      verticalDirection,
      children,
      loading,
      softLoading: this.isSoftLoading({ softLoading, softLoadingDelay })
    };
  }

  templateSoftLoading = ({ softLoading, isExpanded }) => {
    return softLoading && isExpanded ? (
      <div className='panel-soft-loader'>
        <div className='loader gradient'></div>
        <div className='loader'></div>
      </div>
    ) : null;
  };

  templateHeader = ({ header, isExpanded, toggleExpanded }) => {
    return (
      header ?
      <PanelHeader
        title={header.hideTitleWhenExpanded && isExpanded ? undefined : header.title}
        content={header.content}
        menu={header.menu}
        collapse={header.collapse ? {
          direction: header.collapse.direction,
          isExpanded,
          onToggleExpanded: toggleExpanded
        } : null}
      />
    : null );
  };

  templateExpandedContent = ({ children, loading }) => {
    return (
      <FlexView className='panel-content' column grow style={{ position: 'relative' }}>
        {children}
        {loading && <LoadingSpinner />}
      </FlexView>
    );
  };

  templateCollapsedContent = ({ header, verticalDirection }) => {
    return (
      (!verticalDirection && header && header.title) ?
      <FlexView className='panel-content' column grow>
        <FlexView grow className='panel-content-title'>
          {header.title}
        </FlexView>
      </FlexView>
      : null
    );
  };

  template({ header, children, loading, softLoading, className, style, isExpanded, toggleExpanded, verticalDirection }) {
    return (
      <FlexView className={className} grow style={style} column>
        {this.templateSoftLoading({ softLoading, isExpanded })}
        {this.templateHeader({ header, isExpanded, toggleExpanded })}
        {isExpanded ?
          this.templateExpandedContent({ children, loading }) :
          this.templateCollapsedContent({ header, verticalDirection })
        }
      </FlexView>
    );
  }

}
