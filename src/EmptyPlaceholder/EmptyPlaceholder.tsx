import * as React from 'react';
import cx from 'classnames';
import View from 'react-flexview';

export namespace EmptyPlaceholder {
  export type Props = {
    viewProps?: View.Props;
    className?: string;
    icon: JSX.Element;
    primaryText: string | JSX.Element;
    secondaryText?: string | JSX.Element;
    action?: JSX.Element | JSX.Element[];
  };
}

export class EmptyPlaceholder extends React.PureComponent<EmptyPlaceholder.Props> {
  render() {
    const { icon, primaryText, secondaryText, action, className, viewProps } = this.props;
    return (
      <View
        className={cx('empty-placeholder', className)}
        column
        hAlignContent="center"
        {...viewProps}
      >
        <View className="icon">{icon}</View>
        <View className="primary-text">{primaryText}</View>
        {secondaryText && <View className="secondary-text">{secondaryText}</View>}
        {action && <View className="action">{action}</View>}
      </View>
    );
  }
}
