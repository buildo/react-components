import React from 'react';
import cx from 'classnames';
import { skinnable, props, t } from '../../utils';
import FlexView from 'react-flexview';

const { maybe } = t;

const propsTypes = {
  children: t.ReactChildren,
  rowIndex: maybe(t.Number), // should not be here
  columnKey: maybe(t.String),
  width: maybe(t.Number),
  fixed: maybe(t.Boolean),
  height: maybe(t.Number),
  onClick: maybe(t.Function)
};

const getLocals = ({
  columnKey,
  width, height, fixed,
  onClick,
  children
}) => {

  return {
    width, height, fixed,
    onClick: onClick && onClick(columnKey),
    children
  };
};

const template = ({ onClick, className, children, fixed }) => {
  return (
    <FlexView
      className={cx('tablo-header', { 'tablo-header-fixed': fixed }, className)}
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
@props(propsTypes)
export default class Header extends React.PureComponent {

  getLocals = getLocals

}

export const defaultHeader = (columnKey) => <Header>{columnKey}</Header>;
