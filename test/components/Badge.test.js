import React from 'react';
import render from '../render';

import Badge from '../../src/badge';

describe('Badge', () => {

  it('renders correctly', () => {
    const tree = render(
      <Badge label='42' />
    );
    expect(tree).toMatchSnapshot();
  });

  describe('getLocals', () => {

    it('computes className', () => {
      const badge = new Badge({
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
