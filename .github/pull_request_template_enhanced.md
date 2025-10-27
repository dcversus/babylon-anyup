## Summary
<!-- Describe the change and why it is needed. Link related issues. -->

Fixes #<!-- issue number -->

## Changes
<!-- List the key changes made in this PR -->
-
-

## Breaking Changes
<!-- If this PR introduces breaking changes, describe them here -->
- [ ] This PR includes breaking changes
- [ ] Migration guide added to CHANGELOG.md
- [ ] Major version bump required (if breaking)

**Breaking change details:**
<!-- Describe what breaks and how users should migrate -->

## Backward Compatibility
<!-- How does this affect existing users? -->
- [ ] Fully backward compatible
- [ ] Backward compatible with deprecation warnings
- [ ] **Breaking change** (requires major version bump)

## Package Impact
<!-- How does this affect the package? -->
- **Bundle size change**: <!-- e.g., +2 KB, -500 bytes, no change -->
- **New exports added**: <!-- e.g., `coordinateSystemUtils` -->
- **Peer dependency changes**: <!-- e.g., @babylonjs/core now requires ^7.0.0 -->

## Testing
<!-- Describe how you tested these changes -->

**Test coverage:**
- [ ] Unit tests added/updated (coverage: <!-- % -->)
- [ ] Integration tests added/updated
- [ ] Manual testing performed

**Manual testing steps:**
1.
2.
3.

**Tested environments:**
- [ ] Node.js 18.x
- [ ] Node.js 20.x
- [ ] Node.js 22.x
- [ ] Browser (Chrome/Edge/Brave)
- [ ] Browser (Firefox)
- [ ] Browser (Safari)

## Validation Checklist
<!-- Run these commands before requesting review -->
- [ ] `npm run typecheck` - No TypeScript errors
- [ ] `npm run lint` - No ESLint errors
- [ ] `npm run test` - All tests passing
- [ ] `npm run test:coverage` - Coverage threshold met (80%+)
- [ ] `npm run build` - Package builds successfully
- [ ] `npm pack` - Package can be installed locally

## Code Quality
- [ ] All files under 500 lines
- [ ] No `any` types used (except justified exceptions)
- [ ] No `console.log` statements (except debug utilities)
- [ ] Self-documenting code (minimal comments)
- [ ] JSDoc added for public APIs

## Documentation
- [ ] README.md updated (if API changed)
- [ ] CHANGELOG.md updated
- [ ] TypeScript types exported and documented
- [ ] Code examples added/updated (if applicable)
- [ ] AGENTS.md updated (if workflow changed)

## Performance
<!-- If this PR affects performance -->
- [ ] Performance benchmarks run (no regression)
- [ ] Bundle size checked (within acceptable limits)
- [ ] Memory usage profiled (no leaks)

**Benchmark results:**
<!-- Paste benchmark output if applicable -->

## Security
- [ ] No new security vulnerabilities introduced (`npm audit`)
- [ ] No sensitive data exposed in logs/errors
- [ ] Input validation added where needed

## Additional Notes
<!-- Include screenshots, logs, or follow-up tasks if relevant -->

## Reviewer Checklist
<!-- For maintainers reviewing this PR -->
- [ ] Code follows project conventions
- [ ] Tests are comprehensive
- [ ] Documentation is clear and complete
- [ ] Breaking changes are justified and documented
- [ ] SemVer version bump is appropriate
- [ ] CHANGELOG.md entry is accurate
