#!/bin/sh

set -e
set -x


apt-get update
apt-get install -y jq

BRANCH=$(cat react-components/.git/resource/metadata.json | jq -r '.[] | select(.name == "head_name").value')

cd react-components

yarn install --no-progress

NODE_ENV=production yarn build-styleguidist

mkdir ../preview/build
cp -a styleguide/build/* ../preview/build/*
cp -a styleguide/index.html ../preview/$BRANCH.html
