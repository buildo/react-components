// called by mocha
const requireDir = require('require-dir');
const path = require('path');

require('babel/register')({
  only: [path.resolve('src'), path.resolve('test/tests')],
  extensions: ['.js', '.jsx'],
  stage: 0,
  loose: true
});

require('require-noop')({
  extensions: ['.png', '.css', '.scss']
});

requireDir('./tests', {
  recurse: true
});
