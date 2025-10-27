import { describe, bench } from 'vitest';
import { Vector3, Quaternion } from '@babylonjs/core';
import { ZUpToYUpStrategy } from '../src/transforms/ZUpToYUpStrategy.js';
import { YUpToZUpStrategy } from '../src/transforms/YUpToZUpStrategy.js';

describe('Vector3 Transform Performance', () => {
  const zUpStrategy = new ZUpToYUpStrategy();
  const yUpStrategy = new YUpToZUpStrategy();

  const testVector = new Vector3(10, 20, 30);

  bench('ZUpToYUpStrategy.convertPosition', () => {
    zUpStrategy.convertPosition(testVector);
  });

  bench('YUpToZUpStrategy.convertPosition', () => {
    yUpStrategy.convertPosition(testVector);
  });
});

describe('Quaternion Transform Performance', () => {
  const zUpStrategy = new ZUpToYUpStrategy();
  const yUpStrategy = new YUpToZUpStrategy();

  const testQuaternion = Quaternion.RotationYawPitchRoll(
    Math.PI / 4,
    Math.PI / 6,
    Math.PI / 8
  );

  bench('ZUpToYUpStrategy.convertRotation', () => {
    zUpStrategy.convertRotation(testQuaternion);
  });

  bench('YUpToZUpStrategy.convertRotation', () => {
    yUpStrategy.convertRotation(testQuaternion);
  });
});

describe('Scaling Transform Performance', () => {
  const zUpStrategy = new ZUpToYUpStrategy();
  const yUpStrategy = new YUpToZUpStrategy();

  const testScale = new Vector3(2, 3, 4);

  bench('ZUpToYUpStrategy.convertScaling', () => {
    zUpStrategy.convertScaling(testScale);
  });

  bench('YUpToZUpStrategy.convertScaling', () => {
    yUpStrategy.convertScaling(testScale);
  });
});

describe('Bulk Transform Performance', () => {
  const zUpStrategy = new ZUpToYUpStrategy();
  const vectors = Array.from({ length: 1000 }, (_, i) =>
    new Vector3(i * 10, i * 20, i * 30)
  );

  bench('Transform 1000 vectors', () => {
    vectors.forEach(v => zUpStrategy.convertPosition(v));
  });

  const quaternions = Array.from({ length: 1000 }, (_, i) =>
    Quaternion.RotationYawPitchRoll(i * 0.01, i * 0.02, i * 0.03)
  );

  bench('Transform 1000 quaternions', () => {
    quaternions.forEach(q => zUpStrategy.convertRotation(q));
  });
});
