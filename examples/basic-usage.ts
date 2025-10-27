import { Engine, Scene, MeshBuilder, Vector3, ArcRotateCamera, HemisphericLight } from '@babylonjs/core';
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
  autoConvert: true,
  preserveOriginal: true,
});

plugin.initialize(scene);

const box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
box.position = new Vector3(0, 0, 3);

console.log('Original position (metadata):', box.metadata?.originalPosition);
console.log('Converted position:', box.position);

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener('resize', () => {
  engine.resize();
});
