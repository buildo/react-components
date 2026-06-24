[![Build Status](https://drone.our.buildo.io/api/badges/buildo/react-components/status.svg)](https://drone.our.buildo.io/buildo/react-components) [![npm](https://img.shields.io/npm/v/buildo-react-components.svg?maxAge=2592000)](https://www.npmjs.com/package/buildo-react-components) [![dependencies Status](https://david-dm.org/buildo/react-components/status.svg)](https://david-dm.org/buildo/react-components)

# React Components
This is a collection of reusable React components used at [buildo](http://buildo.io/).

Its purpose is to give access to all these components through a single npm dependency so to improve the development experience and make eventual changes of library easier, faster and centralized.

## Install
`npm install --save buildo-react-components`

## Showroom
[http://react-components.buildo.io/](http://react-components.buildo.io/)

## Usage
Each component is stored inside its own folder (useful for small bundles).
You can import each package directly from the main lib:

`import { Panel, SingleDropdown, Popover } from 'buildo-react-components';`

Or from the package folder:

`import Button from 'buildo-react-components/lib/Button';`

**NOTE:** If you installed it as a GitHub dependency (`npm i --save buildo/react-component`) then import from `/src`:

`import Button from 'buildo-react-components/src/button';`

## Semver
Until `buildo-react-components` reaches a 1.0 release, breaking changes will be released with a new minor version. For example in 0.5.1, and 0.5.4 **every** component will have the same expected output, but in 0.6.0 **at least** one component will have breaking changes.

Every change (new features, fixes and breaking changes) is listed in `CHANGELOG.md`. To know more read the [changelog section](https://github.com/buildo/react-components#changelog)

#### Publish on npm
Releases are handled by [`ci/release.sh`](ci/release.sh), a self-contained script that
talks to GitHub through the [`gh` CLI](https://cli.github.com/) (so it works with modern
2FA/fine-grained tokens) and publishes with plain `npm`.

**Requirements:**
- the `gh`, `jq`, `node`, `npm` and `yarn` CLIs installed (the script checks for them)
- be authenticated with GitHub: `gh auth login`
- be authenticated in `npm` and authorized to publish buildo libraries: `npm login`

**To release:**
```sh
yarn release             # auto-compute the next version and release
yarn release --dry-run   # preview every step without changing/pushing/publishing anything
```

The script will:
- throw an error if not on "master", or not in sync with "remote", or the tree isn't clean
- automatically detect if the release should be "breaking" (from closed issue labels) and
  increase the version accordingly (`breaking` ⇒ minor while `< 1.0`, otherwise patch)
- prepend a new section to `CHANGELOG.md`
- commit, tag, and push to origin
- create the GitHub release
- build and publish the new version on `npm` (prompting for a 2FA one-time password if needed)

**Useful flags:**
- `--version X.Y.Z` — publish an explicit version instead of the computed one
- `--otp 123456` — pass the npm 2FA one-time password up front
- `--yes` — skip the version-bump confirmation prompt
- `--skip-publish` — do everything except `npm publish`

## Changelog
[CHANGELOG.md](https://github.com/buildo/react-components/blob/master/CHANGELOG.md)

`CHANGELOG.md` is updated after **every** commit on `master` automatically by the CI.

Closed issues are grouped in one of these three sections:
- `"Breaking"`
- `"Fixes (bugs & defects)"`
- `"New features"`

In order to separate issues in the above groups the script uses their labels.

**IMPORTANT:** Please remember to mark any breaking issue with the label `"breaking"`.
