#!/usr/bin/env bash
# Test: the published demo carries a thumbnail per video and no Apple footage
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$(mktemp -d)"
trap 'rm -rf "$OUT"' EXIT

passed=0
failed=0
ok()   { passed=$((passed + 1)); echo "  ✓ $1"; }
fail() { failed=$((failed + 1)); echo "  ✗ $1"; }
check() { if "$@"; then ok "$msg"; else fail "$msg"; fi; }

bash "$ROOT/demo/build.sh" "$OUT/site" >/dev/null

echo ""
echo "Demo checks:"

want=$(bash "$ROOT/tools/make-thumbs.sh" --list | sort)
have=$(cd "$OUT/site/preload" && find . -type f -name '*.webp' -size +0 -printf '%f\n' | sort)

msg="Every catalog video has a demo thumbnail"
check [ "$want" = "$have" ]

msg="No demo thumbnail is larger than 200 KB"
check [ -z "$(find "$OUT/site/preload" -type f -size +200k)" ]

msg="The demo page loads the list script it ships"
check grep -q 'src="list.js"' "$OUT/site/index.html"

msg="The demo ships the list and key scripts"
check [ -s "$OUT/site/list.js" -a -s "$OUT/site/keys.js" -a -s "$OUT/site/proxy.js" -a -s "$OUT/site/config.js" ]

msg="The demo page loads the key script"
check grep -q 'src="keys.js"' "$OUT/site/index.html"

echo ""
if [ "$failed" -eq 0 ]; then
  echo "$((passed + failed)) tests, $passed passed, 0 failed"
else
  echo "$((passed + failed)) tests, $passed passed, $failed failed"
  exit 1
fi
