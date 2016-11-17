import path from 'path';
import fs from 'fs';
import webpackConfig from './webpack.config.babel';

const paths = {
  SHOWROOM: path.resolve(__dirname),
  ISOLATE_COMPONENT: path.resolve(__dirname, 'components/IsolatedComponentView/Component.js')
};

const getComponentFileStat = (path) => {
  try {
    return fs.statSync(path);
  }
  catch (e) { console.log(e); }   // eslint-disable-line no-console
};

const stat = getComponentFileStat(paths.ISOLATE_COMPONENT);
if (!stat || !stat.isFile()) {
  const source = process.env.Component ||
    'import React from \'react\';\n' +
    `const component = () => <div>Hello, edit me in ${paths.ISOLATE_COMPONENT}</div>;\n` +
    'export default component;';
  fs.writeFileSync(paths.ISOLATE_COMPONENT, source);
}

export default {
  ...webpackConfig,
  entry: [
    'webpack/hot/dev-server',
    `${paths.SHOWROOM}/app.component.js`
  ]
};
