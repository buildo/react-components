import React from 'react';
import renderer from 'react-test-renderer';

import Badge from '../../src/badge';

describe('Badge', () => {

  it('renders correctly', () => {
    const component = renderer.create(
      <Badge label='42' />
    );
    expect(component).toMatchSnapshot();
  });

  describe('getLocals', () => {

    it('computes className', () => {
      const badge = new Badge({
        ...Badge.defaultProps,
        label: 42,
        className: 'awesome-class'
      });
      const { className } = badge.getLocals();
      expect(className).toContain('badge');
      expect(className).toContain('awesome-class');
      expect(className).not.toContain('active');
    });

    it('computes className when active', () => {
      const badge = new Badge({
        ...Badge.defaultProps,
        active: true,
        label: 42,
        className: 'awesome-class'
      });
      const { className } = badge.getLocals();
      expect(className).toContain('badge');
      expect(className).toContain('awesome-class');
      expect(className).toContain('active');
    });

  });

});
