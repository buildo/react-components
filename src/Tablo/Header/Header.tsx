import * as React from 'react';
import * as cx from 'classnames';
import { props, t, ReactChildren } from '../../utils';
import FlexView from 'react-flexview';

export namespace HeaderProps {
  export type FDTIntrinsic<K> = {
    columnKey: K,
  }

  export type Intrinsic = {
    fixed: boolean,
    onClick?: () => void
  }
}

export type HeaderProps = {
  children: React.ReactNode,
};
export type HeaderIntrinsicProps<K> = HeaderProps & HeaderProps.Intrinsic & HeaderProps.FDTIntrinsic<K>;

const { maybe } = t;

const propsTypes = {
  children: ReactChildren,
  rowIndex: maybe(t.Number),
  columnKey: maybe(t.String),
  width: maybe(t.Number),
  fixed: maybe(t.Boolean),
  height: maybe(t.Number),
  onClick: maybe(t.Function)
};

@props(propsTypes)
export default class Header<K> extends React.PureComponent<HeaderProps> {
  render() {
    const { fixed, onClick: onClick, children } = this.props as HeaderIntrinsicProps<K>;

    return (
      <FlexView
        className={cx('tablo-header', { 'tablo-header-fixed': fixed })}
        height='100%'
        width='100%'
        vAlignContent='center'
        onClick={onClick}
        grow
      >
        <FlexView vAlignContent='center' grow height='100%'>
          {children}
        </FlexView>
      </FlexView>
    );
  }
}

export const defaultHeader = (columnKey: string) => <Header>{columnKey}</Header>;
