import * as React from 'react';
import * as cx from 'classnames';
import { TabloProps } from '../../Tablo';

type ScrollableGridState = {
  scrollTop?: number
}

export default <T, K extends keyof T>(Grid: React.ComponentClass<TabloProps<T, K>>): React.ComponentClass<TabloProps<T, K>> => {
  return class ScrollableGrid extends React.PureComponent<TabloProps<T, K>, ScrollableGridState> {

    state = {
      scrollTop: this.props.scrollTop
    }

    componentWillReceiveProps(nextProps: TabloProps<T, K>) {
      const scrollTopDidntChanged = nextProps.scrollTop === this.props.scrollTop;
      const rowsSelectionChanged = nextProps.selectedRows && this.props.selectedRows && nextProps.selectedRows[0] !== this.props.selectedRows[0];
      this.setState({
        scrollTop: scrollTopDidntChanged && rowsSelectionChanged ? undefined : nextProps.scrollTop
      });
    }

    render() {
      const { scrollLeft, onScrollEnd, onScrollStart, className, ...otherProps } = this.props;
      const tabloProps = {
        className: cx('scrollable-tablo', className),
        scrollLeft,
        onScrollEnd,
        onScrollStart,
        ...otherProps,
        scrollTop: this.state.scrollTop,
      };

      return <Grid {...tabloProps} />;
    }
  }
};
