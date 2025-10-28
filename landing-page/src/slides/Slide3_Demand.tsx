import { motion } from 'framer-motion';
import './Slide.css';

export const Slide3_Demand = () => {
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

            {/* BOOM explosion effect */}
            <motion.div
              className="boom-effect"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 2, 2.5],
              }}
              transition={{
                duration: 1.5,
                delay: 2.5,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            >
              💥
            </motion.div>
          </motion.div>

          {/* Impact shockwave rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`shockwave-${i}`}
              className="shockwave-ring"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 3],
              }}
              transition={{
                duration: 2,
                delay: 2.5 + i * 0.2,
                repeat: Infinity,
                repeatDelay: 4 - i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
