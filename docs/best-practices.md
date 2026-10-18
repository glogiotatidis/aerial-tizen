# OpenSSF Best Practices answers

Answers for <https://www.bestpractices.dev/projects/15610> (passing level). Project URL: <https://github.com/jeancarlos/aerial-tizen>.

| Criterion | Answer | Evidence |
|---|---|---|
| description_good, interact, contribution, contribution_requirements | Met | README.md, CONTRIBUTING.md (Pull requests, Coding standard, Code review), GOVERNANCE.md |
| floss_license, floss_license_osi, license_location | Met | MIT, LICENSE at the repository root, LICENSES/MIT.txt |
| documentation_basics, documentation_interface | Met | README.md (install on a TV, settings, catalog), DEVELOPMENT.md, docs/design.md |
| sites_https, delivery_mitm | Met | github.com and GitHub Pages only, all HTTPS; release zips carry a cosign Sigstore bundle |
| sites_password_security | N/A | the project's sites store no user passwords |
| discussion, english | Met | GitHub issues and pull requests, English |
| maintained | Met | commits every week, see the commit history |
| repo_public, repo_track, repo_interim, repo_distributed | Met | public git repository on GitHub |
| version_unique, version_semver, version_tags | Met | tags vX.Y.Z (semantic versioning), package.json version |
| release_notes | Met | CHANGELOG.md and GitHub release notes generated per tag by release.yml |
| release_notes_vulns | N/A | no publicly known vulnerability fixed in a release so far; SECURITY.md says the notes name security fixes |
| report_process, report_tracker, report_responses, enhancement_responses, report_archive | Met | GitHub issues, CONTRIBUTING.md |
| vulnerability_report_process, vulnerability_report_private, vulnerability_report_response | Met | SECURITY.md, GitHub private vulnerability reporting, 7 day acknowledgement |
| build, build_common_tools, build_floss_tools | N/A | plain HTML, CSS and JavaScript for a Samsung Tizen TV, no compile step; release.yml packages the zip and setup.sh installs it |
| test, test_invocation, test_most, test_continuous_integration | Met | `npm test` runs test/run-all.sh, `npm run coverage` gates c8 at 90 percent, .github/workflows/ci.yml |
| test_policy, tests_are_added, tests_documented_added | Met | CONTRIBUTING.md "Tests"; .github/workflows/tests-policy.yml |
| warnings, warnings_fixed, warnings_strict | Met | ESLint (`npm run lint`) in CI |
| know_secure_design, know_common_errors | Met | docs/security-assessment.md, docs/design.md, CONTRIBUTING.md constraints |
| delivery_unsigned | Met | release zip signed with cosign sign-blob (Sigstore) and verified in release.yml |
| vulnerabilities_fixed_60_days, vulnerabilities_critical_fixed | Met | none known open; SECURITY.md promises a fix or assessment within 30 days; Dependabot |
| no_leaked_credentials | Met | no secrets in the repository; js/local-config.example.js is a template and the real file is ignored |
| static_analysis, static_analysis_fixed, static_analysis_often | Met | CodeQL, ESLint and zizmor in security.yml and ci.yml on every push |
| dynamic_analysis, dynamic_analysis_enable_assertions | Met | `npm run fuzz` (fast-check, test/fuzz.test.js) in ci.yml and before every release in release.yml |
| dynamic_analysis_unsafe, dynamic_analysis_fixed | N/A | memory-safe language |
| crypto_* | N/A | no cryptography implemented; the app only plays video and the release signature is made by cosign in CI |
