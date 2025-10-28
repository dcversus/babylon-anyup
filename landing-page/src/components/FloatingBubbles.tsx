import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { commentsData } from '../data/comments';
import type { CommentBubble as CommentBubbleType, Vec2, BubblePhysics, BubbleState } from '../types';
import './FloatingBubbles.css';

const CLUSTER_X = 85; // 85vw
const CLUSTER_Y = 50; // 50vh
const BUBBLE_RADIUS = 30; // Collision radius in pixels
const FRICTION = 0.95;
const EDGE_MARGIN = 20; // Pixels from edge
const RETURN_WAIT_TIME = 3000; // 3 seconds at border before returning
const AUTO_RELEASE_INTERVAL = 60000; // 60 seconds (1 minute)
const INITIAL_BOOM_COUNT = 3; // Only 3 cards on initial BOOM
const MAX_VISIBLE_CARDS = 10; // Maximum cards on screen

type ClusterState = 'clustered' | 'exploding' | 'scattered' | 're-clustering';

interface BubbleData extends CommentBubbleType {
  physics: BubblePhysics;
  state: BubbleState;
}

export const FloatingBubbles = () => {
  const { scrollYProgress } = useScroll();
  const [clusterState, setClusterState] = useState<ClusterState>('clustered');
  const [showBoomText, setShowBoomText] = useState(false);
  const [boomTextContent, setBoomTextContent] = useState('💥 BOOM!');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [bubbles, setBubbles] = useState<BubbleData[]>(() =>
    commentsData.map((comment) => ({
      ...comment,
      physics: {
        position: { x: (window.innerWidth * CLUSTER_X) / 100, y: (window.innerHeight * CLUSTER_Y) / 100 },
        velocity: { x: 0, y: 0 },
        isDragging: false,
        isReturning: false,
        timeAtBorder: 0,
        lastCollisionTime: 0,
      },
      state: 'clustered' as BubbleState,
    }))
  );
  const animationFrameRef = useRef<number | undefined>(undefined);
  const autoReleaseTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const slideEnterTimeRef = useRef<number>(0);

  // Define helper functions first
  const triggerBoom = useCallback(() => {
    setClusterState('exploding');
    setBoomTextContent('💥 BOOM!');
    setShowBoomText(true);

    setTimeout(() => setShowBoomText(false), 1000);

    // Explode only INITIAL_BOOM_COUNT cards (3 cards)
    setBubbles((prev) => {
      let releasedCount = 0;
      return prev.map((bubble) => {
        // Only release first 3 clustered cards
        if (bubble.state === 'clustered' && releasedCount < INITIAL_BOOM_COUNT) {
          releasedCount++;
          const angle = (releasedCount / INITIAL_BOOM_COUNT) * Math.PI * 2;
          const distance = 200 + Math.random() * 150;
          const vw = window.innerWidth;
          const vh = window.innerHeight;

          const targetX = (vw * CLUSTER_X) / 100 + Math.cos(angle) * distance;
          const targetY = (vh * CLUSTER_Y) / 100 + Math.sin(angle) * distance;

          return {
            ...bubble,
            physics: {
              ...bubble.physics,
              position: { x: targetX, y: targetY },
              velocity: {
                x: Math.cos(angle) * 8,
                y: Math.sin(angle) * 8,
              },
            },
            state: 'scattered' as BubbleState,
          };
        }
        return bubble;
      });
    });

    setTimeout(() => {
      setClusterState('scattered');
      setLastScrollY(scrollYProgress.get() * 100);
    }, 800);
  }, [scrollYProgress]);

  const releaseOneCard = useCallback(() => {
    setBubbles((prev) => {
      // Check if we've reached MAX_VISIBLE_CARDS
      const visibleCount = prev.filter((b) => b.state === 'scattered' || b.state === 'dragging' || b.state === 'returning').length;
      if (visibleCount >= MAX_VISIBLE_CARDS) return prev;

      const clusteredIndex = prev.findIndex((b) => b.state === 'clustered');
      if (clusteredIndex === -1) return prev;

      const updated = [...prev];
      const bubble = updated[clusteredIndex];
      const angle = Math.random() * Math.PI * 2;
      const distance = 300 + Math.random() * 200;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const targetX = (vw * CLUSTER_X) / 100 + Math.cos(angle) * distance;
      const targetY = (vh * CLUSTER_Y) / 100 + Math.sin(angle) * distance;

      updated[clusteredIndex] = {
        ...bubble,
        physics: {
          ...bubble.physics,
          position: { x: targetX, y: targetY },
          velocity: {
            x: Math.cos(angle) * 10,
            y: Math.sin(angle) * 10,
          },
        },
        state: 'scattered' as BubbleState,
      };

      return updated;
    });
  }, []);

  const stopAutoRelease = useCallback(() => {
    if (autoReleaseTimerRef.current) {
      clearTimeout(autoReleaseTimerRef.current);
      autoReleaseTimerRef.current = undefined;
    }
  }, []);

  const startAutoRelease = useCallback(() => {
    const releaseOne = () => {
      releaseOneCard();
      autoReleaseTimerRef.current = setTimeout(releaseOne, AUTO_RELEASE_INTERVAL);
    };

    releaseOne();
  }, [releaseOneCard]);

  const reclusterAll = useCallback(() => {
    setClusterState('re-clustering');
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    setBubbles((prev) =>
      prev.map((bubble) => ({
        ...bubble,
        physics: {
          ...bubble.physics,
          position: { x: (vw * CLUSTER_X) / 100, y: (vh * CLUSTER_Y) / 100 },
          velocity: { x: 0, y: 0 },
          isReturning: false,
          targetPosition: undefined,
          timeAtBorder: 0,
        },
        state: 'clustered' as BubbleState,
      }))
    );

    setTimeout(() => {
      setClusterState('clustered');
    }, 1500);
  }, []);

  // Physics engine - runs every frame
  useEffect(() => {
    const updatePhysics = () => {
      setBubbles((prev) => {
        return prev.map((bubble) => {
          if (bubble.state === 'clustered' || bubble.state === 'exploding' || bubble.state === 're-clustering') {
            return bubble; // Skip physics for these states
          }

          const physics = { ...bubble.physics };

          // Apply friction
          physics.velocity.x *= FRICTION;
          physics.velocity.y *= FRICTION;

          // Update position
          physics.position.x += physics.velocity.x;
          physics.position.y += physics.velocity.y;

          // Check screen edge collisions
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const atLeftEdge = physics.position.x < EDGE_MARGIN;
          const atRightEdge = physics.position.x > vw - EDGE_MARGIN;
          const atTopEdge = physics.position.y < EDGE_MARGIN;
          const atBottomEdge = physics.position.y > vh - EDGE_MARGIN;

          if (atLeftEdge || atRightEdge) {
            physics.velocity.x *= -0.7; // Bounce with damping
            physics.position.x = atLeftEdge ? EDGE_MARGIN : vw - EDGE_MARGIN;
          }
          if (atTopEdge || atBottomEdge) {
            physics.velocity.y *= -0.7; // Bounce with damping
            physics.position.y = atTopEdge ? EDGE_MARGIN : vh - EDGE_MARGIN;
          }

          // Check if at border and should start returning
          const isAtBorder = atLeftEdge || atRightEdge || atTopEdge || atBottomEdge;
          const isStopped = Math.abs(physics.velocity.x) < 0.5 && Math.abs(physics.velocity.y) < 0.5;

          if (isAtBorder && isStopped && !physics.isDragging && !physics.isReturning) {
            physics.timeAtBorder += 16; // Approximate frame time

            if (physics.timeAtBorder >= RETURN_WAIT_TIME) {
              // Start returning to cluster
              physics.isReturning = true;
              physics.targetPosition = {
                x: (vw * CLUSTER_X) / 100,
                y: (vh * CLUSTER_Y) / 100,
              };
              return { ...bubble, physics, state: 'returning' as BubbleState };
            }
          } else {
            physics.timeAtBorder = 0;
          }

          // Handle return-to-cluster physics (5-phase animation)
          if (physics.isReturning && physics.targetPosition) {
            const dx = physics.targetPosition.x - physics.position.x;
            const dy = physics.targetPosition.y - physics.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 5) {
              // Reached cluster
              return {
                ...bubble,
                physics: {
                  ...physics,
                  position: physics.targetPosition,
                  velocity: { x: 0, y: 0 },
                  isReturning: false,
                  targetPosition: undefined,
                  timeAtBorder: 0,
                },
                state: 'clustered' as BubbleState,
              };
            }

            // Apply acceleration toward cluster
            const speed = Math.min(distance / 50, 8); // Max speed 8px/frame
            physics.velocity.x = (dx / distance) * speed;
            physics.velocity.y = (dy / distance) * speed;
          }

          return { ...bubble, physics };
        });
      });

      // Collision detection between bubbles
      setBubbles((prev) => {
        const updated = [...prev];
        for (let i = 0; i < updated.length; i++) {
          for (let j = i + 1; j < updated.length; j++) {
            const b1 = updated[i];
            const b2 = updated[j];

            if (b1.state === 'clustered' || b2.state === 'clustered') continue;

            const dx = b2.physics.position.x - b1.physics.position.x;
            const dy = b2.physics.position.y - b1.physics.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < BUBBLE_RADIUS * 2 && distance > 0) {
              // Collision detected - elastic bounce
              const nx = dx / distance;
              const ny = dy / distance;

              // Relative velocity
              const dvx = b2.physics.velocity.x - b1.physics.velocity.x;
              const dvy = b2.physics.velocity.y - b1.physics.velocity.y;

              // Relative velocity in collision normal direction
              const dvn = dvx * nx + dvy * ny;

              // Don't resolve if velocities are separating
              if (dvn > 0) continue;

              // Apply impulse
              const impulse = dvn * 0.5; // 50% energy transfer
              updated[i].physics.velocity.x -= impulse * nx;
              updated[i].physics.velocity.y -= impulse * ny;
              updated[j].physics.velocity.x += impulse * nx;
              updated[j].physics.velocity.y += impulse * ny;

              // Separate bubbles to prevent overlap
              const overlap = (BUBBLE_RADIUS * 2 - distance) / 2;
              updated[i].physics.position.x -= nx * overlap;
              updated[i].physics.position.y -= ny * overlap;
              updated[j].physics.position.x += nx * overlap;
              updated[j].physics.position.y += ny * overlap;
            }
          }
        }
        return updated;
      });

      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Auto-trigger first BOOM after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (clusterState === 'clustered') {
        triggerBoom();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [clusterState, triggerBoom]);

  // Monitor scroll for slide-specific behaviors
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const currentScroll = latest * 100;
      const slideIndex = Math.floor(latest * 6); // 6 slides total

      // Slide 3 (Demand) - Timed auto-release
      if (slideIndex === 2 && slideEnterTimeRef.current === 0) {
        slideEnterTimeRef.current = Date.now();
        startAutoRelease();
      } else if (slideIndex !== 2) {
        stopAutoRelease();
        slideEnterTimeRef.current = 0;
      }

      // Re-cluster on significant scroll
      if (clusterState === 'scattered' && Math.abs(currentScroll - lastScrollY) > 15) {
        reclusterAll();
        setLastScrollY(currentScroll);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, clusterState, lastScrollY, startAutoRelease, stopAutoRelease, reclusterAll]);

  const releaseMaintainerCard = useCallback(() => {
    // Show "DON'T!" text
    setBoomTextContent("DON'T!");
    setShowBoomText(true);
    setTimeout(() => setShowBoomText(false), 1000);

    // Find and release deltakosh (maintainer) card to center
    setBubbles((prev) => {
      const maintainerIndex = prev.findIndex((b) =>
        b.state === 'clustered' && b.author.name.toLowerCase().includes('deltakosh')
      );

      if (maintainerIndex === -1) return prev;

      const updated = [...prev];
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Place in center of screen
      updated[maintainerIndex] = {
        ...updated[maintainerIndex],
        physics: {
          ...updated[maintainerIndex].physics,
          position: { x: vw * 0.5, y: vh * 0.5 },
          velocity: { x: 0, y: 0 },
        },
        state: 'scattered' as BubbleState,
      };

      return updated;
    });
  }, []);

  const handleClusterClick = useCallback(() => {
    if (clusterState === 'clustered') {
      triggerBoom();
    } else {
      // Check if we should show maintainer card
      const visibleCount = bubbles.filter((b) =>
        b.state === 'scattered' || b.state === 'dragging' || b.state === 'returning'
      ).length;

      const hasMaintainerVisible = bubbles.some((b) =>
        (b.state === 'scattered' || b.state === 'dragging' || b.state === 'returning') &&
        b.author.name.toLowerCase().includes('deltakosh')
      );

      if (!hasMaintainerVisible && visibleCount < MAX_VISIBLE_CARDS) {
        releaseMaintainerCard();
      } else {
        releaseOneCard();
      }
    }
  }, [clusterState, triggerBoom, releaseOneCard, releaseMaintainerCard, bubbles]);

  const clusteredCount = bubbles.filter((b) => b.state === 'clustered').length;

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
              rotate: [10, -5, 5, 0],
            }}
            exit={{ opacity: 0, scale: 3 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {boomTextContent}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cluster click trigger */}
      {clusteredCount > 0 && (
        <motion.button
          className="cluster-trigger"
          onClick={handleClusterClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="cluster-count">{clusteredCount}</span>
          <span className="cluster-label">
            {clusterState === 'clustered' ? '💬 Click to explode!' : '💬 Click to release'}
          </span>
        </motion.button>
      )}

      {/* Floating bubbles */}
      {bubbles.map((bubble) => (
        <FloatingBubble
          key={bubble.id}
          bubble={bubble}
          setBubbles={setBubbles}
        />
      ))}
    </div>
  );
};

