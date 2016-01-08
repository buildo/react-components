var path = require('path');
var webpack = require('webpack');
var webpackBase = require('./webpack.base');
var assign = require('object-assign');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var indexHtml = require('fs').readFileSync(path.resolve(__dirname, './index.html'), 'utf8');


var paths = {
  SRC: path.resolve(__dirname, '../src'),
  EXAMPLES: path.resolve(__dirname, '.')
};

module.exports = assign(webpackBase, {

  entry: [
    'webpack/hot/dev-server',
    paths.EXAMPLES + '/examples.js'
  ],

  devtool: 'source-map',

  devServer: {
    contentBase: paths.EXAMPLES,
    hot: true,
    inline: true,
    port: '8080',
    host: '0.0.0.0'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
    // new ExtractTextPlugin('style', 'style.css')
  ]

});
