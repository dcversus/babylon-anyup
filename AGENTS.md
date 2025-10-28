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

### 🚦 SIGNAL-BASED WORKFLOW

Agents communicate through **signals** - emotional indicators that convey urgency, confidence, and status. Each agent leaves comments with signals in PRPs to coordinate asynchronously.

#### Signal Reference Table

| Signal | Strength | Meaning | When to Use | Agent Type |
|--------|----------|---------|-------------|------------|
| **ATTENTION** | 10/10 | Critical blocker, accident, or production failure | Production down, security breach, impossible requirement | Any |
| **BLOCKED** | 9/10 | Cannot proceed without resolution | Missing dependency, conflicting requirements, external blocker | Any |
| **BROKEN** | 9/10 | Critical functionality not working | POST-RELEASE: API broken, major bugs, site down | QC |
| **DEGRADED** | 7/10 | Performance degradation detected | POST-RELEASE: Slow loading, bundle size exceeded, errors | SRE |
| **WORRIED** | 6/10 | Concern about approach or risk | Technical debt, performance concern, unclear requirement | Any |
| **UNCERTAIN** | 5/10 | Need clarification or validation | Ambiguous spec, multiple valid approaches, need decision | system-analyst |
| **EXCITED** | 4/10 | Positive discovery or improvement | Found better approach, optimization opportunity, innovation | developer |
| **CONFIDENT** | 3/10 | Completed with high certainty | Straightforward implementation, well-tested, clear requirements | developer, QC, SRE |
| **READY** | 2/10 | Prerequisites met, ready to proceed | DoR satisfied, research complete, tests passing | system-analyst |
| **DEPLOYED** | 2/10 | Successfully deployed to production | POST-RELEASE: Deployment health verified | SRE |
| **VALIDATED** | 2/10 | Quality validation passed | POST-RELEASE: All QC checks passed | QC |
| **COMPLETE** | 1/10 | Work finished, validated, documented | All DoD items checked, quality gates passed | coordinator |

**Rules:**
- Use 1-2 signals maximum per PRP update
- Higher strength = higher priority for coordinator agent
- Coordinator agent scans all PRPs for strongest signals first
- Signals replace verbose status updates

#### Signal Comment Format

```markdown
## 🔔 Agent Signals

### [Date] - [Agent Role] - Signal: [SIGNAL_NAME]
**Comment:** [Brief description of status/issue/discovery]
**Context:** [Optional: Links, details, recommendations]
**Action Required:** [What needs to happen next]
```

**Example:**
```markdown
## 🔔 Agent Signals

### 2025-10-28 - system-analyst - Signal: ATTENTION
**Comment:** Research shows conflicting coordinate transformation approaches in Babylon.js documentation vs. community examples
**Context:**
- Official docs: https://doc.babylonjs.com/features/featuresDeepDive/mesh/transforms
- Community example: https://forum.babylonjs.com/t/coordinate-system-conversion/12345
- Stack Overflow discussion: https://stackoverflow.com/q/67890123
**Action Required:** Developer agent must validate which approach is correct before implementation

### 2025-10-27 - developer - Signal: CONFIDENT
**Comment:** Plugin architecture designed with strategy pattern, extensible and type-safe
**Context:** Architecture section updated in PRP with class diagrams and code examples
**Action Required:** Ready for implementation phase
```

### The 3-Agent Collaboration Pattern

For every significant change, use this signal-driven workflow:

