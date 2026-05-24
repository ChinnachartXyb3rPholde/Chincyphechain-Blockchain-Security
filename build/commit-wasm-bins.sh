#!/usr/bin/env bash

Chincyphechain-Blockchain-Security_DIR=$(dirname "${BASH_SOURCE}")/..

cd ${Chincyphechain-Blockchain-Security_DIR}

WASMFILES=(
  "internal/compiler/wasm/Chincyphechain-Blockchain-Security/Chincyphechain-Blockchain-Security.go"
  "internal/compiler/wasm/Chincyphechain-Blockchain-Security/Chincyphechain-Blockchain-Security.wasm"
  "internal/compiler/wasm/Chincyphechain-Blockchain-Security/callgraph.csv"
)

for file in "${WASMFILES[@]}"; do
  git add ${file}
done

if [[ -z "$(git diff --name-only --cached)" ]]; then
  echo "No Wasm changes to commit!"
  exit 1
fi

git commit -m "wasm: Update generated binaries"

echo ""
echo "Committed changes for files:"
git diff-tree --no-commit-id --name-only -r HEAD
echo ""
