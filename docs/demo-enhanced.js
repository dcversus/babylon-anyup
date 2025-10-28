// Enhanced Babylon.js Demos

class IntroDemo {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
        this.scene = null;
        this.model = null;
        this.isZUp = false;
        this.isAnimating = false;

        this.initialize();
    }

    async initialize() {
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color4(0.05, 0.07, 0.1, 1);

        // Camera
        const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 4, Math.PI / 3, 8, BABYLON.Vector3.Zero(), this.scene);
        camera.attachControl(this.canvas, true);
        camera.lowerRadiusLimit = 5;
        camera.upperRadiusLimit = 15;

        // Lighting
        const light1 = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 1, 1), this.scene);
        light1.intensity = 0.7;

        const light2 = new BABYLON.DirectionalLight('light2', new BABYLON.Vector3(-1, -2, -1), this.scene);
        light2.intensity = 0.5;

        // Create model (a house-like structure to show orientation)
        this.createModel();

        // Start render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });

        // Setup switcher
        this.setupSwitcher();

        // Auto-toggle after 3 seconds
        setTimeout(() => {
            this.toggleZUp();
        }, 3000);
    }

    createModel() {
        // Create a simple house model to demonstrate orientation
        const house = new BABYLON.TransformNode('house', this.scene);

        // Base
        const base = BABYLON.MeshBuilder.CreateBox('base', { width: 2, height: 0.2, depth: 2 }, this.scene);
        base.position.y = 0;
        base.parent = house;

        const baseMat = new BABYLON.StandardMaterial('baseMat', this.scene);
        baseMat.diffuseColor = new BABYLON.Color3(0.4, 0.3, 0.25);
        base.material = baseMat;

        // Walls
        const wall = BABYLON.MeshBuilder.CreateBox('wall', { width: 2, height: 1.5, depth: 2 }, this.scene);
        wall.position.y = 0.85;
        wall.parent = house;

        const wallMat = new BABYLON.StandardMaterial('wallMat', this.scene);
        wallMat.diffuseColor = new BABYLON.Color3(0.8, 0.7, 0.6);
        wall.material = wallMat;

        // Roof
        const roof = BABYLON.MeshBuilder.CreateCylinder('roof', {
            diameterTop: 0,
            diameterBottom: 2.8,
            height: 1.2,
            tessellation: 4
        }, this.scene);
        roof.position.y = 2.2;
        roof.rotation.y = Math.PI / 4;
        roof.parent = house;

        const roofMat = new BABYLON.StandardMaterial('roofMat', this.scene);
        roofMat.diffuseColor = new BABYLON.Color3(0.6, 0.2, 0.2);
        roof.material = roofMat;

        // Door
        const door = BABYLON.MeshBuilder.CreateBox('door', { width: 0.6, height: 1, depth: 0.1 }, this.scene);
        door.position.set(0, 0.6, 1.05);
        door.parent = house;

        const doorMat = new BABYLON.StandardMaterial('doorMat', this.scene);
        doorMat.diffuseColor = new BABYLON.Color3(0.3, 0.2, 0.1);
        door.material = doorMat;

        // Window
        const window1 = BABYLON.MeshBuilder.CreateBox('window', { width: 0.4, height: 0.4, depth: 0.1 }, this.scene);
        window1.position.set(-0.5, 1.2, 1.05);
        window1.parent = house;

        const windowMat = new BABYLON.StandardMaterial('windowMat', this.scene);
        windowMat.diffuseColor = new BABYLON.Color3(0.6, 0.8, 1);
        windowMat.emissiveColor = new BABYLON.Color3(0.3, 0.4, 0.5);
        window1.material = windowMat;

        // Chimney
        const chimney = BABYLON.MeshBuilder.CreateBox('chimney', { width: 0.3, height: 0.8, depth: 0.3 }, this.scene);
        chimney.position.set(0.6, 2.8, 0.6);
        chimney.parent = house;

        const chimneyMat = new BABYLON.StandardMaterial('chimneyMat', this.scene);
        chimneyMat.diffuseColor = new BABYLON.Color3(0.5, 0.4, 0.3);
        chimney.material = chimneyMat;

        // Axis indicators
        this.createAxisIndicators();

        this.model = house;

        // Rotate slowly
        this.scene.registerBeforeRender(() => {
            if (this.model && !this.isAnimating) {
                this.model.rotation.y += 0.005;
            }
        });
    }

    createAxisIndicators() {
        const axisLength = 3;
        const axisThickness = 0.05;

        // X axis (Red)
        const xAxis = BABYLON.MeshBuilder.CreateLines('xAxis', {
            points: [BABYLON.Vector3.Zero(), new BABYLON.Vector3(axisLength, 0, 0)]
        }, this.scene);
        xAxis.color = new BABYLON.Color3(1, 0.2, 0.2);

        // Y axis (Green)
        const yAxis = BABYLON.MeshBuilder.CreateLines('yAxis', {
            points: [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, axisLength, 0)]
        }, this.scene);
        yAxis.color = new BABYLON.Color3(0.2, 1, 0.2);

        // Z axis (Blue)
        const zAxis = BABYLON.MeshBuilder.CreateLines('zAxis', {
            points: [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, axisLength)]
        }, this.scene);
        zAxis.color = new BABYLON.Color3(0.2, 0.2, 1);
    }

    setupSwitcher() {
        const switcherContainer = document.getElementById('intro-switcher');
        if (!switcherContainer) return;

        const switcher = switcherContainer.querySelector('.switcher');
        switcher.addEventListener('click', () => {
            this.toggleZUp();
        });
    }

    toggleZUp() {
        this.isZUp = !this.isZUp;
        this.isAnimating = true;

        const switcherContainer = document.getElementById('intro-switcher');
        if (switcherContainer) {
            const switcher = switcherContainer.querySelector('.switcher');
            switcher.setAttribute('data-enabled', this.isZUp.toString());
        }

        if (this.isZUp) {
            // Animate to Z-up orientation
            this.animateTransform(
                this.model.rotation.toEulerAngles(),
                new BABYLON.Vector3(-Math.PI / 2, 0, 0),
                500
            );
        } else {
            // Animate back to Y-up
            this.animateTransform(
                this.model.rotation.toEulerAngles(),
                BABYLON.Vector3.Zero(),
                500
            );
        }
    }

    animateTransform(fromRotation, toRotation, duration) {
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-in-out)
            const eased = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            this.model.rotation = BABYLON.Vector3.Lerp(fromRotation, toRotation, eased);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isAnimating = false;
            }
        };

        animate();
    }
}