```typescript
// Phase 1: Research & Planning (Coordinator launches)
Task(system-analyst): "Research requirements, create DoR/DoD, leave SIGNAL in PRP"
// System analyst investigates, finds issues → leaves ATTENTION signal
// OR completes research → leaves READY signal

// Phase 2: Coordinator Scans PRPs
// Coordinator agent reads all PRPs, sorts by signal strength
// Highest priority: ATTENTION (10) > BLOCKED (9) > WORRIED (6)
// Coordinator decides next action based on strongest signal

// Phase 3: Resolution/Implementation
Task(developer): "Address [SIGNAL] from PRP, implement solution, update with new SIGNAL"
// Developer resolves issues, implements → leaves CONFIDENT or WORRIED signal

Task(aqa-engineer): "Write tests, validate quality, leave SIGNAL in PRP"
// AQA validates → leaves COMPLETE or BLOCKED signal

// Phase 4: Validation
// System analyst reviews all signals, validates deliverables
// If all signals are COMPLETE/CONFIDENT → PRP status: ✅ Complete
```

**Why this works:**
- **Asynchronous:** Agents don't wait, they signal and move on
- **Priority-driven:** Strongest signals get attention first
- **Personality:** Each agent has unique voice through signals
- **Clarity:** Signal strength = urgency/priority (no ambiguity)
- **Traceability:** Signal history shows decision flow

---

## ⚠️ MANDATORY: QUALITY GATES (RUN BEFORE EVERY RESPONSE)

**🚨 CRITICAL: AI AGENTS MUST ALWAYS CHECK QUALITY BEFORE RESPONDING 🚨**

### Pre-Response Quality Checklist

**Before sending ANY response that modifies code, landing pages, or documentation, you MUST:**

1. **Run TypeScript Check** (Zero Errors Required)
   ```bash
   npm run typecheck
   ```
   - **MUST PASS** - Zero TypeScript errors allowed
   - If errors exist: Fix them before responding
   - Never send a response with TypeScript errors

2. **Run Linting** (Zero Errors/Warnings Required)
   ```bash
   npm run lint
   ```
   - **MUST PASS** - Zero ESLint errors/warnings allowed
   - If errors exist: Fix them before responding
   - Never send a response with lint errors

3. **Run Tests** (Periodically - At Least Every 3-5 Code Changes)
   ```bash
   npm run test
   npm run test:coverage
   ```
   - All tests must pass
   - Coverage must be >85%
   - Run tests before major milestones

4. **Run Full Validation** (Before Completing Any Feature)
   ```bash
   npm run validate
   ```
   - This runs: typecheck + lint + test + build
   - **MUST PASS** before marking any todo as completed
   - **MUST PASS** before claiming "feature complete"

### Quality Gate Workflow

```typescript
// MANDATORY WORKFLOW FOR EVERY CODE CHANGE

1. Write/modify code
2. Run `npm run typecheck` → Fix any errors
3. Run `npm run lint` → Fix any errors
4. Every 3-5 changes: Run `npm run test`
5. Before completing feature: Run `npm run validate`
6. Only then respond to user with results

// ❌ NEVER DO THIS:
- Skip typecheck/lint and send response
- Assume code works without checking
- Respond first, check later
- Ignore quality gate failures

// ✅ ALWAYS DO THIS:
- Check quality BEFORE responding
- Fix all errors BEFORE responding
- Validate frequently during development
- Report quality status in response
```

### Quality Status Template

When responding about code changes, always include:

```markdown
## Quality Status ✅
- TypeScript: ✅ Zero errors
- ESLint: ✅ Zero errors/warnings
- Tests: ✅ All passing (123/123)
- Coverage: ✅ 87.5% (target: 85%)
```

### Landing Page Development (Special Rules)

When working on landing pages (`docs/` directory):

1. **Browser Cache Issues:**
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   - Clear browser cache
   - Check browser console for JavaScript errors
   - Verify dev server is running and showing latest changes

2. **JavaScript Validation:**
   - Check browser console for errors
   - Verify all scripts are loading
   - Test all interactive features manually
   - Confirm animations are working

3. **Before Claiming "Complete":**
   - View page in browser
   - Test all interactions
   - Verify responsive design on different screen sizes
   - Check browser console for errors
   - Test all links work

### When to Run Each Check

