import React from 'react';
import render from '../render';

import MoreOrLess from '../../src/more-or-less';

const exampleProps = {
  children: 'content',
  className: 'fancy-class-name',
  icons: {
    expanded: 'angle-up',
    collapsed: 'angle-down'
  },
  onExpandedChange: () => {}
};

const componentMore = new MoreOrLess({
  ...exampleProps,
  expanded: true
});

const componentLess = new MoreOrLess({
  ...exampleProps,
  expanded: false
});


describe('MoreOrLess', () => {

  it('renders correctly when expanded', () => {
    const tree = render(
      <MoreOrLess {...exampleProps} expanded />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when not expanded', () => {
    const tree = render(
      <MoreOrLess {...exampleProps} expanded={false} />
    );
    expect(tree).toMatchSnapshot();
  });

  describe('getLocals', () => {

    it('computes className', () => {
      const { wrapperProps: { className: classNameMore } } = componentMore.getLocals();
      expect(classNameMore).toBe('more-or-less more fancy-class-name');

      const { wrapperProps: { className: classNameLess } } = componentLess.getLocals();
      expect(classNameLess).toBe('more-or-less less fancy-class-name');
    });

    it('computes icon', ()  => {
      const { icon: iconMore } = componentMore.getLocals();
      expect(iconMore).toBe('angle-up');

      const { icon: iconLess } = componentLess.getLocals();
      expect(iconLess).toBe('angle-down');
    });

  });

});

