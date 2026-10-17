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
exit "$fails"
