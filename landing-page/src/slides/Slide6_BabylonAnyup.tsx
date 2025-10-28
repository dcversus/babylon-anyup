import { motion } from 'framer-motion';
import { BabylonScene } from '../components/BabylonScene';
import { CodeBlock } from '../components/CodeBlock';
import { createScene6 } from '../babylon/scene6';
import './Slide.css';

const solutionCode = `import { AnyUpPlugin } from '@dcversus/babylon-anyup';

const plugin = new AnyUpPlugin({
  sourceSystem: 'z-up',
  targetSystem: 'y-up',
  autoConvert: true
});

plugin.initialize(scene);

// That's it! ✨`;

export const Slide6_BabylonAnyup = () => {
  return (
    <div className="slide slide-6">
      <div className="slide-content">
        {/* Babylon.js Scene - Left side */}
        <div className="scene-container scene-hero">
          <BabylonScene onSceneReady={createScene6} />
        </div>

        {/* Text Content - Right side */}
        <motion.div
          className="text-content"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="slide-title solution-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            babylon-anyup
          </motion.h1>

          <motion.h2
            className="slide-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            The Solution
          </motion.h2>

          <motion.div
            className="transformation-comparison"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="comparison-item before">
              <div className="comparison-number">70+</div>
              <div className="comparison-label">Lines Before</div>
            </div>
            <div className="comparison-arrow">→</div>
            <div className="comparison-item after">
              <div className="comparison-number">3</div>
              <div className="comparison-label">Lines After</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <CodeBlock
              code={solutionCode}
              language="typescript"
              showLineNumbers={false}
              gradientCorner={false}
            />
          </motion.div>

          <motion.div
            className="benefits-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <div className="benefit-card">
              <div className="benefit-icon">✓</div>
              <div className="benefit-text">Automatic conversion</div>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">✓</div>
              <div className="benefit-text">Zero mistakes</div>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">✓</div>
              <div className="benefit-text">22M ops/sec</div>
            </div>
          </motion.div>

          <motion.div
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <a
              href="https://www.npmjs.com/package/@dcversus/babylon-anyup"
              className="cta-button primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Get Started</span>
              <span className="button-arrow">→</span>
            </a>
            <a
              href="https://github.com/dcversus/babylon-anyup"
              className="cta-button secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span>View on GitHub</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
