import { describe, it, expect, beforeEach } from 'vitest';
import { NullEngine, Scene, Vector3, Quaternion, MeshBuilder, TransformNode } from '@babylonjs/core';
import { AnyUpPlugin } from '../src/plugin/AnyUpPlugin';
import type { AnyUpPluginOptions } from '../src/types';

describe('AnyUpPlugin', () => {
  let engine: NullEngine;
  let scene: Scene;

  beforeEach(() => {
    engine = new NullEngine();
    scene = new Scene(engine);
  });

  describe('initialization', () => {
    it('should initialize with Z-up to Y-up conversion', () => {
      const options: AnyUpPluginOptions = {
        sourceSystem: 'z-up',
        targetSystem: 'y-up',
        autoConvert: false,
        preserveOriginal: false,
      };

      const plugin = new AnyUpPlugin(options);
      expect(plugin.name).toBe('AnyUpPlugin');
      expect(plugin.options).toBe(options);
    });

    it('should initialize with Y-up to Z-up conversion', () => {
      const options: AnyUpPluginOptions = {
        sourceSystem: 'y-up',
        targetSystem: 'z-up',
        autoConvert: false,
        preserveOriginal: false,
      };

      const plugin = new AnyUpPlugin(options);
      expect(plugin.name).toBe('AnyUpPlugin');
      expect(plugin.options).toBe(options);
    });

    it('should initialize scene', () => {
      const plugin = new AnyUpPlugin({
        sourceSystem: 'z-up',
        targetSystem: 'y-up',
        autoConvert: false,
        preserveOriginal: false,
      });

      expect(() => plugin.initialize(scene)).not.toThrow();
    });
  });

  describe('convertMesh', () => {
    it('should convert mesh position from Z-up to Y-up', () => {
      const plugin = new AnyUpPlugin({
        sourceSystem: 'z-up',
        targetSystem: 'y-up',
        autoConvert: false,
        preserveOriginal: false,
      });
      plugin.initialize(scene);

      const mesh = MeshBuilder.CreateBox('box', { size: 1 }, scene);
      mesh.position = new Vector3(1, 2, 3);

      plugin.convertMesh(mesh);

      expect(mesh.position.x).toBe(1);
      expect(mesh.position.y).toBe(3);
      expect(mesh.position.z).toBe(-2);
    });

    it('should convert mesh scaling', () => {
      const plugin = new AnyUpPlugin({
        sourceSystem: 'z-up',
        targetSystem: 'y-up',
        autoConvert: false,
        preserveOriginal: false,
      });
      plugin.initialize(scene);

      const mesh = MeshBuilder.CreateBox('box', { size: 1 }, scene);
      mesh.scaling = new Vector3(2, 3, 4);

      plugin.convertMesh(mesh);

      expect(mesh.scaling.x).toBe(2);
      expect(mesh.scaling.y).toBe(4);
      expect(mesh.scaling.z).toBe(3);
    });

    it('should preserve original transform when enabled', () => {
      const plugin = new AnyUpPlugin({
        sourceSystem: 'z-up',
        targetSystem: 'y-up',
        autoConvert: false,
        preserveOriginal: true,
      });
      plugin.initialize(scene);

      const mesh = MeshBuilder.CreateBox('box', { size: 1 }, scene);
      const originalPos = new Vector3(1, 2, 3);
      const originalScale = new Vector3(2, 3, 4);
      mesh.position = originalPos.clone();
      mesh.scaling = originalScale.clone();

      plugin.convertMesh(mesh);

      expect(mesh.metadata).toBeDefined();
      const metadata = mesh.metadata as Record<string, unknown>;
      expect(metadata['originalPosition']).toBeInstanceOf(Vector3);
      expect(metadata['originalScaling']).toBeInstanceOf(Vector3);

      const savedPos = metadata['originalPosition'] as Vector3;
      const savedScale = metadata['originalScaling'] as Vector3;
      expect(savedPos.x).toBe(originalPos.x);
      expect(savedPos.y).toBe(originalPos.y);
      expect(savedPos.z).toBe(originalPos.z);
      expect(savedScale.x).toBe(originalScale.x);
      expect(savedScale.y).toBe(originalScale.y);
      expect(savedScale.z).toBe(originalScale.z);
    });

    it('should handle mesh with rotation quaternion', () => {
      const plugin = new AnyUpPlugin({
        sourceSystem: 'z-up',
        targetSystem: 'y-up',
        autoConvert: false,
        preserveOriginal: false,
      });
      plugin.initialize(scene);

      const mesh = MeshBuilder.CreateBox('box', { size: 1 }, scene);
      mesh.rotationQuaternion = Quaternion.Identity();

      plugin.convertMesh(mesh);

      expect(mesh.rotationQuaternion).toBeDefined();
      expect(mesh.rotationQuaternion).toBeInstanceOf(Quaternion);
    });

    it('should handle mesh without rotation quaternion', () => {
      const plugin = new AnyUpPlugin({
        sourceSystem: 'z-up',
        targetSystem: 'y-up',
        autoConvert: false,
        preserveOriginal: false,
      });
      plugin.initialize(scene);

      const mesh = MeshBuilder.CreateBox('box', { size: 1 }, scene);
      mesh.rotationQuaternion = null;

      plugin.convertMesh(mesh);

      expect(mesh.rotationQuaternion).toBeNull();
    });
  });

  describe('convertTransformNode', () => {
    it('should convert transform node position', () => {
      const plugin = new AnyUpPlugin({
        sourceSystem: 'z-up',
        targetSystem: 'y-up',
        autoConvert: false,
        preserveOriginal: false,
      });
      plugin.initialize(scene);

      const node = new TransformNode('node', scene);
      node.position = new Vector3(1, 2, 3);

      plugin.convertTransformNode(node);

      expect(node.position.x).toBe(1);
      expect(node.position.y).toBe(3);
      expect(node.position.z).toBe(-2);
    });

    it('should preserve original transform for node when enabled', () => {
      const plugin = new AnyUpPlugin({
        sourceSystem: 'z-up',
        targetSystem: 'y-up',
        autoConvert: false,
        preserveOriginal: true,
      });
      plugin.initialize(scene);

      const node = new TransformNode('node', scene);
      const originalPos = new Vector3(1, 2, 3);
      node.position = originalPos.clone();

      plugin.convertTransformNode(node);

      expect(node.metadata).toBeDefined();
      const metadata = node.metadata as Record<string, unknown>;
      expect(metadata['originalPosition']).toBeInstanceOf(Vector3);

      const savedPos = metadata['originalPosition'] as Vector3;
      expect(savedPos.x).toBe(originalPos.x);
      expect(savedPos.y).toBe(originalPos.y);
      expect(savedPos.z).toBe(originalPos.z);
    });
  });

  describe('autoConvert', () => {
    it('should auto-convert all meshes when enabled', () => {
      const plugin = new AnyUpPlugin({
        sourceSystem: 'z-up',
        targetSystem: 'y-up',
        autoConvert: true,
        preserveOriginal: false,
      });

      const mesh1 = MeshBuilder.CreateBox('box1', { size: 1 }, scene);
      mesh1.position = new Vector3(1, 2, 3);

      const mesh2 = MeshBuilder.CreateBox('box2', { size: 1 }, scene);
      mesh2.position = new Vector3(4, 5, 6);

      plugin.initialize(scene);

      expect(mesh1.position.x).toBe(1);
      expect(mesh1.position.y).toBe(3);
      expect(mesh1.position.z).toBe(-2);

      expect(mesh2.position.x).toBe(4);
      expect(mesh2.position.y).toBe(6);
      expect(mesh2.position.z).toBe(-5);
    });

    it('should auto-convert all transform nodes when enabled', () => {
      const plugin = new AnyUpPlugin({
        sourceSystem: 'z-up',
        targetSystem: 'y-up',
        autoConvert: true,
        preserveOriginal: false,
      });

      const node1 = new TransformNode('node1', scene);
      node1.position = new Vector3(1, 2, 3);

      const node2 = new TransformNode('node2', scene);
      node2.position = new Vector3(4, 5, 6);

      plugin.initialize(scene);

      expect(node1.position.x).toBe(1);
      expect(node1.position.y).toBe(3);
      expect(node1.position.z).toBe(-2);

      expect(node2.position.x).toBe(4);
      expect(node2.position.y).toBe(6);
      expect(node2.position.z).toBe(-5);
    });

    it('should not auto-convert when disabled', () => {
      const plugin = new AnyUpPlugin({
        sourceSystem: 'z-up',
        targetSystem: 'y-up',
        autoConvert: false,
        preserveOriginal: false,
      });

      const mesh = MeshBuilder.CreateBox('box', { size: 1 }, scene);
      const originalPos = new Vector3(1, 2, 3);
      mesh.position = originalPos.clone();

      plugin.initialize(scene);

      expect(mesh.position.x).toBe(originalPos.x);
      expect(mesh.position.y).toBe(originalPos.y);
      expect(mesh.position.z).toBe(originalPos.z);
    });
  });

  describe('dispose', () => {
    it('should dispose plugin cleanly', () => {
      const plugin = new AnyUpPlugin({
        sourceSystem: 'z-up',
        targetSystem: 'y-up',
        autoConvert: false,
        preserveOriginal: false,
      });
      plugin.initialize(scene);

      expect(() => plugin.dispose()).not.toThrow();
    });
  });
});
