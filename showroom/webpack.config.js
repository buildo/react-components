var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackBase = require('./webpack.base');
var assign = require('lodash/object').assign;
var indexHtml = require('fs').readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

indexHtml = indexHtml.replace(/__GZIP__/g, '');
indexHtml = indexHtml.replace(/__BUILD_PATH__/g, '');

var paths = {
  SRC: path.resolve(__dirname),
  DIST: path.resolve(__dirname, './build')
};

module.exports = assign({}, webpackBase, {

  entry: [
    'webpack/hot/dev-server',
    paths.SRC + '/app.js'
  ],

  output: {
    path: paths.DIST,
    filename: 'app.[hash].js'
  },

  devtool: 'source-map',

  devServer: {
    contentBase: paths.DIST,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: '8080'
  },

  plugins: webpackBase.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({ bundle: false, templateContent: indexHtml }),
    new ExtractTextPlugin('style', 'style.[hash].min.css')
  ]),

  module: assign({}, webpackBase.module, {
    loaders: webpackBase.module.loaders.concat([
      // style!css loaders
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      // SASS
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
      }
    ])
  })

});
