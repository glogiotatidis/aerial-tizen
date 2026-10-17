#!/usr/bin/env bash
set -uo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
fails=0
check() { if "${@:2}"; then echo "ok   $1"; else echo "FAIL $1"; fails=$((fails+1)); fi; }
has() { grep -qF -- "$2" "$ROOT/.github/workflows/$1"; }
check "dependabot-merge selects the PR from the run" has dependabot-merge.yml 'pull_requests[0].number'
check "dependabot-merge verifies the author" has dependabot-merge.yml 'app/dependabot develop false'
check "dependabot-merge dispatches security" has dependabot-merge.yml 'gh workflow run security.yml --ref develop'
check "promote waits for test reuse zizmor" has promote.yml 'for name in test reuse zizmor'
check "promote only enables auto-merge" has promote.yml 'gh pr merge "$pr" --auto --merge --match-head-commit "$SHA"'
check "promote tells the maintainer to approve" has promote.yml 'merges when you approve it'
check "code owner is the maintainer" grep -qx '\* @jeancarlos' "$ROOT/.github/CODEOWNERS"
check "ci uploads the coverage percent" has ci.yml 'name: coverage-percent'
check "badge publishes to the badges branch" has badge.yml 'HEAD:badges'
check "badge only runs after ci on main" has badge.yml 'branches: [main]'
check "c8 writes the json summary" grep -q json-summary "$ROOT/.c8rc.json"
check "zizmor ignores the badge trigger" grep -qF "badge.yml:3" "$ROOT/.github/zizmor.yml"
exit "$fails"
