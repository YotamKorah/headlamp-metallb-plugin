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

1. Go to the "Actions" tab in the GitHub repository.
2. Select the "Release" workflow from the left sidebar.
3. Click the "Run workflow" button.
4. In the "Run workflow" dialog, enter the release version (e.g., `0.3.0`) in the input field.
5. Click the "Run workflow" button to start the release process.
