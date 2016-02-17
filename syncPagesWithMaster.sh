#! /bin/bash

set -e
set -x

git checkout master
git pull
git checkout gh-pages
git pull
git merge master
npm run deploy-showroom
git checkout master
