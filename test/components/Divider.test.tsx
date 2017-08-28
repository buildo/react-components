import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Divider from '../../src/Divider';

describe('Divider', () => {

  it('renders correctly vertical', () => {
    const component = renderer.create(
      <Divider orientation='vertical' />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly horizontal', () => {
    const component = renderer.create(
      <Divider orientation='horizontal' />
    );
    expect(component).toMatchSnapshot();
  });

});
