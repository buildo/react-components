const execSync = require('child_process').execSync;
const axios = require('axios');
const _ = require('lodash');

const logError = e => {
  console.error(`\nError: ${e.message}`);
  process.exit(1);
}

try {
  const CURRENT_BRANCH = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();

  if (CURRENT_BRANCH !== 'master') {
    throw new Error('You must be on master to perform this task. Aborting.');
  }

  console.log('Updating remote branches...');
  execSync('git fetch');
  console.log('Done\n');

  const LOCAL = execSync('git rev-parse @', { encoding: 'utf8' }).trim();
  const REMOTE = execSync('git rev-parse @{u}', { encoding: 'utf8' }).trim();
  const BASE = execSync('git merge-base @ @{u}', { encoding: 'utf8' }).trim();

  if (LOCAL !== REMOTE && LOCAL === BASE) {
    throw new Error('Your local branch is out-of-date. Please pull the latest remote changes. Aborting.');
  } else if (LOCAL !== REMOTE && REMOTE === BASE) {
    throw new Error('Your local branch is ahead of its remote branch. Please push your local changes. Aborting.');
  } else if (LOCAL !== REMOTE) {
    throw new Error('Your local and remote branches have diverged. Please put them in sync. Aborting.');
  }

  const BASE_URL = 'https://api.github.com/repos/buildo/react-components';

  const isVersionTag = tag => {
    return _.startsWith(tag.name, 'v') && _.every(tag.name.slice(1).split('.'), s => typeof parseInt(s) === 'number');
  };

  axios.get(`${BASE_URL}/tags`).then(res => {
    const tags = res.data;
    const lastVersionTagShaUrl = _.find(tags, isVersionTag).commit.url;

    return axios.get(lastVersionTagShaUrl).then(res => {
      const tagCommit = res.data;
      const lastVersionTagDateTime = tagCommit.commit.author.date;

      return axios.get(`${BASE_URL}/issues?state=closed&since=${lastVersionTagDateTime}`).then(res => {
        const issuesUpdatedAfterLastTag = res.data;
        const unpublishedIssues = issuesUpdatedAfterLastTag.filter(i => i.closed_at >= lastVersionTagDateTime);

        if (unpublishedIssues.length === 0) {
          throw new Error('Can\'t find any issue closed after last publish. Are you sure there are new features to publish?');
        }

        return axios.get(`${BASE_URL}/issues?labels=breaking&state=closed&since=${lastVersionTagDateTime}`).then(res => {
          breakingIssuesUpdatedAfterLastTag = res.data;
          const unpublishedBreakingIssues = breakingIssuesUpdatedAfterLastTag.filter(i => i.closed_at >= lastVersionTagDateTime);

          const isBreaking = unpublishedBreakingIssues.length > 0;

          console.log(`RUN "npm version ${isBreaking ? 'minor' : 'patch'}"`);
          execSync(`npm version ${isBreaking ? 'minor' : 'patch'}`, { stdio: [process.stdin, process.stdout, process.stderr] });

          console.log('RUN "npm publish"');
          execSync('npm publish', { stdio: [process.stdin, process.stdout, process.stderr] });

          console.log('RUN "git push"');
          execSync('git push', { stdio: [process.stdin, process.stdout, process.stderr] });

          console.log('RUN "git push --tags"');
          execSync('git push --tags', { stdio: [process.stdin, process.stdout, process.stderr] });

          console.log(`\n Successfuly released a new "${isBreaking ? 'BREAKING' : 'PATCH'}" version: "v${require('./package.json').version}"`);
        });
      });
    })
  }).catch(logError);
} catch (e) {
  logError(e);
}