# Contributing to TODL Frontend

Thank you for your interest in contributing to TODL Frontend! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [CI/CD Pipeline](#cicd-pipeline)
- [Code Quality Standards](#code-quality-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

Please be respectful and constructive in all interactions with the community.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/todl-frontend.git
   cd todl-frontend
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/alexmacavei/todl-frontend.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Development Server

```bash
npm start
```

The application will be available at `http://localhost:4200/`

### Building the Application

```bash
# Development build
npm run build

# Production build
npm run build:en

# Build all locales
npm run build:all
```

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode (remove the headless flag if needed)
npm test -- --watch
```

## CI/CD Pipeline

All contributions are automatically validated through our CI/CD pipeline:

### Automated Checks

1. **Code Quality Check**: Prettier formatting validation
2. **Build Validation**: Production build must succeed
3. **Unit Tests**: All tests must pass
4. **Security Scanning**: NPM audit and dependency review
5. **CodeQL Analysis**: Security vulnerability scanning

### Workflow Triggers

- **On Push**: CI runs on `main` and `develop` branches
- **On Pull Request**: Full validation suite runs on all PRs
- **Scheduled**: Security and CodeQL scans run weekly

### Test Environment

Successful merges to `main` are automatically deployed to GitHub Pages:
- **URL**: https://alexmacavei.github.io/todl-frontend/

## Code Quality Standards

### Code Formatting

This project uses **Prettier** for code formatting. All code must be properly formatted before committing.

#### Check Formatting

```bash
npx prettier --check "src/**/*.{ts,html,scss}"
```

#### Auto-fix Formatting

```bash
npx prettier --write "src/**/*.{ts,html,scss}"
```

### TypeScript Guidelines

- Use strict TypeScript configuration
- Avoid using `any` type
- Provide proper type annotations for function parameters and return types
- Use interfaces for object shapes

### Angular Best Practices

- Use standalone components (Angular 21+)
- Follow Angular style guide
- Use reactive programming with RxJS
- Implement proper error handling
- Use Angular Material components for UI consistency

### SCSS Styling

- Use SCSS variables for colors and common values
- Follow BEM naming convention for CSS classes
- Keep styles scoped to components
- Use Angular Material theming

## Testing

### Unit Tests

- Write unit tests for all new components and services
- Use Vitest as the test runner
- Mock external dependencies
- Aim for good test coverage

### Test Structure

```typescript
describe('ComponentName', () => {
  beforeEach(async () => {
    // Setup
  });

  it('should do something specific', () => {
    // Test implementation
  });
});
```

## Pull Request Process

### Before Submitting a PR

1. **Run all checks locally**:
   ```bash
   # Format code
   npx prettier --write "src/**/*.{ts,html,scss}"
   
   # Build
   npm run build
   
   # Test
   npm test
   
   # Security check
   npm audit
   ```

2. **Commit your changes**:
   - Write clear, descriptive commit messages
   - Follow conventional commits format (optional but recommended):
     - `feat:` for new features
     - `fix:` for bug fixes
     - `docs:` for documentation changes
     - `refactor:` for code refactoring
     - `test:` for test changes
     - `chore:` for maintenance tasks

3. **Update documentation** if needed

4. **Sync with upstream**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### Submitting the PR

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request** on GitHub:
   - Provide a clear title and description
   - Reference any related issues
   - Add screenshots for UI changes
   - Wait for CI checks to complete

3. **PR Review Process**:
   - Automated CI checks will run
   - A bot will comment with validation results
   - Maintainers will review your code
   - Address any requested changes
   - Once approved, your PR will be merged

### PR Requirements

All PRs must have:
- ✅ Passing CI/CD checks
- ✅ Clear description of changes
- ✅ Tests for new functionality
- ✅ Updated documentation (if applicable)
- ✅ No merge conflicts

## Getting Help

If you need help or have questions:

- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for general questions
- **Documentation**: Check the README.md for setup and usage information

## Recognition

All contributors will be recognized in the project. Thank you for your contributions!