interface FloatingBubbleProps {
  bubble: BubbleData;
  setBubbles: React.Dispatch<React.SetStateAction<BubbleData[]>>;
}

const FloatingBubble = ({ bubble, setBubbles }: FloatingBubbleProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState<Vec2>({ x: 0, y: 0 });
  const [totalDragDistance, setTotalDragDistance] = useState(0);
  const velocityTrackRef = useRef<Vec2[]>([]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (bubble.state === 'clustered' || bubble.state === 're-clustering') return;

    // Prevent default to avoid any link behavior
    e.preventDefault();
    e.stopPropagation();

    const pos = 'touches' in e ?
      { x: e.touches[0].clientX, y: e.touches[0].clientY } :
      { x: e.clientX, y: e.clientY };

    setIsDragging(true);
    setLastMousePos(pos);
    setTotalDragDistance(0);
    velocityTrackRef.current = [];

    setBubbles((prev) =>
      prev.map((b) =>
        b.id === bubble.id
          ? { ...b, physics: { ...b.physics, isDragging: true, isReturning: false, timeAtBorder: 0 }, state: 'dragging' as BubbleState }
          : b
      )
    );
  };

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    // Prevent default to ensure smooth dragging
    e.preventDefault();

    const pos = 'touches' in e ?
      { x: e.touches[0].clientX, y: e.touches[0].clientY } :
      { x: e.clientX, y: e.clientY };

    const velocity = {
      x: pos.x - lastMousePos.x,
      y: pos.y - lastMousePos.y,
    };

    // Track total drag distance
    const distance = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    setTotalDragDistance((prev) => prev + distance);

    velocityTrackRef.current.push(velocity);
    if (velocityTrackRef.current.length > 5) {
      velocityTrackRef.current.shift();
    }

    setLastMousePos(pos);

    setBubbles((prev) =>
      prev.map((b) =>
        b.id === bubble.id
          ? { ...b, physics: { ...b.physics, position: pos } }
          : b
      )
    );
  }, [isDragging, lastMousePos, bubble.id, setBubbles]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    const wasDragged = totalDragDistance > 5; // Threshold for distinguishing click from drag

    setIsDragging(false);

    // Calculate average velocity from recent movements for throw effect
    const avgVelocity = velocityTrackRef.current.reduce(
      (acc, v) => ({ x: acc.x + v.x, y: acc.y + v.y }),
      { x: 0, y: 0 }
    );
    if (velocityTrackRef.current.length > 0) {
      avgVelocity.x /= velocityTrackRef.current.length;
      avgVelocity.y /= velocityTrackRef.current.length;
    }

    // Apply acceleration on drop (throw physics)
    setBubbles((prev) =>
      prev.map((b) =>
        b.id === bubble.id
          ? {
              ...b,
              physics: {
                ...b.physics,
                velocity: wasDragged
                  ? { x: avgVelocity.x * 2, y: avgVelocity.y * 2 } // Amplify for throw effect
                  : { x: 0, y: 0 }, // No velocity if it was just a click
                isDragging: false,
              },
              state: 'scattered' as BubbleState,
            }
          : b
      )
    );

    velocityTrackRef.current = [];
  }, [isDragging, totalDragDistance, bubble.id, setBubbles]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    // Only open link if it was a click (not a drag)
    if (totalDragDistance <= 5 && bubble.state !== 'clustered' && bubble.state !== 're-clustering') {
      window.open(bubble.source.url, '_blank', 'noopener,noreferrer');
    }
    e.preventDefault();
    e.stopPropagation();
  }, [totalDragDistance, bubble.source.url, bubble.state]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

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

  const isBoomBubble = bubble.author.name.toLowerCase().includes('deltakosh');
  const baseStyle = isBoomBubble
    ? {
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        border: '2px solid #ef4444',
      }
    : platformStyles[bubble.source.platform];

  // Determine animation props based on bubble state
  const getAnimationProps = () => {
    if (bubble.state === 'clustered') {
      return {
        x: (window.innerWidth * CLUSTER_X) / 100,
        y: (window.innerHeight * CLUSTER_Y) / 100,
        opacity: 0.3,
        scale: 0.4,
        transition: { duration: 0.6 },
      };
    }

    if (bubble.state === 're-clustering') {
      return {
        x: (window.innerWidth * CLUSTER_X) / 100,
        y: (window.innerHeight * CLUSTER_Y) / 100,
        opacity: 0.3,
        scale: 0.4,
        transition: { duration: 1 },
      };
    }

    return {
      x: bubble.physics.position.x,
      y: bubble.physics.position.y,
      opacity: 1,
      scale: isBoomBubble ? 1.3 : (isDragging ? 1.1 : 1),
      transition: { duration: 0 },
    };
  };

  return (
    <motion.div
      className="floating-bubble"
      style={{
        ...baseStyle,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 999 : 100,
      }}
      animate={getAnimationProps()}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      whileHover={bubble.state !== 'clustered' ? { scale: (isBoomBubble ? 1.4 : 1.15) } : undefined}
    >
      {/* Grab indicator */}
      {bubble.state === 'scattered' && !isDragging && (
        <div style={{ position: 'absolute', top: 8, right: 8, fontSize: '1.2rem', opacity: 0.6 }}>
          🤚
        </div>
      )}

      <div className="bubble-header">
        <img src={bubble.author.avatar} alt={bubble.author.name} className="bubble-avatar" />
        <div className="bubble-author">
          <span className="bubble-name">{bubble.author.name}</span>
          <span className="bubble-platform">{bubble.source.platform}</span>
        </div>
      </div>
      <div className="bubble-content">{bubble.content}</div>
      <div className="bubble-date">
        {new Date(bubble.source.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
        })}
      </div>
    </motion.div>
  );
};
