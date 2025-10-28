import { motion } from 'framer-motion';
import { BabylonScene } from '../components/BabylonScene';
import { createScene4 } from '../babylon/scene4';
import './Slide.css';

export const Slide4_Solutions = () => {
  const solutions = [
    {
      id: 1,
      solution: 'Just rotate -90° on X axis',
      problem: '❌ Mirrored textures',
      problemColor: '#ef4444',
    },
    {
      id: 2,
      solution: 'Transform each vertex manually',
      problem: '🐌 Performance hit',
      problemColor: '#f59e0b',
    },
    {
      id: 3,
      solution: 'Use transformation matrix',
      problem: '📝 100+ lines of code',
      problemColor: '#8b5cf6',
    },
  ];

  return (
    <div className="slide slide-4">
      <div className="slide-content">
        {/* Text Content - Left side */}
        <motion.div
          className="text-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="slide-title">Community Solutions</h1>
          <h2 className="slide-subtitle">...and Their Problems</h2>

          <div className="solutions-list">
            {solutions.map((item, index) => (
              <motion.div
                key={item.id}
                className="solution-item"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              >
                <div className="solution-bubble">
                  <div className="solution-text">{item.solution}</div>
                </div>

                <motion.div
                  className="problem-badge"
                  style={{ background: item.problemColor }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.2 }}
                >
                  {item.problem}
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="conclusion-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <span className="conclusion-icon">💡</span>
            <span className="conclusion-text">
              Every solution has trade-offs: complexity, performance, or bugs
            </span>
          </motion.div>
        </motion.div>

        {/* Babylon.js Scene - Right side */}
        <div className="scene-container">
          <BabylonScene onSceneReady={createScene4} />
          <div className="scene-label">Compare: Correct vs Wrong transformation</div>
        </div>
      </div>
    </div>
  );
};
