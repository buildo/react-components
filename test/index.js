// called by mocha
const requireDir = require('require-dir');

require('babel/register')({
  only: [/src/, /tests/],
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
