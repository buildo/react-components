import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpackBase from './webpack.base.babel';
import assign from 'lodash/assign';

const paths = {
  SRC: path.resolve(__dirname),
  DIST: path.resolve(__dirname, './build')
};

module.exports = assign({}, webpackBase, {

  entry: [
    'webpack/hot/dev-server',
    `${paths.SRC}/app.js`
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
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: false,
      gzip: '',
      buildPath: ''
    }),
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
