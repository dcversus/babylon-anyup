# EdgeCraft Patterns - Implementation Plan for babylon-anyup

**Date**: 2025-10-27
**Status**: Ready for Implementation

---

## Overview

This document provides a step-by-step plan to adopt production-ready patterns from EdgeCraft into babylon-anyup.

**Goal**: Transform babylon-anyup from a basic open-source library to a production-grade package with:
- Structured issue templates (YAML)
- Comprehensive CI/CD automation
- Quality gates and enforcement
- AI-powered code review
- Automated issue lifecycle management

---

## Files Created

### Analysis Documents
- ✅ `docs/EDGECRAFT_PATTERNS_ANALYSIS.md` - Complete pattern analysis
- ✅ `docs/IMPLEMENTATION_PLAN.md` - This file

### GitHub Workflows
- ✅ `.github/workflows/ci-enhanced.yml` - Enhanced CI with matrix builds + validations
- ✅ `.github/workflows/claude-code-review.yml` - AI code review on PR open
- ✅ `.github/workflows/lock-closed-issues.yml` - Auto-lock stale issues

### Issue Templates (YAML)
- ✅ `.github/ISSUE_TEMPLATE/bug_report.yml` - Structured bug reports
- ✅ `.github/ISSUE_TEMPLATE/feature_request.yml` - Structured feature proposals
- ✅ `.github/ISSUE_TEMPLATE/technical_task.yml` - Refactor/chore tracking
- ✅ `.github/ISSUE_TEMPLATE/config.yml` - Updated with new links

### Pull Request Template
- ✅ `.github/pull_request_template_enhanced.md` - Comprehensive PR checklist

---

## Implementation Phases

### Phase 1: Issue Templates Migration (1 hour)

**Goal**: Replace Markdown templates with YAML for structured data collection.

**Tasks:**
1. **Backup current templates**
   ```bash
   cd /Users/dcversus/Documents/GitHub/babylon-anyup
   mkdir -p .github/ISSUE_TEMPLATE.backup
   cp .github/ISSUE_TEMPLATE/*.md .github/ISSUE_TEMPLATE.backup/
   ```

2. **Replace templates**
   ```bash
   # Remove old Markdown templates
   rm .github/ISSUE_TEMPLATE/bug_report.md
   rm .github/ISSUE_TEMPLATE/feature_request.md

   # YAML templates already created:
   # - bug_report.yml
   # - feature_request.yml
   # - technical_task.yml
   # - config.yml (updated)
   ```

3. **Test on GitHub**
   - Push to a test branch
   - Navigate to "New Issue" page
   - Verify templates render correctly
   - Submit test issues to validate form behavior

4. **Document in CONTRIBUTING.md**
   ```markdown
   ## Issue Templates

   babylon-anyup uses structured YAML issue templates to ensure consistent bug reports and feature requests.

   **Available templates:**
   - 🐛 Bug Report - Report defects with required reproduction steps
   - 🌟 Feature Proposal - Suggest new capabilities with success criteria
   - 🧱 Technical Task - Track refactors and infrastructure work

   **Important**: Blank issues are disabled. Please use one of the templates above.
   ```

**Verification:**
- [ ] Old `.md` templates deleted
- [ ] New `.yml` templates render on GitHub
- [ ] Test issue submitted successfully
- [ ] `blank_issues_enabled: false` enforced
- [ ] CONTRIBUTING.md updated

---

### Phase 2: CI/CD Enhancements (2-3 hours)

**Goal**: Add matrix builds, package validation, and PR automation.

**Tasks:**

1. **Update vitest.config.ts for coverage threshold**
   ```typescript
   // vitest.config.ts
   export default defineConfig({
     test: {
       coverage: {
         provider: 'v8',
         reporter: ['text', 'json', 'html'],
         thresholds: {
           lines: 80,
           functions: 80,
           branches: 80,
           statements: 80,
         },
         exclude: [
           'node_modules/**',
           'dist/**',
           'tests/**',
           '*.config.ts',
         ],
       },
     },
   });
   ```

2. **Add package.json scripts**
   ```json
   {
     "scripts": {
       "format": "prettier --check \"src/**/*.{ts,json}\"",
       "format:fix": "prettier --write \"src/**/*.{ts,json}\"",
       "validate:exports": "node scripts/validate-exports.cjs",
       "validate:size": "node scripts/validate-bundle-size.cjs",
       "validate:peer-deps": "node scripts/validate-peer-deps.cjs",
       "validate": "npm run typecheck && npm run lint && npm run test:coverage && npm run validate:exports && npm run validate:size && npm run validate:peer-deps",
       "clean": "rm -rf dist coverage .tsup"
     }
   }
   ```

