# babylon-anyup - Architecture Overview

## Repository Structure

```
babylon-anyup/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── config.yml
│   ├── workflows/
│   │   ├── ci.yml              # PR quality checks (lint, test, build)
│   │   ├── release.yml         # npm publishing on tags
│   │   └── quality-gates.yml   # Enforce standards (coverage, file size)
│   ├── pull_request_template.md
│   └── ARCHITECTURE_OVERVIEW.md (this file)
│
├── src/
│   ├── plugin/
│   │   └── AnyUpPlugin.ts      # Main plugin implementation
│   ├── transforms/
│   │   ├── ZUpToYUpStrategy.ts
│   │   ├── YUpToZUpStrategy.ts
│   │   └── TransformStrategyFactory.ts
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces & types
│   └── index.ts                # Public API exports
│
├── tests/
│   ├── TransformStrategyFactory.test.ts
│   └── ZUpToYUpStrategy.test.ts
│
├── examples/
│   └── basic-usage.ts          # Usage example
│
├── PRPs/
│   └── bootstrap-library-infrastructure.md
│
├── Configuration Files
│   ├── package.json            # Dependencies, scripts, metadata
│   ├── tsconfig.json           # TypeScript strict configuration
│   ├── tsup.config.ts          # Build configuration (CJS + ESM)
│   ├── vitest.config.ts        # Test configuration
│   ├── .eslintrc.json          # ESLint rules
│   ├── .gitignore              # Git ignore patterns
│   └── .npmignore              # npm publish ignore patterns
│
└── Documentation
    ├── README.md               # Project overview, installation, usage
    ├── CLAUDE.md               # AI development guidelines
    ├── CONTRIBUTING.md         # Development workflow
    └── LICENSE                 # MIT License
```

## Design Patterns

### 1. Strategy Pattern

**Problem**: Different coordinate systems require different transformation logic.

**Solution**: `ITransformStrategy` interface with concrete implementations:
- `ZUpToYUpStrategy` - Converts Z-up to Y-up
- `YUpToZUpStrategy` - Converts Y-up to Z-up
- `TransformStrategyFactory` - Creates appropriate strategy

### 2. Plugin Pattern

**Problem**: Need to integrate with Babylon.js scene lifecycle.

**Solution**: `AnyUpPlugin` implements `ICoordinateSystemPlugin`:
- `initialize(scene)` - Setup plugin with scene
- `convertMesh(mesh)` - Transform individual meshes
- `convertTransformNode(node)` - Transform nodes
- `dispose()` - Clean up resources

### 3. Factory Pattern

**Problem**: Strategy selection based on coordinate systems.

**Solution**: `TransformStrategyFactory.createStrategy(source, target)`:
- Validates input combinations
- Returns appropriate strategy instance
- Throws errors for invalid combinations

## Core Concepts

### Coordinate System Conversion

**Y-up (Babylon.js default):**
- Y-axis points up
- Right-handed coordinate system
- Most web 3D libraries use this

**Z-up (Blender, 3DS Max):**
- Z-axis points up
- Right-handed coordinate system
- Many DCC tools use this

**Conversion Math:**

```
Z-up → Y-up:
  position: (x, y, z) → (x, z, -y)
  rotation: Apply correction quaternion (-90° around X-axis)
  scaling: (x, y, z) → (x, z, y)

Y-up → Z-up:
  position: (x, y, z) → (x, -z, y)
  rotation: Apply correction quaternion (+90° around X-axis)
  scaling: (x, y, z) → (x, z, y)
```

## Public API

### Exports

```typescript
// Main plugin
export { AnyUpPlugin } from './plugin/AnyUpPlugin';

// Transform strategies
export { ZUpToYUpStrategy } from './transforms/ZUpToYUpStrategy';
export { YUpToZUpStrategy } from './transforms/YUpToZUpStrategy';
export { TransformStrategyFactory } from './transforms/TransformStrategyFactory';

// Type definitions
export type {
  CoordinateSystem,
  AnyUpPluginOptions,
  TransformResult,
  ConversionContext,
  ITransformStrategy,
  ICoordinateSystemPlugin,
} from './types';
```

