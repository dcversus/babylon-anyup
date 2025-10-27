# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-01-XX

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
- Comprehensive test suite (>85% coverage)
- TypeScript strict mode support
- Full API documentation in README

### Features
- Coordinate system conversion: Z-up ↔ Y-up
- Supports `AbstractMesh` and `TransformNode`
- Zero dependencies (peer: `@babylonjs/core`)
- Bundle size: ~3.4 KB (minified)
- Performance: <1% overhead vs manual transforms

[Unreleased]: https://github.com/dcversus/babylon-anyup/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/dcversus/babylon-anyup/releases/tag/v0.1.0
