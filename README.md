[![Build Status](https://drone.our.buildo.io/api/badges/buildo/react-components/status.svg)](https://drone.our.buildo.io/buildo/react-components) [![GitHub tag](https://img.shields.io/github/tag/buildo/react-components.svg)](https://github.com/buildo/react-components/releases)

# React Components
This is a collection of reusable React components used at [buildo](http://buildo.io/).

Its purpose is to give access to all these components through a single npm dependency so to improve the development experience and make eventual changes of library easier, faster and centralized.

## Install
`npm install --save buildo-react-components`

## Showroom
[https://buildo.github.io/react-components](https://buildo.github.io/react-components)

## Usage
Each component is stored inside its own folder (useful for small bundles).
You can import each package directly from the main lib:

`import { FlexView, Dropdown, Popover } from 'buildo-react-components';`

Or from the package folder:

`import { FlexView } from 'buildo-react-components/lib/flex';`

**NOTE:** If you installed it as a GitHub dependency (`npm i --save buildo/react-component`) then import from `/src`:

`import { FlexView } from 'buildo-react-components/src/flex';`

## Semver
Until `buildo-react-components` reaches a 1.0 release, breaking changes will be released with a new minor version. For example in 0.5.1, and 0.5.4 **every** component will have the same expected output, but in 0.6.0 **at least** one component will have breaking changes.

Every change (new features, fixes and breaking changes) is listed in `CHANGELOG.md`. To know more read the [changelog section](https://github.com/buildo/react-components#changelog)

#### Publish on npm
To publish a new version you must:
- be authenticated in `npm` and authorized to publish buildo libraries
- use one of these publish scripts
  - `npm run release-patch`
  - `npm run release-breaking-version`

## Changelog
[CHANGELOG.md](https://github.com/buildo/react-components/blob/master/CHANGELOG.md)

`CHANGELOG.md` is updated after **every** commit on `master` automatically by the CI.

Closed issues are grouped in one of these three sections:
- `"Breaking"`
- `"Fixes (bugs & defects)"`
- `"New features"`

In order to separate issues in the above groups the script uses their labels.

**IMPORTANT:** Please remember to mark any breaking issue with the label `"breaking"`.
