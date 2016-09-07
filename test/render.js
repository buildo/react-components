import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';

export default function render(component) {
  return shallow(component).debug();
}
