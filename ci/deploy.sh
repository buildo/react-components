#!/bin/bash

set -e

cd showroom

yarn install --no-progress

yarn update-components

yarn build

git add docs yarn.lock

git commit -m 'update gh-pages [skip ci]'

cd ..

cp -a showroom/. showroom-build
