# Contributing to babylon-anyup

Thank you for considering contributing to babylon-anyup! This document outlines the development workflow and quality standards.

## Development Workflow

### 1. PRP-Centric Process

All work is defined in **Phase Requirement Proposals (PRPs)**. Before starting any work:

1. Check if a PRP exists in `PRPs/` directory
2. If no PRP exists, create one using the template
3. Ensure the PRP's Definition of Ready (DoR) is satisfied
4. Follow the Implementation Breakdown in the PRP
5. Update the Definition of Done (DoD) as you complete tasks

### 2. Setting Up Your Environment

#### Prerequisites
- **Node.js**: >= 18.0.0 (check with `node --version`)
- **npm**: >= 9.0.0 (check with `npm --version`)
- **Git**: Latest version recommended

#### Fork and Clone

```bash
# 1. Fork the repository on GitHub (click "Fork" button)

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/babylon-anyup.git
cd babylon-anyup

# 3. Add upstream remote (to sync with main repo)
git remote add upstream https://github.com/dcversus/babylon-anyup.git

# 4. Install dependencies
npm install

# 5. Run tests to verify setup
npm test

# 6. Verify all quality checks pass
npm run validate
```

#### Staying Up to Date

```bash
# Fetch latest changes from upstream
git fetch upstream

# Merge upstream changes into your main branch
git checkout main
git merge upstream/main

# Update your fork on GitHub
git push origin main
```

### 3. Making Changes

#### Creating a Feature Branch

**Branch Naming Conventions:**
- Feature: `feature/{descriptive-name}` (e.g., `feature/matrix-transforms`)
- Bug fix: `fix/{bug-description}` (e.g., `fix/quaternion-normalization`)
- Hotfix: `hotfix/{critical-bug}` (e.g., `hotfix/memory-leak`)
- Documentation: `docs/{update-type}` (e.g., `docs/api-reference`)

**Create and switch to your branch:**
```bash
git checkout -b feature/your-feature-name
```

#### Code Standards (Enforced by CI)

- **File size**: Maximum 500 lines per file (split into modules if larger)
- **TypeScript**: Strict mode enabled, zero `any` types allowed
- **Tests**: Minimum 80% coverage (target 85%+)
- **ESLint**: Zero errors, zero warnings
- **Comments**: Only for workarounds or TODOs (remove before merge)
- **Naming**: Self-documenting function and variable names

#### Development Workflow

**1. Make your changes:**
```bash
# Edit files in src/
# Write tests in tests/

# Run in watch mode for instant feedback
npm run dev  # Watch build
npm run test:watch  # Watch tests
```

**2. Pre-commit validation:**
```bash
# Run ALL checks (required before committing)
npm run validate

# Or run individually
npm run typecheck  # TypeScript validation
npm run lint       # ESLint validation
npm run test       # Test suite
npm run build      # Build check
```

**3. Commit your changes:**
```bash
# Stage files
git add .

# Commit with descriptive message
git commit -m "feat: add matrix transformation support"

# Commit message format:
# - feat: New feature
# - fix: Bug fix
# - docs: Documentation only
# - test: Adding tests
# - refactor: Code restructuring
# - perf: Performance improvement
# - chore: Build/tooling changes
```

**4. Push to your fork:**
```bash
git push origin feature/your-feature-name
```

### 4. Writing Tests

Every new feature or bug fix MUST include tests.

```typescript
// tests/MyFeature.test.ts
import { describe, it, expect } from 'vitest';
import { MyFeature } from '../src/MyFeature';

describe('MyFeature', () => {
  it('should handle normal operation', () => {
    const result = MyFeature.doSomething();
    expect(result).toBe(expected);
  });

  it('should handle edge cases', () => {
    // Test boundary conditions
  });

  it('should throw on invalid input', () => {
    expect(() => MyFeature.doSomething(invalid)).toThrow();
  });
});
```

### 5. Submitting a Pull Request

#### Before Creating PR

