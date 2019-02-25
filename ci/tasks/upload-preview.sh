#!/bin/sh

set -e

export AWS_DEFAULT_REGION="eu-central-1"

aws s3 sync preview s3://react-components.preview.our.buildo.io/ --acl public-read --exclude "*.gz"
aws s3 sync preview s3://react-components.preview.our.buildo.io/ --acl public-read --content-encoding gzip --exclude '*' --include '*.gz'
