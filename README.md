[![Build Status](https://drone.our.buildo.io/api/badges/buildo/react-components/status.svg)](https://drone.our.buildo.io/buildo/react-components) [![npm](https://img.shields.io/npm/v/buildo-react-components.svg?maxAge=2592000)](https://www.npmjs.com/package/buildo-react-components) [![dependencies Status](https://david-dm.org/buildo/react-components/status.svg)](https://david-dm.org/buildo/react-components)

# React Components

[![Greenkeeper badge](https://badges.greenkeeper.io/buildo/react-components.svg)](https://greenkeeper.io/)
This is a collection of reusable React components used at [buildo](http://buildo.io/).

Its purpose is to give access to all these components through a single npm dependency so to improve the development experience and make eventual changes of library easier, faster and centralized.

## Install
`npm install --save buildo-react-components`

## Showroom
[http://react-components.buildo.io/](http://react-components.buildo.io/)

## Usage
Each component is stored inside its own folder (useful for small bundles).
You can import each package directly from the main lib:

`import { Panel, Dropdown, Popover } from 'buildo-react-components';`

Or from the package folder:

`import Button from 'buildo-react-components/lib/Button';`

**NOTE:** If you installed it as a GitHub dependency (`npm i --save buildo/react-component`) then import from `/src`:

`import Button from 'buildo-react-components/src/button';`

## Semver
Until `buildo-react-components` reaches a 1.0 release, breaking changes will be released with a new minor version. For example in 0.5.1, and 0.5.4 **every** component will have the same expected output, but in 0.6.0 **at least** one component will have breaking changes.

Every change (new features, fixes and breaking changes) is listed in `CHANGELOG.md`. To know more read the [changelog section](https://github.com/buildo/react-components#changelog)

#### Publish on npm
To publish a new version you must:
- be authenticated in `npm` and authorized to publish buildo libraries
- run `npm run release`

a powerful `node` script will do the rest for you :)
- throw error if not on "master"
- throw error if not in sync with "remote"
- automatically detect if release should be "breaking"
- run linters and tests
- increase version (breaking|patch)
- publish new version on `npm`
- push work on origin

## Changelog
[CHANGELOG.md](https://github.com/buildo/react-components/blob/master/CHANGELOG.md)

`CHANGELOG.md` is updated after **every** commit on `master` automatically by the CI.

Closed issues are grouped in one of these three sections:
- `"Breaking"`
- `"Fixes (bugs & defects)"`
- `"New features"`

In order to separate issues in the above groups the script uses their labels.

**IMPORTANT:** Please remember to mark any breaking issue with the label `"breaking"`.
