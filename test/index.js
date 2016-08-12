// called by mocha
const requireDir = require('require-dir');
const path = require('path');

require('babel-register')({
  only: [path.resolve('src'), path.resolve('test/tests')],
  extensions: ['.js', '.jsx']
});

require('require-noop')({
  extensions: ['.png', '.css', '.scss']
});

requireDir('./tests', {
  recurse: true
});
