// Coordinate Systems Interactive Demo with Lever
class CoordinateSystemsDemo {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.engine = new BABYLON.Engine(this.canvas, true, {
            preserveDrawingBuffer: true,
            stencil: true
        });
        this.scene = null;
        this.camera = null;
        this.lever = null;
        this.isYUp = true;
        this.isDragging = false;
        this.dragStartPointer = null;
        this.dragStartCameraAlpha = null;
        this.dragStartCameraBeta = null;
        this.axes = { x: null, y: null, z: null };
        this.labels = { x: null, y: null, z: null };

        this.initialize();
    }

    async initialize() {
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color4(0.02, 0.03, 0.08, 1);

        // Camera
        this.camera = new BABYLON.ArcRotateCamera(
            'camera',
            -Math.PI / 4,
            Math.PI / 3.5,
            12,
            BABYLON.Vector3.Zero(),
            this.scene
        );
        this.camera.lowerRadiusLimit = 8;
        this.camera.upperRadiusLimit = 20;
        this.camera.wheelPrecision = 50;

        // Lighting
        const light1 = new BABYLON.HemisphericLight(
            'light1',
            new BABYLON.Vector3(0, 1, 0),
            this.scene
        );
        light1.intensity = 0.6;

        const light2 = new BABYLON.DirectionalLight(
            'light2',
            new BABYLON.Vector3(1, -2, 1),
            this.scene
        );
        light2.intensity = 0.4;

        // Create coordinate system visualization
        this.createCoordinateSystem();

        // Create lever switch
        this.createLever();

        // Create floating platforms to show orientation
        this.createOrientationHelpers();

        // Setup drag controls
        this.setupDragControls();

        // Start render loop
        this.engine.runRenderLoop(() => {
            if (this.lever) {
                // Rotate lever slowly for visual interest
                this.lever.rotation.z = Math.sin(Date.now() / 2000) * 0.1;
            }
            this.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });

        // Initial label update
        this.updateLabels();
    }

    createCoordinateSystem() {
        // Create axes with glowing effect
        const axisLength = 5;
        const axisThickness = 0.08;

        // X-axis (Red)
        const xAxis = BABYLON.MeshBuilder.CreateCylinder('xAxis', {
            height: axisLength,
            diameter: axisThickness,
            tessellation: 16
        }, this.scene);
        xAxis.rotation.z = Math.PI / 2;
        xAxis.position.x = axisLength / 2;

        const xMat = new BABYLON.StandardMaterial('xMat', this.scene);
        xMat.emissiveColor = new BABYLON.Color3(1, 0.2, 0.2);
        xMat.diffuseColor = new BABYLON.Color3(1, 0.3, 0.3);
        xAxis.material = xMat;

        // X-axis arrow
        const xArrow = BABYLON.MeshBuilder.CreateCylinder('xArrow', {
            height: 0.5,
            diameterTop: 0,
            diameterBottom: 0.2,
            tessellation: 16
        }, this.scene);
        xArrow.rotation.z = -Math.PI / 2;
        xArrow.position.x = axisLength;
        xArrow.material = xMat;

        this.axes.x = new BABYLON.TransformNode('xAxisGroup', this.scene);
        xAxis.parent = this.axes.x;
        xArrow.parent = this.axes.x;

        // Y-axis (Green)
        const yAxis = BABYLON.MeshBuilder.CreateCylinder('yAxis', {
            height: axisLength,
            diameter: axisThickness,
            tessellation: 16
        }, this.scene);
        yAxis.position.y = axisLength / 2;

        const yMat = new BABYLON.StandardMaterial('yMat', this.scene);
        yMat.emissiveColor = new BABYLON.Color3(0.2, 1, 0.2);
        yMat.diffuseColor = new BABYLON.Color3(0.3, 1, 0.3);
        yAxis.material = yMat;

        // Y-axis arrow
        const yArrow = BABYLON.MeshBuilder.CreateCylinder('yArrow', {
            height: 0.5,
            diameterTop: 0,
            diameterBottom: 0.2,
            tessellation: 16
        }, this.scene);
        yArrow.position.y = axisLength;
        yArrow.material = yMat;

        this.axes.y = new BABYLON.TransformNode('yAxisGroup', this.scene);
        yAxis.parent = this.axes.y;
        yArrow.parent = this.axes.y;

        // Z-axis (Blue)
        const zAxis = BABYLON.MeshBuilder.CreateCylinder('zAxis', {
            height: axisLength,
            diameter: axisThickness,
            tessellation: 16
        }, this.scene);
        zAxis.rotation.x = Math.PI / 2;
        zAxis.position.z = axisLength / 2;

        const zMat = new BABYLON.StandardMaterial('zMat', this.scene);
        zMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 1);
        zMat.diffuseColor = new BABYLON.Color3(0.3, 0.3, 1);
        zAxis.material = zMat;

        // Z-axis arrow
        const zArrow = BABYLON.MeshBuilder.CreateCylinder('zArrow', {
            height: 0.5,
            diameterTop: 0,
            diameterBottom: 0.2,
            tessellation: 16
        }, this.scene);
        zArrow.rotation.x = Math.PI / 2;
        zArrow.position.z = axisLength;
        zArrow.material = zMat;

        this.axes.z = new BABYLON.TransformNode('zAxisGroup', this.scene);
        zAxis.parent = this.axes.z;
        zArrow.parent = this.axes.z;

        // Create origin sphere
        const origin = BABYLON.MeshBuilder.CreateSphere('origin', {
            diameter: 0.3
        }, this.scene);
        const originMat = new BABYLON.StandardMaterial('originMat', this.scene);
        originMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
        origin.material = originMat;

        // Create axis labels
        this.createAxisLabels();

        // Create glow layer
        const gl = new BABYLON.GlowLayer('glow', this.scene);
        gl.intensity = 0.5;
    }

    createAxisLabels() {
        // We'll update these labels based on coordinate system
        const labelDistance = 5.5;

        // Note: Labels will be created via DOM overlay, not 3D text
        // Store label positions for later
        this.labelPositions = {
            x: new BABYLON.Vector3(labelDistance, 0, 0),
            y: new BABYLON.Vector3(0, labelDistance, 0),
            z: new BABYLON.Vector3(0, 0, labelDistance)
        };
    }

    createLever() {
        // Create a mechanical lever switch
        const leverBase = new BABYLON.TransformNode('leverBase', this.scene);
        leverBase.position = new BABYLON.Vector3(-4, -2, 0);

        // Base plate
        const plate = BABYLON.MeshBuilder.CreateBox('plate', {
            width: 1.5,
            height: 0.2,
            depth: 1
        }, this.scene);
        plate.parent = leverBase;

        const plateMat = new BABYLON.StandardMaterial('plateMat', this.scene);
        plateMat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        plateMat.metallic = 0.8;
        plate.material = plateMat;

        // Lever arm (handle)
        const leverArm = BABYLON.MeshBuilder.CreateCylinder('leverArm', {
            height: 2,
            diameter: 0.15,
            tessellation: 16
        }, this.scene);
        leverArm.rotation.z = Math.PI / 4; // 45 degrees (Y-up position)
        leverArm.position.y = 1;
        leverArm.parent = leverBase;

        const leverMat = new BABYLON.StandardMaterial('leverMat', this.scene);
        leverMat.diffuseColor = new BABYLON.Color3(0.8, 0.6, 0.2);
        leverMat.metallic = 0.9;
        leverArm.material = leverMat;

        // Lever ball (top)
        const leverBall = BABYLON.MeshBuilder.CreateSphere('leverBall', {
            diameter: 0.4
        }, this.scene);
        leverBall.position.y = 2;
        leverBall.parent = leverBase;
        leverBall.material = leverMat;

        // Pivot point
        const pivot = BABYLON.MeshBuilder.CreateSphere('pivot', {
            diameter: 0.3
        }, this.scene);
        pivot.parent = leverBase;
        pivot.material = plateMat;

        // Label plates
        const yLabel = this.createLabelPlate('Y', new BABYLON.Vector3(0.6, 1.2, 0), new BABYLON.Color3(0.2, 1, 0.2));
        yLabel.parent = leverBase;

        const zLabel = this.createLabelPlate('Z', new BABYLON.Vector3(-0.6, 1.2, 0), new BABYLON.Color3(0.2, 0.2, 1));
        zLabel.parent = leverBase;

        this.lever = leverBase;
        this.leverArm = leverArm;
        this.leverBall = leverBall;

        // Make lever clickable
        leverBall.actionManager = new BABYLON.ActionManager(this.scene);
        leverBall.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                () => {
                    this.toggleCoordinateSystem();
                }
            )
        );

        // Highlight on hover
        leverBall.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                () => {
                    leverBall.scaling = new BABYLON.Vector3(1.2, 1.2, 1.2);
                }
            )
        );
        leverBall.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOutTrigger,
                () => {
                    leverBall.scaling = new BABYLON.Vector3(1, 1, 1);
                }
            )
        );
    }

    createLabelPlate(text, position, color) {
        const plate = BABYLON.MeshBuilder.CreatePlane('labelPlate', {
            width: 0.5,
            height: 0.5
        }, this.scene);
        plate.position = position;

        const mat = new BABYLON.StandardMaterial('labelMat', this.scene);
        mat.emissiveColor = color;
        mat.alpha = 0.8;
        plate.material = mat;

        return plate;
    }

    createOrientationHelpers() {
        // Create floating cubes to show which axis is "up"
        const cube1 = BABYLON.MeshBuilder.CreateBox('cube1', {
            size: 0.8
        }, this.scene);
        cube1.position = new BABYLON.Vector3(3, 2, 0);

        const cubeMat = new BABYLON.StandardMaterial('cubeMat', this.scene);
        cubeMat.diffuseColor = new BABYLON.Color3(0.5, 0.4, 0.7);
        cubeMat.alpha = 0.7;
        cube1.material = cubeMat;

        // Add arrow pointing "up"
        const arrow = BABYLON.MeshBuilder.CreateCylinder('arrow', {
            height: 1,
            diameterTop: 0,
            diameterBottom: 0.3,
            tessellation: 16
        }, this.scene);
        arrow.position.y = 1.2;
        arrow.parent = cube1;

        const arrowMat = new BABYLON.StandardMaterial('arrowMat', this.scene);
        arrowMat.emissiveColor = new BABYLON.Color3(1, 1, 0);
        arrow.material = arrowMat;

        this.upArrow = arrow;
        this.helperCube = cube1;

        // Animate cube floating
        this.scene.registerBeforeRender(() => {
            cube1.position.y = 2 + Math.sin(Date.now() / 1000) * 0.3;
            cube1.rotation.y += 0.005;
        });
    }

    setupDragControls() {
        let isDragging = false;
        let previousPointerX = 0;
        let previousPointerY = 0;

        this.scene.onPointerDown = (evt, pickResult) => {
            if (evt.button === 0) { // Left click
                // Don't start drag if clicking on lever
                if (pickResult.pickedMesh && pickResult.pickedMesh.name === 'leverBall') {
                    return;
                }

                isDragging = true;
                previousPointerX = evt.clientX;
                previousPointerY = evt.clientY;
                this.canvas.style.cursor = 'grabbing';
            }
        };

        this.scene.onPointerUp = () => {
            isDragging = false;
            this.canvas.style.cursor = 'grab';
        };

        this.scene.onPointerMove = (evt) => {
            if (!isDragging) return;

            const deltaX = evt.clientX - previousPointerX;
            const deltaY = evt.clientY - previousPointerY;

            this.camera.alpha += deltaX * 0.01;
            this.camera.beta += deltaY * 0.01;

            // Clamp beta
            this.camera.beta = Math.max(0.1, Math.min(Math.PI - 0.1, this.camera.beta));

            previousPointerX = evt.clientX;
            previousPointerY = evt.clientY;
        };

        // Set initial cursor
        this.canvas.style.cursor = 'grab';
    }

    toggleCoordinateSystem() {
        this.isYUp = !this.isYUp;

        // Animate lever
        const targetRotation = this.isYUp ? Math.PI / 4 : -Math.PI / 4;

        BABYLON.Animation.CreateAndStartAnimation(
            'leverAnim',
            this.leverArm,
            'rotation.z',
            30,
            15,
            this.leverArm.rotation.z,
            targetRotation,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        // Animate coordinate system transformation
        this.animateCoordinateTransformation();

        // Update labels
        this.updateLabels();
    }

    animateCoordinateTransformation() {
        if (this.isYUp) {
            // Transform Z-up to Y-up
            // Y and Z swap, Y negated
            this.animateAxisTransform(this.axes.y, { x: 0, y: 1, z: 0 });
            this.animateAxisTransform(this.axes.z, { x: 0, y: 0, z: 1 });
        } else {
            // Transform Y-up to Z-up
            // Y and Z swap
            this.animateAxisTransform(this.axes.y, { x: 0, y: 0, z: -1 });
            this.animateAxisTransform(this.axes.z, { x: 0, y: 1, z: 0 });
        }

        // Update "up" arrow direction
        const targetArrowRotation = this.isYUp ? { x: 0, y: 0, z: 0 } : { x: Math.PI / 2, y: 0, z: 0 };
        BABYLON.Animation.CreateAndStartAnimation(
            'arrowAnim',
            this.upArrow,
            'rotation',
            30,
            15,
            this.upArrow.rotation,
            new BABYLON.Vector3(targetArrowRotation.x, targetArrowRotation.y, targetArrowRotation.z),
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
    }

    animateAxisTransform(axis, targetPos) {
        const axisLength = 5;
        const currentEndPos = axis.position.clone();
        const newEndPos = new BABYLON.Vector3(
            targetPos.x * axisLength / 2,
            targetPos.y * axisLength / 2,
            targetPos.z * axisLength / 2
        );

        BABYLON.Animation.CreateAndStartAnimation(
            'axisAnim',
            axis,
            'position',
            30,
            15,
            currentEndPos,
            newEndPos,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
    }

    updateLabels() {
        // Dispatch custom event for label updates
        const event = new CustomEvent('coordinateSystemChanged', {
            detail: {
                isYUp: this.isYUp,
                system: this.isYUp ? 'Y-up' : 'Z-up'
            }
        });
        window.dispatchEvent(event);
    }

    dispose() {
        this.engine.dispose();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.coordDemo = new CoordinateSystemsDemo('coordinate-canvas');
    });
} else {
    window.coordDemo = new CoordinateSystemsDemo('coordinate-canvas');
}
