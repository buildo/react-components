import * as React from 'react';
import * as cx from 'classnames';
import { props, t, ReactChildren } from '../../utils';
import FlexView from 'react-flexview';

export namespace HeaderProps {
  export type FDTIntrinsic<T> = {
    columnKey: keyof T,
  }

  export type Intrinsic<T> = {
    fixed: boolean,
    onClick?: (columnKey: keyof T) => () => void
  }
}

export type HeaderProps = {
  children: React.ReactNode,
};
export type HeaderIntrinsicProps<T> = HeaderProps & HeaderProps.Intrinsic<T> & HeaderProps.FDTIntrinsic<T>;

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
export default class Header<T> extends React.PureComponent<HeaderProps> {
  render() {
    const { columnKey, fixed, onClick: _onClick, children } = this.props as HeaderIntrinsicProps<T>;
    const onClick = _onClick && _onClick(columnKey);

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

export const defaultHeader = (columnKey?: string) => <Header>{columnKey}</Header>;
