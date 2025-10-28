import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { commentsData } from '../data/comments';
import type { CommentBubble as CommentBubbleType } from '../types';
import './FloatingBubbles.css';

export const FloatingBubbles = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="floating-bubbles-container">
      {commentsData.map((comment) => (
        <FloatingBubble
          key={comment.id}
          comment={comment}
          scrollProgress={scrollYProgress}
        />
      ))}
    </div>
  );
};

interface FloatingBubbleProps {
  comment: CommentBubbleType;
  scrollProgress: MotionValue<number>;
}

const FloatingBubble = ({ comment, scrollProgress }: FloatingBubbleProps) => {
  const sceneIndex = comment.position.slide - 1;
  const totalScenes = 6;

  const sceneStartProgress = sceneIndex / totalScenes;
  const sceneEndProgress = (sceneIndex + 1) / totalScenes;

  // Calculate bubble position - it floats within its scene
  // x and y are percentages (0-100) relative to viewport
  const baseX = comment.position.x;
  const baseY = comment.position.y;

  // Add slight floating animation based on scroll progress within the scene
  const sceneMidProgress = (sceneStartProgress + sceneEndProgress) / 2;

  const x = useTransform(
    scrollProgress,
    [sceneStartProgress, sceneMidProgress, sceneEndProgress],
    [baseX, baseX + 3, baseX - 2] // Subtle horizontal drift
  );

  const y = useTransform(
    scrollProgress,
    [sceneStartProgress, sceneMidProgress, sceneEndProgress],
    [baseY, baseY - 4, baseY + 2] // Subtle vertical drift
  );

  // Fix opacity for all scenes - fade in before scene, fade out after scene
  const fadeMargin = 0.08; // 8% of total scroll for fade transitions

  const opacity = useTransform(
    scrollProgress,
    [
      Math.max(0, sceneStartProgress - fadeMargin),
      sceneStartProgress,
      sceneEndProgress,
      Math.min(1, sceneEndProgress + fadeMargin)
    ],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
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

  const style = platformStyles[comment.source.platform];

  return (
    <motion.a
      href={comment.source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-bubble"
      style={{
        ...style,
        x: useTransform(x, (val) => `${val}vw`),
        y: useTransform(y, (val) => `${val}vh`),
        opacity,
        scale,
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
};
