import { Vector3, Quaternion } from '@babylonjs/core';
import type { ITransformStrategy, Handedness } from '../types/index.js';

export class YUpToZUpStrategy implements ITransformStrategy {
  private readonly handedness: Handedness;

  constructor(handedness: Handedness = 'left-handed') {
    this.handedness = handedness;
  }

  convertPosition(position: Vector3): Vector3 {
    return new Vector3(position.x, -position.z, position.y);
  }

  convertRotation(rotation: Quaternion): Quaternion {
    let result = rotation.clone();

    if (this.handedness === 'right-handed') {
      result = new Quaternion(-result.x, -result.y, -result.z, result.w);
    }

    const correctionQuat = Quaternion.RotationAxis(
      new Vector3(1, 0, 0),
      Math.PI / 2
    );

    result = result.multiply(correctionQuat);
    result.normalize();

    return result;
  }

  convertScaling(scaling: Vector3): Vector3 {
    return new Vector3(scaling.x, scaling.z, scaling.y);
  }
}
