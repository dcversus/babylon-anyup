import { useEffect, useRef, useState } from 'react';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Color4,
  Mesh,
  AxesViewer,
} from '@babylonjs/core';
import { motion } from 'framer-motion';
import './BabylonSwitcher.css';

interface BabylonSwitcherProps {
  enabled: boolean;
  onToggle: () => void;
}

export const BabylonSwitcher = ({ enabled, onToggle }: BabylonSwitcherProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const switcherRef = useRef<Mesh | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

    // Create scene
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0); // Transparent background
    sceneRef.current = scene;

    // Camera
    const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 3, 5, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 3;
    camera.upperRadiusLimit = 8;
    camera.wheelPrecision = 50;

    // Light
    const light = new HemisphericLight('light', new Vector3(1, 1, 0), scene);
    light.intensity = 0.8;

    // Grid
    const grid = MeshBuilder.CreateGround('grid', { width: 4, height: 4, subdivisions: 10 }, scene);
    const gridMaterial = new StandardMaterial('gridMat', scene);
    gridMaterial.wireframe = true;
    gridMaterial.emissiveColor = new Color3(0.2, 0.2, 0.3);
    gridMaterial.alpha = 0.3;
    grid.material = gridMaterial;
    grid.position.y = -0.5;

    // Axes viewer
    new AxesViewer(scene, 1.5);

    // Create main model (cube for now)
    const model = MeshBuilder.CreateBox('model', { size: 1 }, scene);
    const modelMaterial = new StandardMaterial('modelMat', scene);
    modelMaterial.diffuseColor = new Color3(0.35, 0.38, 0.95); // Babylon blue
    modelMaterial.specularColor = new Color3(0.5, 0.5, 0.5);
    modelMaterial.emissiveColor = new Color3(0.1, 0.1, 0.2);
    model.material = modelMaterial;
    model.position.y = 0.5;

    // Create mechanical switcher (train-style)
    const createSwitcher = () => {
      // Base platform
      const base = MeshBuilder.CreateBox('base', { width: 2, height: 0.1, depth: 0.6 }, scene);
      const baseMat = new StandardMaterial('baseMat', scene);
      baseMat.diffuseColor = new Color3(0.2, 0.2, 0.2);
      base.material = baseMat;
      base.position.y = -1;

      // Track (lever arm)
      const track = MeshBuilder.CreateBox('track', { width: 1.2, height: 0.05, depth: 0.2 }, scene);
      const trackMat = new StandardMaterial('trackMat', scene);
      trackMat.diffuseColor = new Color3(0.6, 0.6, 0.6);
      track.material = trackMat;
      track.position.y = -0.9;
      track.parent = base;

      // Lever handle
      const lever = MeshBuilder.CreateCylinder('lever', { height: 0.6, diameter: 0.1 }, scene);
      const leverMat = new StandardMaterial('leverMat', scene);
      leverMat.diffuseColor = new Color3(0.8, 0.2, 0.2);
      leverMat.emissiveColor = new Color3(0.2, 0, 0);
      lever.material = leverMat;
      lever.position.set(0, 0.2, 0);
      lever.parent = track;

      // "ENABLE Z-UP!" text (using plane with text texture)
      const textPlane = MeshBuilder.CreatePlane('textPlane', { width: 1.8, height: 0.3 }, scene);
      const textMat = new StandardMaterial('textMat', scene);
      textMat.diffuseColor = new Color3(1, 1, 1);
      textMat.emissiveColor = new Color3(0.3, 0.3, 0.3);
      textPlane.material = textMat;
      textPlane.position.set(0, 0.5, 0);
      textPlane.rotation.x = Math.PI / 2;
      textPlane.parent = base;

      switcherRef.current = base;
      return base;
    };

    const switcher = createSwitcher();

    // Animate model rotation
    scene.registerBeforeRender(() => {
      if (model) {
        model.rotation.y += 0.01;
        model.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      }

      // Rotate switcher lever based on enabled state
      if (switcher) {
        const targetRotation = enabled ? Math.PI / 4 : -Math.PI / 4;
        const currentRotation = switcher.rotation.y;
        switcher.rotation.y += (targetRotation - currentRotation) * 0.1;
      }
    });

    // Render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Handle resize
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.dispose();
      engine.dispose();
    };
  }, [enabled]);

  return (
    <motion.div
      className="babylon-switcher-container"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div
        className="babylon-switcher-wrapper"
        onClick={onToggle}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          cursor: 'pointer',
          transform: isHovering ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease',
        }}
      >
        <canvas
          ref={canvasRef}
          className="babylon-switcher-canvas"
          style={{
            width: '100%',
            height: '100%',
            outline: 'none',
          }}
        />
        <div className="babylon-switcher-overlay">
          <div className="switcher-label-3d">ENABLE Z-UP!</div>
          <div className={`switcher-status-3d ${enabled ? 'enabled' : 'disabled'}`}>
            {enabled ? 'ON ✓' : 'OFF'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
