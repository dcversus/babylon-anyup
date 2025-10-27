# EdgeCraft Production Patterns Analysis

**Date**: 2025-10-27
**Source**: https://github.com/uz0/EdgeCraft (via /Users/dcversus/conductor/edgecraft/.conductor/lahore)
**Target**: babylon-anyup (TypeScript library)

---

## Executive Summary

EdgeCraft demonstrates production-ready GitHub automation with:
- Comprehensive CI/CD pipeline with parallel job execution
- YAML-based structured issue templates (not Markdown)
- Quality gates with enforcement mechanisms
- Asset validation workflows
- AI-powered code review integration
- Automated PR commenting and artifact management
- Issue lifecycle automation (auto-locking stale issues)

**Key Difference**: EdgeCraft is a full application (React + Babylon.js) while babylon-anyup is a TypeScript library. Adaptations focus on library-specific concerns (package size, exports, peer dependencies).

---

## 1. GitHub Workflows Analysis

### 1.1 Main CI/CD Pipeline (`ci.yml`)

**Pattern Discovered:**
- **Parallel job execution** - Separate jobs for lint, typecheck, test, security, build, E2E
- **Job dependencies** - E2E tests run only after typecheck + test pass (`needs: [typecheck, test]`)
- **Artifact management** - Upload coverage, build artifacts, Playwright reports
- **PR commenting** - Automated test report comments on PRs (update existing or create new)
- **Quality gate job** - Final job that depends on ALL jobs passing
- **Matrix builds** - NOT used (single Node.js version)
- **Caching** - npm cache via `actions/setup-node@v4` with `cache: 'npm'`

**Key Features:**
```yaml
# Parallel execution for speed
jobs:
  lint:      # Independent
  typecheck: # Independent
  test:      # Independent
  security:  # Independent
  build:     # Independent
  e2e-tests: # Depends on typecheck + test
  comment-pr: # Depends on test + e2e-tests
  quality-gate: # Depends on ALL jobs
```

**Babylon-anyup Adaptation:**
- Remove E2E tests (library has no UI)
- Add matrix builds for Node 18.x, 20.x, 22.x
- Add package size validation
- Add exports validation
- Keep parallel execution pattern
- Keep PR commenting for coverage reports

---

### 1.2 Asset Validation Workflow (`asset-validation.yml`)

**Pattern Discovered:**
- Triggered on changes to specific paths (`public/assets/**`, `scripts/validate-assets.cjs`)
- Validates asset licenses (CC0 compliance)
- Checks for large files (>10MB warning)
- Verifies manifest.json validity
- Generates asset summary report

**Babylon-anyup Adaptation:**
- **NOT APPLICABLE** - babylon-anyup has no assets
- Could be adapted for future if examples include 3D models

---

### 1.3 Claude Code Review Workflow (`claude-code-review.yml`)

**Pattern Discovered:**
- Triggers on PR opened OR manual dispatch
- Uses `anthropics/claude-code-action@v1`
- Restricted bash commands via `claude_args: '--allowed-tools "Bash(gh issue view:*),..."'`
- References repository guidelines (`CLAUDE.md`)
- Optional filtering by author/contributor type (commented out)

**Babylon-anyup Adaptation:**
- **KEEP AS-IS** - Excellent for automated code review
- Adjust prompt to focus on library concerns (API design, TypeScript types, exports)
- Reference `AGENTS.md` instead of `CLAUDE.md`

---

### 1.4 Claude Code Integration (`claude.yml`)

**Pattern Discovered:**
- Triggers on issue comments, PR review comments, issues opened
- Responds when `@claude` is mentioned
- Broad permissions for reading CI results
- Restricted bash tools for safety

**Babylon-anyup Adaptation:**
- **KEEP AS-IS** - Useful for maintainer assistance
- Already have similar workflow, but EdgeCraft's is more polished

---

### 1.5 Lock Closed Issues Workflow (`lock-closed-issues.yml`)

**Pattern Discovered:**
- Scheduled daily (cron: "0 6 * * *")
- Manual dispatch available
- Locks issues closed for 14+ days
- Posts explanatory comment before locking
- Uses GitHub Script API for pagination

