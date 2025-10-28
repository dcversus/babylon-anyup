// Sample EdgeCraft transformation code (simplified for demo)
// This represents the manual coordinate transformation hell
export const edgecraftCode = `// EdgeCraft: Manual coordinate transformation for Warcraft 3 terrain
function loadW3Terrain(w3e: W3E, scene: Scene): Mesh {
  const vertexCount = w3e.vertices.length;
  const positions: number[] = [];
  const indices: number[] = [];
  const normals: number[] = [];

  // Manual Y/Z coordinate swapping for EVERY vertex
  for (let i = 0; i < vertexCount; i++) {
    const vertex = w3e.vertices[i];

    // Z-up to Y-up transformation (manual, error-prone)
    positions.push(vertex.x);
    positions.push(vertex.z);        // Y becomes Z
    positions.push(-vertex.y);       // Z becomes -Y (inverted!)

    // Transform normals too (more manual work)
    if (vertex.normal) {
      normals.push(vertex.normal.x);
      normals.push(vertex.normal.z);
      normals.push(-vertex.normal.y);
    }
  }

  // Build indices...
  for (let y = 0; y < w3e.height - 1; y++) {
    for (let x = 0; x < w3e.width - 1; x++) {
      const topLeft = y * w3e.width + x;
      const topRight = topLeft + 1;
      const bottomLeft = (y + 1) * w3e.width + x;
      const bottomRight = bottomLeft + 1;

      // First triangle
      indices.push(topLeft, topRight, bottomLeft);
      // Second triangle
      indices.push(topRight, bottomRight, bottomLeft);
    }
  }

  // Create mesh manually
  const terrain = new Mesh('terrain', scene);
  const vertexData = new VertexData();
  vertexData.positions = positions;
  vertexData.indices = indices;
  vertexData.normals = normals;
  vertexData.applyToMesh(terrain);

  // STILL need to fix rotation because it's not quite right
  terrain.rotation.x = -Math.PI / 2;  // Hardcoded fix

  // And UV coordinates need manual fixing too...
  const uvs: number[] = [];
  for (let y = 0; y < w3e.height; y++) {
    for (let x = 0; x < w3e.width; x++) {
      // Manual UV calculation with coordinate swap
      uvs.push(x / (w3e.width - 1));
      uvs.push(1.0 - (y / (w3e.height - 1))); // Inverted!
    }
  }
  vertexData.uvs = uvs;

  // Apply texture coordinates
  terrain.updateVerticesData(VertexBuffer.UVKind, uvs);

  return terrain;
}

// And this is JUST for terrain!
// Models, cameras, lights... all need similar manual work!`;
