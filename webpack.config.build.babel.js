import path from 'path';
import webpack from 'webpack';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import webpackBase, { paths } from './webpack.base.babel';
import fs from 'fs';

console.log(paths.SHOWROOM);

export default {

  ...webpackBase,

  plugins: webpackBase.plugins.concat([
    new StyleLintPlugin({
      files: '**/*.scss',
      failOnError: true,
      syntax: 'scss'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, screw_ie8: true },
      output: { comments: false },
      sourceMap: true
    }),
    new CompressionPlugin({
      regExp: /\.js$|\.css$/
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'showroom/index.html',
      inject: false,
      gzip: '',
      buildPath: 'https://cdn.rawgit.com/buildo/react-components/master/showroom/build/'
    }),
    new ExtractTextPlugin({ filename: 'style.[hash].min.css' })
  ]),

  module: {
    ...webpackBase.module,
    rules: webpackBase.module.rules.concat([
      // style!css rules
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      // SASS
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'resolve-url-loader',
            options: { sourceMap: true }
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }]
        })
      }
    ])
  }

};
