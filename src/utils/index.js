import cx from 'classnames';

export skinnable, { contains } from 'react-skinnable';
export { props, t } from 'tcomb-react';
export const stateClassUtil = (...classes) => cx([].concat(...classes).map(cl => `is-${cl}`));
