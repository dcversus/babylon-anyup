import { Engine, Scene, MeshBuilder, Vector3, VertexData } from '@babylonjs/core';
import { AnyUpPlugin } from '@dcversus/babylon-anyup';

interface W3ETerrainData {
  width: number;
  height: number;
  vertices: Array<{ x: number; y: number; z: number }>;
}

function loadWarcraft3Terrain(data: W3ETerrainData) {
  const engine = new Engine(null, false);
  const scene = new Scene(engine);

  const plugin = new AnyUpPlugin({
    sourceSystem: 'z-up',
    targetSystem: 'y-up',
    autoConvert: true,
    preserveOriginal: true,
  });

  plugin.initialize(scene);

  const positions: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i < data.vertices.length; i++) {
    const v = data.vertices[i];
    positions.push(v.x, v.y, v.z);
  }

  for (let z = 0; z < data.height - 1; z++) {
    for (let x = 0; x < data.width - 1; x++) {
      const i0 = z * data.width + x;
      const i1 = i0 + 1;
      const i2 = i0 + data.width;
      const i3 = i2 + 1;

      indices.push(i0, i1, i2);
      indices.push(i1, i3, i2);
    }
  }

  const vertexData = new VertexData();
  vertexData.positions = positions;
  vertexData.indices = indices;

  const mesh = MeshBuilder.CreateGround('terrain', {}, scene);
  vertexData.applyToMesh(mesh);

  console.log('Terrain loaded with automatic Z-up to Y-up conversion');
  console.log('Mesh position:', mesh.position);

  return { scene, mesh, plugin };
}

const sampleData: W3ETerrainData = {
  width: 3,
  height: 3,
  vertices: [
    { x: 0, y: 0, z: 0 },
    { x: 128, y: 0, z: 0 },
    { x: 256, y: 0, z: 0 },
    { x: 0, y: 128, z: 10 },
    { x: 128, y: 128, z: 20 },
    { x: 256, y: 128, z: 10 },
    { x: 0, y: 256, z: 0 },
    { x: 128, y: 256, z: 0 },
    { x: 256, y: 256, z: 0 },
  ],
};

const result = loadWarcraft3Terrain(sampleData);
console.log('Scene ready with', result.scene.meshes.length, 'meshes');
