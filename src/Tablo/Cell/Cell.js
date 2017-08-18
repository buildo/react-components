import React from 'react';
import cx from '../../utils/classnames';
import { skinnable, props, t } from '../../utils';
import FlexView from 'react-flexview';
import { Cell as CellFDT } from 'fixed-data-table-2';

const { maybe, enums, union } = t;

const propsTypes = {
  data: t.Any,
  fixed: maybe(t.Boolean),
  rowData: t.Any,
  rowIndex: maybe(t.Integer),
  children: union([t.Function, t.ReactChildren]),
  backgroundColor: maybe(t.String),
  color: maybe(t.String),
  vAlignContent: maybe(enums.of(['top', 'center', 'bottom'])),
  hAlignContent: maybe(enums.of(['left', 'center', 'right'])),
  contentStyle: maybe(t.Object),
  style: maybe(t.Object)
};

const template = ({
  data,
  fixed,
  rowData,
  rowIndex,
  children,
  backgroundColor,
  color,
  vAlignContent = 'center',
  hAlignContent = 'left',
  grow = true,
  contentStyle,
  style
}) => {
  return (
    <CellFDT>
      <FlexView
        className={cx('tablo-cell', { 'tablo-cell-fixed': fixed, 'tablo-cell-even-row': rowIndex % 2 === 0, 'tablo-cell-odd-row': rowIndex % 2 === 1 })}
        style={{ backgroundColor, color, ...style }}
        grow={grow}
      >
        <FlexView
          style={contentStyle}
          className='content'
          grow={grow}
          vAlignContent={vAlignContent}
          hAlignContent={hAlignContent}
        >
          {t.Function.is(children) ? children(data, rowData, rowIndex) : children}
        </FlexView>
      </FlexView>
    </CellFDT>
  );
};

@skinnable(template)
@props(propsTypes)
export default class Cell extends React.PureComponent {}

export const defaultCell = <Cell>{dataCell => dataCell}</Cell>;
