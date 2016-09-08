import { sortBy, find } from 'lodash';

function dynamicRequire({ repo, example: e }) {
  switch (repo) {
    case 'rc-datepicker':
      return { ...e, code: require(`raw!rc-datepicker/${e.url.replace('.example', '')}.example`) };
    case 'react-input-children':
      return { ...e, code: require(`raw!gh-deps/node_modules/react-input-children/${e.url.replace('.example', '')}.example`) };
    case 'react-autosize-textarea':
      return { ...e, code: require(`raw!react-autosize-textarea/${e.url.replace('.example', '')}.example`) };
    case 'react-cookie-banner':
      return { ...e, code: require(`raw!react-cookie-banner/${e.url.replace('.example', '')}.example`) };
    case 'react-flexview':
      return { ...e, code: require(`raw!gh-deps/node_modules/react-flexview/${e.url.replace('.example', '')}.example`) };
    default:
      return { ...e, code: require(`raw!../../src/${e.url.replace('.js', '')}.js`) };
  }
}

export default json => {
  return json.map(section => {
    if (section.id === 'components') {
      const components = sortBy(section.components, 'title')
        .map(c => ({
          ...c,
          examples: c.examples.map(example => dynamicRequire({ repo: c.repo, example }))
        }))
        .filter(c => !find(c.examples, e => e.code === null));

      return { ...section, components };
    }
    return section;
  });
};
