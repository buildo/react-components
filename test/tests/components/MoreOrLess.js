import expect from 'expect';
import MoreOrLess from '../../../src/more-or-less';

const exampleProps = {
  children: 'content',
  className: 'fancy-class-name',
  icons: {
    expanded: 'angle-up',
    collapsed: 'angle-down'
  }
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

  describe('locals', () => {

    it('should compute className', ()  => {
      const { wrapperProps: { className: classNameMore } } = componentMore.getLocals();
      expect(classNameMore).toBe('more-or-less more fancy-class-name');

      const { wrapperProps: { className: classNameLess } } = componentLess.getLocals();
      expect(classNameLess).toBe('more-or-less less fancy-class-name');
    });

    it('should compute icon', ()  => {
      const { icon: iconMore } = componentMore.getLocals();
      expect(iconMore).toBe('angle-up');

      const { icon: iconLess } = componentLess.getLocals();
      expect(iconLess).toBe('angle-down');
    });

  });

});
