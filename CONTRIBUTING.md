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

## Commit Message Guidelines

Headlamp uses automated commit message linting to ensure consistency. All commits must follow this format:

```
<area>: <description>
```

**Valid areas**: `frontend`, `backend`, `app`, `docs`, `ci`, `chore`, `test`, `refactor`, `plugin`, `plugins`, `chart`, `charts`, `docker`, `e2e`, `i18n`, `build`, `release`, `revert`

**Examples**:
- ✅ `frontend: Fix navigation to home page`
- ✅ `backend: Add enable-dynamic-clusters flag`
- ✅ `docs: Update installation instructions`
- ❌ `updates the manifest` (missing area)
- ❌ `Frontend: fix button` (area must be lowercase)

**Rules**:
- Area must be lowercase
- Keep header under 72 characters
- Be clear and descriptive

### Automated Validation

Commits are validated:
1. **Locally** via Git hook when you commit
2. **In CI** when you open a pull request

If validation fails, you'll get a helpful error message explaining how to fix it.

### Commands

```bash
# Check last commit
npm run lint:commit

# Check code quality only
npm run lint

# Skip validation (emergency only - CI will still check)
git commit --no-verify -m "your message"
```
