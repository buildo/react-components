#!/bin/sh

set -e
set -x

cd react-components

yarn install --no-progress

yarn build-styleguidist 

mv styleguide/index.html styleguide/$BRANCH.html

cp -a styleguide/* ../preview
