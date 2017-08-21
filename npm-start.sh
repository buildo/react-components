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
  *)
    echo "Invalid target"
    exit -1
    ;;
esac

NODE_ENV=development webpack-dev-server \
  --config webpack.${FILE_TARGET}config.babel.js \
  --progress \
  --hot \
  --inline
