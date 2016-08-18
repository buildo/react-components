var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackBase = require('./webpack.base');
var assign = require('lodash/object').assign;
var indexHtml = require('fs').readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

indexHtml = indexHtml.replace(/__GZIP__/g, '');
indexHtml = indexHtml.replace(/__BUILD_PATH__/g, 'https://cdn.rawgit.com/buildo/react-components/gh-pages/showroom/build/');

var paths = {
  SRC: path.resolve(__dirname),
  DIST: path.resolve(__dirname, './build')
};

module.exports = assign({}, webpackBase, {

  entry: paths.SRC + '/app.js',

  output: {
    path: paths.DIST,
    filename: 'app.[hash].js'
  },

  plugins: webpackBase.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new CompressionPlugin({
      regExp: /\.js$|\.css$/
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({ bundle: true, templateContent: indexHtml }),
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
