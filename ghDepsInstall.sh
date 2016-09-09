#! /bin/bash

if [[ $(git config --get remote.origin.url) == *buildo/react-components.git* ]]; then
  npm i ./ghDeps;
fi
