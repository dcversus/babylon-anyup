# PRP: Z-Up Coordinate System Implementation

**Phase Name**: Core Z-Up Coordinate System Support
**Duration**: 2-3 weeks | **Status**: 🟡 In Progress
**Created**: 2025-10-27
**Context**: Extracted from Edge Craft PRP research

---

## 🎯 Phase Overview

### Problem Statement

**Babylon.js uses Y-up coordinates. Blizzard games use Z-up coordinates.**

This creates massive friction when building Edge Craft, an RTS game engine for porting Warcraft 3 and StarCraft 2 maps to the web:

**Current Pain Points:**
- Every terrain vertex needs manual Y↔Z transformation
- Every MDX model loads sideways (requires hardcoded -90° rotation)
- Camera controls feel inverted
- Physics and collisions misalign
- Hundreds of lines of scattered coordinate conversion code

**Real-World Impact:**
```typescript
// WITHOUT babylon-anyup (current Edge Craft code)
function loadW3Terrain(w3e: W3E) {
  for (let i = 0; i < w3e.vertices.length; i++) {
    // Manual coordinate transformation EVERYWHERE
    vertices[i * 3] = w3e.vertices[i].x;
    vertices[i * 3 + 1] = w3e.vertices[i].z;  // Y and Z swapped
    vertices[i * 3 + 2] = -w3e.vertices[i].y; // Y inverted
  }
  // ... 500 more lines of this ...
}

// WITH babylon-anyup (goal)
import { AnyUpPlugin } from '@dcversus/babylon-anyup';

const plugin = new AnyUpPlugin({ sourceSystem: 'z-up', targetSystem: 'y-up' });
plugin.initialize(scene);

// That's it. All transformations handled automatically.
```

### Strategic Value

**For Edge Craft:**
- Eliminates 500+ lines of coordinate transformation boilerplate
- Enables pixel-perfect mdx-m3-viewer compatibility
- Makes Babylon.js viable for RTS game engines

**For Community:**
- First open-source Z-up solution for Babylon.js
- Enables CAD/Blender workflow integration
- Reusable across any Z-up to Y-up conversion need

---

## 📊 Research Context: How Others Solve This

### Three.js: Global Default Up Vector

```javascript
THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1); // Z-up
```

**Pros:** Simple, zero overhead
**Cons:** Still requires geometry rotation, not truly "native"

### Unreal Engine: Native Z-Up at Architecture Level

```cpp
// Matrix internal representation changed to match Z-up
// All math operations silently convert to internal representation
// ZERO runtime cost - native support at data structure level
```

**Pros:** Perfect, native, zero overhead
**Cons:** Requires engine fork/modification

### Our Approach: Lightweight Transform Plugin

**Concept:** Automatic transformation at Babylon.js scene/mesh level

**Why Plugin (not Babylon.js PR):**
1. **Fast to ship** - No waiting for PR approval (can take months)
2. **Full control** - Can iterate based on Edge Craft needs
3. **No maintenance burden** - Unlike a fork, we just depend on Babylon.js peer dependency
4. **Community value** - Reusable npm package

**Performance Target:** <1% overhead (acceptable for production)

---

## 📋 Definition of Ready (DoR)

Prerequisites to START this phase:

- [x] Repository created and configured
- [x] Package name `@dcversus/babylon-anyup` reserved on npm
- [x] TypeScript strict mode configured
- [x] Testing framework (Vitest) set up
- [x] CI/CD pipeline configured
- [x] Research completed (Option B: Plugin approach)
- [x] Edge Craft context documented
- [ ] Babylon.js coordinate system math validated
- [ ] Test assets prepared (sample meshes, terrains)

---

## ✅ Definition of Done (DoD)

### Core Implementation

- [ ] `AnyUpPlugin` class with scene integration
- [ ] `ZUpToYUpStrategy` transformation strategy
- [ ] `YUpToZUpStrategy` inverse transformation
- [ ] `TransformStrategyFactory` for strategy selection
- [ ] Position transformation (Vector3)
- [ ] Rotation transformation (Quaternion)
- [ ] Scaling transformation (Vector3)
- [ ] Mesh transformation (position, rotation, scale)
- [ ] Camera transformation (optional, configurable)
- [ ] Automatic mesh conversion on scene.onNewMeshAdded
- [ ] Manual mesh conversion API
- [ ] Resource cleanup (dispose)

### Testing

- [ ] Unit tests for Vector3 transformations (>90% coverage)
  - Y-up → Z-up conversion
  - Z-up → Y-up conversion
  - Reversibility (Y→Z→Y = identity)
  - Edge cases (zero vectors, large numbers, negative values)
  - Vector length preservation
