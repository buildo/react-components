#!/bin/bash

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ $CURRENT_BRANCH != "master" ]; then
  echo "You must be on master to perform this task. Aborting."
  exit 1
fi

git reset
npm run build-showroom
git add ./index.html ./showroom/build ./showroom/components.json
(git commit -m 'Update gh pages [skip CI]' && git push origin master) || true