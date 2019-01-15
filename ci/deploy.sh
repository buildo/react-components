#!/bin/bash

set -e

cd showroom

yarn install --no-progress

yarn build

yarn deploy

echo "now you should put what you just built somewhere.."
