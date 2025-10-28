import {
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Mesh,
} from '@babylonjs/core';

/**
 * Scene 6: Demonstration of automatic babylon-anyup transformation
 * Shows elegant solution with smooth animation
 */
export const createScene6 = (scene: Scene) => {
  // Camera
  const camera = new ArcRotateCamera(
    'camera6',
    Math.PI / 4,
    Math.PI / 3,
    10,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
  camera.lowerRadiusLimit = 6;
  camera.upperRadiusLimit = 15;

  // Lighting with nice ambiance
  const light1 = new HemisphericLight('light6', new Vector3(0, 1, 0), scene);
  light1.intensity = 0.7;

  const light2 = new HemisphericLight('light6_2', new Vector3(0, -1, 0), scene);
  light2.intensity = 0.3;

  // Create ground
  const ground = MeshBuilder.CreateGround('ground', { width: 8, height: 8 }, scene);
  const groundMaterial = new StandardMaterial('groundMaterial', scene);
  groundMaterial.diffuseColor = new Color3(0.1, 0.1, 0.15);
  groundMaterial.specularColor = new Color3(0.1, 0.1, 0.1);
  ground.material = groundMaterial;

  // Create a beautiful rotating logo-like structure
  const centerSphere = MeshBuilder.CreateSphere('center', { diameter: 1 }, scene);
  const centerMaterial = new StandardMaterial('centerMaterial', scene);
  centerMaterial.diffuseColor = new Color3(0.35, 0.4, 0.95);
  centerMaterial.emissiveColor = new Color3(0.15, 0.2, 0.4);
  centerMaterial.specularColor = new Color3(0.8, 0.8, 0.8);
  centerSphere.position.y = 2;
  centerSphere.material = centerMaterial;

  // Create orbiting elements
  const orbitCount = 3;
  const orbitals: Mesh[] = [];

  for (let i = 0; i < orbitCount; i++) {
    const orbital = MeshBuilder.CreateTorus(
      `orbital${i}`,
      { diameter: 3 + i * 0.5, thickness: 0.08, tessellation: 32 },
      scene
    );

    const orbitalMaterial = new StandardMaterial(`orbitalMaterial${i}`, scene);
    const hue = (i / orbitCount) * 0.6 + 0.5; // Blue to purple range
    orbitalMaterial.diffuseColor = new Color3(hue * 0.4, hue * 0.5, 0.95);
    orbitalMaterial.emissiveColor = new Color3(hue * 0.2, hue * 0.25, 0.4);
    orbitalMaterial.alpha = 0.8;
    orbital.material = orbitalMaterial;

    orbital.position.y = 2;
    orbital.rotation.x = Math.PI / 2 + (i * Math.PI) / 6;
    orbitals.push(orbital);
  }

  // Create small particles orbiting
  const particles: Mesh[] = [];
  for (let i = 0; i < 6; i++) {
    const particle = MeshBuilder.CreateSphere(
      `particle${i}`,
      { diameter: 0.2 },
      scene
    );
    const particleMaterial = new StandardMaterial(`particleMaterial${i}`, scene);
    particleMaterial.emissiveColor = new Color3(0.4, 0.8, 1);
    particle.material = particleMaterial;
    particles.push(particle);
  }

  // Animation
  let time = 0;
  scene.registerBeforeRender(() => {
    time += 0.01;

    // Rotate center sphere
    centerSphere.rotation.y += 0.01;

    // Rotate orbitals at different speeds
    orbitals.forEach((orbital, i) => {
      orbital.rotation.y += 0.005 * (i + 1);
    });

    // Animate particles in orbit
    particles.forEach((particle, i) => {
      const angle = time + (i / particles.length) * Math.PI * 2;
      const radius = 2.5;
      particle.position.x = Math.cos(angle) * radius;
      particle.position.z = Math.sin(angle) * radius;
      particle.position.y = 2 + Math.sin(time * 2 + i) * 0.5;
    });
  });

  return scene;
};
