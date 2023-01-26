import * as React from 'react';
import cx from 'classnames';
import { Children } from '../../utils';
import FlexView from 'react-flexview';

export type FDTIntrinsic = {
  columnKey: string;
};

export type Intrinsic = {
  fixed: boolean;
  onClick?: () => void;
};

export namespace Header {
  export type Props = {
    children?: Children;
  };
}
export type HeaderIntrinsicProps = Header.Props & Intrinsic & FDTIntrinsic;

export class Header extends React.PureComponent<Header.Props> {
  render() {
    const { fixed, onClick: onClick, children } = this.props as HeaderIntrinsicProps;

    return (
      <FlexView
        className={cx('tablo-header', { 'tablo-header-fixed': fixed })}
        height="100%"
        width="100%"
        vAlignContent="center"
        onClick={onClick}
        grow
      >
        <FlexView vAlignContent="center" grow height="100%">
          {children}
        </FlexView>
      </FlexView>
    );
  }
}

export function defaultHeader(columnKey: string) {
  return <Header>{columnKey}</Header>;
}
