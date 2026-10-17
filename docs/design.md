# Design

## Actors and actions

| Actor | Action | Where |
|---|---|---|
| Viewer | Presses keys on the TV remote: open the menu, change settings, skip, pause, exit | `js/main.js`, `js/menu.js` |
| TV app | Picks the next video, plays it through AVPlay, shows the title, retries and skips on errors | `js/player.js` |
| TV app | Stores settings and the last video in `tizen.preference`, a file in `wgt-private`, and `localStorage` | `js/storage.js` |
| TV app | Optionally reports events to a telemetry intake and to a probe URL, only when configured | `js/telemetry.js` |
| Maintainer | Builds and deploys the package to a TV with `deploy.sh` or `tvdeploy.sh` | repository root |
| Maintainer | Cuts thumbnails with `tools/make-thumbs.sh` | `tools/` |
| CI | Runs tests, coverage, fuzzing, REUSE, CodeQL, gitleaks, osv-scanner, zizmor, Scorecard | `.github/workflows/` |
| CI | Promotes `develop` to `main`, merges safe Dependabot updates, deploys the demo, signs releases | `.github/workflows/` |
| Browser visitor | Runs the demo, lists the catalog, plays a video through the optional proxy | `simulate.html`, `demo/`, `worker/` |
| Proxy Worker | Re-serves Apple's video over https to the demo origin | `worker/index.mjs` |

## External interfaces

- **Remote control keys:** Enter opens the menu, arrows move and change values, Back closes the menu or exits, Play, Pause, PlayPause, FastForward, Stop and the channel keys control playback, and `12345` toggles developer mode. The table is in the README.
- **Settings:** the keys, ranges and defaults in `js/settings.js`, stored as JSON under `aerial_settings`. Values read back are clamped, so a corrupt store cannot break playback.
- **Deployment values:** the untracked `js/local-config.js` may define `AERIAL_LOCAL_SERVER`, `AERIAL_TELEMETRY` and `AERIAL_PROBE_URL`. See `js/local-config.example.js`.
- **Catalog and thumbnails:** `js/catalog.js` lists each video's URL, label, description and category. `js/player.js` asks for `preload/<video file name>.webp`.
- **Apple's CDN:** the app issues plain HTTP GET requests for video files through AVPlay.
- **Telemetry intake:** an HTTPS POST of a JSON batch with a client token, only when `AERIAL_TELEMETRY` is set.
- **Proxy Worker:** GET, HEAD and OPTIONS on `/Videos/<file>.mov|mp4` and `/Aerials/2x/Videos/<file>.mov|mp4`, with `Range`, answered only for the demo's origins.
- **Command line:** `deploy.sh`, `tvdeploy.sh`, `tools/make-thumbs.sh [--list|--demo]`, `tools/check-version.sh [tag]`, `demo/build.sh [dir]`, `bash test/run-all.sh`, `npm run coverage`, `npm run fuzz`.
