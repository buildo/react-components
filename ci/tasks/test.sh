#!/bin/bash

set -e

cd react-components

yarn install --no-progress
yarn typecheck
yarn prettier-check
yarn test