- [ ] Unit tests for Quaternion transformations
  - Rotation preservation
  - Normalization
  - Identity quaternion handling
- [ ] Unit tests for Matrix transformations
  - Translation, rotation, scaling
  - Determinant preservation
- [ ] Integration tests with Babylon.js
  - Plugin initialization
  - Mesh transformation
  - Camera transformation
  - Resource cleanup (no memory leaks)
- [ ] Performance benchmarks
  - Vector3: >100,000 ops/sec
  - Quaternion: >66,000 ops/sec
  - Matrix: >5,000 ops/sec
  - Plugin overhead: <1% scene init time

### Documentation

- [x] README with Edge Craft motivation
- [x] README badges (npm, build, coverage, bundle size)
- [x] "Who This Is For" section
- [x] Installation instructions
- [x] Quick start example
- [x] Performance benchmarks table
- [x] Browser support section
- [x] Troubleshooting section
- [x] Roadmap (v0.1.0, v0.2.0, v1.0.0)
- [x] Sponsors section
- [ ] API reference (JSDoc complete)
- [ ] API.md - Detailed API documentation
- [ ] Migration guide (manual transforms → babylon-anyup)
- [ ] Performance characteristics documented
- [ ] Edge cases and limitations documented
- [ ] CONTRIBUTING.md enhanced with detailed workflow
- [ ] SECURITY.md created
- [ ] CODE_OF_CONDUCT.md created
- [ ] CHANGELOG.md structure created
- [ ] GitHub Pages deployment configured
- [ ] Live demo examples prepared

### Release

- [ ] Published to npm as `@dcversus/babylon-anyup`
- [ ] GitHub release (v0.1.0)
- [ ] CI/CD pipeline passing
- [ ] Bundle size <10KB
- [ ] Zero TypeScript errors
- [ ] Zero ESLint errors

---

## 🏗️ Implementation Breakdown

### Phase 1: Core Transform Utilities (Week 1)

**Goal:** Pure transformation functions with comprehensive tests

**Files to Create:**
- `src/transforms/ZUpToYUpStrategy.ts`
- `src/transforms/YUpToZUpStrategy.ts`
- `src/transforms/TransformStrategyFactory.ts`
- `src/types/index.ts`
- `tests/transforms/*.test.ts`

**Transformation Math:**

```typescript
// Z-up to Y-up conversion
// Input: Z-up (x, y, z) where z=up
// Output: Y-up (x, y, z) where y=up
class ZUpToYUpStrategy {
  convertPosition(pos: Vector3): Vector3 {
    return new Vector3(
      pos.x,   // X unchanged
      pos.z,   // Y becomes Z (up direction)
      -pos.y   // Z becomes -Y (forward/backward flipped)
    );
  }

  convertRotation(quat: Quaternion): Quaternion {
    // Apply 90-degree X-axis rotation correction
    const correction = Quaternion.RotationAxis(Vector3.Right(), Math.PI / 2);
    return quat.multiply(correction);
  }

  convertScale(scale: Vector3): Vector3 {
    // Swap Y and Z for consistency
    return new Vector3(scale.x, scale.z, scale.y);
  }
}
```

**Tests:**
- 50+ test cases covering all edge cases
- Target: >90% coverage for transform modules

---

### Phase 2: Plugin System (Week 2)

**Goal:** Babylon.js scene integration with automatic/manual transformation

**Files to Create:**
- `src/plugin/AnyUpPlugin.ts`
- `tests/plugin/AnyUpPlugin.test.ts`

**Plugin Architecture:**

```typescript
export interface AnyUpPluginOptions {
  sourceSystem: 'y-up' | 'z-up';
  targetSystem: 'y-up' | 'z-up';
  autoConvert: boolean;  // Auto-convert meshes on scene add?
  preserveOriginal: boolean;  // Store original transforms in metadata?
}

export class AnyUpPlugin {
  private scene: Scene | null = null;
  private strategy: ITransformStrategy;
  private observers: Observer<any>[] = [];

  constructor(options: AnyUpPluginOptions) {
    this.strategy = TransformStrategyFactory.createStrategy(
      options.sourceSystem,
      options.targetSystem
    );
  }

  public initialize(scene: Scene): void {
    this.scene = scene;

    if (this.options.autoConvert) {
      // Auto-convert new meshes
      const observer = scene.onNewMeshAddedObservable.add((mesh) => {
        this.convertMesh(mesh);
      });
      this.observers.push(observer);
    }

    // Store plugin reference in scene metadata
    scene.metadata = scene.metadata || {};
    scene.metadata.anyUpPlugin = this;
  }

  public convertMesh(mesh: Mesh): void {
    if (mesh.metadata?.coordinateSystemConverted) {
      return; // Already converted
    }

    if (this.options.preserveOriginal) {
      // Store original transforms
      mesh.metadata = mesh.metadata || {};
      mesh.metadata.originalPosition = mesh.position.clone();
      mesh.metadata.originalRotation = mesh.rotationQuaternion?.clone();
      mesh.metadata.originalScaling = mesh.scaling.clone();
    }

    // Transform
    mesh.position = this.strategy.convertPosition(mesh.position);
    if (mesh.rotationQuaternion) {
      mesh.rotationQuaternion = this.strategy.convertRotation(mesh.rotationQuaternion);
    }
    mesh.scaling = this.strategy.convertScale(mesh.scaling);

    // Mark as converted
    mesh.metadata = mesh.metadata || {};
    mesh.metadata.coordinateSystemConverted = true;
  }

  public dispose(): void {
    if (this.scene) {
      // Remove observers
      this.observers.forEach(obs => {
        this.scene!.onNewMeshAddedObservable.remove(obs);
      });
      this.observers = [];

      // Clear metadata
      if (this.scene.metadata?.anyUpPlugin === this) {
        delete this.scene.metadata.anyUpPlugin;
      }

      this.scene = null;
    }
  }
}
```

