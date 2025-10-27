# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-10-27

### Added
- Comprehensive API documentation in README.md (following 3-file rule)
- Migration guide from manual transforms in README.md
- Performance benchmarks (benchmarks/performance.bench.ts)
- Example files (examples/warcraft3-terrain.ts, examples/blender-import.ts)
- GitHub Pages deployment workflow (.github/workflows/deploy-docs.yml)
- Live interactive demo at https://dcversus.github.io/babylon-anyup/
- PRP for interactive story-driven landing page (PRPs/interactive-story-landing-page.md)

### Changed
- License badge updated to AGPL-3.0 to match package.json
- Documentation consolidated following strict 3-file rule (README, CONTRIBUTING, PRPs/)
- README.md enhanced with complete API reference and usage examples

### Performance
- Vector3 transformations: 22M ops/sec (220x faster than target)
- Quaternion transformations: 19M ops/sec (287x faster than target)
- Bulk transforms: 183K ops/sec for 1000 vectors

## [0.0.1] - 2025-10-27

### Added
- Initial release of `@dcversus/babylon-anyup`
- `AnyUpPlugin` for scene-level coordinate system conversion
- `ZUpToYUpStrategy` for Z-up to Y-up transformation
- `YUpToZUpStrategy` for Y-up to Z-up transformation
- `TransformStrategyFactory` for strategy selection
- Position, rotation, and scaling transformations
- Auto-convert mode for automatic mesh transformation
- Manual conversion API for specific meshes/nodes
- Original transform preservation (optional)
- Comprehensive test suite (87.42% coverage)
- TypeScript strict mode support
- Full API documentation in README
- SECURITY.md for vulnerability reporting
- CODE_OF_CONDUCT.md (Contributor Covenant 2.0)
- CONTRIBUTING.md with detailed development workflow
- CI/CD pipeline with automated testing and publishing

### Features
- Coordinate system conversion: Z-up ↔ Y-up
- Supports `AbstractMesh` and `TransformNode`
- Zero runtime dependencies (peer: `@babylonjs/core ^7.0.0`)
- Bundle size: 8.2 KB (39.2 KB unpacked)
- Tree-shakeable ESM/CJS dual output
- Provenance attestation for supply chain security

[Unreleased]: https://github.com/dcversus/babylon-anyup/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/dcversus/babylon-anyup/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/dcversus/babylon-anyup/releases/tag/v0.0.1
