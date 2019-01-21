#!/bin/bash

set -e

mkdir ~/.ssh

echo "$PRIVATE_KEY" > ~/.ssh/id_rsa

echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config

chmod 400 ~/.ssh/id_rsa

cd showroom

yarn install --no-progress

yarn update-components

yarn build

git config user.email our-bots@buildo.io

git config user.name nemobot

git add docs yarn.lock

git commit --allow-empty -m 'update gh-pages [skip ci]'

git push origin HEAD:master --force