3. **Create validation scripts**

   **scripts/validate-exports.cjs:**
   ```javascript
   #!/usr/bin/env node
   const fs = require('fs');
   const path = require('path');

   console.log('Validating package exports...');

   const distPath = path.join(__dirname, '../dist');
   const packageJson = require('../package.json');

   // Check if dist/ exists
   if (!fs.existsSync(distPath)) {
     console.error('❌ ERROR: dist/ directory not found. Run `npm run build` first.');
     process.exit(1);
   }

   // Validate declared exports exist
   const exports = packageJson.exports['.'];
   const files = [
     { path: exports.require, label: 'CJS' },
     { path: exports.import, label: 'ESM' },
     { path: exports.types, label: 'Types' },
   ];

   let errors = 0;
   for (const file of files) {
     const filePath = path.join(__dirname, '..', file.path);
     if (!fs.existsSync(filePath)) {
       console.error(`❌ ERROR: ${file.label} export not found: ${file.path}`);
       errors++;
     } else {
       console.log(`✅ ${file.label} export exists: ${file.path}`);
     }
   }

   if (errors > 0) {
     console.error(`\n❌ ${errors} export(s) missing`);
     process.exit(1);
   }

   console.log('\n✅ All exports validated');
   ```

   **scripts/validate-bundle-size.cjs:**
   ```javascript
   #!/usr/bin/env node
   const fs = require('fs');
   const path = require('path');

   console.log('Checking bundle size...');

   const distPath = path.join(__dirname, '../dist');

   if (!fs.existsSync(distPath)) {
     console.error('❌ ERROR: dist/ directory not found. Run `npm run build` first.');
     process.exit(1);
   }

   function getDirSize(dir) {
     let size = 0;
     const files = fs.readdirSync(dir);
     for (const file of files) {
       const filePath = path.join(dir, file);
       const stats = fs.statSync(filePath);
       if (stats.isDirectory()) {
         size += getDirSize(filePath);
       } else {
         size += stats.size;
       }
     }
     return size;
   }

   const sizeBytes = getDirSize(distPath);
   const sizeKB = (sizeBytes / 1024).toFixed(2);
   const maxSizeKB = 100; // 100 KB limit

   console.log(`Bundle size: ${sizeKB} KB`);

   if (sizeKB > maxSizeKB) {
     console.error(`❌ ERROR: Bundle size exceeds ${maxSizeKB} KB limit`);
     process.exit(1);
   }

   console.log(`✅ Bundle size within limit (${maxSizeKB} KB)`);
   ```

   **scripts/validate-peer-deps.cjs:**
   ```javascript
   #!/usr/bin/env node
   const packageJson = require('../package.json');

   console.log('Validating peer dependencies...');

   const peerDeps = packageJson.peerDependencies;
   if (!peerDeps) {
     console.log('✅ No peer dependencies declared');
     process.exit(0);
   }

   let warnings = 0;
   for (const [pkg, version] of Object.entries(peerDeps)) {
     console.log(`Checking ${pkg}@${version}`);

     // Check for caret range
     if (!version.startsWith('^')) {
       console.warn(`⚠️ WARNING: ${pkg} should use caret range (^X.Y.Z), got: ${version}`);
       warnings++;
     }

     // Check for major version
     const match = version.match(/\^?(\d+)\./);
     if (match && parseInt(match[1]) < 1) {
       console.warn(`⚠️ WARNING: ${pkg} is pre-1.0, consider wider compatibility range`);
       warnings++;
     }
   }

   if (warnings > 0) {
     console.log(`\n⚠️ ${warnings} warning(s) found (non-blocking)`);
   }

   console.log('\n✅ Peer dependencies validated');
   ```

4. **Make scripts executable**
   ```bash
   chmod +x scripts/validate-exports.cjs
   chmod +x scripts/validate-bundle-size.cjs
   chmod +x scripts/validate-peer-deps.cjs
   ```

5. **Replace ci.yml with ci-enhanced.yml**
   ```bash
   cd /Users/dcversus/Documents/GitHub/babylon-anyup
   mv .github/workflows/ci.yml .github/workflows/ci.yml.backup
   mv .github/workflows/ci-enhanced.yml .github/workflows/ci.yml
   ```

