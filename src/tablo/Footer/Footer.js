import React from 'react';
import FlexView from 'react-flexview';
import { pure, skinnable, props, t } from '../../utils';

const { maybe } = t;

const propsTypes = {
  columnKey: maybe(t.String),
  width: maybe(t.Number),
  height: maybe(t.Number),
  children: t.ReactChildren
};

const template = ({ children }) => {

  return (
    <FlexView
      className='grid-footer'
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
@pure
@props(propsTypes)
export default class Footer extends React.Component {}
