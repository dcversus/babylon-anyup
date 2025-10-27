# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive API documentation in README.md
- Migration guide from manual transforms in README.md
- GitHub Pages deployment with live examples
- Example files (warcraft3-terrain, blender-import)

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

[Unreleased]: https://github.com/dcversus/babylon-anyup/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/dcversus/babylon-anyup/releases/tag/v0.0.1
