import _ from 'lodash';

export function newComponent(Component, props = {}) {
  const allProps = _.extend({}, Component.defaultProps || {}, props);
  return new Component(allProps);
}
