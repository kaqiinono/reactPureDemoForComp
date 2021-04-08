#!/bin/bash

if [ ! -d "./.husky/_" ]; then
  npm run husky
  echo 'husky init!';
  npx husky add "./.husky/pre-commit" "npm run lint-staged"
  # shellcheck disable=SC2016
  npx husky add "./.husky/commit-msg" 'npx --no-install commitlint --edit "$1"'
fi
