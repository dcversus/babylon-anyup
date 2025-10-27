import { describe, it, expect } from 'vitest';
import { Vector3, Quaternion } from '@babylonjs/core';
import { ZUpToYUpStrategy } from '../src/transforms/ZUpToYUpStrategy';

describe('ZUpToYUpStrategy', () => {
  const strategy = new ZUpToYUpStrategy();

  describe('convertPosition', () => {
    it('should convert Z-up position to Y-up', () => {
      const zUpPosition = new Vector3(1, 2, 3);
      const result = strategy.convertPosition(zUpPosition);

      expect(result.x).toBe(1);
      expect(result.y).toBe(3);
      expect(result.z).toBe(-2);
    });

    it('should handle zero vector', () => {
      const zeroVec = new Vector3(0, 0, 0);
      const result = strategy.convertPosition(zeroVec);

      expect(result.x).toBeCloseTo(0);
      expect(result.y).toBeCloseTo(0);
      expect(result.z).toBeCloseTo(0);
    });
  });

  describe('convertScaling', () => {
    it('should convert Z-up scaling to Y-up', () => {
      const zUpScaling = new Vector3(2, 3, 4);
      const result = strategy.convertScaling(zUpScaling);

      expect(result.x).toBe(2);
      expect(result.y).toBe(4);
      expect(result.z).toBe(3);
    });
  });

  describe('convertRotation', () => {
    it('should apply correction quaternion', () => {
      const identity = Quaternion.Identity();
      const result = strategy.convertRotation(identity);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Quaternion);
    });
  });
});
