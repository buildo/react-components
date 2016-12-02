import path from 'path';
import webpack from 'webpack';
import webpackBase from './webpack.base.babel';
import webpackConfig from './webpack.config.babel';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const paths = {
  PERF: path.resolve(__dirname, '../perf')
};


export default {
  ...webpackConfig,

  entry: [
    'webpack/hot/dev-server',
    `${paths.PERF}/app.js`
  ],

  plugins: webpackBase.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: 'perf/index.html',
      inject: false,
      gzip: '',
      buildPath: ''
    }),
    new ExtractTextPlugin('style', 'style.[hash].min.css')
  ])

};
