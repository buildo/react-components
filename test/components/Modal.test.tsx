import * as React from 'react';
import * as PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { modalWithContext } from '../../src/Modal';

let consoleError: jest.SpyInstance<{}>;

beforeAll(() => {
  consoleError = jest.spyOn(console, 'error');
});

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled();
});

interface ContextType {
  foo: string;
}

// `.isRequired` makes the test fail if context is not provided
const FooType = PropTypes.string.isRequired;
class ComponentAccessingContext extends React.Component {
  static contextTypes = { foo: FooType };

  render() {
    return <div>{this.context.foo}</div>;
  }
}

describe('Modal', () => {
  it('should correctly pass context down if used via modalWithContext', () => {
    const ModalPassingContext = modalWithContext({ foo: FooType });
    mount(
      <ModalPassingContext transitionEnterTimeout={0} transitionLeaveTimeout={0}>
        <ComponentAccessingContext />
      </ModalPassingContext>,
      { context: { foo: 'bar' } }
    );
  });
});
