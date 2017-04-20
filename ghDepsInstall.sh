#! /bin/bash

if [[ $(git config --get remote.origin.url) == *buildo/react-components.git* ]]; then
  # use yarn if installed, or use npm instead
  command -v yarn > /dev/null 2>&1 && yarn add ./ghDeps || npm i ./ghDeps
fi
