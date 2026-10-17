# Governance

## Members with access to sensitive resources

| Who | Access | Role |
|---|---|---|
| [@jeancarlos](https://github.com/jeancarlos) | Repository admin, Pages, Actions secrets, release signing through the repository's GitHub OIDC identity | Maintainer |
| GitHub Actions (`promote`, `dependabot-merge`, `release`) | Short-lived `GITHUB_TOKEN` with the permissions each workflow declares | Automation, no standing access |
| Dependabot | Opens pull requests against `develop` only | Automation |

There are no other collaborators. Adding one is the maintainer's decision, and a new collaborator gets the lowest permission that lets them do the work asked.

## Roles and responsibilities

- **Maintainer:** reviews and merges every pull request, cuts releases, answers security reports within the times in [SECURITY.md](SECURITY.md), and keeps the rulesets and required checks in place.
- **Contributor:** anyone who opens an issue or a pull request, following [CONTRIBUTING.md](CONTRIBUTING.md).
- **Automation:** opens the `develop` to `main` release PR after CI passes (the maintainer merges it), publishes the coverage badge, merges patch and minor Dependabot updates after CI passes, and builds and signs releases from a version tag.

## How changes are decided

Changes go through a pull request into `develop`. Required checks must pass. `main` only receives what `develop` already holds, through the promotion workflow. Direct pushes, force pushes and branch deletion are blocked by rulesets on both branches.

## Access continuity

The project is MIT licensed and the whole history is public, so anyone can fork it. Access to the repository belongs to the maintainer's GitHub account, which is protected with two-factor authentication.
