import { useEffect, useRef } from 'react';
import { Engine, Scene } from '@babylonjs/core';
import './BabylonScene.css';

interface BabylonSceneProps {
  onSceneReady: (scene: Scene) => void;
  onRender?: (scene: Scene) => void;
  className?: string;
}

export const BabylonScene = ({ onSceneReady, onRender, className = '' }: BabylonSceneProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const sceneRef = useRef<Scene | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create engine
    const engine = new Engine(canvasRef.current, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });
    engineRef.current = engine;

    // Create scene
    const scene = new Scene(engine);
    sceneRef.current = scene;

    // Call user's scene setup
    onSceneReady(scene);

    // Run render loop
    engine.runRenderLoop(() => {
      if (onRender) {
        onRender(scene);
      }
      scene.render();
    });

    // Handle window resize
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
  }, [onSceneReady, onRender]);

  return <canvas ref={canvasRef} className={`babylon-canvas ${className}`} />;
};