| Check | When | Frequency |
|-------|------|-----------|
| `npm run typecheck` | After any TypeScript modification | Every code change |
| `npm run lint` | After any code modification | Every code change |
| `npm run test` | After completing logical unit of work | Every 3-5 changes |
| `npm run test:coverage` | Before marking feature complete | End of feature |
| `npm run validate` | Before completing ANY feature | Feature completion |
| `npm run build` | Before publishing/release | Pre-release only |

### Enforcement

**This is NOT optional. This is MANDATORY.**

If you send a response with:
- TypeScript errors → User will reject
- Lint errors → User will reject
- Failing tests → User will reject
- Low coverage → User will reject

**Save time: Check quality BEFORE responding, not after user rejection.**

---

## 📋 CRITICAL: DOCUMENTATION DISCIPLINE

### THE THREE-FILE RULE (MANDATORY)

**⚠️ AI AGENTS: READ THIS CAREFULLY ⚠️**

**ONLY 3 types of documentation files are allowed in this repository:**

1. **`README.md`** - For USERS (installation, API reference, usage examples, migration guide)
2. **`CONTRIBUTING.md`** - For DEVELOPERS (development workflow, testing, quality standards)
3. **`PRPs/`** - For PLANNING (requirements, implementation breakdown, progress tracking)

**EXCEPTIONS (allowed by standard conventions):**
- `SECURITY.md` - Vulnerability reporting (security standard)
- `CODE_OF_CONDUCT.md` - Community guidelines (open source standard)
- `CHANGELOG.md` - Version history (release standard)
- `LICENSE` - Legal terms (required)
- `AGENTS.md` (this file) - AI development guidelines

**❌ ABSOLUTELY FORBIDDEN - DELETE ON SIGHT:**
- `API.md` - API docs belong in README.md
- `MIGRATION.md` - Migration guide belongs in README.md
- `ARCHITECTURE.md` - Architecture belongs in PRPs/ or CONTRIBUTING.md
- `PLAN.md` - Planning belongs in PRPs/
- `DESIGN.md` - Design belongs in PRPs/
- `ROADMAP.md` - Roadmap belongs in README.md
- `EXAMPLES.md` - Examples belong in README.md or examples/ folder
- `docs/` directory - Not allowed, use README.md
- `guides/` directory - Not allowed, use README.md
- Any other `.md` file not explicitly listed above

**Content Placement Rules:**

| Content Type | Belongs In | Examples |
|--------------|-----------|----------|
| API reference | README.md | Class methods, interfaces, types |
| Usage examples | README.md | Code snippets, tutorials |
| Migration guides | README.md | Upgrade instructions |
| Installation | README.md | npm install, setup |
| Development setup | CONTRIBUTING.md | Fork, clone, build |
| Testing guidelines | CONTRIBUTING.md | Test structure, coverage |
| PR workflow | CONTRIBUTING.md | Branch naming, commits |
| Release process | CONTRIBUTING.md | Versioning, publishing |
| Feature planning | PRPs/{feature}.md | DoR, DoD, implementation |
| Architecture decisions | PRPs/{feature}.md | Technical design |
| Progress tracking | PRPs/{feature}.md | Timeline, blockers |

**Why this rule exists:**
- Single source of truth → Users know: README.md for usage, CONTRIBUTING.md for development
- Prevents documentation drift → Update README/CONTRIBUTING or it doesn't exist
- Forces clarity → Can't hide ambiguity in scattered docs
- Search efficiency → Ctrl+F in 2 files instead of 20

**IF IT'S NOT IN README.md, CONTRIBUTING.md, OR PRPs/, IT DOESN'T EXIST.**

### Enforcement

**Before creating ANY new .md file, ask yourself:**
1. Is this for users? → Add to README.md
2. Is this for contributors? → Add to CONTRIBUTING.md
3. Is this for planning/tracking? → Create/update PRP in PRPs/
4. If none of the above → **DON'T CREATE IT**

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

## 🔔 Agent Signals
{Agents leave signals here to communicate status, blockers, discoveries}
{Coordinator agent scans this section first to prioritize work}

