/**
 * Commitlint configuration for Headlamp
 *
 * Enforces the project's commit guidelines:
 * Format: <area>: <description of changes>
 *
 * Examples:
 * - frontend: HomeButton: Fix so it navigates to home
 * - backend: config: Add enable-dynamic-clusters flag
 *
 * See: https://headlamp.dev/docs/latest/contributing#2-follow-commit-guidelines
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Type-enum: Allow common areas/types used in the project
    "type-enum": [
      2,
      "always",
      ["frontend", "backend", "app", "docs", "ci", "chore", "test", "refactor", "plugin", "plugins", "chart", "charts", "docker", "e2e", "i18n", "build", "release", "revert"],
    ],
    // Subject case: Allow any case as project uses mixed case
    "subject-case": [0],
    // Subject empty: Subject is required
    "subject-empty": [2, "never"],
    // Type case: Must be lowercase
    "type-case": [2, "always", "lower-case"],
    // Type empty: Type is required
    "type-empty": [2, "never"],
    // Scope case: Allow any case for flexibility (e.g., "HomeButton")
    "scope-case": [0],
    // Header max length: 72 characters as per guidelines
    "header-max-length": [2, "always", 72],
    // Body max line length: 72 characters as per guidelines
    "body-max-line-length": [2, "always", 72],
    // Footer max line length: Allow longer for URLs and references
    "footer-max-line-length": [0],
  },
};
