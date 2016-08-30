import { sortBy, find } from 'lodash';

function dynamicRequire(e) {
  const [ path ] = e.url.match(/src\/(.+)\/examples\/(.+).js/) || [];
  return {
    ...e,
    code: path ? require(`raw!../../src/${path.replace('src/', '').replace('.js', '')}.js`) : null
  };
}

export default json => {
  return json.map(section => {
    if (section.id === 'components') {
      const components = sortBy(section.components, 'title')
        .map(c => ({
          ...c,
          examples: c.examples.map(dynamicRequire)
        }))
        .filter(c => !find(c.examples, e => e.code === null));

      return { ...section, components };
    }
    return section;
  });
};
