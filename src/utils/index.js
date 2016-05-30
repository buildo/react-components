import cx from 'classnames';

export pure from 'revenge/lib/decorators/pure';
export skinnable from 'revenge/lib/decorators/skinnable';
export { props } from 'tcomb-react';
export t from 'tcomb';
export const stateClassUtil = (...classes) => cx([].concat(...classes).map(cl => `is-${cl}`));
