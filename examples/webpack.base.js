var path = require('path');
var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

var paths = {
  SRC: path.resolve(__dirname, '../src'),
  EXAMPLES: path.resolve(__dirname, '.'),
  BUILD: path.resolve(__dirname, 'build')
};

module.exports = {

  output: {
    path: paths.BUILD,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [paths.SRC, paths.EXAMPLES],
        exclude: /node_modules/
      },
      // style!css loaders
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      // SASS
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ],
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: paths.SRC,
        exclude: /node_modules/
      }
    ]
  }

};
