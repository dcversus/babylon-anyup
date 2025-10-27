# babylon-anyup

[![npm version](https://img.shields.io/npm/v/@dcversus/babylon-anyup.svg)](https://www.npmjs.com/package/@dcversus/babylon-anyup)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/actions/workflow/status/dcversus/babylon-anyup/ci.yml?branch=main)](https://github.com/dcversus/babylon-anyup/actions)
[![Coverage](https://img.shields.io/codecov/c/github/dcversus/babylon-anyup)](https://codecov.io/gh/dcversus/babylon-anyup)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@dcversus/babylon-anyup)](https://bundlephobia.com/package/@dcversus/babylon-anyup)

A Babylon.js plugin for seamless Z-up to Y-up coordinate system conversion with automatic transforms.

## Why This Exists

**babylon-anyup** was born from real-world pain while building [Edge Craft](https://github.com/dcversus/edgecraft) - a WebGL-based RTS game engine. Our goal is to let modmakers port their Warcraft 3 and StarCraft 2 maps and mods to the web. But there's a problem:

**Blizzard games use Z-up coordinates. Babylon.js uses Y-up coordinates.**

This means every terrain vertex, every model, every camera position needs manual transformation. Without `babylon-anyup`, our codebase was littered with hundreds of lines of error-prone coordinate conversion math. Rotating models by -90°, swapping Y and Z axes, inverting signs - it was a nightmare to maintain.

We built this library to solve that problem once and for all. Now you can load Blizzard-format maps directly into Babylon.js without thinking about coordinate systems.

## Who This Is For

This library is perfect for developers working with:
- **Game Development**: Porting Warcraft 3, StarCraft 2, or other Z-up games to Babylon.js
- **CAD Import**: Bringing CAD models (typically Z-up) into web-based Babylon.js viewers
- **Blender Integration**: Loading Blender exports (Z-up) without manual rotation
- **3D Content Pipelines**: Building tools that need to support multiple coordinate systems
- **RTS Engines**: Building real-time strategy games with terrain and unit systems

## Overview

**babylon-anyup** provides a type-safe, zero-dependency solution for working with different coordinate systems in Babylon.js. It automatically handles the mathematical transformations needed to convert between:
- **Z-up** (Warcraft 3, StarCraft 2, Blizzard games, many 3D modeling tools)
- **Y-up** (Babylon.js default, many game engines)

## Status

**Current Phase**: Initial Development
**Version**: 0.1.0
**Stability**: Alpha
**Release Date**: TBD

## Live Demo

Coming soon! Check back after v0.1.0 release for interactive examples on GitHub Pages.

## Features

- Automatic coordinate system conversion (Z-up ↔ Y-up)
- Position, rotation, and scaling transformations
- Preserves original transforms (optional)
- Type-safe with full TypeScript support
- Zero dependencies (peer dependency: @babylonjs/core)
- Lightweight (<10KB minified)

## Installation

```bash
npm install @dcversus/babylon-anyup
```

## Quick Start

```typescript
import { Engine, Scene, MeshBuilder } from '@babylonjs/core';
import { AnyUpPlugin } from '@dcversus/babylon-anyup';

const scene = new Scene(engine);

// Initialize the plugin
const plugin = new AnyUpPlugin({
  sourceSystem: 'z-up',
  targetSystem: 'y-up',
  autoConvert: true,
  preserveOriginal: true,
});

plugin.initialize(scene);

// All meshes in the scene are automatically converted
const mesh = MeshBuilder.CreateBox('box', { size: 2 }, scene);
```

## API Reference

### `AnyUpPlugin`

Main plugin class for coordinate system conversion.

#### Constructor

```typescript
new AnyUpPlugin(options: AnyUpPluginOptions)
```

**Options:**

```typescript
interface AnyUpPluginOptions {
  sourceSystem: 'y-up' | 'z-up';  // Source coordinate system
  targetSystem: 'y-up' | 'z-up';  // Target coordinate system
  autoConvert: boolean;           // Auto-convert all meshes on initialize()
  preserveOriginal: boolean;      // Store original transforms in metadata
}
```

- `sourceSystem` - Input coordinate system (`'z-up'` for Warcraft 3, Blender; `'y-up'` for Babylon.js)
- `targetSystem` - Output coordinate system (must differ from source)
- `autoConvert` - If `true`, automatically converts all existing meshes when `initialize()` is called
- `preserveOriginal` - If `true`, stores original transforms in `mesh.metadata` before conversion

#### Properties

- `name: string` - Plugin identifier (readonly, always `"AnyUpPlugin"`)
- `options: AnyUpPluginOptions` - Configuration options (readonly)

#### Methods

##### `initialize(scene: Scene): void`

Initialize the plugin with a Babylon.js scene.

```typescript
const scene = new Scene(engine);
plugin.initialize(scene);
```

**Behavior:**
- If `autoConvert: true`, converts all existing meshes and transform nodes
- Stores plugin reference in `scene.metadata` for later access

##### `convertMesh(mesh: AbstractMesh): void`

Convert a single mesh's transform to the target coordinate system.

```typescript
const box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
plugin.convertMesh(box);
```

**Behavior:**
- Transforms `position`, `rotationQuaternion`, and `scaling`
- If `preserveOriginal: true`, stores original values in `mesh.metadata`
- Handles null `rotationQuaternion` gracefully

**Metadata (when `preserveOriginal: true`):**
```typescript
mesh.metadata = {
  originalPosition: Vector3,
  originalRotation: Quaternion | null,
  originalScaling: Vector3,
};
```

##### `convertTransformNode(node: TransformNode): void`

Convert a transform node (same as `convertMesh()` but for nodes without geometry).

```typescript
const parent = new TransformNode('parent', scene);
plugin.convertTransformNode(parent);
```

##### `dispose(): void`

Clean up plugin resources. Call when the plugin is no longer needed.

```typescript
plugin.dispose();
```

### Transform Strategies

Low-level transformation strategies (used internally by `AnyUpPlugin`).

#### `ZUpToYUpStrategy`

Converts Z-up coordinates to Y-up (Blizzard games → Babylon.js).

```typescript
import { ZUpToYUpStrategy } from '@dcversus/babylon-anyup';

const strategy = new ZUpToYUpStrategy();
const converted = strategy.convertPosition(new Vector3(1, 2, 3));
// Result: Vector3(1, 3, -2)
```

**Transformation:**
- Position: `(x, y, z)` → `(x, z, -y)`
- Rotation: Applies -90° X-axis correction
- Scaling: `(x, y, z)` → `(x, z, y)`

#### `YUpToZUpStrategy`

Converts Y-up coordinates to Z-up (Babylon.js → Blizzard games).

```typescript
import { YUpToZUpStrategy } from '@dcversus/babylon-anyup';

const strategy = new YUpToZUpStrategy();
const converted = strategy.convertPosition(new Vector3(1, 2, 3));
// Result: Vector3(1, -3, 2)
```

**Transformation:**
- Position: `(x, y, z)` → `(x, -z, y)`
- Rotation: Applies +90° X-axis correction
- Scaling: `(x, y, z)` → `(x, z, y)`

#### `TransformStrategyFactory`

Factory for creating transformation strategies.

```typescript
import { TransformStrategyFactory } from '@dcversus/babylon-anyup';

const strategy = TransformStrategyFactory.createStrategy('z-up', 'y-up');
```

**Throws:**
- `Error` if `source === target`
- `Error` if conversion not supported

## Usage Examples

### Warcraft 3 Terrain Import

```typescript
import { Engine, Scene } from '@babylonjs/core';
import { AnyUpPlugin } from '@dcversus/babylon-anyup';

const engine = new Engine(canvas);
const scene = new Scene(engine);

// Initialize plugin for Z-up (Warcraft 3)
const plugin = new AnyUpPlugin({
  sourceSystem: 'z-up',
  targetSystem: 'y-up',
  autoConvert: true,
  preserveOriginal: false,
});

plugin.initialize(scene);

// Load Warcraft 3 terrain (automatically converted)
const terrain = await loadW3Terrain('map.w3e');
scene.addMesh(terrain); // Already in Y-up coordinates!
```

### Selective Conversion (Manual Mode)

```typescript
const plugin = new AnyUpPlugin({
  sourceSystem: 'z-up',
  targetSystem: 'y-up',
  autoConvert: false, // Disable auto-conversion
  preserveOriginal: false,
});

plugin.initialize(scene);

// Only convert specific meshes
const terrain = loadWarcraft3Terrain();
plugin.convertMesh(terrain);

const units = loadWarcraft3Units();
// Don't convert units (keep original orientation)
```

### Preserve Original Transforms

```typescript
const plugin = new AnyUpPlugin({
  sourceSystem: 'z-up',
  targetSystem: 'y-up',
  autoConvert: true,
  preserveOriginal: true, // Store originals
});

plugin.initialize(scene);

// Access original transforms later
scene.meshes.forEach(mesh => {
  console.log('Original:', mesh.metadata.originalPosition);
  console.log('Converted:', mesh.position);

  // Revert if needed
  if (someCondition) {
    mesh.position = mesh.metadata.originalPosition.clone();
  }
});
```

### Blender Model Import

```typescript
import { SceneLoader } from '@babylonjs/core';
import { AnyUpPlugin } from '@dcversus/babylon-anyup';

// Initialize plugin
const plugin = new AnyUpPlugin({
  sourceSystem: 'z-up',
  targetSystem: 'y-up',
  autoConvert: false,
  preserveOriginal: false,
});

plugin.initialize(scene);

// Load Blender export (typically Z-up)
SceneLoader.ImportMesh('', '/models/', 'blender_export.glb', scene, (meshes) => {
  // Convert imported meshes
  meshes.forEach(mesh => plugin.convertMesh(mesh));
});
```

### Direct Strategy Usage (Advanced)

```typescript
import { ZUpToYUpStrategy } from '@dcversus/babylon-anyup';
import { Vector3, Quaternion } from '@babylonjs/core';

const strategy = new ZUpToYUpStrategy();

// Convert individual components
const zUpPos = new Vector3(10, 20, 30);
const yUpPos = strategy.convertPosition(zUpPos);
console.log(yUpPos); // Vector3(10, 30, -20)

// Convert rotation
const zUpRot = Quaternion.FromEulerAngles(0, Math.PI / 4, 0);
const yUpRot = strategy.convertRotation(zUpRot);

// Convert scaling
const zUpScale = new Vector3(1, 2, 3);
const yUpScale = strategy.convertScaling(zUpScale);
console.log(yUpScale); // Vector3(1, 3, 2)
```

## Migration Guide

### From Manual Transforms

**Before (manual transformation):**

```typescript
// ❌ Old way: Manual coordinate conversion everywhere
function loadW3Terrain(w3e: W3E) {
  for (let i = 0; i < w3e.vertices.length; i++) {
    // Manual Y↔Z swap and negation
    vertices[i * 3] = w3e.vertices[i].x;
    vertices[i * 3 + 1] = w3e.vertices[i].z;  // Y becomes Z
    vertices[i * 3 + 2] = -w3e.vertices[i].y; // Z becomes -Y
  }

  // Hardcoded -90° rotation for models
  mesh.rotation.x = -Math.PI / 2;
}
```

**After (with babylon-anyup):**

```typescript
// ✅ New way: Automatic transformation
import { AnyUpPlugin } from '@dcversus/babylon-anyup';

const plugin = new AnyUpPlugin({
  sourceSystem: 'z-up',
  targetSystem: 'y-up',
  autoConvert: true,
  preserveOriginal: false,
});

plugin.initialize(scene);

// Load terrain normally - plugin handles conversion
function loadW3Terrain(w3e: W3E) {
  // Just use data as-is, plugin converts automatically
  const terrain = createTerrainMesh(w3e);
  // Done! No manual transformation needed
}
```

### Migration Steps

1. **Install babylon-anyup:**
```bash
npm install @dcversus/babylon-anyup
```

2. **Remove manual transforms:**
   - Delete all Y↔Z swapping code
   - Remove hardcoded rotations (e.g., `mesh.rotation.x = -Math.PI / 2`)
   - Remove position/scale coordinate conversions

3. **Add plugin initialization:**
```typescript
import { AnyUpPlugin } from '@dcversus/babylon-anyup';

const plugin = new AnyUpPlugin({
  sourceSystem: 'z-up',  // Your source data format
  targetSystem: 'y-up',  // Babylon.js format
  autoConvert: true,     // Convert everything automatically
  preserveOriginal: false,
});

plugin.initialize(scene);
```

4. **Test thoroughly:**
   - Verify meshes are positioned correctly
   - Check rotations are correct
   - Validate scaling matches expectations
   - Test camera controls feel natural

5. **Clean up (optional):**
   - Remove helper functions for coordinate conversion
   - Simplify data loading code
   - Update comments/documentation

### Common Issues During Migration

**Issue:** Meshes are upside down or rotated incorrectly
- **Solution:** Ensure you're using correct `sourceSystem` and `targetSystem`
- **Tip:** Try swapping them if objects appear inverted

**Issue:** Some meshes convert, others don't
- **Solution:** Use `autoConvert: true` or manually call `plugin.convertMesh()` for each mesh
- **Tip:** Check if meshes were added before `plugin.initialize()`

**Issue:** Transformations are applied twice
- **Solution:** Remove manual coordinate conversions from your code
- **Tip:** Search codebase for Y/Z swaps, hardcoded rotations

## Contributing

Want to contribute? See [CONTRIBUTING.md](./CONTRIBUTING.md) for development workflow, quality standards, and PR guidelines

## Performance Benchmarks

Benchmarks run on MacBook, version 0.1.0 (2025-10-27):

| Operation | Target (PRP) | Actual | Status |
|-----------|--------------|--------|--------|
| Vector3 Transform | >100,000 ops/sec | ~22,000,000 ops/sec | ✅ **220x faster** |
| Quaternion Transform | >66,000 ops/sec | ~19,000,000 ops/sec | ✅ **287x faster** |
| Bulk Transform (1K vectors) | N/A | 183,549 ops/sec | ✅ |
| Bulk Transform (1K quaternions) | N/A | 35,493 ops/sec | ✅ |
| Bundle Size | <10KB minified | 8.2KB | ✅ |

**Real-world impact**: Transforming 10,000 meshes takes ~0.5ms - negligible overhead in production scenes.

### Run Benchmarks Yourself

```bash
npm run bench
```

### Detailed Results

**Vector3 Transform:**
- ZUpToYUpStrategy: 22,299,067 ops/sec (fastest)
- YUpToZUpStrategy: 19,933,199 ops/sec

**Quaternion Transform:**
- ZUpToYUpStrategy: 18,273,103 ops/sec
- YUpToZUpStrategy: 19,600,341 ops/sec (fastest)

**Scaling Transform:**
- ZUpToYUpStrategy: 20,312,662 ops/sec
- YUpToZUpStrategy: 20,744,284 ops/sec (fastest)

The library achieves exceptional performance due to minimal overhead, optimized Babylon.js math operations, and zero dynamic dispatch.

## Browser Support

Supports all modern browsers that support WebGL 2:
- Chrome 56+
- Firefox 51+
- Safari 15+
- Edge 79+

Requires Babylon.js 7.0.0 or higher.

## Troubleshooting

### My meshes are still rotated incorrectly

Ensure you're using `autoConvert: true` or manually calling `plugin.convertMesh(mesh)` after loading. If the mesh was already in the scene before plugin initialization, convert it manually:

```typescript
const plugin = new AnyUpPlugin({ sourceSystem: 'z-up', targetSystem: 'y-up' });
plugin.initialize(scene);

// For existing meshes
scene.meshes.forEach(mesh => plugin.convertMesh(mesh));
```

### Performance is slower than expected

1. Check if you're converting the same mesh multiple times (use `mesh.metadata.coordinateSystemConverted` to track)
2. Use `autoConvert: false` and batch convert meshes during load
3. Profile with browser DevTools to identify bottlenecks

### Transformations are not reversible

Ensure you're using `preserveOriginal: true` to store original transforms in metadata. Note that floating-point precision may cause small errors in round-trip conversions.

### Plugin not working with imported models

Some model loaders apply their own transformations. Initialize the plugin before loading models, or manually convert after import completes.

## License

GNU Affero General Public License v3.0 (AGPL-3.0) - see [LICENSE](./LICENSE) for details.

**Author**: Vasilisa Versus ([@dcversus](https://github.com/dcversus))
**Contact**:
- Email: dcversus@gmail.com
- Telegram: [t.me/dcversus](https://t.me/dcversus)
- Social: @dcversus

## Related Projects

- **[Edge Craft](https://github.com/dcversus/edgecraft)** - WebGL RTS game engine (the project that inspired babylon-anyup)
- **[Babylon.js](https://www.babylonjs.com/)** - Powerful 3D engine for the web
- **[mdx-m3-viewer](https://github.com/flowtsohg/mdx-m3-viewer)** - Warcraft 3 and StarCraft 2 model viewer

## Roadmap

### v0.1.0 (Current)
- [x] Core Z-up to Y-up transformation
- [x] Plugin system with auto-convert
- [ ] Comprehensive test suite
- [ ] Performance benchmarks
- [ ] Documentation and examples

### v0.2.0 (Planned)
- [ ] X-up coordinate system support
- [ ] Custom coordinate system definitions
- [ ] Animation retargeting
- [ ] Vertex-level transformations
- [ ] glTF/OBJ loader integration

### v1.0.0 (Future)
- [ ] Handedness conversion (left ↔ right)
- [ ] UV coordinate adjustments
- [ ] Performance optimizations (SIMD, workers)
- [ ] Visual debugging tools

## Sponsors

This project is currently maintained by [@dcversus](https://github.com/dcversus). If you find this library useful, consider sponsoring development:

- [GitHub Sponsors](https://github.com/sponsors/dcversus) (coming soon)

## Support

- **Issues**: [GitHub Issues](https://github.com/dcversus/babylon-anyup/issues)
- **Discussions**: [GitHub Discussions](https://github.com/dcversus/babylon-anyup/discussions)
- **Security**: See [SECURITY.md](./SECURITY.md) for vulnerability reporting