6. **Setup Codecov**
   - Go to https://codecov.io/
   - Sign in with GitHub
   - Add babylon-anyup repository
   - Copy upload token (no longer needed with GitHub Actions, but good to have)

7. **Test locally**
   ```bash
   npm run validate
   npm run build
   npm pack
   ```

**Verification:**
- [ ] `npm run validate` passes
- [ ] `npm run build` produces dist/
- [ ] `npm pack` creates tarball
- [ ] CI workflow runs successfully on test branch
- [ ] Matrix builds test Node 18/20/22
- [ ] Coverage uploaded to Codecov
- [ ] PR comment automation works

---

### Phase 3: Enhanced Workflows (1 hour)

**Goal**: Add AI code review and auto-lock stale issues.

**Tasks:**

1. **Setup Claude Code OAuth Token**
   - Go to repository Settings → Secrets and variables → Actions
   - Add new secret: `CLAUDE_CODE_OAUTH_TOKEN`
   - Value: (obtain from https://console.anthropic.com/)

2. **Enable workflows**
   ```bash
   # Workflows already created:
   # - .github/workflows/claude-code-review.yml
   # - .github/workflows/lock-closed-issues.yml

   # They will activate automatically on next push
   ```

3. **Test Claude Code Review**
   - Create test PR
   - Verify workflow triggers
   - Check PR comment from Claude

4. **Test Lock Closed Issues (manual)**
   ```bash
   # Trigger via workflow_dispatch
   gh workflow run lock-closed-issues.yml
   ```

**Verification:**
- [ ] CLAUDE_CODE_OAUTH_TOKEN secret added
- [ ] Claude review workflow triggers on PR open
- [ ] Lock issues workflow scheduled (cron)
- [ ] Manual dispatch works for lock issues

---

### Phase 4: PR Template Enhancement (15 minutes)

**Goal**: Replace current PR template with enhanced version.

**Tasks:**

1. **Backup current template**
   ```bash
   cd /Users/dcversus/Documents/GitHub/babylon-anyup
   cp .github/pull_request_template.md .github/pull_request_template.md.backup
   ```

2. **Replace template**
   ```bash
   mv .github/pull_request_template_enhanced.md .github/pull_request_template.md
   ```

3. **Test on GitHub**
   - Create test PR
   - Verify template populates
   - Check all sections render correctly

**Verification:**
- [ ] Old template backed up
- [ ] New template renders on PR creation
- [ ] All checklist items visible
- [ ] Breaking changes section present

---

### Phase 5: Quality Gates Enhancement (30 minutes)

**Goal**: Add Prettier enforcement and stricter checks.

**Tasks:**

1. **Add Prettier configuration** (if not exists)
   ```json
   // .prettierrc.json
   {
     "semi": true,
     "trailingComma": "es5",
     "singleQuote": true,
     "printWidth": 100,
     "tabWidth": 2,
     "useTabs": false
   }
   ```

2. **Update quality-gates.yml**
   ```bash
   # Read current file
   cat .github/workflows/quality-gates.yml

   # Add Prettier check after ESLint
   # Add coverage threshold enforcement
   ```

3. **Update ESLint to use Prettier plugin** (if not already)
   ```json
   // .eslintrc.json
   {
     "extends": [
       "plugin:@typescript-eslint/recommended",
       "plugin:prettier/recommended"  // Add this
     ]
   }
   ```

**Verification:**
- [ ] `npm run format` checks Prettier
- [ ] quality-gates.yml enforces formatting
- [ ] Coverage threshold enforced (80%)

---

### Phase 6: Documentation Updates (30 minutes)

**Goal**: Document all new patterns and workflows.

**Tasks:**

1. **Update CONTRIBUTING.md**
   ```markdown
   ## Quality Standards

   ### Code Quality
   - TypeScript strict mode
   - Zero ESLint errors/warnings
   - 80%+ test coverage
   - 500 lines max per file
   - Self-documenting code

   ### Pull Requests
   - All CI checks must pass
   - Coverage threshold met
   - Breaking changes documented
   - SemVer version bump specified

   ### Issue Templates
   - Use structured YAML templates
   - Provide minimal reproduction
   - Include version information
   ```

2. **Update README.md**
   ```markdown
   ## Contributing

   We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

   **Key points:**
   - Use issue templates (bug/feature/task)
   - All PRs require CI checks to pass
   - Maintain 80%+ test coverage
   - Follow TypeScript strict mode
   - No files over 500 lines

   ## CI/CD

   This project uses comprehensive automation:
   - Matrix builds (Node 18/20/22)
   - Automated testing and coverage
   - Package validation
   - AI-powered code review
   - Auto-lock stale issues
   ```

3. **Create CHANGELOG.md entry**
   ```markdown
   ## [Unreleased]

   ### Infrastructure
   - Migrated issue templates to YAML for structured data collection
   - Added matrix builds for Node.js 18/20/22 compatibility
   - Added package validation (exports, bundle size, peer deps)
   - Added AI-powered code review via Claude Code
   - Added auto-lock for stale closed issues (30 day cutoff)
   - Enhanced PR template with breaking change tracking
   - Added coverage threshold enforcement (80%)
   ```

**Verification:**
- [ ] CONTRIBUTING.md updated
- [ ] README.md badges added (codecov, CI status)
- [ ] CHANGELOG.md entry created

---

## Testing Plan

### Unit Tests
```bash
npm run test:coverage
# Verify coverage >80%
```

### Integration Tests
```bash
# Test package exports
npm pack
mkdir test-install && cd test-install
npm init -y
npm install ../dcversus-babylon-anyup-*.tgz

# Test CJS import
node -e "const pkg = require('@dcversus/babylon-anyup'); console.log(pkg);"

# Test ESM import
node --input-type=module -e "import('@dcversus/babylon-anyup').then(console.log);"

cd .. && rm -rf test-install
```

### Workflow Tests
```bash
# Create test branch
git checkout -b test/edgecraft-patterns

# Push and create PR
git push origin test/edgecraft-patterns
gh pr create --title "Test: EdgeCraft Patterns" --body "Testing new workflows"

# Verify:
# - CI runs with matrix builds
# - Claude Code review triggers
# - PR comment automation works
# - Quality gates enforce checks
```

---

## Rollback Plan

If issues arise, rollback steps:

```bash
# Restore issue templates
rm .github/ISSUE_TEMPLATE/*.yml
cp .github/ISSUE_TEMPLATE.backup/* .github/ISSUE_TEMPLATE/

# Restore CI workflow
mv .github/workflows/ci.yml.backup .github/workflows/ci.yml
rm .github/workflows/claude-code-review.yml
rm .github/workflows/lock-closed-issues.yml

# Restore PR template
mv .github/pull_request_template.md.backup .github/pull_request_template.md

# Revert package.json scripts
git checkout package.json

# Delete validation scripts
rm scripts/validate-*.cjs

# Commit rollback
git commit -am "Revert EdgeCraft patterns"
git push
```

---

## Success Metrics

After implementation, track these metrics:

### Issue Quality (2 weeks)
- [ ] Reduction in invalid/incomplete bug reports (target: 50% reduction)
- [ ] Faster triage time (target: <1 day for labeled issues)
- [ ] More actionable feature requests

### CI/CD Performance
- [ ] All workflows pass consistently
- [ ] Build time remains <5 minutes
- [ ] Coverage stays >80%

### Community Engagement
- [ ] More external contributions (PRs from non-maintainers)
- [ ] Faster PR review cycle (target: <3 days)
- [ ] Fewer "help needed" comments on issues

### Code Quality
- [ ] Zero regressions in API behavior
- [ ] Bundle size stays <100 KB
- [ ] No breaking changes without major version bump

---

## Timeline Summary

| Phase | Duration | Effort | Priority |
|-------|----------|--------|----------|
| 1. Issue Templates | 1 hour | Low | 🔴 High |
| 2. CI/CD Enhancements | 2-3 hours | Medium | 🔴 High |
| 3. Enhanced Workflows | 1 hour | Low | 🟡 Medium |
| 4. PR Template | 15 min | Low | 🟡 Medium |
| 5. Quality Gates | 30 min | Low | 🟢 Low |
| 6. Documentation | 30 min | Low | 🟢 Low |

**Total Estimated Time: 5-6 hours**

---

## Next Steps

1. **Review this plan** with maintainer/team
2. **Create tracking issue** for implementation
3. **Start with Phase 1** (highest ROI, lowest risk)
4. **Test thoroughly** on non-main branch
5. **Monitor metrics** for 2 weeks post-implementation
6. **Iterate** based on feedback

---

## Resources

- **EdgeCraft Analysis**: `docs/EDGECRAFT_PATTERNS_ANALYSIS.md`
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Codecov Setup**: https://docs.codecov.com/docs
- **Claude Code**: https://docs.claude.com/en/docs/claude-code
- **YAML Issue Templates**: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms

---

**Document Version**: 1.0
**Last Updated**: 2025-10-27
**Status**: Ready for Implementation