### [Date] - [Agent Role] - Signal: [SIGNAL_NAME]
**Comment:** [Brief description]
**Context:** [Links, details, recommendations]
**Action Required:** [What needs to happen next]

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

## 🎯 ORCHESTRATOR ROLE (Meta-Agent)

### Definition

The **ORCHESTRATOR** is a special meta-agent with unique authority:
- **ONLY agent that can edit AGENTS.md** - All other agents read-only
- **Scans ALL PRPs simultaneously** - Cross-PRP analysis and pattern recognition
- **Builds priority queue** - Sorts signals by strength (10/10 = highest)
- **Creates incident reports** - Escalates ATTENTION (10/10) signals to admins
- **Documents learnings** - Captures what works, what doesn't, and why

### Responsibilities

1. **Signal Classification**
   - Extract all signals from all PRPs
   - Sort by strength (ATTENTION=10 ... COMPLETE=1)
   - Identify cross-PRP conflicts
   - Build priority queue for agent assignment

2. **Pattern Recognition**
   - Identify recurring issues
   - Detect workflow inefficiencies
   - Document successful patterns
   - Flag anti-patterns

3. **Admin Communication**
   - Create incident reports for ATTENTION/BLOCKED/BROKEN signals
   - Ask clarifying questions about ambiguous requirements
   - Report agent efficiency metrics
   - Request process improvements

4. **Quality Oversight**
   - Validate DoR/DoD completeness
   - Monitor signal usage correctness
   - Track signal-to-resolution times
   - Ensure quality gates enforced

### ORCHESTRATOR Signal Catalog (Comprehensive)

| Signal | Strength | Description | Role | Reason | Expected Outcome |
|--------|----------|-------------|------|--------|------------------|
| ATTENTION | 10/10 | Critical blocker, production failure | Any | Human intervention required | Admin reviews within 1hr, makes decision |
| BROKEN | 9/10 | Critical functionality not working | QC | POST-RELEASE found major bugs | Immediate hotfix, incident report |
| BLOCKED | 9/10 | Cannot proceed without dependency | Any | Missing requirement, external blocker | Resolved in 24hrs or reprioritized |
| DEGRADED | 7/10 | Performance degradation | SRE | POST-RELEASE slow responses | Performance analysis, optimization PR |
| WORRIED | 6/10 | Technical concern or risk | developer | May introduce tech debt | Team discussion, evaluate alternatives |
| **CONFUSED** | **5/10** | **Expectations don't match reality** | **Any** | **Wrong target, misaligned understanding** | **Stop work, clarify with user, realign** |
| UNCERTAIN | 5/10 | Need clarification | system-analyst | Ambiguous/contradictory requirements | Clarification meeting, decision documented |
| EXCITED | 4/10 | Positive discovery | developer | Found better approach | New approach documented, considered |
| CONFIDENT | 3/10 | Work completed with certainty | developer, QC, SRE | Tests passing, quality validated | Work merged, PRP advances |
| READY | 2/10 | DoR satisfied | system-analyst | Research done, dependencies available | Developer begins implementation |
| DEPLOYED | 2/10 | Deployed to production | SRE | POST-RELEASE health checks passed | Move to VALIDATED |
| VALIDATED | 2/10 | Production quality validated | QC | POST-RELEASE QC passed | PRP complete, announce release |
| COMPLETE | 1/10 | All DoD checked | coordinator | Everything validated/documented | PRP archived |

### Cross-PRP Patterns (Learned from History)

#### ✅ Pattern: Signal-Driven Success
**Observed**: Z-up Coordinate System PRP
**Flow**: WORRIED (6) → CONFIDENT (3) → COMPLETE (1)
**Outcome**: Feature shipped in 1 day, zero issues
**Lesson**: This workflow is optimal - use for all PRPs

