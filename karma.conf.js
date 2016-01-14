var path = require('path');
var webpack = require('webpack');
var paths = {
  SRC: path.resolve(__dirname, 'src'),
  TEST: path.resolve(__dirname, 'test')
};

module.exports = function (config) {
  config.set({

    browserNoActivityTimeout: 30000,

    browsers: [ 'Chrome' ],

    singleRun: true,

    frameworks: [ 'mocha' ],

    files: [
      'karma.js'
    ],

    preprocessors: {
      'karma.js': [ 'webpack' ]
    },

    webpack: {
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel?stage=0&loose',
            include: [paths.SRC, paths.TEST]
          },
          // style!css loaders
          {
            test: /\.css?$/,
            loaders: ['style', 'css']
          },
          // SASS loaders
          {
            test: /\.scss?$/,
            loaders: ['style', 'css', 'sass?sourceMap']
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ]
    },

    webpackMiddleware: {
      noInfo: true //please don't spam the console when running in karma!
    }

  });
};
