#!/bin/bash

set -e

cd showroom

yarn install --no-progress

yarn build

echo "now you should put what you just built somewhere.."
