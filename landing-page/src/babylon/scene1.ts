import {
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Color3,
} from '@babylonjs/core';

/**
 * Scene 1: Rotating coordinate system demonstration
 * Shows Y-up and Z-up coordinate systems with animated axes
 */
export const createScene1 = (scene: Scene) => {
  // Camera
  const camera = new ArcRotateCamera(
    'camera1',
    Math.PI / 4,
    Math.PI / 3,
    10,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
  camera.lowerRadiusLimit = 5;
  camera.upperRadiusLimit = 20;

  // Lighting
  const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  // Create coordinate axes
  const axisLength = 3;
  const axisThickness = 0.05;

  // X-axis (Red)
  const xAxis = MeshBuilder.CreateCylinder(
    'xAxis',
    { height: axisLength, diameter: axisThickness },
    scene
  );
  xAxis.rotation.z = Math.PI / 2;
  xAxis.position.x = axisLength / 2;
  const xMaterial = new StandardMaterial('xMaterial', scene);
  xMaterial.diffuseColor = Color3.Red();
  xMaterial.emissiveColor = new Color3(0.5, 0, 0);
  xAxis.material = xMaterial;

  // Y-axis (Green)
  const yAxis = MeshBuilder.CreateCylinder(
    'yAxis',
    { height: axisLength, diameter: axisThickness },
    scene
  );
  yAxis.position.y = axisLength / 2;
  const yMaterial = new StandardMaterial('yMaterial', scene);
  yMaterial.diffuseColor = Color3.Green();
  yMaterial.emissiveColor = new Color3(0, 0.5, 0);
  yAxis.material = yMaterial;

  // Z-axis (Blue)
  const zAxis = MeshBuilder.CreateCylinder(
    'zAxis',
    { height: axisLength, diameter: axisThickness },
    scene
  );
  zAxis.rotation.x = Math.PI / 2;
  zAxis.position.z = axisLength / 2;
  const zMaterial = new StandardMaterial('zMaterial', scene);
  zMaterial.diffuseColor = Color3.Blue();
  zMaterial.emissiveColor = new Color3(0, 0, 0.5);
  zAxis.material = zMaterial;

  // Create a demo model (sphere) to show orientation
  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene);
  sphere.position.y = 1.5;
  const sphereMaterial = new StandardMaterial('sphereMaterial', scene);
  sphereMaterial.diffuseColor = new Color3(0.4, 0.4, 0.8);
  sphere.material = sphereMaterial;

  // Add rotation animation
  scene.registerBeforeRender(() => {
    sphere.rotation.y += 0.01;
  });

  return scene;
};
