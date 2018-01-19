const packageJson = require('./package.json');
const _ = require('lodash');

_.forEach(packageJson.dependencies, (value, key) => {
  if (!(/^\d+\.\d+\.\d+/).test(value)) {
    console.error(`\npackage.json.dependencies.${key} is not pinned! it should be in the form of "1.2.3"\n`);
    process.exit(1);
  }
});
