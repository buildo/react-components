import { sortBy } from 'lodash';

function dynamicRequire(readmeUrl) {
  const [ path ] = readmeUrl.match(/src\/.+\/README/) || [];
  return path ? require(`raw!../../src/${path.replace('src/', '')}.md`) : null;
}

export default json => {
  return json.map(section => {
    if (section.id === 'components') {
      const components = sortBy(section.components, 'title').map(c => ({
        ...c,
        readme: c.readmeUrl ? dynamicRequire(c.readmeUrl) : null
      }));

      return { ...section, components };
    }
    return section;
  });
};