**Tests:**
- Integration tests with NullEngine (headless Babylon)
- Memory leak tests (create/dispose 1000x)
- Multi-mesh scenes
- Camera transformation tests

---

### Phase 3: Documentation & Examples (Week 3)

**Goal:** Make library easy to use and understand

**Files to Create:**
- `examples/basic-usage.ts`
- `examples/warcraft3-terrain.ts`
- `examples/blender-import.ts`
- `SECURITY.md` - Security policy and vulnerability reporting
- `CODE_OF_CONDUCT.md` - Community guidelines (Contributor Covenant)
- `CHANGELOG.md` - Version history structure
- `API.md` - Comprehensive API reference documentation
- `docs/index.html` - GitHub Pages demo page
- `.github/workflows/deploy-docs.yml` - Auto-deploy docs on release

**Example:**

```typescript
// examples/warcraft3-terrain.ts
import { Engine, Scene, MeshBuilder, NullEngine } from '@babylonjs/core';
import { AnyUpPlugin } from '@dcversus/babylon-anyup';

// Initialize Babylon.js
const engine = new NullEngine();
const scene = new Scene(engine);

// Initialize babylon-anyup for Z-up (Warcraft 3)
const plugin = new AnyUpPlugin({
  sourceSystem: 'z-up',
  targetSystem: 'y-up',
  autoConvert: true,
  preserveOriginal: true,
});

plugin.initialize(scene);

// Load Warcraft 3 terrain (Z-up data)
// Plugin automatically converts all meshes to Y-up
const terrain = loadWarcraft3Terrain('map.w3e');
scene.addMesh(terrain); // Automatically converted!

// Manually convert specific meshes
const cliff = loadWarcraft3Cliff('cliff.mdx');
plugin.convertMesh(cliff);
```

---

## 🧪 Testing & Validation

### Unit Test Coverage

**Transform Modules (>90% coverage):**
```bash
tests/transforms/ZUpToYUpStrategy.test.ts
tests/transforms/YUpToZUpStrategy.test.ts
tests/transforms/TransformStrategyFactory.test.ts
```

**Test Cases:**
- Position transformation (Y↔Z swap)
- Rotation transformation (quaternion correction)
- Scaling transformation (Y↔Z swap)
- Reversibility (transform then inverse = identity)
- Edge cases:
  - Zero vectors
  - Identity quaternions
  - Very large coordinates (1e6)
  - Very small coordinates (1e-6)
  - Negative coordinates
- Property preservation:
  - Vector length preservation
  - Quaternion normalization
  - Matrix determinant sign

### Integration Tests

**Plugin Integration (with Babylon.js):**
```bash
tests/plugin/AnyUpPlugin.test.ts
```

**Test Scenarios:**
- Plugin initialization
- Auto-convert mode (onNewMeshAdded)
- Manual conversion mode
- Preserve original transforms
- Multiple meshes in scene
- Camera transformation
- Resource cleanup (dispose)
- Error handling (null mesh, disposed scene)

### Performance Benchmarks

**Targets:**
- Vector3 transform: >100,000 ops/sec
- Quaternion transform: >66,000 ops/sec
- Matrix transform: >5,000 ops/sec
- Plugin initialization: <10ms
- Mesh transformation: <1ms per mesh

**Benchmark Command:**
```bash
npm run test -- --run --testNamePattern="Performance"
```

---

## 📊 Success Metrics

**Technical Metrics:**
- Test coverage: >85% (lines, branches, functions, statements)
- Performance overhead: <1% vs manual transforms
- Memory overhead: <5% vs baseline
- Bundle size: <10KB minified
- Zero TypeScript errors (strict mode)
- Zero ESLint errors

