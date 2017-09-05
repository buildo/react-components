import React from 'react';
import cx from 'classnames';
import { skinnable, props, t, ReactChildren } from '../../../utils';
import FlexView from 'react-flexview';
import Arrow from './Arrow';

const { maybe, enums } = t;

@skinnable()
@props({
  sortDir: maybe(enums.of(['asc', 'desc'], 'sortDir')),
  children: ReactChildren
})
export default class SortableHeader extends React.PureComponent {

  getLocals({ sortDir, children }) {
    return {
      arrowDir: sortDir === 'asc' ? 'up' : sortDir === 'desc' ? 'down' : 'up-down',
      classNames: cx({
        sorted: !!sortDir,
        [`sort-${sortDir}`]: !!sortDir
      }),
      children
    };
  }

  template({ arrowDir, classNames, children }) {
    return (
      <FlexView className={cx('sortable-header', classNames)} vAlignContent='center' grow height='100%'>
        <FlexView grow height='100%' vAlignContent='center'>
          {children}
        </FlexView>
        <FlexView
          className='sort-icon'
          vAlignContent='center'
          hAlignContent='center'
          basis={20}
          height='100%'
        >
          <Arrow arrowDir={arrowDir} />
        </FlexView>
      </FlexView>
    );
  }
}
