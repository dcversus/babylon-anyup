import type { CoordinateSystem, ITransformStrategy, Handedness } from '../types/index.js';
import { ZUpToYUpStrategy } from './ZUpToYUpStrategy.js';
import { YUpToZUpStrategy } from './YUpToZUpStrategy.js';

export class TransformStrategyFactory {
  static createStrategy(
    source: CoordinateSystem,
    target: CoordinateSystem,
    handedness: Handedness = 'left-handed'
  ): ITransformStrategy {
    if (source === target) {
      throw new Error(
        `Source and target coordinate systems are the same: ${source}`
      );
    }

    if (source === 'z-up' && target === 'y-up') {
      return new ZUpToYUpStrategy(handedness);
    }

    if (source === 'y-up' && target === 'z-up') {
      return new YUpToZUpStrategy(handedness);
    }

    throw new Error(
      `Unsupported coordinate system conversion: ${source} -> ${target}`
    );
  }
}
