#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")"

test_dir=__driver-project-instance

rm -rf $test_dir
cp -r driver-project-template $test_dir

cd $test_dir

# Generate the tarball in the current directory
npm pack ../..

# Find the generated tarball
tarball=$(ls csv-writer-portable-*.tgz)

# Verify the tarball exists and is readable
if [ ! -f "$tarball" ]; then
    echo "Error: Tarball $tarball not found!"
    exit 1
fi

tarball_path=$(realpath $tarball)

# Install dependencies and the tarball
npm install
npm install "$tarball_path"

# Verify the tarball installation
if [ ! -d "node_modules/csv-writer-portable" ]; then
    echo "Error: csv-writer-portable not installed!"
    exit 1
fi

# Run the tests in Docker
docker run --rm -v "$(pwd)":/app -w /app node:20 npm test
