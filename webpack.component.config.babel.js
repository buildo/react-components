import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import webpackBase, { paths } from './webpack.base.babel';
import webpackConfig from './webpack.config.babel';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
  ],

  plugins: webpackBase.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: 'showroom/component.index.html',
      inject: false,
      gzip: '',
      buildPath: ''
    }),
    new ExtractTextPlugin('style', 'style.[hash].min.css')
  ])

};
