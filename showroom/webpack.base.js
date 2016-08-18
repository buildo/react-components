var path = require('path');
var webpack = require('webpack');

var paths = {
  ASSETS: path.resolve(__dirname, './assets'),
  SRC: path.resolve(__dirname),
  COMPONENTS: path.resolve(__dirname, '../src'),
  DIST: path.resolve(__dirname, './build')
};

module.exports = {

  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|en/)
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: [ paths.ASSETS ],
        include: [
          paths.COMPONENTS,
          paths.SRC,
          /rc-datepicker/,
          /react-input-children/,
          /react-autosize-textarea/,
          /react-cookie-banner/,
          /revenge-react-components/
        ]
      }
    ],
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: paths.SRC,
        exclude: paths.ASSETS
      }
    ]
  }

};
