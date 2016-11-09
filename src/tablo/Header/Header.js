import React from 'react';
import cx from 'classnames';
import { pure, skinnable, props, t } from '../../utils';
import FlexView from 'react-flexview';

const { maybe } = t;

const propsTypes = {
  children: t.ReactChildren,
  rowIndex: maybe(t.Number), // should not be here
  columnKey: maybe(t.String),
  width: maybe(t.Number),
  height: maybe(t.Number),
  onClick: maybe(t.Function)
};

const getLocals = ({
  columnKey,
  width, height,
  onClick,
  children
}) => {

  return {
    width, height,
    onClick: onClick && onClick(columnKey),
    children
  };
};

const template = ({ onClick, className, children }) => {
  return (
    <FlexView
      className={cx('grid-header', className)}
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
};

@skinnable(template)
@pure
@props(propsTypes)
export default class Header extends React.Component {

  getLocals = getLocals

}

export const defaultHeader = (columnKey) => <Header>{columnKey}</Header>;
