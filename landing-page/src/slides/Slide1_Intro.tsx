import { motion } from 'framer-motion';
import { BabylonScene } from '../components/BabylonScene';
import { CommentBubble } from '../components/CommentBubble';
import { createScene1 } from '../babylon/scene1';
import { commentsData } from '../data/comments';
import './Slide.css';

export const Slide1_Intro = () => {
  const slideComments = commentsData.filter((c) => c.position.slide === 1);

  return (
    <div className="slide slide-1">
      <div className="slide-content">
        {/* Babylon.js Scene - Left side */}
        <div className="scene-container">
          <BabylonScene onSceneReady={createScene1} />
        </div>

        {/* Text Content - Right side */}
        <motion.div
          className="text-content"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="slide-title">Coordinate Systems in 3D</h1>
          <h2 className="slide-subtitle">Y-up vs Z-up: The Fundamental Divide</h2>
          <div className="slide-description">
            <p>
              In the world of 3D graphics, there are two primary coordinate system conventions:
            </p>
            <ul className="feature-list">
              <li>
                <strong>Y-up:</strong> Used by Babylon.js, Unity, and many game engines
              </li>
              <li>
                <strong>Z-up:</strong> Used by Blender, 3ds Max, Warcraft 3, and CAD software
              </li>
            </ul>
            <p className="highlight">
              This fundamental difference causes massive friction when importing models and assets.
            </p>
          </div>
        </motion.div>

        {/* Floating Comment Bubbles */}
        {slideComments.map((comment) => (
          <CommentBubble key={comment.id} comment={comment} scale={0.8} />
        ))}
      </div>
    </div>
  );
};
