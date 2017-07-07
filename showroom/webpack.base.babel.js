import path from 'path';
import webpack from 'webpack';
import StyleLintPlugin from 'stylelint-webpack-plugin';

const paths = {
  ASSETS: path.resolve(__dirname, './assets'),
  SRC: path.resolve(__dirname),
  COMPONENTS: path.resolve(__dirname, '../src'),
  DIST: path.resolve(__dirname, './build')
};

module.exports = {

  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|en/),
    new StyleLintPlugin({
      files: '**/*.scss',
      failOnError: false,
      syntax: 'scss'
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: [ paths.ASSETS, /src\/.+\/examples/, paths.DIST ],
        include: [
          paths.COMPONENTS,
          paths.SRC,
          /react-input-children/,
          /react-autosize-textarea/,
          /react-cookie-banner/,
          /react-flexview/
        ]
      },
      {
        test: /\.png$|\.gif$/,
        loader: 'file?name=[path][name].[ext]'
      }
    ],
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: [ paths.SRC, paths.COMPONENTS ],
        exclude: paths.ASSETS
      }
    ]
  }

};