**Mandatory PR Checklist:**
- [ ] Linked to a PRP (if applicable - see `PRPs/` directory)
- [ ] All tests passing (`npm test`)
- [ ] Test coverage >80% (`npm run test:coverage`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Build successful (`npm run build`)
- [ ] Updated DoD in PRP (if applicable)
- [ ] No files >500 lines
- [ ] No `any` types in code
- [ ] Public API changes documented in README
- [ ] Self-review completed (read your own diff)
- [ ] TODOs removed or converted to issues

#### Creating the PR

1. **Push your branch** to your fork
2. **Open GitHub** and navigate to the main repository
3. **Click "New Pull Request"**
4. **Select your fork and branch**
5. **Fill out the PR template** (auto-populated)

**PR Title Format:**
```
feat: Add matrix transformation support
fix: Resolve quaternion normalization bug
docs: Update API reference examples
test: Add edge case coverage for Vector3
```

**PR Template:**
```markdown
## Description
Brief description of changes (2-3 sentences)

## Related PRP
Link to PRP: `PRPs/{feature-name}.md` (or "N/A" if small fix)

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to break)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Changes Made
- Change 1: Description
- Change 2: Description
- Change 3: Description

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated (if applicable)
- [ ] All existing tests passing
- [ ] Test coverage >80% (check with `npm run test:coverage`)
- [ ] Performance benchmarks run (if applicable)

## Quality Checklist
- [ ] `npm run validate` passes
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments only for workarounds/TODOs
- [ ] No `console.log` or debug code
- [ ] Documentation updated (if needed)
- [ ] CHANGELOG.md updated (if feature/fix)

## Screenshots/Videos (if applicable)
Add screenshots or videos demonstrating the change

## Breaking Changes
List any breaking changes and migration steps (or "None")

## Additional Notes
Any additional context or information for reviewers
```

#### After Submitting PR

1. **Wait for CI checks** to complete (must be green)
2. **Address review feedback** promptly
3. **Update PR** if requested changes needed
4. **Squash commits** if requested (keep history clean)
5. **Merge** after approval (maintainers will merge)

## Code Style

### TypeScript

```typescript
// ✅ DO: Explicit types
interface Options {
  enabled: boolean;
  value: number;
}

// ✅ DO: Readonly when possible
class Plugin {
  public readonly name = 'MyPlugin';
}

// ✅ DO: Proper error handling
if (!scene) {
  throw new Error('Scene is required');
}

// ❌ DON'T: Use 'any'
function process(data: any) { } // FORBIDDEN
```

### Comments

**Only TWO cases allowed:**
1. **Workarounds**: Explaining unusual code
2. **TODO/FIXME**: Temporary markers (remove before merge)

All other code must be self-documenting with clear names.

### File Organization

```typescript
// Every module follows this pattern:
// 1. Imports
import { Type } from '@babylonjs/core';

// 2. Types/Interfaces
interface MyOptions {
  enabled: boolean;
}

// 3. Main class/function
export class MyClass {
  // Public members first
  public readonly name: string;

  // Private members last
  private scene: Scene;

  // Constructor
  constructor() { }

  // Public methods
  public initialize(): void { }

  // Private methods
  private helper(): void { }
}
```

## Testing Guidelines

### Test Coverage Requirements

- **Minimum**: 80% overall coverage
- **Target**: 90%+ for critical paths
- **Required**: All public APIs covered

### Test Structure

```typescript
describe('ComponentName', () => {
  // Setup
  beforeEach(() => {
    // Arrange test fixtures
  });

  // Happy path tests
  describe('normal operation', () => {
    it('should do expected thing', () => { });
  });

  // Edge cases
  describe('edge cases', () => {
    it('should handle boundary condition', () => { });
  });

  // Error handling
  describe('error handling', () => {
    it('should throw on invalid input', () => { });
  });
});
```

## Quality Gates

All PRs must pass these automated checks:

### Gate 1: TypeScript
```bash
npm run typecheck
```
- Strict mode enabled
- Zero errors
- No `any` types

### Gate 2: ESLint
```bash
npm run lint
```
- Zero errors
- Zero warnings
- No console.log in src/

### Gate 3: Tests
```bash
npm run test:coverage
```
- All tests passing
- Coverage >80%
- No skipped tests

### Gate 4: File Size
```bash
# Automatic check in CI
```
- All files <500 lines
- Split larger files into modules

## Public API Changes

**IMPORTANT**: This is a library. Breaking changes require a major version bump.

### Adding New Features

1. Add to PRP first
2. Implement with tests
3. Export from `src/index.ts`
4. Document in README.md
5. Add usage example

### Breaking Changes

Breaking changes require:
- [ ] Major version bump (x.0.0)
- [ ] Migration guide in PR
- [ ] Update to README.md
- [ ] Deprecation warnings (if applicable)

## Release Process (Maintainers Only)

Releases are automated via GitHub Actions when a version tag is pushed.

### Versioning Strategy (Semantic Versioning)

Follow [semver.org](https://semver.org/):

- **MAJOR (x.0.0)**: Breaking API changes
  - Removing public methods
  - Changing method signatures
  - Renaming exports
  - Incompatible behavior changes

- **MINOR (0.x.0)**: New features (backwards compatible)
  - Adding new methods
  - Adding optional parameters
  - New coordinate systems
  - Performance improvements

- **PATCH (0.0.x)**: Bug fixes
  - Fixing existing functionality
  - Documentation updates
  - Internal refactoring

### Release Steps

**1. Prepare release:**
```bash
# Ensure you're on main and up to date
git checkout main
git pull upstream main

# Run full validation
npm run validate

# Update version
npm version patch  # or minor, or major

# Update CHANGELOG.md
# Add release notes, breaking changes, contributors
```

**2. Create and push tag:**
```bash
# Commit version bump
git commit -am "chore: bump version to x.y.z"

# Create tag
git tag vx.y.z

# Push to upstream (triggers CI release)
git push upstream main --tags
```

**3. CI automatically:**
- Runs all quality checks
- Builds the package
- Publishes to npm
- Creates GitHub release
- Updates documentation site

**4. Post-release:**
- Announce in GitHub Discussions
- Update roadmap in README
- Close completed milestone

## Getting Help

### For Contributors

- **Questions about contributing**: [GitHub Discussions - Q&A](https://github.com/dcversus/babylon-anyup/discussions/categories/q-a)
- **Bug reports**: [GitHub Issues](https://github.com/dcversus/babylon-anyup/issues/new?template=bug_report.md)
- **Feature requests**: Create a PRP first, then open discussion
- **Code review questions**: Comment on your PR

### For Users

- **Usage questions**: [GitHub Discussions - Q&A](https://github.com/dcversus/babylon-anyup/discussions/categories/q-a)
- **Bug reports**: [GitHub Issues](https://github.com/dcversus/babylon-anyup/issues/new?template=bug_report.md)
- **Feature requests**: [GitHub Discussions - Ideas](https://github.com/dcversus/babylon-anyup/discussions/categories/ideas)
- **Security vulnerabilities**: See [SECURITY.md](./SECURITY.md)

## Community Guidelines

### Our Standards

**Positive Behavior:**
- Use welcoming and inclusive language
- Respect differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy toward other community members

**Unacceptable Behavior:**
- Trolling, insulting, or derogatory comments
- Personal or political attacks
- Public or private harassment
- Publishing others' private information
- Other conduct reasonably considered inappropriate

### Enforcement

Project maintainers are responsible for clarifying standards and will take appropriate action in response to unacceptable behavior. See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for details.

## Recognition

Contributors who make significant contributions will be:
- Listed in README acknowledgments
- Mentioned in release notes
- Invited to maintainer team (for sustained contributions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Your contributions make this project possible. Thank you for being part of the babylon-anyup community!
