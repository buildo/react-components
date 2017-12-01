const path = require('path');
const endsWith = require('lodash/endsWith');
const fs = require('fs');

function brc(name) {
  return path.resolve(__dirname, `src/${name}/${name}`);
}

const brcComponents = fs.readdirSync(path.resolve(__dirname, 'src'))
  .filter(c => ['index.ts', '.DS_Store', 'utils', 'Scroll', 'TransitionWrapper'].indexOf(c) === -1)
  .map(brc);

module.exports = {
  // build
  serverPort: 8080,

  require: [
    // "global" setup + sass imports
    path.resolve(__dirname, 'styleguide/setup.ts')
  ],
  styleguideComponents: {
    StyleGuideRenderer: path.join(__dirname, 'styleguide/StyleGuideRenderer.tsx')
  },

  // content
  title: 'buildo-react-components',
  template: 'styleguide/index.html',
  propsParser: require('react-docgen-typescript').parse, // detect docs using TS information
  sections: [{
    name: 'Components',
    components: () => brcComponents
  }],
  showCode: true,
  showUsage: false, // show props by default
  getExampleFilename(componentPath) {
    const name = endsWith(componentPath, '.tsx') ? path.basename(componentPath, '.tsx') : path.basename(componentPath, '.ts');
    return path.resolve(__dirname, `src/${name}/Examples.md`);
  }
};
