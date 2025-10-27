# babylon-anyup - AI Agent Development Guidelines

## 🎯 Project Context

**babylon-anyup** is a TypeScript library providing a Babylon.js plugin for Z-up coordinate system compatibility. This library was born from building [Edge Craft](https://github.com/dcversus/edgecraft), an RTS game engine for porting Warcraft 3 and StarCraft 2 maps to the web.

**The Problem We Solve:**
- Blizzard games (WC3, SC2) use Z-up coordinates
- Babylon.js uses Y-up coordinates
- Manual transformation is error-prone and scattered across codebases
- This library provides a clean, tested abstraction layer

**Tech Stack:**
- TypeScript (strict mode)
- Babylon.js (peer dependency ^7.0.0)
- Vitest (testing)
- Zero runtime dependencies

---

## 🤖 AGENT-CENTRIC WORKFLOW

### Core Principle: PRP-First Development

**Every feature, bug fix, or enhancement MUST start with a PRP.**

A PRP (Phase Requirement Proposal) is the single source of truth for:
- What we're building (DoR - Definition of Ready)
- What success looks like (DoD - Definition of Done)
- How to implement it (Implementation Breakdown)
- How to test it (Testing & Validation)
- When it's complete (Exit Criteria)

### The 3-Agent Collaboration Pattern

For every significant change, use this parallel workflow:

```typescript
// Step 1: Launch agents in PARALLEL (single message, multiple Tool calls)
Task(system-analyst): "Define DoR/DoD/user stories for {feature}"
Task(developer): "Research technical approach and design for {feature}"
Task(aqa-engineer): "Define quality gates and test strategy for {feature}"

// Step 2: Agents converge on PRP
// Each agent updates their section of the PRP simultaneously

// Step 3: Implementation begins
// Developer implements following PRP
// AQA engineer writes tests following PRP
// System analyst validates deliverables match PRP
```

**Why this works:**
- Parallelism: 3x faster than sequential
- Specialization: Each agent focuses on their domain
- Completeness: No aspect (business, technical, quality) gets forgotten
- Traceability: Everything documented in PRP before coding starts

---

## 📋 CRITICAL: DOCUMENTATION DISCIPLINE

### THE THREE-FILE RULE (MANDATORY)

**ONLY 3 types of documentation allowed:**

1. **`AGENTS.md`** - This file (AI development guidelines, workflow rules)
2. **`README.md`** - Project overview, installation, usage examples
3. **`PRPs/`** - Phase Requirement Proposals (ONLY format for requirements)

**FORBIDDEN:**
- ❌ No `docs/` directory
- ❌ No scattered `.md` files (`ARCHITECTURE.md`, `PLAN.md`, etc.)
- ❌ No "summary" or "index" files outside PRPs/
- ❌ No duplicate documentation

**Why this rule exists:**
- Single source of truth → No conflicting docs
- Executable requirements → PRP = implementation plan
- Prevents documentation drift → Update PRP or it doesn't exist
- Forces clarity → Can't hide ambiguity in scattered docs

**IF IT'S NOT IN A PRP, IT DOESN'T EXIST.**

---

## 📐 PRP STRUCTURE (MANDATORY)

### What is a PRP?

**PRP = Phase Requirement Proposal**

The ONLY allowed format for documenting features, bugs, or enhancements.

### PRP Template

```markdown
# PRP: {Feature/Bug Name}

**Duration**: {X} weeks | **Status**: 📋 Planned | 🟡 In Progress | 🧪 Testing | ✅ Complete

## 🎯 Phase Overview
{Strategic context: Why this matters, business value, user impact}

## 📋 Definition of Ready (DoR)
{Prerequisites to START - system-analyst defines this}
- [ ] Prerequisite 1
- [ ] Prerequisite 2
- [ ] All research completed
- [ ] Dependencies available

## ✅ Definition of Done (DoD)
{Deliverables to COMPLETE - aqa-engineer validates this}
- [ ] Core functionality implemented
- [ ] Unit tests >85% coverage
- [ ] Integration tests written
- [ ] Documentation updated
- [ ] Performance benchmarks pass
- [ ] All quality gates pass

## 🏗️ Implementation Breakdown
{Technical design, architecture, code examples - developer creates this}

### Architecture
{High-level design, class diagrams, data flow}

### Code Examples
{Expected API usage, transformation logic}

### Sub-Tasks
1. Task 1: Description
2. Task 2: Description
3. Task 3: Description

## 🧪 Testing & Validation
{Test strategy, benchmarks, success criteria - aqa-engineer defines this}

### Unit Tests
- Test case 1
- Test case 2
- Edge cases to cover

### Integration Tests
- Integration scenario 1
- Integration scenario 2

### Performance Benchmarks
- Metric 1: Target value
- Metric 2: Target value

### Validation Commands
```bash
npm run typecheck  # Must pass
npm run lint       # Must pass
npm run test       # Must pass with >85% coverage
npm run validate   # All checks pass
```

## 📊 Success Metrics
{Quantifiable targets}
- Coverage: >85%
- Performance: {specific target}
- Bundle size: <10KB
- Zero TypeScript errors
- Zero ESLint errors

## 📈 Phase Exit Criteria
{Final checklist to CLOSE phase}
- [ ] All DoD items checked
- [ ] All quality gates green
- [ ] Code reviewed and approved
- [ ] Documentation complete
- [ ] No P0/P1 bugs open

## 🚧 Current Blockers
{Active issues preventing progress}
- Blocker 1: Description
- Blocker 2: Description

## 📝 Progress Tracking
{Real-time status updates - UPDATE AFTER EVERY SIGNIFICANT CHANGE}

| Date       | Agent          | Activity                    | Status      |
|------------|----------------|-----------------------------|-------------|
| 2025-10-27 | system-analyst | Created PRP                 | ✅ Complete |
| 2025-10-27 | developer      | Research Babylon.js plugins | 🟡 In Progress |
| ...        | ...            | ...                         | ...         |

## 🔗 Related Materials
{Research links, dependencies, inspiration}
- Link 1
- Link 2
```

### PRP Naming Convention

```text
PRPs/
├── coordinate-system-conversion.md
├── automatic-scene-transforms.md
├── performance-optimization.md
└── {descriptive-feature-name}.md
```

**Rules:**
- Flat structure (no subdirectories)
- Descriptive kebab-case names
- One PRP per feature/bug/enhancement

---

## 🔄 AGENT WORKFLOW: STEP-BY-STEP

### Phase 1: PRP Creation (Parallel Agents)

**When:** User requests a new feature or bug fix

**Action:** Launch 3 agents in parallel (single message, multiple Tool calls)

```typescript
// In a SINGLE message, call Task tool 3 times:

Task({
  subagent_type: "system-analyst",
  description: "Define DoR/DoD/user stories",
  prompt: `Create PRP for {feature name} in /Users/dcversus/Documents/GitHub/babylon-anyup/PRPs/

  Define:
  - Business value and user impact
  - Prerequisites (DoR)
  - Deliverables (DoD)
  - User stories
  - Success metrics

  Return: PRP markdown content`
});

Task({
  subagent_type: "developer",
  description: "Research and design architecture",
  prompt: `Research technical approach for {feature name}

  Investigate:
  - Babylon.js APIs needed
  - Coordinate transformation math
  - Performance considerations
  - Code examples

  Output: Implementation Breakdown section for PRP`
});

Task({
  subagent_type: "aqa-engineer",
  description: "Define quality gates and tests",
  prompt: `Define testing strategy for {feature name}

  Specify:
  - Required unit tests (>85% coverage)
  - Integration test scenarios
  - Performance benchmarks
  - Quality gate thresholds

  Output: Testing & Validation section for PRP`
});
```

**Result:** Complete PRP ready for implementation

---

### Phase 2: Implementation

**When:** PRP DoR is satisfied

**Agent:** `developer`

**Workflow:**
1. Read PRP: `cat PRPs/{feature-name}.md`
2. Validate DoR: All checkboxes checked?
3. Implement following "Implementation Breakdown"
4. Write code with self-documenting names (zero comments)
5. Keep files <500 lines
6. Update "Progress Tracking" table after each milestone
7. Check off DoD items as completed

**Commands:**
```bash
# Before any code
cat PRPs/{feature-name}.md

# During implementation
npm run dev        # Watch mode
npm run typecheck  # Continuous validation
npm run lint       # Continuous validation

# After implementation
npm run validate   # Must pass
```

---

### Phase 3: Testing

**When:** Implementation complete

**Agent:** `aqa-engineer`

**Workflow:**
1. Read PRP testing strategy
2. Write unit tests (>85% coverage target)
3. Write integration tests
4. Run performance benchmarks
5. Validate all quality gates pass
6. Update DoD with test results

**Commands:**
```bash
npm run test              # Run tests
npm run test:coverage     # Check coverage (must be >85%)
npm run validate          # All quality checks
```

---

### Phase 4: Validation & Completion

**When:** All DoD items checked

**Agent:** `system-analyst`

**Workflow:**
1. Review PRP DoD checklist
2. Verify all items completed
3. Validate deliverables match requirements
4. Check no open blockers
5. Update PRP status to ✅ Complete
6. Fill "Phase Exit Criteria" section

**Merge Criteria:**
- [ ] All DoD items checked
- [ ] All quality gates green (CI/CD)
- [ ] Test coverage >85%
- [ ] Zero TypeScript errors
- [ ] Zero ESLint errors
- [ ] No files >500 lines
- [ ] Code reviewed (if team project)

---

## 📏 CODE QUALITY RULES

### File Size Limit
- **HARD LIMIT: 500 lines per file**
- Split into modules when approaching limit
- Use `index.ts` for clean barrel exports

### Library Code Organization
```text
src/
├── plugin/          # Main plugin implementation
│   └── AnyUpPlugin.ts
├── transforms/      # Coordinate transformation strategies
│   ├── ZUpToYUpStrategy.ts
│   ├── YUpToZUpStrategy.ts
│   └── TransformStrategyFactory.ts
├── types/           # TypeScript type definitions
│   └── index.ts
└── index.ts         # Public API exports (only what's necessary)

tests/               # Test files (*.test.ts)
├── transforms/
│   └── *.test.ts
└── plugin/
    └── *.test.ts

examples/            # Usage examples
└── basic-usage.ts

PRPs/                # Phase Requirement Proposals
└── *.md
```

### TypeScript Standards

```typescript
// ✅ DO: Explicit types, no 'any'
interface PluginOptions {
  sourceSystem: 'y-up' | 'z-up';
  targetSystem: 'y-up' | 'z-up';
  autoConvert: boolean;
}

// ✅ DO: Export types for library consumers
export type { PluginOptions, CoordinateSystem };

// ✅ DO: JSDoc for ALL public APIs
/**
 * Converts a Babylon.js mesh from Z-up to Y-up coordinate system
 *
 * @param mesh - The mesh to convert
 * @throws {Error} If plugin not initialized
 *
 * @example
 * ```typescript
 * plugin.convertMesh(myMesh);
 * ```
 */
export convertMesh(mesh: Mesh): void;

// ❌ DON'T: Use 'any' - FORBIDDEN
function process(data: any) { }  // ❌ Will fail CI

// ✅ DO: Use unknown if type truly unknown
function process(data: unknown) {
  if (isValidData(data)) {
    // Now TypeScript knows data's type
  }
}
```

### Zero Comments Policy

**Comments are ONLY allowed in TWO cases:**
1. **Workarounds** - Unusual code to bypass framework/library bugs
   ```typescript
   // WORKAROUND: Babylon.js v7.0.0 bug - matrix multiplication order reversed
   const result = matrixB.multiply(matrixA);  // Should be matrixA.multiply(matrixB)
   ```

2. **TODO/FIXME** - Temporary markers (MUST be removed before PR merge)
   ```typescript
   // TODO: Add support for custom coordinate systems
   // FIXME: Performance bottleneck with >10,000 vertices
   ```

**All other code must be self-documenting:**
- Descriptive variable names: `sourceCoordinateSystem` not `src`
- Descriptive function names: `convertZUpToYUp()` not `convert()`
- Extract complex logic to well-named functions
- Use TypeScript types for clarity

---

## 🧪 TESTING REQUIREMENTS

### Coverage Targets
- **Minimum: 85% for all metrics** (lines, branches, functions, statements)
- CI/CD enforces 80% threshold
- Aim for 85%+ on critical paths

### Test Framework: Vitest

**Why Vitest:**
- Fast (native ESM, parallelization)
- Modern (Vite-powered)
- Compatible with Jest API

### Test Structure

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('FeatureName', () => {
  // Setup
  beforeEach(() => {
    // Arrange shared state
  });

  // Teardown
  afterEach(() => {
    // Clean up resources
  });

  it('should handle normal operation', () => {
    // Arrange
    const input = createTestInput();

    // Act
    const result = feature(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('should handle edge case: zero vector', () => {
    const zero = Vector3.Zero();
    const result = convertPosition(zero);
    expect(result.equals(Vector3.Zero())).toBe(true);
  });

  it('should throw error on invalid input', () => {
    expect(() => feature(null)).toThrow('Invalid input');
  });

  // Performance test
  it('should transform 10,000 vectors in <100ms', () => {
    const vectors = generateTestVectors(10000);
    const start = performance.now();
    vectors.forEach(v => transform(v));
    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100);
  });
});
```

### Test Categories

1. **Unit Tests** - Pure function logic
   - Coordinate transformations
   - Strategy pattern implementation
   - Helper utilities

2. **Integration Tests** - Babylon.js integration
   - Plugin initialization with scene
   - Mesh transformation
   - Resource cleanup (dispose)

3. **Performance Tests** - Benchmark critical paths
   - Vector3 transform speed (>100K ops/sec)
   - Quaternion transform speed (>66K ops/sec)
   - Plugin overhead (<5% scene init time)

### Test Coverage Requirements

**Per-File Coverage:**
```typescript
// vitest.config.ts
export default {
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      lines: 85,
      functions: 85,
      branches: 85,
      statements: 85,
      exclude: [
        'tests/**',
        '**/*.test.ts',
        'examples/**',
      ],
    },
  },
};
```

**Critical Files (require >90%):**
- `src/transforms/*` - Core transformation logic
- `src/plugin/AnyUpPlugin.ts` - Main public API

---

## ⚡ PERFORMANCE STANDARDS

### Bundle Size
- **Target: <10KB minified**
- **Target: <3KB gzipped**
- Zero runtime dependencies
- Tree-shakeable exports

### Runtime Performance

**Transformation Speed Targets:**
- Vector3: >100,000 ops/second
- Quaternion: >66,000 ops/second (1.5x Vector3 cost)
- Matrix: >5,000 ops/second (more complex)

**Plugin Overhead:**
- Initialization: <10ms
- Per-mesh transformation: <1ms
- Total scene overhead: <5% of Babylon.js scene init

**Benchmark Commands:**
```bash
# Run performance tests
npm run test -- --run --testNamePattern="Performance"

# Manual profiling
npm run dev
# Then use browser DevTools Performance tab
```

---

## 🚨 CI/CD QUALITY GATES

### Automated Checks (GitHub Actions)

**Every PR must pass:**

| Gate | Tool | Threshold | Blocking |
|------|------|-----------|----------|
| TypeScript | `tsc` | 0 errors | ✅ Yes |
| Linting | `eslint` | 0 errors, 0 warnings | ✅ Yes |
| Tests | `vitest` | All passing | ✅ Yes |
| Coverage | `vitest coverage` | >80% | ✅ Yes |
| File Size | Custom script | <500 lines/file | ✅ Yes |
| No 'any' | `eslint` rule | 0 violations | ✅ Yes |
| Build | `tsup` | Success | ✅ Yes |
| Bundle Size | `bundlesize` | <10KB | ⚠️ Warning |

### Pre-Commit Checklist

```bash
# Run locally before pushing
npm run validate   # Runs all checks below

# Individual checks
npm run typecheck  # TypeScript errors
npm run lint       # ESLint errors/warnings
npm run test       # Test failures
npm run test:coverage  # Coverage thresholds
npm run build      # Build errors
```

---

## 🎯 BABYLON.JS INTEGRATION PATTERNS

### Plugin Architecture

```typescript
// ✅ DO: Follow Babylon.js conventions
export class AnyUpPlugin {
  private scene: Scene | null = null;
  private observers: Observer<any>[] = [];

  // Initialize with scene
  public initialize(scene: Scene): void {
    this.scene = scene;

    // Register observers for lifecycle events
    const observer = scene.onNewMeshAddedObservable.add((mesh) => {
      if (this.config.autoConvert) {
        this.convertMesh(mesh);
      }
    });

    this.observers.push(observer);

    // Store plugin reference in scene metadata
    scene.metadata = scene.metadata || {};
    scene.metadata.anyUpPlugin = this;
  }

  // Clean up resources
  public dispose(): void {
    if (this.scene) {
      // Remove observers
      this.observers.forEach(obs => {
        this.scene!.onNewMeshAddedObservable.remove(obs);
      });
      this.observers = [];

      // Clear metadata reference
      if (this.scene.metadata?.anyUpPlugin === this) {
        delete this.scene.metadata.anyUpPlugin;
      }

      this.scene = null;
    }
  }
}
```

### Coordinate Transformation

```typescript
// ✅ DO: Create new instances, don't mutate
export class ZUpToYUpStrategy implements ITransformStrategy {
  public convertPosition(position: Vector3): Vector3 {
    // Z-up to Y-up: (x, y, z) → (x, z, -y)
    return new Vector3(
      position.x,
      position.z,
      -position.y
    );
  }

  public convertRotation(rotation: Quaternion): Quaternion {
    // Apply 90-degree X-axis rotation correction
    const correction = Quaternion.RotationAxis(
      Vector3.Right(),
      Math.PI / 2
    );
    return rotation.multiply(correction);
  }

  public convertScale(scale: Vector3): Vector3 {
    // Scale doesn't change, but swap Y and Z for consistency
    return new Vector3(scale.x, scale.z, scale.y);
  }
}
```

### Resource Management

```typescript
// ✅ DO: Proper cleanup to prevent memory leaks
export class AnyUpPlugin {
  private transformedMeshes = new Set<Mesh>();

  public convertMesh(mesh: Mesh): void {
    // Transform position
    mesh.position = this.strategy.convertPosition(mesh.position);

    // Transform rotation
    if (mesh.rotationQuaternion) {
      mesh.rotationQuaternion = this.strategy.convertRotation(
        mesh.rotationQuaternion
      );
    }

    // Track for potential reversion
    this.transformedMeshes.add(mesh);

    // Mark as transformed
    mesh.metadata = mesh.metadata || {};
    mesh.metadata.coordinateSystemConverted = true;
  }

  public dispose(): void {
    // Clear tracking
    this.transformedMeshes.clear();
    // ... other cleanup
  }
}
```

---

## 🔬 RESEARCH & DEVELOPMENT WORKFLOW

### When You Need to Research

**Scenario:** Implementing a feature that requires understanding Babylon.js internals

**Use the `developer` agent:**

```typescript
Task({
  subagent_type: "developer",
  description: "Research Babylon.js scene observers",
  prompt: `Research how Babylon.js scene observers work for automatic mesh conversion.

  Focus on:
  1. Scene.onNewMeshAddedObservable API
  2. Observer lifecycle management
  3. Performance implications
  4. Memory leak prevention
  5. Best practices from Babylon.js docs

  Output: Implementation approach with code examples for PRP`
});
```

### When You Need to Design Architecture

**Scenario:** Complex feature requiring architectural decisions

**Use the `developer` agent:**

```typescript
Task({
  subagent_type: "developer",
  description: "Design plugin architecture",
  prompt: `Design architecture for coordinate system plugin with multiple strategies.

  Requirements:
  - Support Y-up ↔ Z-up conversion
  - Extensible for future coordinate systems
  - Type-safe with TypeScript
  - Zero runtime overhead for unused strategies

  Provide:
  1. Class diagram (ASCII art)
  2. Interface definitions
  3. Strategy pattern implementation
  4. Factory pattern for strategy selection

  Output: Architecture section for PRP`
});
```

---

## 🛡️ LIBRARY-SPECIFIC RULES

### Public API Design

**Principles:**
1. **Minimal Surface Area** - Export only what's necessary
2. **Stable Interfaces** - Breaking changes require major version bump
3. **Tree-Shakeable** - Use named exports, avoid default exports
4. **Type Safety** - All public APIs fully typed

**Example:**

```typescript
// ✅ DO: Named exports, explicit types
export interface AnyUpPluginOptions {
  sourceSystem: CoordinateSystem;
  targetSystem: CoordinateSystem;
  autoConvert?: boolean;
  preserveOriginal?: boolean;
}

export type CoordinateSystem = 'y-up' | 'z-up';

export class AnyUpPlugin {
  constructor(options: AnyUpPluginOptions) { }
  public initialize(scene: Scene): void { }
  public dispose(): void { }
}

// ❌ DON'T: Default exports (not tree-shakeable)
export default class Plugin { }  // ❌

// ❌ DON'T: Export internal implementation details
export class InternalHelper { }  // ❌ Should be internal only
```

### Versioning Strategy (SemVer)

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking API changes
  - Removing public methods
  - Changing method signatures
  - Renaming exports

- **MINOR** (1.0.0 → 1.1.0): New features (backwards compatible)
  - Adding new methods
  - Adding new optional parameters
  - Adding new exports

- **PATCH** (1.0.0 → 1.0.1): Bug fixes
  - Fixing existing functionality
  - Performance improvements
  - Documentation updates

### Peer Dependencies

```json
{
  "peerDependencies": {
    "@babylonjs/core": "^7.0.0"
  }
}
```

**Rules:**
- Do NOT bundle Babylon.js (peer dependency)
- Support wide version range (^7.0.0 = 7.x.x)
- Test against latest Babylon.js in CI
- Document required Babylon.js version in README

---

## 🚀 AGENT-SPECIFIC TIPS

### For `system-analyst` Agent

**Your Role:**
- Define WHAT we're building (not HOW)
- Write user stories from modmaker perspective
- Define success metrics (quantifiable)
- Validate deliverables match requirements

**Key Questions to Answer:**
- Why does this feature matter?
- What problem does it solve?
- Who is the user?
- How will we know it's done?
- What's the business value?

**PRP Sections You Own:**
- Phase Overview
- Definition of Ready (DoR)
- Definition of Done (DoD)
- Success Metrics
- Phase Exit Criteria

---

### For `developer` Agent

**Your Role:**
- Define HOW we're building it
- Research technical approaches
- Design architecture
- Write code following PRP
- Update progress tracking

**Key Questions to Answer:**
- What Babylon.js APIs do we need?
- What's the transformation math?
- How do we avoid performance issues?
- What's the public API?
- How do we handle edge cases?

**PRP Sections You Own:**
- Implementation Breakdown
- Architecture diagrams
- Code examples
- Sub-tasks breakdown

**During Implementation:**
- Read PRP before coding
- Follow "Implementation Breakdown" section
- Keep files <500 lines
- Update "Progress Tracking" after milestones
- Check off DoD items as completed

---

### For `aqa-engineer` Agent

**Your Role:**
- Define test strategy
- Specify quality gates
- Write comprehensive tests
- Validate coverage and benchmarks
- Ensure quality standards met

**Key Questions to Answer:**
- What unit tests are needed?
- What integration tests are needed?
- What performance benchmarks are required?
- What's the coverage target?
- What quality gates must pass?

**PRP Sections You Own:**
- Testing & Validation
- Quality gate thresholds
- Benchmark specifications
- Test coverage requirements

**During Testing:**
- Write tests following PRP test strategy
- Aim for >85% coverage
- Run performance benchmarks
- Validate all quality gates pass
- Document test results in PRP

---

## 📚 QUICK REFERENCE

### Starting New Feature

```bash
# 1. Launch 3 agents in parallel (SINGLE message)
# system-analyst: Define DoR/DoD/user stories
# developer: Research architecture
# aqa-engineer: Define quality gates

# 2. Agents converge on PRP
cat PRPs/{feature-name}.md

# 3. Validate DoR
# All prerequisites checked? → START

# 4. Implement
npm run dev          # Watch mode
npm run typecheck    # Continuous validation
npm run lint         # Continuous validation

# 5. Test
npm run test:watch   # TDD approach
npm run test:coverage # Check coverage

# 6. Validate
npm run validate     # All quality checks

# 7. Update PRP
# Check off DoD items, update progress tracking

# 8. Complete
# PRP status → ✅ Complete
```

### Daily Checklist

- [ ] Read PRP before coding
- [ ] Write tests (>85% coverage target)
- [ ] Run `npm run validate` frequently
- [ ] Keep files <500 lines
- [ ] No `any` types
- [ ] Update PRP progress tracking
- [ ] Zero comments (except workarounds/TODOs)
- [ ] All public APIs have JSDoc

---

## 🎓 REMEMBER

### The Three-File Rule
1. `AGENTS.md` ← You are here (AI guidelines)
2. `README.md` ← User-facing docs
3. `PRPs/` ← Requirements (ONLY format)

### Every PRP Has
- DoR (prerequisites)
- DoD (deliverables)
- Implementation Breakdown (how-to)
- Testing & Validation (quality)
- Success Metrics (quantifiable)
- Exit Criteria (done means done)

### Every Commit Must
- Pass all quality gates
- Meet PRP requirements
- Maintain >85% test coverage
- Follow library best practices

### This is a LIBRARY
- Public API stability matters
- Bundle size matters (<10KB)
- Type safety matters (no `any`)
- Breaking changes require major version bump
- Support wide Babylon.js version range

### Agent Collaboration
- **Parallel > Sequential** - Launch agents in parallel
- **Specialize** - Each agent focuses on their domain
- **Converge** - All agents update same PRP
- **Execute** - Follow PRP during implementation

---

## 📦 PUBLISHING WORKFLOW

### Automated Release with Claude (Recommended)

**CHANGELOG.md is automatically updated by Claude AI!**

1. **Trigger the release workflow on GitHub**:
   - Go to Actions → "Prepare Release with Claude" → Run workflow
   - Enter version: `0.1.0` (exact version) or `patch`/`minor`/`major` (auto-increment)
   - Claude will:
     - Analyze git commits since last release
     - Generate CHANGELOG.md entry following Keep a Changelog format
     - Update package.json version
     - Commit changes
     - Create and push git tag
     - Trigger npm publish automatically
     - Create GitHub release

2. **That's it!** The entire release process is automated.

### Manual Release (Alternative)

If you need to release manually:

1. **Update CHANGELOG.md**:
   ```markdown
   ## [X.Y.Z] - YYYY-MM-DD

   ### Added
   - New feature 1

   ### Changed
   - Changed behavior 1

   ### Fixed
   - Bug fix 1
   ```

2. **Update package.json version**:
   ```bash
   npm version patch|minor|major --no-git-tag-version
   ```

3. **Run full validation**:
   ```bash
   npm run validate  # typecheck + lint + test
   ```

4. **Commit and tag**:
   ```bash
   git add CHANGELOG.md package.json package-lock.json
   git commit -m "chore(release): prepare vX.Y.Z"
   git tag -a "vX.Y.Z" -m "Release vX.Y.Z"
   git push && git push --tags
   ```

5. **Publish happens automatically** when tag is pushed (via GitHub Actions)

### Version Strategy

Follow [Semantic Versioning](https://semver.org/):
- **MAJOR** (X.0.0): Breaking API changes
- **MINOR** (0.X.0): New features, backward compatible
- **PATCH** (0.0.X): Bug fixes, backward compatible

### GitHub Actions Workflows

- **`prepare-release.yml`**: Claude-powered CHANGELOG generation and release preparation
- **`release.yml`**: Publishes to npm when tag is pushed
- **`publish.yml`**: Publishes to npm when GitHub release is created
- **`claude-code-review.yml`**: Reviews PRs with Claude AI

---

## 🔗 RELATED RESOURCES

- [Babylon.js Documentation](https://doc.babylonjs.com/)
- [Edge Craft Project](https://github.com/dcversus/edgecraft)
- [Warcraft 3 Formats](https://www.hiveworkshop.com/)
- [Semantic Versioning](https://semver.org/)
- [Vitest Documentation](https://vitest.dev/)

---

**Follow this workflow. Trust the agents. Trust the PRPs. Ship great code.** 🚀
