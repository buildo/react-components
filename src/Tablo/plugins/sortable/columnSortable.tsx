import * as React from 'react';

import Column, { ColumnIntrinsicProps } from '../../Column';
import Header, { defaultHeader } from '../../Header';
import SortableHeader from './SortableHeader';
import { getArrayChildren } from '../../utils';
import { find } from '../../../utils';

const sortable = <T, K extends string = keyof T>(args: ColumnIntrinsicProps<T, K>) => {

  const {
    sortable,
    sortDir,
    onHeaderClick,
    children: _children = [],
    name,
    ...otherArgs
  } = (args);

  const header = find(getArrayChildren(_children), child => child.type === Header) || defaultHeader(name);
  const otherChildren = getArrayChildren(_children)!.filter(ch => ch.type !== Header);
  const sortableHeader = sortable ? (
    <Header {...header.props} onClick={onHeaderClick}>
      <SortableHeader sortDir={sortDir}>
        {header.props.children}
      </SortableHeader>
    </Header>
  ) : header;
  const children = [sortableHeader, ...otherChildren].map((el, index) => React.cloneElement(el, { key: index }));

  const Col: React.SFC<Column.Props<T, K>> = Column;
  return (
    <Col name={name} key={name} {...otherArgs}>
      {children}
    </Col>
  );
};

export default sortable;
