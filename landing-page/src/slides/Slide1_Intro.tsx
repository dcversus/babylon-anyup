import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Slide.css';
import './Slide1_Intro.css';

export const Slide1_Intro = () => {
  const [switcherEnabled, setSwitcherEnabled] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-animate switcher from OFF to ON after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSwitcherEnabled(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install @dcversus/babylon-anyup');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="slide slide-1 intro-slide">
      <div className="slide-content intro-content">
        {/* Main Content - Centered */}
        <motion.div
          className="intro-main"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Floating Container */}
          <motion.div
            className="intro-floating-container"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Rotating Figure */}
            <motion.div
              className="intro-figure"
              animate={{
                rotateY: switcherEnabled ? 360 : 0,
                scale: switcherEnabled ? 1.1 : 1,
              }}
              transition={{
                rotateY: {
                  duration: switcherEnabled ? 2 : 0,
                  ease: 'easeOut',
                },
                scale: {
                  duration: 0.5,
                  ease: 'easeOut',
                },
              }}
            >
              <div className="figure-cube">
                <div className="cube-face cube-front">Z</div>
                <div className="cube-face cube-back">↑</div>
                <div className="cube-face cube-right">✓</div>
                <div className="cube-face cube-left">✓</div>
                <div className="cube-face cube-top">✓</div>
                <div className="cube-face cube-bottom">✓</div>
              </div>
            </motion.div>

            {/* Switcher */}
            <motion.div
              className="intro-switcher"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                className={`switcher-button ${switcherEnabled ? 'enabled' : ''}`}
                onClick={() => setSwitcherEnabled(!switcherEnabled)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="switcher-label">Enable Z-up!</span>
                <div className="switcher-track">
                  <motion.div
                    className="switcher-thumb"
                    animate={{
                      x: switcherEnabled ? 28 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                </div>
                <span className={`switcher-status ${switcherEnabled ? 'on' : 'off'}`}>
                  {switcherEnabled ? 'ON' : 'OFF'}
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Title and Description */}
          <motion.div
            className="intro-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="intro-title">
              <span className="title-babylon">babylon</span>
              <span className="title-anyup">-anyup</span>
            </h1>
            <p className="intro-description">
              A Babylon.js plugin for seamless Z-up coordinate system compatibility.
              <br />
              Born from building <a href="https://github.com/dcversus/edgecraft" target="_blank" rel="noopener noreferrer" className="intro-link">Edge Craft</a> - bringing Warcraft 3 & StarCraft 2 to the web.
            </p>
          </motion.div>

          {/* Installation Guide */}
          <motion.div
            className="intro-install"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h3 className="install-title">Quick Start</h3>
            <div className="install-code-container">
              <code className="install-code">npm install @dcversus/babylon-anyup</code>
              <button
                className="install-copy-btn"
                onClick={handleCopyInstall}
                title="Copy to clipboard"
              >
                {copied ? (
                  <span className="copy-icon">✓</span>
                ) : (
                  <span className="copy-icon">📋</span>
                )}
              </button>
            </div>
            <div className="install-links">
              <a
                href="https://github.com/dcversus/babylon-anyup"
                target="_blank"
                rel="noopener noreferrer"
                className="install-link"
              >
                <span className="link-icon">⭐</span>
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/@dcversus/babylon-anyup"
                target="_blank"
                rel="noopener noreferrer"
                className="install-link"
              >
                <span className="link-icon">📦</span>
                npm
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="scroll-arrow"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ↓
          </motion.div>
          <span className="scroll-text">Scroll to explore</span>
        </motion.div>
      </div>
    </div>
  );
};
