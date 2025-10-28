import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { commentsData } from '../data/comments';
import type { CommentBubble as CommentBubbleType } from '../types';
import './FloatingBubbles.css';

type ClusterState = 'clustered' | 'exploding' | 'scattered' | 're-clustering';

export const FloatingBubbles = () => {
  const { scrollYProgress } = useScroll();
  const [clusterState, setClusterState] = useState<ClusterState>('clustered');
  const [showBoomText, setShowBoomText] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const triggerBoom = useCallback(() => {
    setClusterState('exploding');
    setShowBoomText(true);

    // Hide BOOM text after 1 second
    setTimeout(() => setShowBoomText(false), 1000);

    // Transition to scattered after explosion animation
    setTimeout(() => {
      setClusterState('scattered');
      setLastScrollY(scrollYProgress.get() * 100);
    }, 800);
  }, [scrollYProgress]);

  // Auto-trigger first BOOM after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (clusterState === 'clustered') {
        triggerBoom();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [clusterState, triggerBoom]);

  // Monitor scroll to re-cluster bubbles
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const currentScroll = latest * 100;

      // If scrolled significantly (more than 15% in either direction) while scattered
      if (clusterState === 'scattered' && Math.abs(currentScroll - lastScrollY) > 15) {
        setClusterState('re-clustering');
        setTimeout(() => {
          setClusterState('clustered');
          setLastScrollY(currentScroll);
        }, 1500);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, clusterState, lastScrollY]);

  const handleClusterClick = () => {
    if (clusterState === 'clustered') {
      triggerBoom();
    }
  };

  return (
    <div className="floating-bubbles-container">
      {/* BOOM text animation */}
      <AnimatePresence>
        {showBoomText && (
          <motion.div
            className="boom-text"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.5, 1.8, 2],
              rotate: [10, -5, 5, 0]
            }}
            exit={{ opacity: 0, scale: 3 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            💥 BOOM!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cluster click trigger */}
      {clusterState === 'clustered' && (
        <motion.button
          className="cluster-trigger"
          onClick={handleClusterClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="cluster-count">{commentsData.length}</span>
          <span className="cluster-label">💬 Click to explode!</span>
        </motion.button>
      )}

      {/* Floating bubbles */}
      {commentsData.map((comment, index) => (
        <FloatingBubble
          key={comment.id}
          comment={comment}
          scrollProgress={scrollYProgress}
          clusterState={clusterState}
          delay={index * 0.05} // Staggered animation
        />
      ))}
    </div>
  );
};

interface FloatingBubbleProps {
  comment: CommentBubbleType;
  scrollProgress: MotionValue<number>;
  clusterState: ClusterState;
  delay: number;
}

