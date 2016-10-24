import React from 'react';
import t, { maybe, struct } from 'tcomb';
import find from 'lodash/find';
import Column from '../../Column';

import Header, { defaultHeader } from '../../Header';
import SortableHeader from './SortableHeader';

const argsTypes = struct({
  sortable: maybe(t.Boolean),
  sortDir: maybe(t.enums.of(['asc', 'desc'], 'sortDir')),
  onHeaderClick: maybe(t.Function),
  name: t.String,
  children: t.ReactChildren
}, { strict: false });

const sortable = (args) => {

  argsTypes(args);

  const {
    sortable,
    sortDir,
    onHeaderClick,
    children: _children = [],
    name,
    ...otherArgs
  } = (args);

  const header = find([].concat(_children), { type: Header }) || defaultHeader(name);
  const otherChildren = [].concat(_children).filter(ch => ch.type !== Header);
  const sortableHeader = sortable ? (
    <Header {...header.props} onClick={onHeaderClick}>
      <SortableHeader sortDir={sortDir}>
        {header.props.children}
      </SortableHeader>
    </Header>
  ) : header;
  const children = [sortableHeader, ...otherChildren].map((el, index) => React.cloneElement(el, { key: index }));

  return (
    <Column name={name} key={name} {...otherArgs}>
      {children}
    </Column>
  );
};

export default sortable;
