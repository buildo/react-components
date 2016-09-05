const axios = require('axios');
const version = require('./package.json').version;
const find = require('lodash/find');

const access_token = process.env.GITHUB_TOKEN || process.env.CHANGELOG_GITHUB_TOKEN;

if (!access_token) {
  console.error('Missing environment variable GITHUB_TOKEN. Aborting.');
  process.exit();
}

const github = axios.create({ baseURL: 'https://api.github.com/repos/buildo/react-components' });

github.get('/tags')
  .then(tags => {
    const tag = find(tags.data, { name: `v${version}` });

    axios.get(tag.commit.url)
      .then(commit => {
        const changelogUrl = 'https://github.com/buildo/react-components/blob/master/CHANGELOG.md';
        const tagISODate = commit.data.commit.author.date.slice(0, 10);
        const linkToChangelog = `${changelogUrl}#${tag.name.split('.').join('')}-${tagISODate}`;

        const release = {
          tag_name: tag.name,
          name: tag.name,
          body: `See [CHANGELOG.md](${linkToChangelog}) for details about this release.`
        };

        github({
          method: 'post',
          url: '/releases',
          data: release,
          params: { access_token }
        })
        .then(() => console.log(`\nSuccessfully created release "${version}"\n`))
        .catch(x => console.log(x));
      });
  }).catch(x => console.log(x));