const FloatingBubble = ({ comment, scrollProgress, clusterState, delay }: FloatingBubbleProps) => {
  const sceneIndex = comment.position.slide - 1;
  const totalScenes = 6;

  const sceneStartProgress = sceneIndex / totalScenes;
  const sceneEndProgress = (sceneIndex + 1) / totalScenes;

  // Calculate bubble position
  const baseX = comment.position.x;
  const baseY = comment.position.y;

  // Cluster position (right side, vertically centered)
  const clusterX = 85; // 85vw from left
  const clusterY = 50; // 50vh from top

  // Add slight floating animation based on scroll progress within the scene
  const sceneMidProgress = (sceneStartProgress + sceneEndProgress) / 2;

  const x = useTransform(
    scrollProgress,
    [sceneStartProgress, sceneMidProgress, sceneEndProgress],
    [baseX, baseX + 3, baseX - 2]
  );

  const y = useTransform(
    scrollProgress,
    [sceneStartProgress, sceneMidProgress, sceneEndProgress],
    [baseY, baseY - 4, baseY + 2]
  );

  const fadeMargin = 0.08;

  const scrollOpacity = useTransform(
    scrollProgress,
    [
      Math.max(0, sceneStartProgress - fadeMargin),
      sceneStartProgress,
      sceneEndProgress,
      Math.min(1, sceneEndProgress + fadeMargin)
    ],
    [0, 1, 1, 0]
  );

  const scrollScale = useTransform(
    scrollProgress,
    [
      Math.max(0, sceneStartProgress - fadeMargin),
      sceneStartProgress,
      sceneMidProgress,
      sceneEndProgress,
      Math.min(1, sceneEndProgress + fadeMargin)
    ],
    [0.7, 0.95, 1, 0.95, 0.7]
  );

  // Check if this is the special BOOM bubble (deltakosh - last bubble)
  const isBoomBubble = comment.author.name.toLowerCase().includes('deltakosh');

  // Transform values for scattered state
  const xTransformed = useTransform(x, (val) => `${val}vw`);
  const yTransformed = useTransform(y, (val) => `${val}vh`);
  const scaleTransformed = useTransform(scrollScale, (val) => isBoomBubble ? val * 1.3 : val);

  // Determine animation state based on cluster state (for non-scattered states)
  const getAnimationProps = () => {
    switch (clusterState) {
      case 'clustered': {
        return {
          x: `${clusterX}vw`,
          y: `${clusterY}vh`,
          opacity: 0.3,
          scale: 0.4,
          transition: { duration: 0.6, delay: delay * 0.3 }
        };
      }

      case 'exploding': {
        // Random explosion direction
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 20;
        const explosionX = clusterX + Math.cos(angle) * distance;
        const explosionY = clusterY + Math.sin(angle) * distance;

        return {
          x: `${explosionX}vw`,
          y: `${explosionY}vh`,
          opacity: 1,
          scale: isBoomBubble ? 2 : 1.2,
          rotate: (Math.random() - 0.5) * 360,
          transition: {
            type: 'spring' as const,
            stiffness: 200,
            damping: 15,
            delay: delay
          }
        };
      }

      case 're-clustering': {
        return {
          x: `${clusterX}vw`,
          y: `${clusterY}vh`,
          opacity: 0.3,
          scale: 0.4,
          rotate: 0,
          transition: { duration: 1, delay: delay * 0.5 }
        };
      }

      default: {
        return {
          x: `${clusterX}vw`,
          y: `${clusterY}vh`,
          opacity: 0.3,
          scale: 0.4,
        };
      }
    }
  };

  const platformStyles = {
    github: {
      background: 'linear-gradient(135deg, #24292e 0%, #1a1e22 100%)',
      border: '1px solid #30363d',
    },
    forum: {
      background: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
      border: '1px solid #4752C4',
    },
    stackoverflow: {
      background: 'linear-gradient(135deg, #f48024 0%, #d96f1f 100%)',
      border: '1px solid #d96f1f',
    },
  };

  const baseStyle = platformStyles[comment.source.platform];

  // For 'scattered' state, use style prop with MotionValues
  // For other states, use animate prop with plain values
  if (clusterState === 'scattered') {
    return (
      <motion.a
        href={comment.source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-bubble"
        style={{
          ...baseStyle,
          x: xTransformed,
          y: yTransformed,
          opacity: scrollOpacity,
          scale: scaleTransformed,
        }}
        whileHover={{
          scale: 1.15,
          transition: { duration: 0.2 }
        }}
      >
        <div className="bubble-header">
          <img src={comment.author.avatar} alt={comment.author.name} className="bubble-avatar" />
          <div className="bubble-author">
            <span className="bubble-name">{comment.author.name}</span>
            <span className="bubble-platform">{comment.source.platform}</span>
          </div>
        </div>
        <div className="bubble-content">{comment.content}</div>
        <div className="bubble-date">
          {new Date(comment.source.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
          })}
        </div>
      </motion.a>
    );
  }

  // For non-scattered states, use animate prop
  return (
    <motion.a
      href={comment.source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-bubble"
      style={baseStyle}
      animate={getAnimationProps()}
      whileHover={clusterState === 'clustered' ? {
        scale: 1.1,
        transition: { duration: 0.2 }
      } : undefined}
    >
      <div className="bubble-header">
        <img src={comment.author.avatar} alt={comment.author.name} className="bubble-avatar" />
        <div className="bubble-author">
          <span className="bubble-name">{comment.author.name}</span>
          <span className="bubble-platform">{comment.source.platform}</span>
        </div>
      </div>
      <div className="bubble-content">{comment.content}</div>
      <div className="bubble-date">
        {new Date(comment.source.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short'
        })}
      </div>
    </motion.a>
  );
};
