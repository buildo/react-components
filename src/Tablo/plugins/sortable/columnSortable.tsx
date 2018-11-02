import * as React from "react";

import Column, { ColumnIntrinsicProps } from "../../Column";
import Header, { defaultHeader } from "../../Header";
import SortableHeader from "./SortableHeader";
import { getArrayChildren } from "../../utils";
import { find } from "../../../utils";

const sortable = <T extends {}>(args: ColumnIntrinsicProps<T>) => {
  const {
    sortable,
    sortDir,
    onHeaderClick,
    children: _children = [],
    name,
    ...otherArgs
  } = args;

  const header =
    find(getArrayChildren(_children), child => child.type === Header) ||
    defaultHeader(name);
  const otherChildren = getArrayChildren(_children)!.filter(
    ch => ch.type !== Header
  );
  const sortableHeader = sortable ? (
    <Header {...header.props} onClick={onHeaderClick}>
      <SortableHeader sortDir={sortDir}>{header.props.children}</SortableHeader>
    </Header>
  ) : (
    header
  );
  const children = [sortableHeader, ...otherChildren].map((el, index) =>
    React.cloneElement(el, { key: index })
  );

  return (
    <Column<T> name={name} key={name as any} {...otherArgs}>
      {children}
    </Column>
  );
};

export default sortable;
