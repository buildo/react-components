import * as React from 'react';
import FlexView from 'react-flexview';
import { Children } from '../../utils';

export namespace Footer {
  export type Props = {
    children: Children;
  };
}

export class Footer extends React.PureComponent<Footer.Props> {
  render() {
    const { children } = this.props;

    return (
      <FlexView className="tablo-footer" height="100%" width="100%" vAlignContent="center" grow>
        {children}
      </FlexView>
    );
  }
}
