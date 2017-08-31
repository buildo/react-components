import React from 'react';
import { mount } from 'enzyme';
import { modalWithContext } from '../../src/Modal';

let consoleError: jest.SpyInstance<{}>;

beforeAll(() => {
  consoleError = jest.spyOn(console, 'error');
});

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled();
});

describe('Modal', () => {

  it('should correctly pass context down if used via modalWithContext', () => {
    // `.isRequired` makes the test fail if context is not provided
    const FooType = React.PropTypes.string.isRequired;
    const ComponentAccessingContext = (_, ctx) => <div>{ctx.foo}</div>;
    ComponentAccessingContext.contextTypes = { foo: FooType };
    const ModalPassingContext = modalWithContext({ foo: FooType });
    mount(
      <ModalPassingContext
        transitionEnterTimeout={0}
        transitionLeaveTimeout={0}
      >
        <ComponentAccessingContext />
      </ModalPassingContext>,
      { context: { foo: 'bar' } }
    );
  });

});
