import React from 'react';
import ExampleView from './ExampleView';

const props = {
  title: 'flex',
  desc: 'Using css flexbox through a set of react components.',
  image: 'https://cloud.githubusercontent.com/assets/554092/9008588/9f22b1b4-379b-11e5-9836-6cdad203d9da.png',
  github: 'https://github.com/buildo/react-components/tree/master/src/flex'
};

export default <ExampleView {...props} />