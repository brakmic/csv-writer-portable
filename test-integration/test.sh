#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")"

test_dir=__driver-project-instance

rm -rf $test_dir
cp -r driver-project-template $test_dir

cd $test_dir

npm pack ../..
npm install
npm install ./csv-writer-portable-*.tgz

docker run --rm -v `pwd`:/app -w /app node:16 npm test
