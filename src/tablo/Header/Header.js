import React from 'react';
import t, { maybe } from 'tcomb';
import { props  } from 'tcomb-react';
import { pure, skinnable } from 'revenge';
import FlexView from 'react-flexview';

const propsTypes = {
  children: t.ReactChildren,
  rowIndex: maybe(t.Number), // should not be here
  columnKey: maybe(t.String),
  width: maybe(t.Number),
  height: maybe(t.Number)
};

const getLocals = ({
  width, height, children
}) => {

  return {
    width, height, children
  };
};

const template = ({ children }) => {
  return (
    <FlexView
      className='grid-header'
      height='100%'
      width='100%'
      vAlignContent='center'
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
