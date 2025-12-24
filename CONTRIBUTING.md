# Contributing Guidelines

Welcome to Kubernetes. We are excited about the prospect of you joining our [community](https://github.com/kubernetes/community)! The Kubernetes community abides by the CNCF [code of conduct](code-of-conduct.md). Here is an excerpt:

_As contributors and maintainers of this project, and in the interest of fostering an open and welcoming community, we pledge to respect all people who contribute through reporting issues, posting feature requests, updating documentation, submitting pull requests or patches, and other activities._

## Getting Started

For contributing to the Headlamp project, please refer check out our:

- [Guidelines](https://headlamp.dev/docs/latest/contributing/)
- [Code of Conduct](./code-of-conduct.md),
- [#headlamp](https://kubernetes.slack.com/messages/headlamp) slack channel in the Kubernetes Slack
- [Monthly Community Meeting](https://zoom-lfx.platform.linuxfoundation.org/meetings/headlamp)

Since Headlamp is part of the Kubernetes Community, please read also:

- [Contributor License Agreement](https://git.k8s.io/community/CLA.md) Kubernetes projects require that you sign a Contributor License Agreement (CLA) before we can accept your pull requests
- [Kubernetes Contributor Guide](https://git.k8s.io/community/contributors/guide) - Main contributor documentation, or you can just jump directly to the [contributing section](https://git.k8s.io/community/contributors/guide#contributing)
- [Contributor Cheat Sheet](https://git.k8s.io/community/contributors/guide/contributor-cheatsheet/README.md) - Common resources for existing developers

## Commit Message Linting

Headlamp uses automated commit message linting to ensure all commits follow the project's [commit guidelines](https://headlamp.dev/docs/latest/contributing#2-follow-commit-guidelines).

### Commit Message Format

All commit messages must follow this format:

```
<area>: <description of changes>
```

**Examples of good commit messages:**

- `frontend: HomeButton: Fix so it navigates to home`
- `backend: config: Add enable-dynamic-clusters flag`
- `docs: Update installation instructions`
- `ci: Add commit linting workflow`

**Examples of bad commit messages:**

- `updates the manifest` (missing area)
- `Init feature added.` (missing area, unclear description)
- `this adds new colors to the dashboard` (missing area, improper capitalization)

### Guidelines

- **Area** (required): Must be lowercase and one of: `frontend`, `backend`, `app`, `docs`, `ci`, `chore`, `test`, `refactor`, `plugin`, `plugins`, `chart`, `charts`, `docker`, `e2e`, `i18n`, `build`, `release`, `revert`
- **Description** (required): Clear description of what the commit does
- **Length**: The entire commit message header should not exceed 72 characters
- **Body**: If you add a commit body, wrap lines at 72 characters

### Linting Commands

The project provides separate linting commands for code quality and commit messages:

```bash
# Check code quality (backend + frontend)
npm run lint

# Check commit messages (last commit)
npm run lint:commit

# Check both code quality and commit messages
npm run lint:all
```

**Note**: Husky automatically validates commit messages when you run `git commit`, so you'll get immediate feedback on your commit message format.

### Checking Your Commits

Before pushing your changes, you can validate your commit messages:

```bash
# Check the last commit
npm run lint:commit

# Check commits from a specific commit to HEAD
npx commitlint --from=<commit-sha>

# Check all commits in your feature branch
npx commitlint --from=main --to=HEAD
```

### Running from Frontend Directory

You can also run the commit linting from the `frontend/` directory:

```bash
cd frontend
npm run lint:commit
```

### Automated Validation

Commit messages are automatically validated in two ways:

1. **Git Hook (Local)**: When you commit locally, husky will automatically validate your commit message. If it doesn't follow the format, the commit will be rejected with a helpful error message.

2. **CI Pipeline**: On pull requests, GitHub Actions will validate all commits in your PR to ensure they follow the guidelines.

### Troubleshooting

**Problem**: Commit rejected with "type must be one of [...]"

**Solution**: Make sure your commit message starts with a valid area (e.g., `frontend:`, `backend:`, `docs:`). The area must be lowercase.

**Problem**: Commit rejected with "header must not be longer than 72 characters"

**Solution**: Shorten your commit message. Move detailed explanations to the commit body instead of the header.

**Problem**: Need to fix a commit message after committing

**Solution**: Use `git commit --amend` to edit your last commit message, or use `git rebase -i` for older commits.

**Problem**: Husky hook not running

**Solution**: Reinstall husky hooks by running `npm install` or `npx husky install` at the root of the repository.

### Skipping the Hook (Not Recommended)

In rare cases where you need to skip the commit message validation (not recommended for regular use):

```bash
git commit --no-verify -m "your message"
```

**Note**: Even if you skip local validation, CI will still check your commits when you open a pull request.
