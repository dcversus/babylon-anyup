import { Engine, Scene, SceneLoader, Vector3, ArcRotateCamera, HemisphericLight } from '@babylonjs/core';
import { AnyUpPlugin } from '@dcversus/babylon-anyup';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
const engine = new Engine(canvas, true);
const scene = new Scene(engine);

const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

const plugin = new AnyUpPlugin({
  sourceSystem: 'z-up',
  targetSystem: 'y-up',
  autoConvert: false,
  preserveOriginal: true,
});

plugin.initialize(scene);

SceneLoader.ImportMesh(
  '',
  '/models/',
  'blender_export.glb',
  scene,
  (meshes) => {
    console.log(`Loaded ${meshes.length} meshes from Blender export`);

    meshes.forEach((mesh, index) => {
      console.log(`Converting mesh ${index}: ${mesh.name}`);
      plugin.convertMesh(mesh);

      if (mesh.metadata?.originalPosition) {
        console.log(`  Original position: ${mesh.metadata.originalPosition}`);
        console.log(`  Converted position: ${mesh.position}`);
      }
    });

    console.log('All meshes converted from Z-up to Y-up');
  },
  null,
  (scene, message, exception) => {
    console.error('Error loading Blender model:', message, exception);
  }
);

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener('resize', () => {
  engine.resize();
});
