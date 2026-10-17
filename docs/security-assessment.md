# Security assessment

Last reviewed for release 1.0.2. The project is a Tizen TV app with no server component, one optional Worker for the public demo, and a CI pipeline that publishes signed releases.

## What matters

1. The integrity of releases and of the CI pipeline that builds them.
2. Secrets: the optional telemetry client token and the LAN address in `js/local-config.js`.
3. The TV and the viewer's network, which the app must not weaken.
4. The demo's visitors, who load the demo page and its scripts.

## Threats, and what limits them

| Threat | Impact | Mitigation |
|---|---|---|
| A malicious pull request or a hostile branch name runs privileged CI steps | Token theft, a tampered release | Workflows declare least-privilege `permissions`, pass untrusted values through `env`, never check out untrusted code in privileged triggers, and zizmor audits them on every push. `dependabot-merge` refuses forks and only acts on Dependabot's own branches. |
| A compromised GitHub Action or Python or npm package | Supply-chain compromise | Every action is pinned to a commit SHA, pip requirements are hash-pinned, npm is installed from the lockfile with scripts disabled, Dependabot proposes updates weekly, osv-scanner checks for known vulnerabilities. |
| A tampered release asset | Users install modified code | Releases are signed keylessly with cosign through GitHub OIDC, the workflow verifies its own signature, and a tag must match the version in `config.xml`, `package.json` and `package-lock.json`. |
| A direct push or force push to `main` or `develop` | Unreviewed code ships | Rulesets block direct pushes, force pushes and deletion, and require the `test`, `reuse` and `zizmor` checks. |
| Secrets committed by mistake | Credential exposure | `js/local-config.js` is gitignored, gitleaks runs in CI, GitHub secret scanning and push protection are on. |
| Corrupt or hostile stored settings | Crash or a stuck player | Settings are validated and clamped on load, and a property-based fuzz test feeds arbitrary stored JSON. |
| Script injection through a video label in the demo list | Script runs in a visitor's browser | Labels and descriptions are set as text, never as markup, and links carry `noopener noreferrer`. A test covers a hostile label. |
| The proxy Worker used as an open relay | Bandwidth abuse, hosting arbitrary content | It answers only GET, HEAD and OPTIONS, only for Apple video paths, only for the demo's origins, and passes a fixed set of response headers. Tests cover each refusal. |
| Apple's CDN served over plain HTTP | A network attacker can alter video in transit | Accepted: Apple publishes these videos over HTTP only, and the app cannot verify them. The app treats the stream as untrusted data and plays it only through the TV's decoder. |

## Residual risks

- The maintainer account is a single point of failure. Two-factor authentication and the rulesets reduce it, and a second maintainer would reduce it further.
- Video integrity over HTTP cannot be fixed from this project.
- Fuzzing covers stored settings only.
