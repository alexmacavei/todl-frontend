# CI/CD Pipeline Documentation

This document provides detailed information about the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the TODL Frontend application.

## Overview

The CI/CD pipeline is built using **GitHub Actions** and provides automated testing, building, security scanning, and deployment capabilities.

## Workflows

### 1. CI/CD Pipeline (`ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Jobs:**

#### Code Quality Check
- Runs Prettier to validate code formatting
- Checks TypeScript, HTML, and SCSS files
- Configured to continue on error (non-blocking)

#### Build
- Installs dependencies using `npm ci`
- Creates production build using `npm run build`
- Uploads build artifacts (stored for 30 days)
- Depends on: Code Quality Check

#### Test
- Installs dependencies using `npm ci`
- Runs unit tests with Vitest
- Uploads test results and coverage reports
- Depends on: Code Quality Check

#### Deploy to Test Environment
- Only runs on `main` branch pushes
- Builds application with GitHub Pages base path
- Deploys to GitHub Pages
- Creates a live test environment
- Depends on: Build and Test jobs
- Requires GitHub Pages permissions

### 2. Pull Request Validation (`pr-validation.yml`)

**Triggers:**
- Pull request opened, synchronized, or reopened

**Purpose:**
- Validates all changes in a PR
- Runs formatting checks, build, and tests
- Posts automated comment with validation results
- Provides quick feedback to contributors

**Features:**
- Comprehensive validation before merge
- Automated PR comments with build status
- Includes commit SHA and branch information

### 3. Security and Dependency Scan (`security.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Scheduled: Every Monday at 9 AM UTC

**Jobs:**

#### NPM Audit
- Runs `npm audit` with moderate severity level
- Checks for known security vulnerabilities
- Reports outdated packages
- Configured to continue on error

#### Dependency Review (PRs only)
- Reviews dependency changes in PRs
- Uses GitHub's Dependency Review Action
- Fails on moderate or higher severity issues
- Prevents vulnerable dependencies from being merged

### 4. CodeQL Analysis (`codeql.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Scheduled: Every Sunday at 10 AM UTC

**Purpose:**
- Advanced code analysis for security vulnerabilities
- Detects common security patterns and anti-patterns
- Uses security-and-quality query suite
- Analyzes JavaScript and TypeScript code

**Features:**
- Automatic vulnerability detection
- Integration with GitHub Security tab
- Weekly scheduled scans
- Security alerts and recommendations

## GitHub Pages Deployment

### Test Environment

The application is automatically deployed to GitHub Pages when changes are merged to the `main` branch.

**URL:** `https://alexmacavei.github.io/todl-frontend/`

**Configuration:**
- Base path: `/todl-frontend/`
- Build configuration: Production
- Deployment environment: `github-pages`

**Requirements:**
- GitHub Pages must be enabled in repository settings
- Source: GitHub Actions
- Branch: Not required (deployed via workflow)

### Setting Up GitHub Pages

1. Go to repository Settings
2. Navigate to Pages section
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"
4. The workflow will handle the rest automatically

## Artifacts

### Build Artifacts
- **Name:** `build-artifacts`
- **Content:** Production build output from `dist/todl-app`
- **Retention:** 30 days
- **Usage:** Can be downloaded and deployed to any hosting service

### Test Results
- **Name:** `test-results`
- **Content:** Test coverage reports
- **Retention:** 7 days
- **Usage:** Review test coverage and results

## Environment Configuration

### Node.js Version
All workflows use **Node.js 20** (LTS version)

### Cache Strategy
- NPM dependencies are cached using `actions/setup-node@v4`
- Speeds up workflow execution
- Automatically invalidated when `package-lock.json` changes

## Workflow Badges

Add these badges to display workflow status:

```markdown
[![CI/CD Pipeline](https://github.com/alexmacavei/todl-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/alexmacavei/todl-frontend/actions/workflows/ci.yml)
[![CodeQL](https://github.com/alexmacavei/todl-frontend/actions/workflows/codeql.yml/badge.svg)](https://github.com/alexmacavei/todl-frontend/actions/workflows/codeql.yml)
[![Security Scan](https://github.com/alexmacavei/todl-frontend/actions/workflows/security.yml/badge.svg)](https://github.com/alexmacavei/todl-frontend/actions/workflows/security.yml)
```

## Best Practices

### For Contributors

1. **Run checks locally before pushing:**
   ```bash
   npx prettier --write "src/**/*.{ts,html,scss}"
   npm run build
   npm test
   ```

2. **Keep PRs focused and small**
   - Easier to review
   - Faster CI execution
   - Lower chance of conflicts

3. **Address CI failures promptly**
   - Check workflow logs
   - Fix issues in the same PR
   - Don't merge with failing checks

### For Maintainers

1. **Review CI results before merging**
   - All checks should pass
   - Review security scan results
   - Check code coverage

2. **Monitor scheduled scans**
   - Weekly CodeQL results
   - Weekly security scans
   - Address vulnerabilities promptly

3. **Keep dependencies updated**
   - Review dependency alerts
   - Update packages regularly
   - Test after updates

## Troubleshooting

### Common Issues

#### Build Failures
- Check Node.js version compatibility
- Verify `package-lock.json` is committed
- Review build logs for errors

#### Test Failures
- Run tests locally to reproduce
- Check for environment-specific issues
- Verify test setup and mocks

#### Deployment Failures
- Verify GitHub Pages is enabled
- Check workflow permissions
- Review deployment logs

#### Security Scan Failures
- Review vulnerability details
- Update affected packages
- Check for false positives

### Getting Help

- Check workflow logs in the Actions tab
- Review job output for detailed errors
- Open an issue if you need assistance

## Security Considerations

### Secrets Management
- Never commit secrets to the repository
- Use GitHub Secrets for sensitive data
- Rotate secrets regularly

### Dependency Security
- Automated scans run weekly
- PRs are reviewed for dependency changes
- Vulnerabilities are reported in Security tab

### Code Security
- CodeQL analyzes code for vulnerabilities
- Security queries run on every push
- Alerts are created for findings

## Performance Optimization

### Workflow Optimization
- Jobs run in parallel when possible
- Dependencies are cached
- Only necessary jobs run based on triggers

### Build Optimization
- Production builds are optimized
- Tree shaking removes unused code
- Assets are hashed for caching

## Future Enhancements

Potential improvements to consider:

1. **E2E Testing**: Add Playwright or Cypress tests
2. **Performance Testing**: Lighthouse CI integration
3. **Visual Regression Testing**: Screenshot comparison
4. **Deployment Environments**: Staging and production
5. **Release Automation**: Automated version bumping and releases
6. **Docker**: Containerized builds and deployments
7. **Monitoring**: Application performance monitoring integration

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Angular CLI Documentation](https://angular.io/cli)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [Dependency Review Action](https://github.com/actions/dependency-review-action)
