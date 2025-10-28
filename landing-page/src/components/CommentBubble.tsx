import { motion } from 'framer-motion';
import type { CommentBubble as CommentBubbleType } from '../types';
import './CommentBubble.css';

interface CommentBubbleProps {
  comment: CommentBubbleType;
  scale?: number;
  focused?: boolean;
}

export const CommentBubble = ({ comment, scale = 1, focused = false }: CommentBubbleProps) => {
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
      className={`comment-bubble ${focused ? 'focused' : ''}`}
      style={{
        ...style,
        scale,
        left: `${comment.position.x}%`,
        top: `${comment.position.y}%`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
        scale: focused ? 1.5 : scale,
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        opacity: { duration: 0.5 },
        scale: { duration: 0.3 },
      }}
      whileHover={{ scale: focused ? 1.6 : scale * 1.1 }}
    >
      <div className="comment-bubble-header">
        <img src={comment.author.avatar} alt={comment.author.name} className="comment-avatar" />
        <div className="comment-author">
          <span className="comment-name">{comment.author.name}</span>
          <span className="comment-platform">{comment.source.platform}</span>
        </div>
      </div>
      <div className="comment-content">{comment.content}</div>
    </motion.a>
  );
};
