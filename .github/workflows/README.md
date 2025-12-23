# GitHub Actions Workflows

This directory contains all GitHub Actions workflow definitions for the TODL Frontend application.

## Workflows Overview

### 🚀 ci.yml - CI/CD Pipeline
**Main workflow for continuous integration and deployment**

- **Triggers:** Push to main/develop, PRs to main/develop
- **Jobs:**
  - `code-quality`: Prettier formatting check
  - `build`: Production build + artifact upload
  - `test`: Unit tests with Vitest
  - `deploy-test`: GitHub Pages deployment (main branch only)

### 🔍 pr-validation.yml - Pull Request Validation
**Validates all pull requests with comprehensive checks**

- **Triggers:** PR opened, synchronized, reopened
- **Features:**
  - Code formatting validation
  - Build verification
  - Test execution
  - Automated PR comment with results

### 🔒 security.yml - Security and Dependency Scan
**Scans for security vulnerabilities and outdated dependencies**

- **Triggers:** Push, PR, Weekly schedule (Mondays 9 AM UTC)
- **Jobs:**
  - `dependency-audit`: NPM audit for vulnerabilities
  - `dependency-review`: Dependency changes in PRs

### 🛡️ codeql.yml - CodeQL Analysis
**Advanced code analysis for security vulnerabilities**

- **Triggers:** Push, PR, Weekly schedule (Sundays 10 AM UTC)
- **Analysis:** JavaScript/TypeScript with security-and-quality queries

## Workflow Dependencies

```
code-quality
    ├── build → deploy-test (main only)
    └── test
```

## Adding New Workflows

1. Create a new `.yml` file in this directory
2. Follow GitHub Actions YAML syntax
3. Test locally using [act](https://github.com/nektos/act) (optional)
4. Document the workflow in this README

## Modifying Existing Workflows

When modifying workflows:

1. Understand the current workflow structure
2. Test changes in a feature branch
3. Verify the workflow runs successfully
4. Update documentation if needed

## Workflow Permissions

Workflows have specific permissions configured:

- **ci.yml**: `contents: read`, `pages: write`, `id-token: write` (for deployment)
- **codeql.yml**: `actions: read`, `contents: read`, `security-events: write`
- **Other workflows**: Default repository permissions

## Secrets and Variables

No secrets are currently required for workflows to run. If you need to add secrets:

1. Go to Settings → Secrets and variables → Actions
2. Add repository secrets
3. Reference in workflow: `${{ secrets.SECRET_NAME }}`

## Debugging Workflows

To debug workflow issues:

1. Check the Actions tab in the repository
2. Click on the failed workflow run
3. Review job logs for errors
4. Enable debug logging if needed:
   - Set `ACTIONS_STEP_DEBUG` secret to `true`
   - Set `ACTIONS_RUNNER_DEBUG` secret to `true`

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Marketplace Actions](https://github.com/marketplace?type=actions)
