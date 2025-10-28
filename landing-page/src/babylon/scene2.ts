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

  // Create coordinate axes to show the problem
  // X axis (Red)
  const xAxis = MeshBuilder.CreateLines('xAxis', {
    points: [Vector3.Zero(), new Vector3(3, 0, 0)]
  }, scene);
  xAxis.color = new Color3(1, 0, 0);

  const xLabel = MeshBuilder.CreateCylinder('xLabel', {
    diameter: 0.2,
    height: 0.5
  }, scene);
  xLabel.position = new Vector3(3.5, 0, 0);
  const xMaterial = new StandardMaterial('xMaterial', scene);
  xMaterial.emissiveColor = new Color3(1, 0, 0);
  xLabel.material = xMaterial;

  // Y axis (Green) - This is "up" in Babylon.js
  const yAxis = MeshBuilder.CreateLines('yAxis', {
    points: [Vector3.Zero(), new Vector3(0, 3, 0)]
  }, scene);
  yAxis.color = new Color3(0, 1, 0);

  const yLabel = MeshBuilder.CreateCylinder('yLabel', {
    diameter: 0.2,
    height: 0.5
  }, scene);
  yLabel.position = new Vector3(0, 3.5, 0);
  const yMaterial = new StandardMaterial('yMaterial', scene);
  yMaterial.emissiveColor = new Color3(0, 1, 0);
  yLabel.material = yMaterial;

  // Z axis (Blue)
  const zAxis = MeshBuilder.CreateLines('zAxis', {
    points: [Vector3.Zero(), new Vector3(0, 0, 3)]
  }, scene);
  zAxis.color = new Color3(0, 0, 1);

  const zLabel = MeshBuilder.CreateCylinder('zLabel', {
    diameter: 0.2,
    height: 0.5
  }, scene);
  zLabel.position = new Vector3(0, 0, 3.5);
  zLabel.rotation.x = Math.PI / 2;
  const zMaterial = new StandardMaterial('zMaterial', scene);
  zMaterial.emissiveColor = new Color3(0, 0, 1);
  zLabel.material = zMaterial;

  // Add pulsing animation to Y axis to emphasize it's "up" in Babylon.js
  const yAxisPulse = new Animation(
    'yAxisPulse',
    'scaling',
    30,
    Animation.ANIMATIONTYPE_VECTOR3,
    Animation.ANIMATIONLOOPMODE_CYCLE
  );

  const yPulseKeys = [];
  yPulseKeys.push({ frame: 0, value: new Vector3(1, 1, 1) });
  yPulseKeys.push({ frame: 30, value: new Vector3(1.5, 1.5, 1.5) });
  yPulseKeys.push({ frame: 60, value: new Vector3(1, 1, 1) });

  yAxisPulse.setKeys(yPulseKeys);
  yLabel.animations.push(yAxisPulse);
  scene.beginAnimation(yLabel, 0, 60, true);

  return scene;
};
