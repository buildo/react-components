#! /bin/bash

set -e
set -x

TARGET="$1"

case $TARGET in
  "")
    FILE_TARGET=""
    ;;
  "component")
    FILE_TARGET="$TARGET."
    ;;
  "perf-test")
    FILE_TARGET="$TARGET."
    ;;
  *)
    echo "Invalid target"
    exit -1
    ;;
esac

if [[ -z "$NODE_ENV" ]]; then
  NODE_ENV=development
fi

NODE_ENV=$NODE_ENV webpack-dev-server \
  --config showroom/webpack.${FILE_TARGET}config.babel.js \
  --progress \
  --hot \
  --inline
