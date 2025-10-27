import { Vector3, Quaternion } from '@babylonjs/core';
import type { ITransformStrategy } from '../types/index.js';

export class YUpToZUpStrategy implements ITransformStrategy {
  convertPosition(position: Vector3): Vector3 {
    return new Vector3(position.x, -position.z, position.y);
  }

  convertRotation(rotation: Quaternion): Quaternion {
    const correctionQuat = Quaternion.RotationAxis(
      new Vector3(1, 0, 0),
      Math.PI / 2
    );
    return rotation.multiply(correctionQuat);
  }

  convertScaling(scaling: Vector3): Vector3 {
    return new Vector3(scaling.x, scaling.z, scaling.y);
  }
}
