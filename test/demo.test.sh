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

msg="The demo page carries no stills-only disclaimer"
check [ -z "$(grep -c sim-note "$OUT/site/index.html" | grep -v "^0$")" ]

msg="The demo ships the list and key scripts"
check [ -s "$OUT/site/list.js" -a -s "$OUT/site/keys.js" -a -s "$OUT/site/proxy.js" -a -s "$OUT/site/config.js" ]

msg="The demo thumbnail fills the viewport like the video does"
check grep -Pzoq '#preload \{\s*width: 100%;\s*height: 100%;' "$OUT/site/index.html"

msg="The demo video starts at the second the thumbnail is cut from"
check grep -q "toBrowserUrl(url) + '#t=1'" "$OUT/site/index.html"

msg="Backdrop blur sits on the blur class only, never on the base menu"
check sh -c 'grep -Pzoq "#menu\.blur \{[^}]*backdrop-filter" "$1" && ! grep -Pzoq "#menu \{[^}]*backdrop-filter" "$1"' _ "$ROOT/css/style.css"

msg="The demo exit screen offers a restart button"
check grep -q "location.reload()" "$OUT/site/index.html"

msg="The demo page loads the key script"
check grep -q 'src="keys.js"' "$OUT/site/index.html"

msg="The file server home page lists live files"
check grep -q "fetch('files.json')" "$ROOT/server/index.html"

msg="The file server home page loads the demo catalog"
check grep -q 'https://aerial.jeansouza.dev/catalog.js' "$ROOT/server/index.html"

msg="The file server home page shows a thumbnail per video"
check grep -q "'thumbnail/'" "$ROOT/server/index.html"

echo ""
if [ "$failed" -eq 0 ]; then
  echo "$((passed + failed)) tests, $passed passed, 0 failed"
else
  echo "$((passed + failed)) tests, $passed passed, $failed failed"
  exit 1
fi
