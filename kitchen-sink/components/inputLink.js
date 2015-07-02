import React from 'react';
import ExampleView from './ExampleView';

const props = {
  title: 'react-input-link',
  desc: 'Rendering custom child inside input. Right padding computed dynamically.',
  image: 'https://camo.githubusercontent.com/fe549198ef834445b4995a21505e35c0867c6c9c/687474703a2f2f73332e706f7374696d672e6f72672f356a3562767038636a2f53637265656e5f53686f745f323031355f30365f32335f61745f32325f31355f34322e706e67',
  github: 'https://github.com/buildo/react-input-link',
  demo: 'https://rawgit.com/buildo/react-input-link/master/examples/index.html'
};

export default <ExampleView {...props} />