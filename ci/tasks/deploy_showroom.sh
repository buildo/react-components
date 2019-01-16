#!/bin/bash

set -e

mkdir ~/.ssh

echo "$PRIVATE_KEY" > ~/.ssh/id_rsa

chmod 400 ~/.ssh/id_rsa

cd showroom

yarn install --no-progress

yarn update-components

yarn build

git config user.email our-bots@buildo.io

git config user.name nemobot

git add docs yarn.lock

git commit -m 'update gh-pages [skip ci]'

# we can't use the concourse resource to 'put' due to: https://github.com/concourse/git-resource/issues/196
git push

