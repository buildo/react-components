import { sortBy } from 'lodash';

function dynamicRequire({ repo, readmeUrl }) {
  switch (repo) {
    case 'rc-datepicker':
      return require(`raw!rc-datepicker/${readmeUrl.replace('.md', '')}.md`);
    case 'react-input-children':
      return require(`raw!gh-deps/node_modules/react-input-children/${readmeUrl.replace('.md', '')}.md`);
    case 'react-autosize-textarea':
      return require(`raw!react-autosize-textarea/${readmeUrl.replace('.md', '')}.md`);
    case 'react-cookie-banner':
      return require(`raw!react-cookie-banner/${readmeUrl.replace('.md', '')}.md`);
    case 'react-flexview':
      return require(`raw!gh-deps/node_modules/react-flexview/${readmeUrl.replace('.md', '')}.md`);
    default:
      return require(`raw!../../src/${readmeUrl.replace('.md', '')}.md`);
  }
}

export default json => {
  return json.map(section => {
    if (section.id === 'components') {
      const components = sortBy(section.components, 'title').map(c => ({
        ...c,
        readme: c.readmeUrl ? dynamicRequire(c) : null
      }));

      return { ...section, components };
    }
    return section;
  });
};