**Babylon-anyup Adaptation:**
- **ADD** - Excellent for reducing noise
- Change cutoff to 30 days (library has slower cadence)
- Update links to babylon-anyup repo

---

### 1.6 Update E2E Snapshots Workflow (`update-e2e-snapshots.yml`)

**Pattern Discovered:**
- Manual workflow dispatch with branch input
- Uses Playwright container
- Updates snapshots and commits back to branch
- Auto-comments on associated PR

**Babylon-anyup Adaptation:**
- **NOT APPLICABLE** - No E2E tests in library

---

## 2. Issue Templates Analysis

### 2.1 Template Format

**Pattern Discovered:**
- **YAML format** (`.yml`) NOT Markdown (`.md`)
- Structured forms with validation
- Required fields enforced
- Pre-filled options (dropdowns)
- Markdown sections for context

**Current babylon-anyup Issue:**
- Uses **Markdown templates** (outdated pattern)
- No validation, no required fields
- Free-form text (inconsistent submissions)

**Recommendation:** **MIGRATE TO YAML** - EdgeCraft's approach is superior

---

### 2.2 Bug Report Template (`bug_report.yml`)

**Pattern Discovered:**
```yaml
name: 🐛 Bug Report
description: Report a defect...
title: "[BUG] "
labels: [bug, needs-triage]
body:
  - type: markdown        # Instructional text
  - type: checkboxes      # Preflight checklist (required)
  - type: textarea        # Bug summary (required)
  - type: textarea        # Reproduction steps (required)
  - type: textarea        # Expected result (required)
  - type: textarea        # Actual result (required, code-rendered)
  - type: textarea        # Regression notes (optional)
  - type: input           # Commit hash (required)
  - type: input           # Map/asset references (optional)
  - type: dropdown        # Runtime environment (required)
  - type: dropdown        # Operating system (required)
  - type: dropdown        # Browser/GPU (required)
  - type: textarea        # Additional context (optional)
```

**Key Features:**
- Emoji in title (🐛) for visual scanning
- `needs-triage` label for workflow
- Required preflight checklist
- Code rendering for logs (`render: shell`)
- Specific dropdowns prevent invalid data

**Babylon-anyup Adaptation:**
- Remove: Map/asset references, Browser/GPU dropdown
- Add: babylon-anyup version, @babylonjs/core version
- Keep: Commit hash, OS, runtime (Node.js/browser)
- Add: TypeScript version, bundler info (webpack/vite/rollup)

---

### 2.3 Feature Request Template (`feature_request.yml`)

**Pattern Discovered:**
```yaml
name: 🌟 Feature Proposal
description: Suggest a new capability...
title: "[FEATURE] "
labels: [enhancement, needs-triage]
body:
  - type: markdown
  - type: checkboxes      # Alignment checklist (PRP review required)
  - type: textarea        # Feature summary (required)
  - type: textarea        # Problem statement (required)
  - type: textarea        # Success criteria (required)
  - type: textarea        # Proposed scope (optional)
  - type: textarea        # Dependencies & blockers (optional)
  - type: textarea        # Risks & tradeoffs (optional)
  - type: textarea        # References (optional)
```

**Key Features:**
- Enforces PRP review before filing
- Requires success criteria (measurable outcomes)
- Encourages contributor involvement

**Babylon-anyup Adaptation:**
- Keep structure, remove PRP references
- Focus on API design, backward compatibility
- Add: Impact on existing users, migration path

---

### 2.4 Technical Task Template (`technical_task.yml`)

**Pattern Discovered:**
```yaml
name: 🧱 Technical Task
description: Track refactors, automation changes...
title: "[TASK] "
labels: [chore, needs-triage]
body:
  - type: markdown
  - type: textarea        # Task summary (required)
  - type: textarea        # Motivation (required)
  - type: textarea        # Scope & deliverables (required)
  - type: textarea        # Validation plan (optional)
  - type: textarea        # Risks & mitigation (optional)
```

**Babylon-anyup Adaptation:**
- **ADD** - Currently missing this template
- Use for: Build system changes, dependency updates, refactors
- Keep EdgeCraft structure

