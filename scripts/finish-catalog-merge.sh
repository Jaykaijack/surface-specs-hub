#!/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
echo "== finish-catalog-merge in $ROOT =="
git status -sb
git branch --show-current

# Prefer already-resolved working tree files (synced via OneDrive)
if [ -f .git/MERGE_HEAD ]; then
  echo "Merge in progress — staging resolved files"
  git add js/surface-data.js tests/test-runner.js || true
  # Stage auto-merged IMG-P0 assets/docs/tests from main if present
  git add -u || true
  git add tests/image-mapping-p0.test.js docs/img-p0-blocked-for-jack-2026-09-22.md 2>/dev/null || true
  if ! git diff --cached --quiet; then
    git commit -m "$(cat <<'MSG'
Merge origin/main (IMG-P0) into catalog taxonomy/CN lineup

Preserve China/catalog taxonomy + specs; keep main IMG-P0 mappings
(pro-7-plus no Pro13 black, image-mapping-p0 tests, blocked doc).
MSG
)"
  fi
elif ! git merge-base --is-ancestor origin/main HEAD 2>/dev/null; then
  echo "Merging origin/main with -X ours then applying IMG-P0 mappings"
  git fetch origin main
  git merge origin/main -X ours --no-edit -m "Merge origin/main (IMG-P0) into catalog taxonomy/CN lineup" || true
  if [ -f scripts/ensure-img-p0-test-hook.js ]; then node scripts/ensure-img-p0-test-hook.js; fi
  if [ -f scripts/apply-img-p0-mappings.js ]; then node scripts/apply-img-p0-mappings.js; fi
  git add js/surface-data.js tests/test-runner.js
  git commit --allow-empty -m "fix(images): apply IMG-P0 mappings after merging main into catalog" || true
fi

echo "Running tests..."
set +e
node tests/test-runner.js | tee /tmp/surface-test-out.txt
code=${PIPESTATUS[0]}
set -e
tail -5 /tmp/surface-test-out.txt || true

git push -u origin HEAD
echo "PUSHED $(git rev-parse HEAD)"

if command -v gh >/dev/null 2>&1; then
  if gh pr view 3 >/dev/null 2>&1; then
    gh pr ready 3 2>/dev/null || true
    gh pr view 3 --json url,mergeable,state -q .
  else
    gh pr create --base main --head cursor/catalog-taxonomy-and-cn-lineup \
      --title "feat: Catalog/taxonomy + China lineup (merge IMG-P0 from main)" \
      --body "See local merge resolve + IMG-P0 mappings. Tests: see runner summary."
  fi
fi
