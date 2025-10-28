import {
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Color3,
  DynamicTexture,
} from '@babylonjs/core';

/**
 * Scene 4: Side-by-side comparison showing transformation problems
 * Left: Correct transformation
 * Right: Common mistakes (mirrored, wrong rotation)
 */
export const createScene4 = (scene: Scene) => {
  // Camera
  const camera = new ArcRotateCamera(
    'camera4',
    Math.PI / 4,
    Math.PI / 3,
    12,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
  camera.lowerRadiusLimit = 8;
  camera.upperRadiusLimit = 20;

  // Lighting
  const light = new HemisphericLight('light4', new Vector3(0, 1, 0), scene);
  light.intensity = 0.8;

  // Helper function to create a textured cube
  const createTexturedCube = (name: string, position: Vector3, isCorrect: boolean) => {
    const box = MeshBuilder.CreateBox(name, { size: 2 }, scene);
    box.position = position;

    // Create dynamic texture with directional arrow
    const textureResolution = 512;
    const dynamicTexture = new DynamicTexture(
      `${name}Texture`,
      textureResolution,
      scene,
      false
    );
    const ctx = dynamicTexture.getContext();

    // Draw background
    ctx.fillStyle = isCorrect ? '#4ade80' : '#ef4444';
    ctx.fillRect(0, 0, textureResolution, textureResolution);

    // Draw arrow pointing up
    ctx.fillStyle = 'white';
    ctx.font = 'bold 200px Arial';
    const canvas2dCtx = ctx as CanvasRenderingContext2D;
    canvas2dCtx.textAlign = 'center';
    canvas2dCtx.textBaseline = 'middle';
    ctx.fillText('↑', textureResolution / 2, textureResolution / 2);

    // Draw label
    ctx.font = 'bold 60px Arial';
    ctx.fillText(isCorrect ? 'CORRECT' : 'WRONG', textureResolution / 2, textureResolution - 60);

    dynamicTexture.update();

    // Apply texture
    const material = new StandardMaterial(`${name}Material`, scene);
    material.diffuseTexture = dynamicTexture;
    material.emissiveColor = new Color3(0.2, 0.2, 0.2);
    box.material = material;

    // Apply wrong transformation to the incorrect cube
    if (!isCorrect) {
      // Simulate common mistake: just rotating without proper coordinate swap
      box.rotation.x = -Math.PI / 2;
      box.rotation.z = Math.PI; // This causes mirroring
    }

    return box;
  };

  // Create comparison cubes
  const correctCube = createTexturedCube('correctCube', new Vector3(-3, 1, 0), true);
  const wrongCube = createTexturedCube('wrongCube', new Vector3(3, 1, 0), false);

  // Add ground for reference
  const ground = MeshBuilder.CreateGround('ground', { width: 12, height: 6 }, scene);
  const groundMaterial = new StandardMaterial('groundMaterial', scene);
  groundMaterial.diffuseColor = new Color3(0.15, 0.15, 0.2);
  groundMaterial.alpha = 0.4;
  ground.material = groundMaterial;

  // Add rotation animation to both
  scene.registerBeforeRender(() => {
    correctCube.rotation.y += 0.005;
    wrongCube.rotation.y += 0.005;
  });

  return scene;
};