---

### 2.5 Issue Template Config (`config.yml`)

**Pattern Discovered:**
```yaml
blank_issues_enabled: false  # Force template usage
contact_links:
  - name: 📋 Current PRPs
    url: https://github.com/dcversus/edgecraft/tree/main/PRPs
  - name: 🧠 AI Contributor Workflow
    url: https://github.com/dcversus/edgecraft/blob/main/CLAUDE.md
  - name: 📚 Project README
    url: https://github.com/dcversus/edgecraft#readme
```

**Key Features:**
- Disables blank issues (forces structured input)
- Provides quick links to docs

**Babylon-anyup Adaptation:**
- Keep `blank_issues_enabled: false`
- Update links: Remove PRPs, link to AGENTS.md, CONTRIBUTING.md

---

## 3. Pull Request Template Analysis

### EdgeCraft PR Template

**Pattern Discovered:**
```markdown
## Summary
- Describe change and why needed
- Link related issues

## PRP Alignment
- PRP: [link]
- DoD items addressed: [checklist]

## Validation
- [ ] npm run typecheck
- [ ] npm run lint
- [ ] npm run test
- [ ] npm run validate
- [ ] Manual testing per PRP

## Documentation
- [ ] README/docs updated
- [ ] PRP progress table updated
- [ ] CLAUDE/agents instructions accurate

## Additional Notes
- Screenshots, logs, follow-ups
```

**Key Features:**
- PRP alignment section (specific to EdgeCraft workflow)
- Comprehensive validation checklist
- Documentation update reminders

**Current babylon-anyup Template:**
```markdown
## Summary
...
## Changes
...
## Testing
...
## Checklist
- [ ] Tests passing
- [ ] TypeScript compiles
- [ ] Documentation updated
```

**Babylon-anyup Improvement:**
- Remove PRP section, add PRP reference (optional)
- Add: Breaking changes section
- Add: Backward compatibility check
- Add: Package size impact
- Add: Exports validation
- Keep EdgeCraft's validation checklist pattern

---

## 4. Package Configuration Analysis

### EdgeCraft `package.json` Scripts

