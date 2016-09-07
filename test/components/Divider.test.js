import React from 'react';
import render from '../render';

import Divider from '../../src/Divider';

describe('Divider', () => {

  it('renders correctly vertical', () => {
    const tree = render(
      <Divider orientation='vertical' />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly horizontal', () => {
    const tree = render(
      <Divider orientation='horizontal' />
    );
    expect(tree).toMatchSnapshot();
  });

});
