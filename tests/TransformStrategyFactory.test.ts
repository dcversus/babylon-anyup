import { describe, it, expect } from 'vitest';
import { TransformStrategyFactory } from '../src/transforms/TransformStrategyFactory';
import { ZUpToYUpStrategy } from '../src/transforms/ZUpToYUpStrategy';
import { YUpToZUpStrategy } from '../src/transforms/YUpToZUpStrategy';

describe('TransformStrategyFactory', () => {
  it('should create ZUpToYUpStrategy for z-up to y-up conversion', () => {
    const strategy = TransformStrategyFactory.createStrategy('z-up', 'y-up');
    expect(strategy).toBeInstanceOf(ZUpToYUpStrategy);
  });

  it('should create YUpToZUpStrategy for y-up to z-up conversion', () => {
    const strategy = TransformStrategyFactory.createStrategy('y-up', 'z-up');
    expect(strategy).toBeInstanceOf(YUpToZUpStrategy);
  });

  it('should throw error when source and target are the same', () => {
    expect(() => {
      TransformStrategyFactory.createStrategy('z-up', 'z-up');
    }).toThrow('Source and target coordinate systems are the same');
  });
});