**Edge Craft Integration Metrics:**
- Eliminates 500+ lines of manual transformation code
- Terrain rendering: pixel-perfect match with mdx-m3-viewer
- Model loading: no hardcoded rotations needed
- Camera controls: intuitive without inversions

**Community Metrics:**
- npm downloads: >50/month (first month)
- GitHub stars: >20 stars (first month)
- Issues resolved: <3 days average
- Documentation clarity: No "how do I use this?" issues

---

## 🗓️ Implementation Timeline

### Week 1: Core Transforms
- **Day 1-2**: Implement ZUpToYUpStrategy (Vector3, Quaternion, Matrix)
- **Day 3-4**: Implement YUpToZUpStrategy (inverse transforms)
- **Day 5**: Write comprehensive unit tests (50+ cases)

### Week 2: Plugin System
- **Day 1-2**: Implement AnyUpPlugin (initialization, auto-convert)
- **Day 3-4**: Integration tests with Babylon.js (NullEngine)
- **Day 5**: Performance benchmarks and optimization

### Week 3: Documentation & Release
- **Day 1-2**: Write documentation (README, API docs, examples)
- **Day 3**: Performance profiling and final optimizations
- **Day 4**: Final QA, bundle size optimization
- **Day 5**: Publish to npm (v0.1.0), GitHub release

---

## 📈 Phase Exit Criteria

**Checklist to CLOSE this phase:**

- [ ] All DoD items checked
- [ ] All quality gates green on CI/CD
- [ ] Test coverage >85%
- [ ] Performance benchmarks pass
- [ ] Bundle size <10KB
- [ ] Package published to npm
- [ ] GitHub release created (v0.1.0)
- [ ] Edge Craft integration tested
- [ ] No P0/P1 bugs open
- [ ] Documentation complete and reviewed

---

## 🚧 Current Blockers

None (Phase in progress)

---

## 📝 Progress Tracking

| Date       | Agent          | Activity                                  | Status      |
|------------|----------------|-------------------------------------------|-------------|
| 2025-10-27 | system-analyst | Created PRP from Edge Craft research      | ✅ Complete |
| 2025-10-27 | developer      | Set up repo structure and CI/CD          | ✅ Complete |
| 2025-10-27 | aqa-engineer   | Defined testing strategy                  | ✅ Complete |
| 2025-10-27 | developer      | Implement core transforms                 | 🟡 In Progress |
| 2025-10-27 | developer      | Enhanced README to production standards   | ✅ Complete |
| 2025-10-27 | developer      | Enhanced CONTRIBUTING.md with detailed workflow | ✅ Complete |
| 2025-10-27 | developer      | Created documentation structure (SECURITY, CODE_OF_CONDUCT, CHANGELOG, API) | ✅ Complete |
| TBD        | aqa-engineer   | Write unit tests                          | 📋 Planned  |
| TBD        | developer      | Implement plugin system                   | 📋 Planned  |
| TBD        | aqa-engineer   | Integration tests                         | 📋 Planned  |
| TBD        | developer      | Create GitHub Pages demo                  | 📋 Planned  |
| TBD        | developer      | Write API examples                        | 📋 Planned  |

---

## 🔗 Related Materials

### Research & References

- **Original Edge Craft PRP**: `/Users/dcversus/conductor/edgecraft/.conductor/lahore/PRPs/babylonjs-native-zup-coordinate-system.md`
- **Three.js Implementation**: https://github.com/mrdoob/three.js/blob/dev/src/core/Object3D.js
- **Unreal Engine Coordinate System Docs**: https://dev.epicgames.com/documentation/coordinate-system-and-spaces
- **Babylon.js Matrix Source**: https://github.com/BabylonJS/Babylon.js/blob/master/packages/dev/core/src/Meshes/transformNode.ts
- **Babylon.js Forum Discussions**:
  - https://forum.babylonjs.com/t/change-standard-xyz-coordinate-system-to-xzy-like-blender-etc/43240
  - https://forum.babylonjs.com/t/changing-the-coordinate-system-so-that-z-is-the-up-vector/43290

### Dependencies

- `@babylonjs/core` (peer dependency ^7.0.0)
- Vitest (testing)
- TypeScript (build)
- tsup (bundling)

### Future Enhancements (Out of Scope for v0.1.0)

- Support for X-up coordinate systems
- Handedness conversion (left-handed ↔ right-handed)
- Automatic UV coordinate adjustments
- Animation retargeting
- Vertex-level transformation (for pre-import conversion)
- Integration with glTF/OBJ loaders

---

*This PRP consolidates research from Edge Craft development and defines the babylon-anyup library implementation strategy.*