class ProblemDemo {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = null;

        this.initialize();
    }

    async initialize() {
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color4(0.05, 0.07, 0.1, 1);

        // Camera
        const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 4, Math.PI / 3, 10, BABYLON.Vector3.Zero(), this.scene);
        camera.attachControl(this.canvas, true);

        // Lighting
        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 1), this.scene);
        light.intensity = 0.8;

        // Create terrain with wrong orientation (simulating Z-up data loaded as Y-up)
        this.createTerrainWithIssues();

        // Start render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    createTerrainWithIssues() {
        const gridSize = 6;
        const tileSize = 1;

        for (let z = 0; z < gridSize; z++) {
            for (let x = 0; x < gridSize; x++) {
                const centerX = x - gridSize / 2;
                const centerZ = z - gridSize / 2;

                const distanceFromCenter = Math.sqrt(centerX * centerX + centerZ * centerZ);
                const maxDistance = gridSize / Math.sqrt(2);
                const heightFactor = 1 - (distanceFromCenter / maxDistance);
                const height = heightFactor * 2;

                // Create tile with wrong orientation (as if Z-up data was used in Y-up system)
                const tile = BABYLON.MeshBuilder.CreateGround(`tile_${x}_${z}`, {
                    width: tileSize,
                    height: tileSize,
                    subdivisions: 1
                }, this.scene);

                // Wrong positioning - appears rotated
                tile.position.x = centerX * tileSize;
                tile.position.y = height;
                tile.position.z = centerZ * tileSize;
                tile.rotation.x = Math.PI / 2; // This is the "issue" - model is rotated wrong

                const material = new BABYLON.StandardMaterial(`mat_${x}_${z}`, this.scene);
                const heightNormalized = height / 2;
                const grassColor = new BABYLON.Color3(0.2, 0.5, 0.2);
                const dirtColor = new BABYLON.Color3(0.4, 0.3, 0.2);
                material.diffuseColor = BABYLON.Color3.Lerp(dirtColor, grassColor, heightNormalized);

                // Add some flickering to show issues
                material.wireframe = Math.random() > 0.7;

                tile.material = material;

                // Animate to show the problem
                tile.rotation.y += Math.random() * 0.1;
            }
        }
    }
}

class ComparisonDemo {
    constructor(canvasIdBefore, canvasIdAfter) {
        this.canvasBefore = document.getElementById(canvasIdBefore);
        this.canvasAfter = document.getElementById(canvasIdAfter);

        if (this.canvasBefore) {
            this.initBefore();
        }

        if (this.canvasAfter) {
            this.initAfter();
        }
    }

    initBefore() {
        const engine = new BABYLON.Engine(this.canvasBefore, true);
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.05, 0.07, 0.1, 1);

        const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 4, Math.PI / 3, 8, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(this.canvasBefore, true);

        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);

        // Create model with issues (wrong orientation, inverted textures)
        const box = BABYLON.MeshBuilder.CreateBox('box', { size: 2 }, scene);
        box.rotation.x = Math.PI / 2; // Wrong rotation

        const material = new BABYLON.StandardMaterial('mat', scene);
        material.diffuseColor = new BABYLON.Color3(1, 0.5, 0.5);
        material.wireframe = true; // Show as wireframe to indicate issues
        box.material = material;

        // Add text "WRONG" overlay
        const plane = BABYLON.MeshBuilder.CreatePlane('textPlane', { size: 3 }, scene);
        plane.position.z = 3;

        engine.runRenderLoop(() => {
            box.rotation.y += 0.01;
            scene.render();
        });

        window.addEventListener('resize', () => engine.resize());
    }

    initAfter() {
        const engine = new BABYLON.Engine(this.canvasAfter, true);
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.05, 0.07, 0.1, 1);

        const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 4, Math.PI / 3, 8, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(this.canvasAfter, true);

        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), scene);

        // Create model correctly oriented
        const box = BABYLON.MeshBuilder.CreateBox('box', { size: 2 }, scene);

        const material = new BABYLON.StandardMaterial('mat', scene);
        material.diffuseColor = new BABYLON.Color3(0.2, 0.8, 0.2);
        box.material = material;

        engine.runRenderLoop(() => {
            box.rotation.y += 0.01;
            scene.render();
        });

        window.addEventListener('resize', () => engine.resize());
    }
}

// Initialize all demos when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Intro demo with switcher
    new IntroDemo('intro-canvas');

    // Problem demonstration
    new ProblemDemo('problem-canvas');

    // Code examples comparison
    new ComparisonDemo('example-canvas-before', 'example-canvas-after');
});