**Pattern Discovered:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build --mode production",
    "test": "npm run test:unit && npm run test:e2e",
    "test:unit": "jest --passWithNoTests",
    "test:unit:watch": "jest --watch",
    "test:unit:coverage": "jest --coverage --passWithNoTests",
    "test:e2e": "playwright test",
    "test:e2e:update-snapshots": "playwright test --update-snapshots",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --check \"src/**/*.{ts,tsx,json,css,md}\"",
    "format:fix": "prettier --write \"src/**/*.{ts,tsx,json,css,md}\"",
    "typecheck": "tsc --noEmit --project tsconfig.json",
    "validate": "npm run validate:licenses && npm run validate:credits",
    "validate:licenses": "node scripts/validation/PackageLicenseValidator.cjs",
    "validate:credits": "node scripts/validation/AssetCreditsValidator.cjs",
    "benchmark:prepare-files-to-artifacts": "node scripts/benchmark/prepare.cjs",
    "benchmark:browser": "...",
    "benchmark:node": "...",
    "clean": "rm -rf dist .vite node_modules/.vite",
    "install:hooks": "node scripts/hooks/install-hooks.cjs",
    "uninstall:hooks": "node scripts/hooks/uninstall-hooks.cjs",
    "precommit": "bash scripts/hooks/pre-commit"
  }
}
```

**Key Patterns:**
- Separate `lint` and `format` commands (ESLint vs Prettier)
- `--max-warnings 0` flag on ESLint (zero tolerance)
- `test` runs both unit + E2E
- Custom validation scripts for licenses/credits
- Benchmark infrastructure
- Git hooks management

**Babylon-anyup Current Scripts:**
```json
{
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src --ext .ts --max-warnings 0",
    "lint:fix": "eslint src --ext .ts --fix",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "prepublishOnly": "npm run typecheck && npm run lint && npm run test && npm run build",
    "validate": "npm run typecheck && npm run lint && npm run test"
  }
}
```

**Babylon-anyup Improvements:**
- **ADD**: `format` and `format:fix` scripts (Prettier currently via ESLint plugin)
- **ADD**: `validate:exports` - Ensure package.json exports work
- **ADD**: `validate:size` - Check bundle size limits
- **ADD**: `validate:peer-deps` - Verify peer dependency versions
- **UPDATE**: `validate` to include new checks
- **ADD**: `clean` script for clearing build artifacts
- **KEEP**: `prepublishOnly` hook (excellent safety net)

---

## 5. Code Quality Enforcement

### EdgeCraft Patterns

**File Size Limits:**
- Hard limit: 500 lines per file
- Enforced in CI/CD (bash script check)
- Enforced in quality-gates.yml

**TypeScript Standards:**
- Strict mode enabled
- Explicit types required
- `any` forbidden (checked in quality-gates.yml)

**Testing Requirements:**
- Minimum 80% coverage
- Business logic changes MUST have tests
- Coverage uploaded to Codecov

**Zero Comments Policy:**
- Comments only for: Workarounds, TODO/FIXME
- Self-documenting code enforced

**ESLint:**
- Zero errors, zero warnings (`--max-warnings 0`)
- Unused disable directives reported

**Babylon-anyup Current Enforcement:**
- File size: Checked in quality-gates.yml (500 lines)
- TypeScript: Strict mode in tsconfig.json
- `any` checks: In quality-gates.yml
- console.log checks: Warning only (not error)
- Coverage: Via vitest, not enforced threshold

**Babylon-anyup Improvements:**
- **ADD**: Coverage threshold enforcement (80% minimum)
- **ADD**: Codecov integration
- **ADD**: Prettier formatting check to CI
- **ADD**: Bundle size regression check
- **CONSIDER**: Zero comments policy (document in CONTRIBUTING.md)

---

## 6. Recommendations for babylon-anyup

### 6.1 High Priority (Implement Immediately)

1. **Migrate Issue Templates to YAML**
   - Replace `.github/ISSUE_TEMPLATE/*.md` with `.yml`
   - Add structured bug_report.yml
   - Add feature_request.yml
   - Add technical_task.yml
   - Update config.yml

2. **Enhance CI/CD Pipeline**
   - Add matrix builds (Node 18.x, 20.x, 22.x)
   - Add package size validation
   - Add exports validation (`npm pack` test)
   - Add Codecov integration
   - Add PR comment automation

3. **Add Lock Closed Issues Workflow**
   - Reduces noise, improves signal
   - Set cutoff to 30 days (library cadence)

4. **Improve PR Template**
   - Add breaking changes section
   - Add backward compatibility checklist
   - Add package size impact note
   - Add exports validation checkbox

5. **Enhance package.json Scripts**
   - Add `format` / `format:fix` (Prettier)
   - Add `validate:exports`
   - Add `validate:size`
   - Add `validate:peer-deps`
   - Add `clean` script

### 6.2 Medium Priority (Implement Soon)

6. **Add Claude Code Review Workflow**
   - Automated first-pass review
   - Focuses on API design, TypeScript patterns
   - References AGENTS.md

7. **Enforce Coverage Threshold**
   - Add vitest coverage threshold in config
   - Fail CI if below 80%

8. **Add Bundle Size Regression Check**
   - Track dist/ size over time
   - Fail if bundle grows >10% without justification

### 6.3 Low Priority (Nice to Have)

9. **Add Release Automation**
   - Semantic versioning
   - Automated changelog generation
   - npm publish automation

10. **Add Benchmark Infrastructure**
    - Track coordinate conversion performance
    - Regression detection

---

## 7. Key Differences: App vs Library

| Aspect | EdgeCraft (App) | babylon-anyup (Library) |
|--------|-----------------|-------------------------|
| Build Output | Static site (Vite) | npm package (tsup) |
| Testing | Unit + E2E (Playwright) | Unit only (vitest) |
| Assets | Textures, models, maps | None |
| Dependencies | Many (React, Babylon.js) | Minimal (peer dep only) |
| Release | Deploy to hosting | Publish to npm |
| Validation | Asset licenses, file formats | Exports, peer deps, bundle size |
| Consumers | End users (browser) | Other developers (import) |
| Version Constraints | Exact versions | Peer dep ranges |
| Breaking Changes | Less critical | **CRITICAL** (SemVer contract) |

**Key Insight:** Library workflows must emphasize:
- Package correctness (exports, types, peer deps)
- Backward compatibility
- Bundle size
- Cross-environment testing (Node 18/20/22)
- Semantic versioning discipline

---

## 8. Files to Create/Update

### Create New Files

1. `.github/workflows/publish.yml` - npm publish automation
2. `.github/workflows/lock-closed-issues.yml` - Issue lifecycle management
3. `.github/workflows/claude-code-review.yml` - AI code review
4. `.github/ISSUE_TEMPLATE/bug_report.yml` - Structured bug reports
5. `.github/ISSUE_TEMPLATE/feature_request.yml` - Structured feature requests
6. `.github/ISSUE_TEMPLATE/technical_task.yml` - Refactor/chore tracking
7. `scripts/validate-exports.cjs` - Package exports validation
8. `scripts/validate-bundle-size.cjs` - Bundle size regression check
9. `scripts/validate-peer-deps.cjs` - Peer dependency version check

### Update Existing Files

1. `.github/workflows/ci.yml` - Add matrix builds, validations
2. `.github/workflows/quality-gates.yml` - Add coverage threshold
3. `.github/ISSUE_TEMPLATE/config.yml` - Update links
4. `.github/pull_request_template.md` - Enhance checklist
5. `package.json` - Add new scripts
6. `vitest.config.ts` - Add coverage threshold

### Delete Files

1. `.github/ISSUE_TEMPLATE/bug_report.md` - Replaced by .yml
2. `.github/ISSUE_TEMPLATE/feature_request.md` - Replaced by .yml
3. `.github/ARCHITECTURE_OVERVIEW.md` - Move to docs/ (violates 3-file rule)

---

## 9. Implementation Plan

### Phase 1: Issue Templates (1 hour)
- [ ] Create bug_report.yml
- [ ] Create feature_request.yml
- [ ] Create technical_task.yml
- [ ] Update config.yml
- [ ] Delete old .md templates
- [ ] Test template rendering on GitHub

### Phase 2: CI/CD Enhancements (2 hours)
- [ ] Update ci.yml with matrix builds
- [ ] Add package validation scripts
- [ ] Add PR comment automation
- [ ] Add Codecov integration
- [ ] Update quality-gates.yml with coverage threshold

### Phase 3: Workflows (1 hour)
- [ ] Add lock-closed-issues.yml
- [ ] Add claude-code-review.yml
- [ ] Update PR template

### Phase 4: Package Scripts (30 minutes)
- [ ] Add validation scripts to package.json
- [ ] Implement validate-exports.cjs
- [ ] Implement validate-bundle-size.cjs
- [ ] Implement validate-peer-deps.cjs

### Phase 5: Testing (30 minutes)
- [ ] Test all workflows locally
- [ ] Create test PR to validate automation
- [ ] Verify issue templates
- [ ] Document changes in CONTRIBUTING.md

**Total Estimated Time: 5 hours**

---

## 10. Conclusion

EdgeCraft demonstrates **production-grade automation** with:
- Structured YAML issue templates (enforces quality)
- Parallel CI/CD pipeline (fast feedback)
- Comprehensive quality gates (zero defects)
- PR automation (reduces manual work)
- Issue lifecycle management (reduces noise)
- AI integration (scales review capacity)

**Key Takeaway for babylon-anyup:**
Adopt EdgeCraft's **structural patterns** (YAML templates, parallel jobs, quality gates) but adapt **validation logic** for library-specific concerns (exports, bundle size, peer deps, SemVer).

**Next Steps:**
1. Review this analysis with maintainer
2. Prioritize Phase 1 (Issue Templates) - **highest ROI**
3. Implement Phase 2 (CI/CD Enhancements) - **prevents regressions**
4. Monitor impact (fewer invalid issues, faster PR cycle)

---

**Document Version**: 1.0
**Last Updated**: 2025-10-27
**Maintainer**: dcversus
