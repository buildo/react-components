#! /bin/bash

set -e
set -x

git checkout master
git pull
git checkout gh-pages
git pull
git merge master -m "Merge branch 'master' into gh-pages"
npm run deploy-showroom
git checkout master
