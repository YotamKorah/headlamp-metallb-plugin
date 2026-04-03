# Release Process

This repository uses a GitHub Actions workflow to create releases.

- Workflow: `.github/workflows/release.yaml`
- Trigger: manual (`workflow_dispatch`)
- Input: release version in `X.Y.Z` format (for example `0.3.0`)

## Prerequisites

- You have permission to run workflows and push tags.
- `main` is green (CI passing).
- Release notes/changelog updates (if needed) are already merged.
- Update the version in `package.json` (and `CHANGELOG.md` if needed) and merge to `main`.

## Pre-release checks (recommended)

Run these locally before triggering the release workflow:

```bash
npm ci
npm run lint
npm run tsc
CI=1 npm run test
npm run build
npm run package
```

## Triggering the release

1. Push the version update to `main` (if not already done).
2. Tag the commit with the release version (for example `git tag v0.3.0`).
3. Push the tag to GitHub (for example `git push origin v0.3.0`).
