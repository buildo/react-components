import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Badge from '../../src/Badge';

describe('Badge', () => {

  it('renders correctly', () => {
    const component = renderer.create(
      <Badge label='42' />
    );
    expect(component).toMatchSnapshot();
  });

  it('computes className', () => {
    const badge = shallow(
      <Badge label={42} className='awesome-class' />
    );
    expect(badge.hasClass('badge'));
    expect(badge.hasClass('awesome-class'));
    expect(!badge.hasClass('active'));
  });

  it('computes className', () => {
    const badge = shallow(
      <Badge label={42} className='awesome-class' />
    );
    expect(badge.hasClass('badge'));
    expect(badge.hasClass('awesome-class'));
    expect(badge.hasClass('active'));
  });

});
