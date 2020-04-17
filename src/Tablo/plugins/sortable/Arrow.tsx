import * as React from 'react';
import FlexView from 'react-flexview';

export type Props = {
  arrowDir: 'up' | 'down' | 'up-down';
};

export default class Arrow extends React.PureComponent<Props> {
  render() {
    const { arrowDir } = this.props;

    return (
      <FlexView column vAlignContent="center" height="100%" className="arrow">
        {arrowDir !== 'down' && (
          <FlexView className="up" marginBottom={arrowDir !== 'up' ? 2 : 0} />
        )}
        {arrowDir !== 'up' && <FlexView className="down" marginTop={arrowDir !== 'down' ? 2 : 0} />}
      </FlexView>
    );
  }
}
