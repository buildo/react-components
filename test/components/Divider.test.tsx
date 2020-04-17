import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Divider from '../../src/Divider';

let consoleError: jest.SpyInstance<{}>;

beforeAll(() => {
  consoleError = jest.spyOn(console, 'error');
});

afterEach(() => {
  expect(consoleError).not.toHaveBeenCalled();
});

describe('Divider', () => {
  it('renders correctly vertical', () => {
    const component = renderer.create(<Divider orientation="vertical" />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly horizontal', () => {
    const component = renderer.create(<Divider orientation="horizontal" />);
    expect(component).toMatchSnapshot();
  });

  it('handle className props', () => {
    const testClassName = 'testone';

    const component = shallow(<Divider className={testClassName} />);

    expect(component.hasClass(testClassName)).toBe(true);
  });
});
