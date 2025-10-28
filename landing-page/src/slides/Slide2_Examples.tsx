import { motion } from 'framer-motion';
import { BabylonScene } from '../components/BabylonScene';
import { createScene2 } from '../babylon/scene2';
import './Slide.css';

export const Slide2_Examples = () => {

  const software = [
    // Z-up Software
    { name: 'Warcraft 3', color: '#c41e3a', system: 'Z-up' },
    { name: 'StarCraft 2', color: '#1ca3d6', system: 'Z-up' },
    { name: 'Blender', color: '#ea7600', system: 'Z-up' },
    { name: '3ds Max', color: '#00b8a9', system: 'Z-up' },
    { name: 'AutoCAD', color: '#e51937', system: 'Z-up' },
    { name: 'Unreal Engine', color: '#0e1128', system: 'Z-up' },
    // Y-up Software
    { name: 'Unity', color: '#000000', system: 'Y-up' },
    { name: 'Maya', color: '#37a3a3', system: 'Y-up' },
    { name: 'Cinema 4D', color: '#011a6a', system: 'Y-up' },
    { name: 'Houdini', color: '#ff4713', system: 'Y-up' },
    { name: 'Modo', color: '#0099ff', system: 'Y-up' },
    { name: 'Babylon.js', color: '#bb464b', system: 'Y-up' },
  ];

  return (
    <div className="slide slide-2">
      <div className="slide-content">
        {/* Text Content - Left side */}
        <motion.div
          className="text-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="slide-title">Coordinate Systems in 3D</h1>
          <h2 className="slide-subtitle">Y-up vs Z-up: The Fundamental Divide</h2>

          <div className="software-grid">
            {software.map((item, index) => (
              <motion.div
                key={item.name}
                className="software-card"
                style={{ borderLeft: `4px solid ${item.color}` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              >
                <div className="software-name">{item.name}</div>
                <div className={`software-tag ${item.system === 'Z-up' ? 'zup' : 'yup'}`}>
                  {item.system}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="import-arrow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="arrow-text">Import to Babylon.js (Y-up)</div>
            <div className="arrow-icon">↓</div>
          </motion.div>

          <motion.div
            className="warning-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <span className="warning-icon">⚠️</span>
            <span className="warning-text">Everything falls over!</span>
          </motion.div>
        </motion.div>

        {/* Babylon.js Scene - Right side */}
        <div className="scene-container">
          <BabylonScene onSceneReady={createScene2} />
          <div className="scene-label">Watch the model fall over →</div>
        </div>
      </div>
    </div>
  );
};
