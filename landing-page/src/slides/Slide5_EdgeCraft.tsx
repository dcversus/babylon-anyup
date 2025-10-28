import { motion } from 'framer-motion';
import { CodeBlock } from '../components/CodeBlock';
import { edgecraftCode } from '../data/edgecraft-code';
import './Slide.css';

export const Slide5_EdgeCraft = () => {
  return (
    <div className="slide slide-5">
      <div className="slide-content centered">
        <motion.div
          className="code-slide-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="slide-title">This is What We Had to Do...</h1>
          <h2 className="slide-subtitle">EdgeCraft's Coordinate Transformation Hell</h2>
        </motion.div>

        <motion.div
          className="code-container-large"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <CodeBlock
            code={edgecraftCode}
            language="typescript"
            showLineNumbers={true}
            gradientCorner={true}
            githubUrl="https://github.com/dcversus/edgecraft"
          />
        </motion.div>

        <motion.div
          className="code-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="stat-item">
            <div className="stat-number">70+</div>
            <div className="stat-label">Lines of Code</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-number">Every</div>
            <div className="stat-label">Mesh/Model/Terrain</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-number">∞</div>
            <div className="stat-label">Potential Bugs</div>
          </div>
        </motion.div>

        <motion.div
          className="pain-indicator"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <span className="pain-emoji">😫</span>
          <span className="pain-text">And this is just ONE asset type!</span>
        </motion.div>
      </div>
    </div>
  );
};
