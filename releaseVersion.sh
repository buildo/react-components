#!/bin/bash

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ $CURRENT_BRANCH != "master" ]; then
  echo "You must be on master to perform this task. Aborting."
  exit 1
fi

if [ -z $1 ]; then
  echo "Usage:"
  echo "   npm release [patch|minor]"
  exit 1
fi

if [ $1 != "patch" ] && [ $1 != "minor" ]; then
  echo "Usage:"
  echo "   npm release [patch|minor]"
  exit 1
fi

echo "Updating remote branches..."
git fetch
echo "Done"

LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
BASE=$(git merge-base @ @{u})

if [ $LOCAL = $REMOTE ]; then
  npm version $1
  npm publish
  git push
  git push --tags
elif [ $LOCAL = $BASE ]; then
  echo "Your local branch is out-of-date. Please pull the latest remote changes. Aborting."
  exit 1
elif [ $REMOTE = $BASE ]; then
  echo "Your local branch is ahead of its remote branch. Please push your local changes. Aborting."
  exit 1
else
  echo "Your local and remote branches have diverged. Please put them in sync. Aborting."
  exit 1
fi