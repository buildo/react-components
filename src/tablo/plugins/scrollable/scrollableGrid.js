import React from 'react';
import omit from 'lodash/omit';
import { pure, skinnable, props, t, contains } from '../../../utils';
import cx from 'classnames';

const { maybe } = t;

export default (Grid) => (
  @props({
    className: maybe(t.String),
    scrollLeft: maybe(t.Integer),
    scrollTop: maybe(t.Integer),
    onScrollStart: maybe(t.Function),
    onScrollEnd: maybe(t.Function)
  }, { strict: false })
  @pure
  @skinnable(contains(Grid))
  class ScrollableGrid extends React.Component {

    state = {
      scrollTop: this.props.scrollTop
    }

    componentWillReceiveProps(nextProps) {
      const scrollTopDidntChanged = nextProps.scrollTop === this.props.scrollTop;
      const rowsSelectionChanged = nextProps.selectedRows && this.props.selectedRows && nextProps.selectedRows[0] !== this.props.selectedRows[0];
      this.setState({
        scrollTop: scrollTopDidntChanged && rowsSelectionChanged ? undefined : nextProps.scrollTop
      });
    }

    getLocals({ scrollLeft, onScrollEnd, onScrollStart, className, ...tableProps }) {
      return {
        className: cx('scrollable-tablo', className),
        scrollTop: this.state.scrollTop,
        scrollLeft,
        onScrollEnd,
        onScrollStart,
        ...omit(tableProps, 'scrollTop')
      };
    }
  }
);
