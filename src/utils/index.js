import cx from 'classnames';

export pure from 'revenge/lib/decorators/pure';
export skinnable from 'revenge/lib/decorators/skinnable';
export { props, t } from 'tcomb-react';
export const stateClassUtil = (classes) => cx(classes.reduce((acc, str) => ({ ...acc, [`is-${str}`]: str })));