#### ⚠️ Pattern: Implementation-Documentation Mismatch
**Observed**: Landing Page Comprehensive Redesign PRP
**Issue**: PRP describes React/Vite, actual code is vanilla HTML/JS
**Signal**: UNCERTAIN (5/10)
**Lesson**: Always audit current code before writing PRPs

#### ⚠️ Pattern: FALSE READY Signals
**Observed**: Landing Page Phase 2 PRP
**Issue**: READY signal but DoR items not satisfied (missing design mockups, 3D model, links)
**Impact**: Starting work with incomplete DoR causes mid-project blockers
**Lesson**: ORCHESTRATOR must validate DoR before accepting READY signals

#### ✅ Pattern: Quality Gates Enforcement
**Observed**: 100% of commits in conversation history
**Process**: code → `npm run validate` → zero errors → commit → signal
**Outcome**: No commits with failing tests or type errors
**Lesson**: Continue this pattern religiously

#### ⚠️ Pattern: Directory Confusion / Wrong Target
**Observed**: Landing Page Enhancement (2025-10-28)
**Issue**: Two landing pages existed (`docs/` vs `landing-page/`), agents worked on wrong one for 3 hours
**Signal**: CONFUSED (5/10) → RESOLVED
**Flow**: User said PANIC → ORCHESTRATOR investigated → Found no regression → User clarified correct directory → Removed wrong directory
**Root Cause**:
- PRP didn't specify target directory (ambiguous)
- ORCHESTRATOR made autonomous decision without asking
- Multiple valid targets existed (docs/ and landing-page/)
**Resolution**:
1. User clarified: `landing-page/` is THE landing page (React/Vite)
2. Removed `docs/` directory entirely to eliminate confusion
3. Preserved work in git history (commits e1fc950-49271f4)
4. Created CONFUSED signal for this pattern
**Lesson**:
- **ALWAYS ask which directory** when multiple options exist
- **List ALL potential targets** and confirm with user before starting
- **Audit project structure** (ls -la, find directories) before autonomous decisions
- **Use CONFUSED signal** when expectations don't match reality
**Prevention**:
- In PRP DoR: "Target directory explicitly specified"
- system-analyst: Always list all directories in "Current State Audit"
- ORCHESTRATOR: If >1 valid target, STOP and ask user

### ✅ RESOLVED INCIDENT (2025-10-28) - Directory Confusion

**Severity**: MEDIUM (3 hours wasted work)
**Signal**: CONFUSED (5/10) → RESOLVED
**Affected PRPs**: Landing Page Comprehensive Redesign, Landing Page Phase 2

**Issue**: Agents worked on wrong landing page (`docs/` vanilla HTML) for 3 hours when user's actual landing page was `landing-page/` (React/Vite).

**Impact**:
- ❌ 3 hours of development on wrong target
- ✅ Work preserved in git history (commits e1fc950-49271f4)
- ✅ Learning captured as new pattern

**Root Cause**:
- PRP ambiguity about target directory
- Two landing pages existed (docs/ and landing-page/)
- ORCHESTRATOR made autonomous decision without confirming target

**Resolution**:
1. ✅ User clarified: `landing-page/` is THE landing page
2. ✅ Removed `docs/` directory entirely (git rm -r docs/)
3. ✅ Created CONFUSED signal for this pattern
4. ✅ Documented prevention strategies

**Prevention Added**:
- New pattern: "Directory Confusion / Wrong Target"
- New signal: CONFUSED (5/10)
- DoR requirement: "Target directory explicitly specified"
- ORCHESTRATOR rule: If >1 valid target, STOP and ask user

**Status**: ✅ **RESOLVED** - Ready to work on correct `landing-page/` directory

---

## 🎬 ORCHESTRATOR AUTONOMOUS EXECUTION

### Critical Rule: Don't Wait for Admin - EXECUTE

**After ORCHESTRATOR makes recommendation, DO NOT wait for admin approval. Execute immediately using ORCHESTRATOR's best judgment.**

### Execution Workflow

