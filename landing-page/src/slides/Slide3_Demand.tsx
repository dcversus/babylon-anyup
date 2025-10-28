import { motion } from 'framer-motion';
import { CommentBubble } from '../components/CommentBubble';
import { commentsData } from '../data/comments';
import './Slide.css';

export const Slide3_Demand = () => {
  const slideComments = commentsData.filter((c) => c.position.slide === 3);
  const mainComment = slideComments[0]; // The maintainer rejection comment

  return (
    <div className="slide slide-3">
      <div className="slide-content centered">
        {/* Animated Typography */}
        <motion.div
          className="typography-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="demand-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We want support for it
          </motion.h1>

          <motion.div
            className="but-text-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h2 className="but-text">But they...</h2>
          </motion.div>

          <motion.div
            className="dont-text-container"
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: [0, -2, 2, -2, 0],
            }}
            transition={{
              duration: 0.8,
              delay: 1.8,
              rotate: {
                duration: 0.5,
                delay: 2,
                repeat: Infinity,
                repeatDelay: 3,
              },
            }}
          >
            <h1 className="dont-text">DON'T</h1>
          </motion.div>
        </motion.div>

        {/* Large Focused Comment Bubble */}
        {mainComment && (
          <motion.div
            className="large-bubble-container"
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5, type: 'spring', stiffness: 100 }}
          >
            <CommentBubble comment={mainComment} scale={1.5} focused={true} />
          </motion.div>
        )}

        {/* Background particles or floating small requests */}
        <div className="background-requests">
          {['Please add Z-up...', 'We need this...', 'Blender support...', 'WC3 maps...'].map(
            (text, i) => (
              <motion.div
                key={i}
                className="floating-request"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.3, 0.3, 0],
                  y: [0, -20, -20, -40],
                }}
                transition={{
                  duration: 4,
                  delay: 0.5 + i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                {text}
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