### Usage Pattern

```typescript
import { AnyUpPlugin } from '@dcversus/babylon-anyup';

// Create plugin
const plugin = new AnyUpPlugin({
  sourceSystem: 'z-up',
  targetSystem: 'y-up',
  autoConvert: true,        // Auto-convert all scene objects
  preserveOriginal: true,   // Store original transforms in metadata
});

// Initialize with scene
plugin.initialize(scene);

// Manual conversion (if autoConvert: false)
plugin.convertMesh(myMesh);
```

## Build Pipeline

### Development Flow

```
1. Write TypeScript code in src/
2. Write tests in tests/
3. Run npm run dev (watch mode)
4. Tests run automatically
5. Build output in dist/
```

### Build Output

**tsup produces:**
- `dist/index.js` - CommonJS bundle
- `dist/index.mjs` - ES Module bundle
- `dist/index.d.ts` - TypeScript declarations
- `dist/*.map` - Source maps

**Package exports:**
```json
{
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts"
}
```

## Quality Gates

### CI/CD Pipeline

**On Pull Request:**
1. **ci.yml** - Run tests, lint, typecheck on Node 18.x & 20.x
2. **quality-gates.yml** - Enforce:
   - Test coverage >80%
   - No TypeScript errors
   - No ESLint errors
   - No `any` types
   - No files >500 lines

**On Version Tag (vX.Y.Z):**
1. **release.yml** - Run validation, build, publish to npm

### Local Development

```bash
# Pre-commit checks
npm run typecheck  # 0 TypeScript errors
npm run lint       # 0 ESLint errors
npm run test       # All tests pass, >80% coverage
npm run validate   # All checks combined
```

## Testing Strategy

### Unit Tests (Vitest)

**Coverage targets:**
- Overall: 80% minimum
- Critical paths: 90%+
- All public APIs: 100%

**Test structure:**
```typescript
describe('ComponentName', () => {
  describe('happy paths', () => {
    it('should do expected thing', () => { });
  });

  describe('edge cases', () => {
    it('should handle boundary', () => { });
  });

  describe('error handling', () => {
    it('should throw on invalid input', () => { });
  });
});
```

## Development Workflow

### PRP-Centric Process

1. **Create PRP** in `PRPs/{feature-name}.md`
2. **Define DoR** (Definition of Ready - prerequisites)
3. **Define DoD** (Definition of Done - deliverables)
4. **Implement** following PRP breakdown
5. **Update DoD** as tasks complete
6. **Create PR** linked to PRP
7. **Pass quality gates**
8. **Merge** and mark PRP complete

### Code Style

**Enforced by ESLint:**
- No `any` types
- Explicit return types
- No unused variables
- Strict boolean expressions
- No console.log (warn level)

**Enforced by CI:**
- File size <500 lines
- Test coverage >80%
- TypeScript strict mode

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Language | TypeScript | ^5.3.3 |
| Build Tool | tsup | ^8.0.1 |
| Test Framework | Vitest | ^1.0.4 |
| Linting | ESLint | ^8.55.0 |
| Peer Dependency | @babylonjs/core | ^7.0.0 |

## Performance Considerations

### Bundle Size
- **Target**: <10KB minified
- **Strategy**: Zero dependencies, tree-shakeable exports

### Runtime Performance
- Transform operations are O(1)
- No memory allocations in hot paths
- Reuse Vector3/Quaternion instances where possible

### Memory Management
- Plugin stores minimal state
- Original transforms stored in mesh metadata (optional)
- Proper cleanup in `dispose()`

## Future Enhancements

Potential features for future PRPs:
- Support for other coordinate systems (X-up)
- Batch transformation optimization
- Custom rotation order support
- Integration with Babylon.js asset pipeline
- Performance benchmarks
- Visual debugging tools

## References

- [Babylon.js Documentation](https://doc.babylonjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vitest Documentation](https://vitest.dev/)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
