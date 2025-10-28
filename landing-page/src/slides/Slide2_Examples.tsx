import { motion } from 'framer-motion';
import { BabylonScene } from '../components/BabylonScene';
import { CommentBubble } from '../components/CommentBubble';
import { createScene2 } from '../babylon/scene2';
import { commentsData } from '../data/comments';
import './Slide.css';

export const Slide2_Examples = () => {
  const slideComments = commentsData.filter((c) => c.position.slide === 2);

  const zUpSoftware = [
    { name: 'Warcraft 3', color: '#c41e3a' },
    { name: 'StarCraft 2', color: '#1ca3d6' },
    { name: 'Blender', color: '#ea7600' },
    { name: '3ds Max', color: '#00b8a9' },
    { name: 'OpenGL', color: '#5586a4' },
    { name: 'AutoCAD', color: '#e51937' },
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
          <h1 className="slide-title">Where Z-up Lives</h1>
          <h2 className="slide-subtitle">Game Engines, 3D Software & CAD</h2>

          <div className="software-grid">
            {zUpSoftware.map((software, index) => (
              <motion.div
                key={software.name}
                className="software-card"
                style={{ borderLeft: `4px solid ${software.color}` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="software-name">{software.name}</div>
                <div className="software-tag">Z-up</div>
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

        {/* Floating Comment Bubbles */}
        {slideComments.map((comment) => (
          <CommentBubble key={comment.id} comment={comment} scale={0.8} />
        ))}
      </div>
    </div>
  );
};