```typescript
// ORCHESTRATOR Decision Tree
if (currentBranch === 'main') {
  // 1. Create feature branch from main
  git checkout -b feature/{prp-name}

  // 2. Include "ghost files" (uncommitted changes)
  git add .  // Include all current working directory changes

  // 3. Leave signal in PRP about orphan files
  addSignalToPRP({
    signal: 'EXCITED',
    comment: 'Ghost files detected and included in feature branch',
    context: 'Uncommitted changes from main branch preserved',
    files: listUncommittedFiles(),
    prpLink: 'Link to related PRP'
  });
} else {
  // Already on feature branch - execute in place
  executeAllPRPsInBranch();
}
```

### Ghost Files Protocol

**"Ghost Files"**: Uncommitted changes in working directory when starting new work

**Handling Ghost Files**:
1. **Always preserve them** - `git add .` before creating branch
2. **Document in PRP** - Leave EXCITED (4/10) signal with file list
3. **Link to PRP** - Add reference to PRP that ghost files relate to
4. **Commit with context** - Explain why these files were orphaned

**Example Signal**:
```markdown
### 2025-10-28 - ORCHESTRATOR - Signal: EXCITED (4/10)

**Comment:** 👻 Ghost files detected and preserved! Found uncommitted changes in main branch - included them in feature branch to avoid losing work.

**Ghost Files**:
- `docs/coordinate-demo.js` (484 lines) - Interactive coordinate system demo
- `landing-page/src/components/FloatingBubbles.tsx` (modified) - Physics updates

**Context**: These files were created during previous work session but not committed to main. Rather than lose this work, ORCHESTRATOR preserved them in this feature branch.

**Related PRP**: PRPs/landing-page-comprehensive-redesign.md (these files support landing page requirements)

**Action**: Developer should review ghost files, validate they're needed, and commit or discard as appropriate.
```

### Autonomous Decision-Making Rules

**ORCHESTRATOR makes final decisions when**:
1. **Technical clarity exists** - One approach is clearly superior
2. **Risk is acceptable** - Wrong choice won't cause production issues
3. **User intent is clear** - Despite ambiguity, direction is evident
4. **Time is critical** - Waiting would block other work

**ORCHESTRATOR escalates to admin when**:
1. **Business decision required** - Cost/benefit tradeoff needs input
2. **Multiple valid approaches** - No technical winner, preference needed
3. **High risk** - Wrong choice could cause production failure
4. **Strategic direction** - Affects long-term architecture or roadmap

### Execution After Recommendation

