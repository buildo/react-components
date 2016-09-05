const axios = require('axios');
const version = require('./package.json').version;
const find = require('lodash/find');

const access_token = process.env.GITHUB_TOKEN || process.env.CHANGELOG_GITHUB_TOKEN;

if (!access_token) {
  console.error('Missing environment variable GITHUB_TOKEN. Aborting.');
  process.exit();
}

const github = axios.create({ baseURL: 'https://api.github.com/repos/buildo/react-components', params: { access_token } });

github.get('/tags')
  .then(tags => {
    const tag = find(tags.data, { name: `v${version}` });

    github.get(`/commits/${tag.commit.sha}`)
      .then(commit => {
        const changelogUrl = 'https://github.com/buildo/react-components/blob/master/CHANGELOG.md';
        const tagISODate = commit.data.commit.author.date.slice(0, 10);
        const linkToChangelog = `${changelogUrl}#${tag.name.split('.').join('')}-${tagISODate}`;

        const release = {
          tag_name: tag.name,
          name: tag.name,
          body: `See [CHANGELOG.md](${linkToChangelog}) for details about this release.`
        };

        github.post('/releases', release)
          .then(() => console.log(`\nSuccessfully created release "${tag.name}"\n`))
          .catch(x => console.log(x.data.message));
      });
  }).catch(x => console.log(x));
