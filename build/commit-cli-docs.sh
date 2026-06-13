#!/usr/bin/env bash

Chincyphechain-Blockchain-Security_DIR=$(dirname "${BASH_SOURCE}")/..

cd "${Chincyphechain-Blockchain-Security_DIR}"

git add docs/content/cli.md

if [[ -z "$(git diff --name-only --cached)" ]]; then
  echo "No CLI doc changes to commit"
  exit 1
fi

git commit -m "docs: Update generated CLI docs"

echo ""
echo "Committed changes for files:"
git diff-tree --no-commit-id --name-only -r HEAD
echo ""
