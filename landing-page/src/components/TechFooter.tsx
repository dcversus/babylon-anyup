import { motion } from 'framer-motion';
import './TechFooter.css';

export const TechFooter = () => {
  return (
    <motion.footer
      className="tech-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="tech-footer-content">
        {/* Package Info */}
        <motion.div
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="footer-heading">babylon-anyup</h3>
          <p className="footer-description">
            Seamless Z-up coordinate system compatibility for Babylon.js
          </p>
          <div className="footer-badges">
            <a
              href="https://www.npmjs.com/package/@dcversus/babylon-anyup"
              target="_blank"
              rel="noopener noreferrer"
              className="badge-link"
            >
              <img
                src="https://img.shields.io/npm/v/@dcversus/babylon-anyup?style=flat-square&color=5865F2"
                alt="npm version"
              />
            </a>
            <a
              href="https://github.com/dcversus/babylon-anyup/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="badge-link"
            >
              <img
                src="https://img.shields.io/github/license/dcversus/babylon-anyup?style=flat-square&color=5865F2"
                alt="license"
              />
            </a>
            <a
              href="https://www.npmjs.com/package/@dcversus/babylon-anyup"
              target="_blank"
              rel="noopener noreferrer"
              className="badge-link"
            >
              <img
                src="https://img.shields.io/npm/dm/@dcversus/babylon-anyup?style=flat-square&color=5865F2"
                alt="downloads"
              />
            </a>
          </div>
        </motion.div>

        {/* GitHub Section */}
        <motion.div
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="footer-heading">Open Source</h3>
          <div className="github-widget">
            <a
              href="https://github.com/dcversus/babylon-anyup"
              target="_blank"
              rel="noopener noreferrer"
              className="github-star-button"
            >
              <span className="star-icon">⭐</span>
              <span className="star-text">Star on GitHub</span>
            </a>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=dcversus&repo=babylon-anyup&type=star&count=true&size=large"
              frameBorder="0"
              scrolling="0"
              width="170"
              height="30"
              title="GitHub Stars"
              className="github-iframe"
            />
          </div>
          <p className="footer-subtext">
            Built with ❤️ for the Babylon.js community
          </p>
        </motion.div>

        {/* Links Section */}
        <motion.div
          className="footer-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="footer-heading">Resources</h3>
          <ul className="footer-links">
            <li>
              <a
                href="https://github.com/dcversus/babylon-anyup#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                📖 Documentation
              </a>
            </li>
            <li>
              <a
                href="https://github.com/dcversus/babylon-anyup/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                🐛 Report Issues
              </a>
            </li>
            <li>
              <a
                href="https://github.com/dcversus/edgecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                🎮 Edge Craft Project
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/@dcversus/babylon-anyup"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                📦 npm Package
              </a>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        className="footer-copyright"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <p>
          © {new Date().getFullYear()} <a href="https://github.com/dcversus" target="_blank" rel="noopener noreferrer" className="author-link">dcversus</a>
          {' • '}
          Licensed under <a href="https://github.com/dcversus/babylon-anyup/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="license-link">GNU AGPLv3</a>
        </p>
      </motion.div>
    </motion.footer>
  );
};
