import sortBy from 'lodash.sortby';

function dynamicRequireReadmes({ repo, readmeUrl }) {
  switch (repo) {
    case 'react-input-children':
      return require(`raw-loader!gh-deps/node_modules/react-input-children/${readmeUrl.replace('.md', '')}.md`);
    case 'react-autosize-textarea':
      return require(`raw-loader!react-autosize-textarea/${readmeUrl.replace('.md', '')}.md`);
    case 'react-cookie-banner':
      return require(`raw-loader!react-cookie-banner/${readmeUrl.replace('.md', '')}.md`);
    case 'react-flexview':
      return require(`raw-loader!gh-deps/node_modules/react-flexview/${readmeUrl.replace('.md', '')}.md`);
    default:
      return require(`raw-loader!../../src/${readmeUrl.replace('.md', '')}.md`);
  }
}

function dynamicRequireContents({ contentUrl }) {
  return require(`raw-loader!../../${contentUrl.replace('.md', '')}.md`);
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
