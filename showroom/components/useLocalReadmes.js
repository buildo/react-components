import { sortBy } from 'lodash';

function dynamicRequireReadmes({ repo, readmeUrl }) {
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

function dynamicRequireContents({ contentUrl }) {
  return require(`raw!../../${contentUrl.replace('.md', '')}.md`);
}


export default json => {
  return json.map(section => ({
    ...section,
    components: section.components ? sortBy(section.components, 'title').map(c => ({
      ...c,
      readme: c.readmeUrl ? dynamicRequireReadmes(c) : null
    })) : undefined,
    contents: section.contents ? section.contents.map(c => ({
      ...c,
      content: c.contentUrl ? dynamicRequireContents(c) : null
    })) : undefined
  }));
};
