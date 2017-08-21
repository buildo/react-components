import React from 'react';
import cx from '../../../utils/classnames';
import FlexView from 'react-flexview';
import { skinnable, props, t } from '../../../utils';

const { enums } = t;

const propsTypes = {
  arrowDir: enums.of(['up', 'down', 'up-down'])
};

const template = ({ arrowDir, className }) => {
  return (
    <FlexView column vAlignContent='center' height='100%' className={cx('arrow', className )}>
      {arrowDir !== 'down' && <FlexView className='up' marginBottom={arrowDir !== 'up' ? 2 : 0} />}
      {arrowDir !== 'up' && <FlexView className='down' marginTop={arrowDir !== 'down' ? 2 : 0} />}
    </FlexView>
  );
};

@skinnable(template)
@props(propsTypes)
export default class Arrow extends React.PureComponent {}
