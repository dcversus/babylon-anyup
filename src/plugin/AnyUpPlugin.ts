import type { Scene, AbstractMesh, TransformNode } from '@babylonjs/core';
import type {
  ICoordinateSystemPlugin,
  AnyUpPluginOptions,
  ITransformStrategy,
} from '../types/index.js';
import { TransformStrategyFactory } from '../transforms/TransformStrategyFactory.js';

export class AnyUpPlugin implements ICoordinateSystemPlugin {
  public readonly name = 'AnyUpPlugin';
  private strategy: ITransformStrategy;
  private scene: Scene | null = null;

  constructor(public readonly options: AnyUpPluginOptions) {
    this.strategy = TransformStrategyFactory.createStrategy(
      options.sourceSystem,
      options.targetSystem,
      options.handedness ?? 'left-handed'
    );
  }

  initialize(scene: Scene): void {
    this.scene = scene;

    if (this.options.autoConvert) {
      this.convertSceneNodes();
    }
  }

  convertMesh(mesh: AbstractMesh): void {
    const metadata = (mesh.metadata ?? {}) as Record<string, unknown>;
    if (metadata['skipConversion'] === true) {
      return;
    }

    if (this.options.preserveOriginal) {
      this.storeOriginalTransform(mesh);
    }

    mesh.position = this.strategy.convertPosition(mesh.position);
    mesh.rotationQuaternion = mesh.rotationQuaternion
      ? this.strategy.convertRotation(mesh.rotationQuaternion)
      : null;
    mesh.scaling = this.strategy.convertScaling(mesh.scaling);

    const updatedMetadata = (mesh.metadata ?? {}) as Record<string, unknown>;
    updatedMetadata['coordinateSystemConverted'] = true;
    mesh.metadata = updatedMetadata;
  }

  convertTransformNode(node: TransformNode): void {
    const metadata = (node.metadata ?? {}) as Record<string, unknown>;
    if (metadata['skipConversion'] === true) {
      return;
    }

    if (this.options.preserveOriginal) {
      this.storeOriginalTransform(node);
    }

    node.position = this.strategy.convertPosition(node.position);
    node.rotationQuaternion = node.rotationQuaternion
      ? this.strategy.convertRotation(node.rotationQuaternion)
      : null;
    node.scaling = this.strategy.convertScaling(node.scaling);

    const updatedMetadata = (node.metadata ?? {}) as Record<string, unknown>;
    updatedMetadata['coordinateSystemConverted'] = true;
    node.metadata = updatedMetadata;
  }

  dispose(): void {
    this.scene = null;
  }

  private convertSceneNodes(): void {
    if (!this.scene) {
      throw new Error('Plugin not initialized. Call initialize() first.');
    }

    this.scene.meshes.forEach((mesh) => {
      this.convertMesh(mesh);
    });

    this.scene.transformNodes.forEach((node) => {
      this.convertTransformNode(node);
    });
  }

  private storeOriginalTransform(node: TransformNode | AbstractMesh): void {
    const metadata = (node.metadata ?? {}) as Record<string, unknown>;
    metadata['originalPosition'] = node.position.clone();
    metadata['originalRotation'] = node.rotationQuaternion?.clone() ?? null;
    metadata['originalScaling'] = node.scaling.clone();
    node.metadata = metadata;
  }
}
