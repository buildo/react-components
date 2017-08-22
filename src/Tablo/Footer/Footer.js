import React from 'react';
import FlexView from 'react-flexview';
import { skinnable, props, t, ReactChildren } from '../../utils';

const { maybe } = t;

const propsTypes = {
  columnKey: maybe(t.String),
  width: maybe(t.Number),
  height: maybe(t.Number),
  children: ReactChildren
};

const template = ({ children }) => {

  return (
    <FlexView
      className='tablo-footer'
      height='100%'
      width='100%'
      vAlignContent='center'
      grow
    >
      {children}
    </FlexView>
  );

};

@skinnable(template)
@props(propsTypes)
export default class Footer extends React.PureComponent {}
