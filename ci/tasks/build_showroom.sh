#!/bin/bash

set -e

cd showroom

yarn install --no-progress

yarn update-components

yarn build

git config user.email our-bots@buildo.io

git config user.name nemobot

git add docs yarn.lock

git commit -m 'update gh-pages'

cd ..

cp -a showroom/. showroom-build
