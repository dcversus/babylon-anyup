import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BabylonSwitcher } from '../components/BabylonSwitcher';
import './Slide.css';
import './Slide1_Intro.css';

export const Slide1_Intro = () => {
  const [switcherEnabled, setSwitcherEnabled] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedPackage, setCopiedPackage] = useState(false);

  // Auto-animate switcher from OFF to ON after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSwitcherEnabled(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install @dcversus/babylon-anyup');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleCopyPackage = () => {
    navigator.clipboard.writeText('@dcversus/babylon-anyup');
    setCopiedPackage(true);
    setTimeout(() => setCopiedPackage(false), 2000);
  };

  return (
    <div className="slide slide-1 intro-slide">
      <div className="slide-content intro-content">
        {/* Main Container - Max Width 1000px */}
        <div className="intro-container">
          {/* Two Column Layout */}
          <div className="intro-split">
            {/* Left Side - Title and Description */}
            <motion.div
              className="intro-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="title-with-copy">
                <h1 className="intro-title">
                  <span className="title-package">@dcversus/</span>
                  <span className="title-babylon">babylon</span>
                  <span className="title-anyup">-anyup</span>
                </h1>
                <button
                  className="title-copy-btn"
                  onClick={handleCopyPackage}
                  title="Copy package name"
                >
                  {copiedPackage ? (
                    <span className="copy-icon-small">✓</span>
                  ) : (
                    <span className="copy-icon-small">📋</span>
                  )}
                </button>
              </div>
              <p className="intro-description">
                A Babylon.js plugin for seamless Z-up coordinate system compatibility.
                <br />
                Born from building <a href="https://github.com/dcversus/edgecraft" target="_blank" rel="noopener noreferrer" className="intro-link">Edge Craft</a> - bringing Warcraft 3 & StarCraft 2 to the web.
              </p>
            </motion.div>

            {/* Right Side - 3D Babylon.js Scene */}
            <motion.div
              className="intro-right"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <BabylonSwitcher
                enabled={switcherEnabled}
                onToggle={() => setSwitcherEnabled(!switcherEnabled)}
              />
            </motion.div>
          </div>

          {/* Quick Start Code Example - Centered Below */}
          <motion.div
            className="intro-quickstart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <h3 className="quickstart-title">⚡ Quick Start</h3>

            {/* Installation Command */}
            <div className="install-code-container">
              <code className="install-code">
                npm install @dcversus/babylon-anyup
              </code>
              <button
                className="install-copy-btn"
                onClick={handleCopyInstall}
                title="Copy to clipboard"
              >
                {copiedInstall ? (
                  <span className="copy-icon">✓</span>
                ) : (
                  <span className="copy-icon">📋</span>
                )}
              </button>
            </div>

            {/* TypeScript Code Example with Syntax Highlighting */}
            <div className="code-example">
              <pre className="code-pre">
                <code className="code-typescript">
                  <span className="code-keyword">import</span> <span className="code-punctuation">{'{'}</span> AnyUpPlugin <span className="code-punctuation">{'}'}</span> <span className="code-keyword">from</span> <span className="code-string">'@dcversus/babylon-anyup'</span><span className="code-punctuation">;</span>{'\n'}
                  <span className="code-keyword">import</span> <span className="code-punctuation">{'{'}</span> Scene<span className="code-punctuation">,</span> Engine <span className="code-punctuation">{'}'}</span> <span className="code-keyword">from</span> <span className="code-string">'@babylonjs/core'</span><span className="code-punctuation">;</span>{'\n'}
                  {'\n'}
                  <span className="code-comment">// Create Babylon.js scene</span>{'\n'}
                  <span className="code-keyword">const</span> scene <span className="code-operator">=</span> <span className="code-keyword">new</span> <span className="code-function">Scene</span><span className="code-punctuation">(</span>engine<span className="code-punctuation">)</span><span className="code-punctuation">;</span>{'\n'}
                  {'\n'}
                  <span className="code-comment">// Initialize AnyUp plugin</span>{'\n'}
                  <span className="code-keyword">const</span> anyup <span className="code-operator">=</span> <span className="code-keyword">new</span> <span className="code-function">AnyUpPlugin</span><span className="code-punctuation">(</span><span className="code-punctuation">{'{'}</span>{'\n'}
                  {'  '}<span className="code-property">sourceSystem</span><span className="code-punctuation">:</span> <span className="code-string">'z-up'</span><span className="code-punctuation">,</span> <span className="code-comment">// Your model's coordinate system</span>{'\n'}
                  {'  '}<span className="code-property">targetSystem</span><span className="code-punctuation">:</span> <span className="code-string">'y-up'</span><span className="code-punctuation">,</span> <span className="code-comment">// Babylon.js uses Y-up</span>{'\n'}
                  {'  '}<span className="code-property">autoConvert</span><span className="code-punctuation">:</span> <span className="code-boolean">true</span><span className="code-punctuation">,</span>      <span className="code-comment">// Auto-transform all meshes</span>{'\n'}
                  <span className="code-punctuation">{'}'}</span><span className="code-punctuation">)</span><span className="code-punctuation">;</span>{'\n'}
                  {'\n'}
                  <span className="code-comment">// Attach to scene</span>{'\n'}
                  anyup<span className="code-punctuation">.</span><span className="code-function">initialize</span><span className="code-punctuation">(</span>scene<span className="code-punctuation">)</span><span className="code-punctuation">;</span>{'\n'}
                  {'\n'}
                  <span className="code-comment">// That's it! All meshes are now automatically converted ✓</span>
                </code>
              </pre>
            </div>

            {/* Links */}
            <div className="install-links">
              <a
                href="https://github.com/dcversus/babylon-anyup"
                target="_blank"
                rel="noopener noreferrer"
                className="install-link"
              >
                <span className="link-icon">⭐</span>
                <span>Star on GitHub</span>
              </a>
              <a
                href="https://www.npmjs.com/package/@dcversus/babylon-anyup"
                target="_blank"
                rel="noopener noreferrer"
                className="install-link"
              >
                <span className="link-icon">📦</span>
                <span>View on npm</span>
              </a>
            </div>
          </motion.div>
        </div>

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
