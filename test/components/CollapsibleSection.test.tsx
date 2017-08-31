import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import CollapsibleSection from '../../src/CollapsibleSection';

let consoleError: jest.SpyInstance<{}>;

beforeAll(() => {
  consoleError = jest.spyOn(console, 'error');
});

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled();
});

const content = <div>HI</div>;

describe('CollapsibleSection', () => {

  it('renders correctly when open', () => {
    const component = renderer.create(
      <CollapsibleSection isOpen={true} onChange={() => {}}>
        {content}
      </CollapsibleSection>
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly when closed', () => {
    const component = renderer.create(
      <CollapsibleSection isOpen={false} onChange={() => {}}>
        {content}
      </CollapsibleSection>
    );
    expect(component).toMatchSnapshot();
  });

  it('computes className when open', () => {
    const component = shallow(
      <CollapsibleSection className='awesome-class' isOpen={true} onChange={() => {}}>
        {content}
      </CollapsibleSection>
    );
    expect(component.hasClass('collapsible-section')).toBe(true);
    expect(component.hasClass('awesome-class')).toBe(true);
    expect(component.hasClass('is-open')).toBe(true);
  });

  it('computes className when closed', () => {
    const component = shallow(
      <CollapsibleSection className='awesome-class' isOpen={false} onChange={() => {}}>
        {content}
      </CollapsibleSection>
    );
    expect(component.hasClass('collapsible-section')).toBe(true);
    expect(component.hasClass('awesome-class')).toBe(true);
    expect(!component.hasClass('is-open')).toBe(true);
  });

  it('invokes onOpen and onChange when opened', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const onChange = jest.fn();
    const component = shallow(
      <CollapsibleSection className='awesome-class' isOpen={false} onChange={onChange} onOpen={onOpen} onClose={onClose}>
        {content}
      </CollapsibleSection>
    );
    component.find('.content').simulate('click');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe(true);
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('invokes onClose and onChange when closed', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const onChange = jest.fn();
    const component = shallow(
      <CollapsibleSection className='awesome-class' isOpen={true} onChange={onChange} onOpen={onOpen} onClose={onClose}>
        {content}
      </CollapsibleSection>
    );
    component.find('.content').simulate('click');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe(false);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onOpen).not.toHaveBeenCalled();
  });

});
