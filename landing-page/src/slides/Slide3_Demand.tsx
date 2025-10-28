import { motion } from 'framer-motion';
import './Slide.css';

export const Slide3_Demand = () => {
  // Floating request messages in background
  const requestMessages = [
    { text: 'Z-up support please...', x: '10%', y: '15%', delay: 0 },
    { text: 'Can we get Z-up?', x: '85%', y: '25%', delay: 0.5 },
    { text: 'Need coordinate transform', x: '15%', y: '70%', delay: 1 },
    { text: 'When Z-up support?', x: '80%', y: '65%', delay: 1.5 },
    { text: 'Babylon Z-up please', x: '20%', y: '40%', delay: 2 },
    { text: 'Import from Blender broken', x: '75%', y: '45%', delay: 2.5 },
  ];

  return (
    <div className="slide slide-3">
      <div className="slide-content centered">
        {/* Background Floating Requests */}
        <div className="background-requests">
          {requestMessages.map((msg, index) => (
            <motion.div
              key={index}
              className="floating-request"
              style={{
                left: msg.x,
                top: msg.y,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                y: [-10, 10, -10],
              }}
              transition={{
                opacity: {
                  duration: 4,
                  repeat: Infinity,
                  delay: msg.delay,
                },
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: msg.delay,
                },
              }}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

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
