class BabylonDemo {
    constructor(canvasId, isZUp = false) {
        this.canvas = document.getElementById(canvasId);
        this.isZUp = isZUp;
        this.engine = null;
        this.scene = null;
        this.camera = null;
        this.rotating = false;
    }

    async initialize() {
        this.engine = new BABYLON.Engine(this.canvas, true, {
            preserveDrawingBuffer: true,
            stencil: true,
            antialias: true
        });

        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color4(0.05, 0.07, 0.1, 1);

        this.setupCamera();
        this.setupLighting();
        this.createAxisLines();
        this.createTerrain();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    setupCamera() {
        this.camera = new BABYLON.ArcRotateCamera(
            'camera',
            -Math.PI / 4,
            Math.PI / 3,
            15,
            BABYLON.Vector3.Zero(),
            this.scene
        );
        this.camera.attachControl(this.canvas, true);
        this.camera.lowerRadiusLimit = 8;
        this.camera.upperRadiusLimit = 30;
        this.camera.wheelPrecision = 50;
    }

    setupLighting() {
        const light = new BABYLON.HemisphericLight(
            'light',
            new BABYLON.Vector3(1, 1, 1),
            this.scene
        );
        light.intensity = 0.8;

        const dirLight = new BABYLON.DirectionalLight(
            'dirLight',
            new BABYLON.Vector3(-1, -2, -1),
            this.scene
        );
        dirLight.intensity = 0.5;
    }

    createAxisLines() {
        const axisLength = 5;
        const axisThickness = 0.1;

        const createAxis = (name, color, direction) => {
            const points = [
                BABYLON.Vector3.Zero(),
                direction.scale(axisLength)
            ];
            const line = BABYLON.MeshBuilder.CreateLines(name, { points }, this.scene);
            line.color = color;

            const cylinder = BABYLON.MeshBuilder.CreateCylinder(
                name + 'Cylinder',
                { height: axisLength, diameter: axisThickness },
                this.scene
            );
            cylinder.position = direction.scale(axisLength / 2);

            const material = new BABYLON.StandardMaterial(name + 'Mat', this.scene);
            material.diffuseColor = color;
            material.emissiveColor = color.scale(0.5);
            cylinder.material = material;

            const cone = BABYLON.MeshBuilder.CreateCylinder(
                name + 'Cone',
                { diameterTop: 0, diameterBottom: axisThickness * 3, height: 0.5 },
                this.scene
            );
            cone.position = direction.scale(axisLength + 0.25);
            cone.material = material;

            if (direction.x !== 0) {
                cylinder.rotation.z = Math.PI / 2;
                cone.rotation.z = Math.PI / 2;
            } else if (direction.z !== 0) {
                cylinder.rotation.x = Math.PI / 2;
                cone.rotation.x = Math.PI / 2;
            }

            return [line, cylinder, cone];
        };

        const redColor = new BABYLON.Color3(1, 0.2, 0.2);
        const greenColor = new BABYLON.Color3(0.2, 1, 0.2);
        const blueColor = new BABYLON.Color3(0.2, 0.2, 1);

        if (this.isZUp) {
            createAxis('xAxis', redColor, new BABYLON.Vector3(1, 0, 0));
            createAxis('yAxis', greenColor, new BABYLON.Vector3(0, 1, 0));
            createAxis('zAxis', blueColor, new BABYLON.Vector3(0, 0, 1));
        } else {
            createAxis('xAxis', redColor, new BABYLON.Vector3(1, 0, 0));
            createAxis('yAxis', greenColor, new BABYLON.Vector3(0, 1, 0));
            createAxis('zAxis', blueColor, new BABYLON.Vector3(0, 0, 1));
        }
    }

    createTerrain() {
        const gridSize = 8;
        const tileSize = 1;

        const terrainData = [];
        for (let z = 0; z < gridSize; z++) {
            for (let x = 0; x < gridSize; x++) {
                const centerX = x - gridSize / 2;
                const centerZ = z - gridSize / 2;

                const distanceFromCenter = Math.sqrt(centerX * centerX + centerZ * centerZ);
                const maxDistance = gridSize / Math.sqrt(2);
                const heightFactor = 1 - (distanceFromCenter / maxDistance);
                const height = heightFactor * 2;

                terrainData.push({ x, z, height });
            }
        }

        const getHeight = (x, z) => {
            const tile = terrainData.find(t => t.x === x && t.z === z);
            return tile ? tile.height : 0;
        };

        terrainData.forEach(tile => {
            const x = tile.x;
            const z = tile.z;
            const height = tile.height;

            const positions = [
                { x: x * tileSize, z: z * tileSize, h: height },
                { x: (x + 1) * tileSize, z: z * tileSize, h: getHeight(x + 1, z) },
                { x: (x + 1) * tileSize, z: (z + 1) * tileSize, h: getHeight(x + 1, z + 1) },
                { x: x * tileSize, z: (z + 1) * tileSize, h: getHeight(x, z + 1) }
            ];

            positions.forEach(pos => {
                pos.x -= (gridSize * tileSize) / 2;
                pos.z -= (gridSize * tileSize) / 2;
            });

            let vertexData;
            if (this.isZUp) {
                vertexData = new BABYLON.VertexData();
                vertexData.positions = [
                    positions[0].x, positions[0].z, positions[0].h,
                    positions[1].x, positions[1].z, positions[1].h,
                    positions[2].x, positions[2].z, positions[2].h,
                    positions[3].x, positions[3].z, positions[3].h
                ];
                vertexData.indices = [0, 1, 2, 0, 2, 3];

                vertexData.normals = [];
                BABYLON.VertexData.ComputeNormals(
                    vertexData.positions,
                    vertexData.indices,
                    vertexData.normals
                );
            } else {
                vertexData = new BABYLON.VertexData();
                vertexData.positions = [
                    positions[0].x, positions[0].h, positions[0].z,
                    positions[1].x, positions[1].h, positions[1].z,
                    positions[2].x, positions[2].h, positions[2].z,
                    positions[3].x, positions[3].h, positions[3].z
                ];
                vertexData.indices = [0, 1, 2, 0, 2, 3];

                vertexData.normals = [];
                BABYLON.VertexData.ComputeNormals(
                    vertexData.positions,
                    vertexData.indices,
                    vertexData.normals
                );
            }

            const mesh = new BABYLON.Mesh(`terrain_${x}_${z}`, this.scene);
            vertexData.applyToMesh(mesh);

            const material = new BABYLON.StandardMaterial(`terrainMat_${x}_${z}`, this.scene);

            const heightNormalized = height / 2;
            const grassColor = new BABYLON.Color3(0.2, 0.5, 0.2);
            const dirtColor = new BABYLON.Color3(0.4, 0.3, 0.2);
            material.diffuseColor = BABYLON.Color3.Lerp(dirtColor, grassColor, heightNormalized);
            material.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

            mesh.material = material;

            if (this.rotating) {
                mesh.rotation.y += 0.01;
            }
        });

        this.createGridLines(gridSize, tileSize);
    }

    createGridLines(gridSize, tileSize) {
        const offset = (gridSize * tileSize) / 2;
        const lineColor = new BABYLON.Color3(0.3, 0.3, 0.4);

        for (let i = 0; i <= gridSize; i++) {
            const pos = i * tileSize - offset;

            let points1, points2;
            if (this.isZUp) {
                points1 = [
                    new BABYLON.Vector3(-offset, pos, 0),
                    new BABYLON.Vector3(offset, pos, 0)
                ];
                points2 = [
                    new BABYLON.Vector3(pos, -offset, 0),
                    new BABYLON.Vector3(pos, offset, 0)
                ];
            } else {
                points1 = [
                    new BABYLON.Vector3(-offset, 0, pos),
                    new BABYLON.Vector3(offset, 0, pos)
                ];
                points2 = [
                    new BABYLON.Vector3(pos, 0, -offset),
                    new BABYLON.Vector3(pos, 0, offset)
                ];
            }

            const line1 = BABYLON.MeshBuilder.CreateLines(`gridLine1_${i}`, { points: points1 }, this.scene);
            line1.color = lineColor;
            line1.alpha = 0.3;

            const line2 = BABYLON.MeshBuilder.CreateLines(`gridLine2_${i}`, { points: points2 }, this.scene);
            line2.color = lineColor;
            line2.alpha = 0.3;
        }
    }

    toggleRotation() {
        this.rotating = !this.rotating;
    }

    dispose() {
        if (this.engine) {
            this.engine.dispose();
        }
    }
}

let yUpDemo = null;
let zUpDemo = null;

document.addEventListener('DOMContentLoaded', async () => {
    yUpDemo = new BabylonDemo('yup-canvas', false);
    zUpDemo = new BabylonDemo('zup-canvas', true);

    await Promise.all([
        yUpDemo.initialize(),
        zUpDemo.initialize()
    ]);

    const rotateBtn = document.getElementById('rotate-btn');
    let rotating = false;

    rotateBtn.addEventListener('click', () => {
        rotating = !rotating;
        rotateBtn.textContent = rotating ? 'Stop Rotation' : 'Rotate Scenes';

        if (yUpDemo.scene) {
            yUpDemo.scene.meshes.forEach(mesh => {
                if (mesh.name.startsWith('terrain_')) {
                    if (rotating) {
                        yUpDemo.scene.registerBeforeRender(() => {
                            mesh.rotation.y += 0.005;
                        });
                    } else {
                        mesh.rotation.y = 0;
                    }
                }
            });
        }

        if (zUpDemo.scene) {
            zUpDemo.scene.meshes.forEach(mesh => {
                if (mesh.name.startsWith('terrain_')) {
                    if (rotating) {
                        zUpDemo.scene.registerBeforeRender(() => {
                            mesh.rotation.z += 0.005;
                        });
                    } else {
                        mesh.rotation.z = 0;
                    }
                }
            });
        }
    });
});

window.addEventListener('beforeunload', () => {
    if (yUpDemo) yUpDemo.dispose();
    if (zUpDemo) zUpDemo.dispose();
});
