import type { CoordinateSystem, ITransformStrategy } from '../types/index.js';
import { ZUpToYUpStrategy } from './ZUpToYUpStrategy.js';
import { YUpToZUpStrategy } from './YUpToZUpStrategy.js';

export class TransformStrategyFactory {
  static createStrategy(
    source: CoordinateSystem,
    target: CoordinateSystem
  ): ITransformStrategy {
    if (source === target) {
      throw new Error(
        `Source and target coordinate systems are the same: ${source}`
      );
    }

    if (source === 'z-up' && target === 'y-up') {
      return new ZUpToYUpStrategy();
    }

    if (source === 'y-up' && target === 'z-up') {
      return new YUpToZUpStrategy();
    }

    throw new Error(
      `Unsupported coordinate system conversion: ${source} -> ${target}`
    );
  }
}
