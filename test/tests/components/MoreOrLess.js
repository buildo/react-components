import expect from 'expect';
import MoreOrLess from '../../../src/more-or-less';
import vdom from 'react-vdom';

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
const domMore = vdom(componentMore);
const domLess = vdom(componentLess);

describe('MoreOrLess', function () {

  describe('locals', () => {

    it('should compute className', ()  => {
      const { className: classNameMore } = componentMore.getLocals();
      expect(classNameMore).toBe('more-or-less more fancy-class-name');

      const { className: classNameLess } = componentLess.getLocals();
      expect(classNameLess).toBe('more-or-less less fancy-class-name');
    });

    it('should compute icon', ()  => {
      const { icon: iconMore } = componentMore.getLocals();
      expect(iconMore).toBe('angle-up');

      const { icon: iconLess } = componentLess.getLocals();
      expect(iconLess).toBe('angle-down');
    });

  });

  describe('template', () => {

    it('should render an expand button', ()  => {
      expect(domMore.children[1].attrs.className).toInclude('expand-button');
      expect(domLess.children[1].attrs.className).toInclude('expand-button');
    });

  });

});
