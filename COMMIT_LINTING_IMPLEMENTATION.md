# Commit Linting Implementation for Headlamp

This document summarizes the implementation of commit message linting for the Headlamp repository.

## Overview

Commit message linting has been successfully implemented to enforce the project's [commit guidelines](https://headlamp.dev/docs/latest/contributing#2-follow-commit-guidelines). The implementation includes automated validation both locally (via Git hooks) and in CI/CD pipelines (via GitHub Actions).

## What Was Implemented

### 1. Dependencies Installed

- `@commitlint/cli` - CLI tool for linting commit messages
- `@commitlint/config-conventional` - Conventional commits configuration
- `husky` - Git hooks manager

### 2. Configuration Files Created

#### `commitlint.config.js`

Configuration file that defines the commit message format rules:

- **Format**: `<area>: <description of changes>`
- **Allowed areas**: frontend, backend, app, docs, ci, chore, test, refactor, plugin, plugins, chart, charts, docker, e2e, i18n, build, release, revert
- **Max header length**: 72 characters
- **Max body line length**: 72 characters

#### `.husky/commit-msg`

Git hook that automatically validates commit messages before they are committed locally.

### 3. NPM Scripts Added

#### Root `package.json`:

- `"prepare": "husky"` - Automatically installs Git hooks when dependencies are installed
- `"lint:commit": "commitlint --from=HEAD~1 --to=HEAD --verbose"` - Manually check recent commits
- `"lint:all": "npm run lint:commit && npm run lint"` - Run both commit and code linting
- `"lint"` script runs **only code linting** (backend + frontend) - does NOT include commit linting

#### Frontend `package.json`:

- `"lint:commit": "cd .. && npm run lint:commit"` - Allows running from frontend directory
- `"lint"` script runs **only code linting** (eslint) - does NOT include commit linting

### 4. GitHub Actions CI Integration

Added a new `commitlint` job to `.github/workflows/frontend.yml`:

- Runs only on pull requests
- Validates all commits in the PR against the commit guidelines
- Provides clear feedback when commits don't follow the format

### 5. Documentation

Added comprehensive documentation to `CONTRIBUTING.md` including:

- Commit message format and examples
- Guidelines for writing good commits
- Instructions for checking commits before pushing
- Troubleshooting guide for common issues
- How to run commit linting from different directories

## How to Use

### For Developers

#### Automatic Validation

When you commit locally, husky will automatically validate your commit message:

```bash
git commit -m "frontend: Add new feature"
```

If the message doesn't follow the format, the commit will be rejected with a helpful error message.

#### Manual Validation

Check your last commit:

```bash
npm run lint:commit
```

Check all commits in your branch:

```bash
npx commitlint --from=main --to=HEAD
```

Check commits from the frontend directory:

```bash
cd frontend
npm run lint:commit
```

#### Run Linting Commands

**Code linting only (no commit check):**

```bash
npm run lint
```

This runs backend and frontend code linting without checking commit messages. This allows developers to lint code even if there are old commits that don't follow the guidelines.

**Commit linting only:**

```bash
npm run lint:commit
```

This checks only commit messages without running code linters.

**Full lint suite (code + commits):**

```bash
npm run lint:all
```

This runs both commit linting and code linting together.

### Commit Message Format

**Good Examples:**

- `frontend: HomeButton: Fix so it navigates to home`
- `backend: config: Add enable-dynamic-clusters flag`
- `docs: Update installation instructions`
- `ci: Add commit linting workflow`

**Bad Examples:**

- `updates the manifest` ❌ (missing area)
- `Init feature added.` ❌ (missing area, unclear)
- `this adds new colors to the dashboard` ❌ (missing area, improper format)

### For CI/CD

On every pull request, GitHub Actions will automatically:

1. Check all commits in the PR
2. Verify they follow the commit guidelines
3. Fail the PR if any commit doesn't comply
4. Provide detailed error messages about what needs to be fixed

## Testing Results

All tests passed successfully:

✅ Valid commit messages are accepted  
✅ Invalid commit messages (missing type) are rejected  
✅ Invalid commit types are rejected  
✅ Commit messages exceeding 72 characters are rejected  
✅ `npm run lint:commit` works from root directory  
✅ `npm run lint:commit` works from frontend directory

## Files Created/Modified

### Created:

- `commitlint.config.js` - Commitlint configuration
- `.husky/commit-msg` - Git hook for commit message validation
- `.husky/pre-commit` - Pre-commit hook (created by husky init)

### Modified:

- `package.json` (root) - Added dependencies and scripts
- `package-lock.json` (root) - Updated with new dependencies
- `frontend/package.json` - Added lint:commit script
- `.github/workflows/frontend.yml` - Added commitlint CI job
- `CONTRIBUTING.md` - Added commit linting documentation section

## Benefits

1. **Consistency**: All commits follow the same format, making the git history easier to read and understand
2. **Automated Enforcement**: No need for manual review of commit message format
3. **Clear Feedback**: Developers get immediate feedback when their commit messages don't follow the guidelines
4. **CI Integration**: Pull requests are automatically validated before merge
5. **Developer Experience**: Clear documentation and troubleshooting guide helps developers quickly fix issues
6. **Separation of Concerns**: Commit linting is separate from code linting, allowing developers to run `npm run lint` without being blocked by historical commits that don't follow guidelines

## Maintenance

### Updating Allowed Commit Types

To add or remove allowed commit types, edit `commitlint.config.js`:

```javascript
'type-enum': [
  2,
  'always',
  [
    'frontend',
    'backend',
    // Add new types here
  ],
],
```

### Updating Character Limits

To change the 72-character limit, edit `commitlint.config.js`:

```javascript
'header-max-length': [2, 'always', 72], // Change the number
```

## Support

For issues or questions:

1. Check the troubleshooting section in `CONTRIBUTING.md`
2. Ask in the [#headlamp Slack channel](https://kubernetes.slack.com/messages/headlamp)
3. File an issue on GitHub

---

**Implementation Date**: December 24, 2025  
**Status**: ✅ Complete and tested
