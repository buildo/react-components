#!/bin/sh

set -e
set -x


apt-get update
apt-get install -y jq

BRANCH=$(cat react-components/.git/resource/metadata.json | jq -r '.[] | select(.name == "head_name").value')

cd react-components

yarn install --no-progress

yarn build-styleguidist

mv styleguide/index.html styleguide/$BRANCH.html

cp -a styleguide/* ../preview
