# Security policy

## Reporting a vulnerability

Report vulnerabilities privately through GitHub: <https://github.com/jeancarlos/aerial-tizen/security/advisories/new>. You can also email jeancosouza@gmail.com. Please do not open a public issue for a vulnerability.

Include the affected file or version, the steps to reproduce, and the impact you expect.

## What to expect

- Acknowledgement within 7 days.
- A fix or a written assessment within 30 days.
- Coordinated disclosure: please wait for a fix, or 90 days from your report, before publishing details.

## Published vulnerabilities

Confirmed vulnerabilities are published as GitHub security advisories at <https://github.com/jeancarlos/aerial-tizen/security/advisories>, with the affected versions, the fix and credit to the reporter. None have been reported so far. The release notes in [CHANGELOG.md](CHANGELOG.md) name security fixes.

## Credit

Reporters are named in the advisory and in the release notes unless they ask to stay anonymous.

## Handling a report

1. The maintainer acknowledges it and reproduces it privately in a draft security advisory.
2. A fix is written and tested on a private branch, then released with a new signed version.
3. The advisory is published with the affected versions, the fix and the credit above.

## Scope

The app code in `js/`, the deploy scripts and the CI workflows. The Apple CDN, Samsung's AVPlay and the Tizen SDK are out of scope: report those upstream.

## Supported versions

Only the latest release receives fixes.
