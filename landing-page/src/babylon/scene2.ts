import {
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Animation,
  TransformNode,
} from '@babylonjs/core';

/**
 * Scene 2: Import animation showing model "falling over" with wrong coordinate system
 * Demonstrates the common Z-up import problem
 */
export const createScene2 = (scene: Scene) => {
  // Camera positioned to see the "fall"
  const camera = new ArcRotateCamera(
    'camera2',
    Math.PI / 4,
    Math.PI / 3,
    8,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
  camera.lowerRadiusLimit = 5;
  camera.upperRadiusLimit = 15;

  // Lighting
  const light = new HemisphericLight('light2', new Vector3(0, 1, 0), scene);
  light.intensity = 0.8;

  // Ground plane to show orientation
  const ground = MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);
  const groundMaterial = new StandardMaterial('groundMaterial', scene);
  groundMaterial.diffuseColor = new Color3(0.2, 0.2, 0.3);
  groundMaterial.alpha = 0.5;
  ground.material = groundMaterial;

  // Create a simple "building" model (Z-up oriented initially)
  const container = new TransformNode('modelContainer', scene);

  // Base
  const base = MeshBuilder.CreateBox('base', { width: 1.5, height: 0.3, depth: 1.5 }, scene);
  base.position.y = 0.15;
  base.parent = container;

  // Tower
  const tower = MeshBuilder.CreateBox('tower', { width: 0.8, height: 2, depth: 0.8 }, scene);
  tower.position.y = 1.15;
  tower.parent = container;

  // Roof
  const roof = MeshBuilder.CreateCylinder('roof', {
    diameterTop: 0,
    diameterBottom: 1.2,
    height: 0.8
  }, scene);
  roof.position.y = 2.55;
  roof.parent = container;

  // Material for the building
  const buildingMaterial = new StandardMaterial('buildingMaterial', scene);
  buildingMaterial.diffuseColor = new Color3(0.6, 0.4, 0.8);
  base.material = buildingMaterial;
  tower.material = buildingMaterial;
  roof.material = buildingMaterial;

  // Position the model initially "upright" in Z-up space (actually wrong in Y-up)
  container.position.y = 2;

  // Create animation to show the model "falling over" when imported wrong
  const fallAnimation = new Animation(
    'fallAnimation',
    'rotation.x',
    30,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CYCLE
  );

  const keyFrames = [];
  keyFrames.push({ frame: 0, value: 0 });
  keyFrames.push({ frame: 30, value: 0 }); // Stay upright for 1 second
  keyFrames.push({ frame: 90, value: Math.PI / 2 }); // Fall over (90 degrees)
  keyFrames.push({ frame: 150, value: Math.PI / 2 }); // Stay fallen
  keyFrames.push({ frame: 180, value: 0 }); // Reset
  keyFrames.push({ frame: 240, value: 0 }); // Pause before repeat

  fallAnimation.setKeys(keyFrames);
  container.animations.push(fallAnimation);

  // Start the animation
  scene.beginAnimation(container, 0, 240, true);

  // Add "WRONG!" text that appears when model falls
  // We'll do this with a mesh instead of text for performance
  let warningVisible = false;
  scene.registerBeforeRender(() => {
    const currentFrame = scene.getAnimationRatio() * 240;
    const shouldShow = currentFrame > 40 && currentFrame < 170;

    if (shouldShow && !warningVisible) {
      warningVisible = true;
      // Could add warning indicator here
    } else if (!shouldShow && warningVisible) {
      warningVisible = false;
    }
  });

  return scene;
};
