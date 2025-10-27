import type { Scene, AbstractMesh, TransformNode, Vector3, Quaternion } from '@babylonjs/core';

export type CoordinateSystem = 'y-up' | 'z-up';

export interface AnyUpPluginOptions {
  sourceSystem: CoordinateSystem;
  targetSystem: CoordinateSystem;
  autoConvert: boolean;
  preserveOriginal: boolean;
}

export interface TransformResult {
  position: Vector3;
  rotation: Quaternion;
  scaling: Vector3;
}

export interface ConversionContext {
  scene: Scene;
  options: AnyUpPluginOptions;
}

export interface ITransformStrategy {
  convertPosition(position: Vector3): Vector3;
  convertRotation(rotation: Quaternion): Quaternion;
  convertScaling(scaling: Vector3): Vector3;
}

export interface ICoordinateSystemPlugin {
  name: string;
  options: AnyUpPluginOptions;
  initialize(scene: Scene): void;
  convertMesh(mesh: AbstractMesh): void;
  convertTransformNode(node: TransformNode): void;
  dispose(): void;
}
