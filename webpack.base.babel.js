import path from 'path';
import webpack from 'webpack';
import StyleLintPlugin from 'stylelint-webpack-plugin';

export const paths = {
  ASSETS: path.resolve(__dirname, 'showroom/assets'),
  SHOWROOM: path.resolve(__dirname, 'showroom'),
  SRC: path.resolve(__dirname, 'src'),
  BUILD: path.resolve(__dirname, 'showroom/build'),
  ISOLATE_COMPONENT: path.resolve(__dirname, 'showroom/components/IsolatedComponentView/Component.js')
};

export default {

  entry: `${paths.SHOWROOM}/index.ts`,

  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|en/),
    new StyleLintPlugin({
      files: '**/*.scss',
      failOnError: false,
      syntax: 'scss'
    })
  ],

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.tsx']
  },

  output: {
    library: 'webclient',
    libraryTarget: 'var',
    path: paths.BUILD,
    filename: 'app.[hash].js'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'babel-loader'
        }, {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              allowJs: true,
              declaration: false
            }
          }
        }],
        exclude: [ paths.ASSETS, /src\/.+\/examples/, paths.BUILD ],
        include: [
          paths.SRC,
          paths.SHOWROOM,
          /react-input-children/,
          /react-autosize-textarea/,
          /react-cookie-banner/,
          /react-flexview/
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [ paths.ASSETS, /src\/.+\/examples/, paths.BUILD ],
        include: [
          paths.SRC,
          paths.SHOWROOM,
          /react-input-children/,
          /react-autosize-textarea/,
          /react-cookie-banner/,
          /react-flexview/
        ]
      },
      {
        test: /\.png$|\.gif$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: [ paths.SRC, paths.SHOWROOM ],
        exclude: paths.ASSETS
      }
    ]
  }

};
