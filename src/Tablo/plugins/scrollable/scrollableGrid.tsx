import * as React from 'react';
import cx from 'classnames';
import { Tablo } from '../../Tablo';

type ScrollableGridState = {
  scrollTop?: number;
};

export default <T extends {}>(
  Grid: React.ComponentClass<Tablo.Props<T>>
): React.ComponentClass<Tablo.Props<T>> => {
  return class ScrollableGrid extends React.PureComponent<Tablo.Props<T>, ScrollableGridState> {
    state = {
      scrollTop: this.props.scrollTop
    };

    componentDidUpdate(prevProps: Tablo.Props<T>) {
      const scrollTopDidntChanged = this.props.scrollTop === prevProps.scrollTop;
      const rowsSelectionChanged =
        this.props.selectedRows &&
        prevProps.selectedRows &&
        this.props.selectedRows[0] !== prevProps.selectedRows[0];
      this.setState({
        scrollTop: scrollTopDidntChanged && rowsSelectionChanged ? undefined : this.props.scrollTop
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
        scrollTop: this.state.scrollTop
      };

      return <Grid {...tabloProps} />;
    }
  };
};
