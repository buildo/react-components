import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpackBase, { paths } from './webpack.base.babel';

console.log({ paths }, { x: `${paths.SHOWROOM}/app.tsx` })

export default {

  ...webpackBase,

  devtool: 'source-map',

  devServer: {
    contentBase: paths.BUILD,
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
      template: 'showroom/index.html',
      inject: false,
      gzip: '',
      buildPath: ''
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
