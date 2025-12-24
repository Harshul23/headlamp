# Quick Reference: Commit Linting Commands

## Commands Overview

| Command               | Purpose                                | Checks Historical Commits? |
| --------------------- | -------------------------------------- | -------------------------- |
| `npm run lint`        | Code quality only (backend + frontend) | ❌ No                      |
| `npm run lint:commit` | Commit messages only                   | ✅ Yes (HEAD~1 to HEAD)    |
| `npm run lint:all`    | Both code and commits                  | ✅ Yes (HEAD~1 to HEAD)    |

## When to Use Each Command

### `npm run lint`

**Use when:** You want to check code quality without worrying about commit messages

```bash
npm run lint
```

✅ **Checks:**

- Backend code (Go linting)
- Frontend code (ESLint)

❌ **Does NOT check:**

- Commit messages

**Best for:**

- Quick code quality checks
- Working with branches that have historical commits
- Pre-push validation of code changes

---

### `npm run lint:commit`

**Use when:** You want to check only commit messages

```bash
npm run lint:commit
```

✅ **Checks:**

- Last commit message format
- Commit message guidelines compliance

❌ **Does NOT check:**

- Code quality

**Best for:**

- Verifying your last commit before pushing
- Checking if a commit message follows guidelines
- Quick commit message validation

**Advanced usage:**

```bash
# Check all commits in your branch
npx commitlint --from=main --to=HEAD

# Check specific range
npx commitlint --from=<sha> --to=<sha>
```

---

### `npm run lint:all`

**Use when:** You want comprehensive validation of everything

```bash
npm run lint:all
```

✅ **Checks:**

- Commit messages (last commit)
- Backend code quality
- Frontend code quality

**Best for:**

- Pre-push comprehensive check
- Before creating a pull request
- Final validation before submission

---

## Automatic Validation

### Git Hook (Husky)

Automatically runs on every `git commit`:

```bash
git commit -m "frontend: Add new feature"
# ✅ Husky validates commit message automatically
# ❌ Rejects if format is wrong
```

### CI/CD (GitHub Actions)

Automatically runs on every pull request:

- Validates ALL commits in the PR
- Checks against commit guidelines
- Fails PR if any commit doesn't comply

---

## Running from Different Directories

### From Root Directory

```bash
npm run lint         # ✅ Works
npm run lint:commit  # ✅ Works
npm run lint:all     # ✅ Works
```

### From Frontend Directory

```bash
cd frontend
npm run lint         # ✅ Works (runs frontend linting)
npm run lint:commit  # ✅ Works (delegates to root)
```

---

## Troubleshooting

### Problem: `npm run lint` fails on historical commits

**Solution:** This should NOT happen anymore. `npm run lint` now checks only code, not commits.

### Problem: Want to check commits but not code

**Solution:** Use `npm run lint:commit` instead of `npm run lint:all`

### Problem: Want to skip commit validation temporarily

**Solution:** Use `git commit --no-verify` (not recommended for regular use)

### Problem: CI fails on PR but local passes

**Solution:** CI checks ALL commits in PR, not just the last one. Check all commits:

```bash
npx commitlint --from=main --to=HEAD
```

---

## Quick Start Examples

### Daily Development Workflow

```bash
# 1. Make code changes
# 2. Check code quality
npm run lint

# 3. Commit with proper message
git commit -m "frontend: Add feature X"
# (Husky validates automatically)

# 4. Optional: Double-check before push
npm run lint:all
```

### Fixing Commit Messages

```bash
# Check your last commit
npm run lint:commit

# If invalid, amend it
git commit --amend -m "frontend: Correct commit message"

# Verify fix
npm run lint:commit
```

### Before Creating a PR

```bash
# Check all commits in your branch
npx commitlint --from=main --to=HEAD

# Check code quality
npm run lint

# Or check everything at once
npm run lint:all
```

---

## Commit Message Format

**Required Format:**

```
<area>: <description>
```

**Allowed Areas:**

- `frontend`, `backend`, `app`, `docs`, `ci`, `chore`, `test`, `refactor`
- `plugin`, `plugins`, `chart`, `charts`, `docker`, `e2e`, `i18n`
- `build`, `release`, `revert`

**Rules:**

- Area must be lowercase
- Description should be clear and concise
- Total header length ≤ 72 characters
- Body lines should wrap at 72 characters

**Examples:**

```bash
✅ frontend: HomeButton: Fix navigation to home
✅ backend: config: Add enable-dynamic-clusters flag
✅ docs: Update installation instructions
✅ ci: Add commit linting workflow

❌ updates the manifest                    (missing area)
❌ Frontend: Add feature                   (area not lowercase)
❌ feat: Add new feature                   (wrong area)
❌ frontend: This is a very long commit message that exceeds the limit
```

---

**Last Updated:** December 24, 2025
