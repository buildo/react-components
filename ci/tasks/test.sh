#!/bin/bash

set -e

cd react-components

yarn install --no-progress
yarn preversion
# omitting prepublish (aka build) because a build is already run as part of this package tests