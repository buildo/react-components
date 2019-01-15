#!/bin/bash

set -e

mkdir ~/.ssh

echo "$PRIVATE_KEY" > ~/.ssh/id_rsa

chmod 400 ~/.ssh/id_rsa

cd showroom

yarn install --no-progress

yarn build

yarn deploy

echo "now you should put what you just built somewhere.."