**Standard Flow**:
1. ORCHESTRATOR analyzes situation
2. ORCHESTRATOR makes recommendation with reasoning
3. **ORCHESTRATOR IMMEDIATELY EXECUTES** (doesn't wait)
4. Leaves signal in PRP documenting decision and rationale
5. Admin can review/override later if needed

**Example**:
```markdown
### ORCHESTRATOR Decision Log

**Situation**: Landing page architecture ambiguity (React vs HTML)

**Recommendation**: Option A - Enhance existing HTML landing page

**Reasoning**:
- Lower risk (existing code is functional)
- Faster delivery (weeks vs months)
- User asked for "implementation" not "rewrite"
- Can always migrate to React later if needed

**Decision**: PROCEEDING with Option A (HTML enhancement)

**Execution Started**: 2025-10-28 14:30 UTC
**Branch**: feature/landing-page-comprehensive
**PRPs Executed**: landing-page-comprehensive-redesign.md

**Admin Override**: If this decision was wrong, admin can:
1. Leave ATTENTION (10/10) signal in PRP
2. ORCHESTRATOR will halt work and reassess
3. New branch created for correct approach
```

### Important Lessons from Conversation History

#### Lesson 1: PRP Architecture Mismatch is Common
**Observed**: Multiple times in conversation history
**Pattern**: PRPs describe ideal future state, code shows current reality
**Solution**: ORCHESTRATOR always audits actual code before execution
**Implementation**: Add "Current State Audit" step to all PRP workflows

#### Lesson 2: Quality Gates Prevent 90% of Issues
**Observed**: 100% of commits in history passed quality gates
**Pattern**: `npm run validate` → zero errors → commit → no issues
**Solution**: NEVER skip quality gates, even for "quick fixes"
**Implementation**: Make quality gates blocking in all workflows

#### Lesson 3: Signal-Driven Coordination is Optimal
**Observed**: Z-up PRP shipped in 1 day with zero issues
**Pattern**: WORRIED → CONFIDENT → COMPLETE (perfect signal flow)
**Solution**: Use this pattern for ALL PRPs
**Implementation**: Agents must leave signals after EVERY major action

#### Lesson 4: FALSE READY Signals Cause Mid-Project Failure
**Observed**: Phase 2 PRP marked READY with 25% DoR completion
**Pattern**: Optimistic signal → start work → discover missing dependencies → project stalls
**Solution**: ORCHESTRATOR validates DoR before accepting READY
**Implementation**: Automated DoR checklist validation

#### Lesson 5: Incremental Beats Big Bang
**Observed**: User requested 6-8 week landing page rewrite
**Better Approach**: Small, shippable increments
**Solution**: Break large PRPs into weekly milestones
**Implementation**: ORCHESTRATOR splits PRPs >2 weeks into phases

#### Lesson 6: Documentation Drift is Real
**Observed**: AGENTS.md had outdated workflow descriptions
**Pattern**: Process evolves but docs lag behind
**Solution**: ORCHESTRATOR updates AGENTS.md after every process change
**Implementation**: Make ORCHESTRATOR sole editor of AGENTS.md

#### Lesson 7: Ghost Files Contain Valuable Work
**Observed**: Uncommitted coordinate-demo.js (484 lines) almost lost
**Pattern**: Work session ends without commit → files orphaned
**Solution**: Preserve ghost files in feature branches
**Implementation**: Always `git add .` before branch creation

#### Lesson 8: Admin Decisions Block Work
**Observed**: Landing page work blocked waiting for architecture decision
**Better Approach**: ORCHESTRATOR decides and executes autonomously
**Solution**: Escalate only business/strategic decisions
**Implementation**: Technical decisions made by ORCHESTRATOR immediately

#### Lesson 9: Parallel Work is Faster
**Observed**: User requested "simultaneously" work on multiple PRPs
**Pattern**: Serial execution wastes time
**Solution**: Launch agents in parallel when dependencies allow
**Implementation**: Single message with multiple Task() calls

#### Lesson 10: POST-RELEASE Validation is Critical
**Observed**: New POST-RELEASE workflow added (SRE + QC agents)
**Pattern**: Merging ≠ production ready
**Solution**: Always run POST-RELEASE checks before npm publish
**Implementation**: Make POST-RELEASE mandatory for all releases

---

## 🚀 POST-RELEASE WORKFLOW

### Overview

After merging to main and before/after publishing a release, execute the POST-RELEASE checklist with specialized agents to ensure production readiness and quality.

### POST-RELEASE Agents

#### 1. **SRE (Site Reliability Engineer) Agent**

**Responsibilities:**
- Validate deployment health
- Check bundle size and performance
- Verify CDN/npm package availability
- Monitor error rates and metrics
- Validate documentation links
- Check GitHub Pages deployment

**Checklist:**
```markdown
## SRE Post-Release Checklist

### Deployment Validation
- [ ] npm package published and accessible
- [ ] GitHub Pages deployed successfully
- [ ] All documentation links working
- [ ] CDN links resolving correctly

### Performance Validation
- [ ] Bundle size within targets (<10KB minified)
- [ ] Landing page Lighthouse score >90
- [ ] No console errors in production
- [ ] All scripts loading correctly

### Monitoring
- [ ] No error spikes in npm downloads
- [ ] GitHub Actions workflows passing
- [ ] CI/CD pipeline healthy

### Documentation
- [ ] README.md links verified
- [ ] CHANGELOG.md updated
- [ ] GitHub release created with notes
```

**Signal to Leave:** CONFIDENT (3/10) if all checks pass, WORRIED (6/10) if issues found

---

#### 2. **QC (Quality Control) Agent**

**Responsibilities:**
- Validate user-facing quality
- Test installation process
- Verify API examples work
- Check cross-browser compatibility
- Validate mobile responsiveness
- Test all interactive features

**Checklist:**
```markdown
## QC Post-Release Checklist

### Installation Testing
- [ ] `npm install @dcversus/babylon-anyup` succeeds
- [ ] TypeScript types available
- [ ] No peer dependency warnings

### API Testing
- [ ] Example code from README works
- [ ] All exported types accessible
- [ ] Plugin initialization succeeds
- [ ] Coordinate transformations accurate

### Landing Page Testing
- [ ] All sections render correctly
- [ ] Interactive demos functional
- [ ] Mobile responsive (480px, 768px, 1024px)
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] All links clickable and working
- [ ] Copy buttons functional

### User Experience
- [ ] No visual glitches
- [ ] Animations smooth (60fps)
- [ ] Loading times acceptable
- [ ] Error messages clear
```

**Signal to Leave:** CONFIDENT (3/10) if quality excellent, UNCERTAIN (5/10) if minor issues, WORRIED (6/10) if major issues

---

### POST-RELEASE Workflow Execution

**When to Execute:**
- After merging feature branch to main
- Before publishing npm release
- After publishing (validation)

**How to Execute:**

```bash
# 1. Merge feature branch to main (squash commit)
git checkout main
git merge --squash feature/landing-page
git commit -m "feat: comprehensive landing page redesign"
git push origin main

# 2. Launch POST-RELEASE agents in parallel
# (Both agents work simultaneously)
```

**Agent Prompts:**

```typescript
// Launch SRE agent
Task({
  subagent_type: "general-purpose",
  description: "SRE: POST-RELEASE validation",
  prompt: `You are an SRE (Site Reliability Engineer) agent.

  Execute the POST-RELEASE SRE checklist for babylon-anyup after main branch merge.

  Check:
  1. Deployment health (GitHub Pages, npm if published)
  2. Bundle size and performance metrics
  3. Documentation link validity
  4. CI/CD pipeline status
  5. No console errors

  Leave a signal in the relevant PRP:
  - CONFIDENT (3/10) if all checks pass
  - WORRIED (6/10) if issues found

  Return: Summary of checks with pass/fail status`
});

// Launch QC agent
Task({
  subagent_type: "general-purpose",
  description: "QC: POST-RELEASE quality validation",
  prompt: `You are a QC (Quality Control) agent.

  Execute the POST-RELEASE QC checklist for babylon-anyup after main branch merge.

  Test:
  1. Installation process
  2. API examples from README
  3. Landing page functionality
  4. Cross-browser compatibility
  5. Mobile responsiveness
  6. All interactive features

  Leave a signal in the relevant PRP:
  - CONFIDENT (3/10) if quality excellent
  - UNCERTAIN (5/10) if minor issues
  - WORRIED (6/10) if major issues

  Return: Summary of tests with pass/fail status`
});
```

**After Both Agents Complete:**

1. **Review signals** - Coordinator scans PRP for SRE and QC signals
2. **Address issues** - If WORRIED signals, fix before publishing
3. **Publish release** - If both CONFIDENT, proceed with npm publish
4. **Update PRP status** - Mark as ✅ Complete with deployment date

---

### NEW SIGNALS for POST-RELEASE

| Signal | Strength | Agent | Meaning |
|--------|----------|-------|---------|
| **DEPLOYED** | 2/10 | SRE | Successfully deployed to production |
| **VALIDATED** | 2/10 | QC | Quality validation passed |
| **DEGRADED** | 7/10 | SRE | Performance degradation detected |
| **BROKEN** | 9/10 | QC | Critical functionality not working |

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
