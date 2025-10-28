/**
 * Type definitions for the interactive landing page
 */

export interface CommentBubble {
  id: string;
  author: {
    name: string;
    avatar: string;  // URL to GitHub/forum avatar
    url: string;     // Profile link
  };
  content: string;   // Comment text (50-200 chars recommended)
  source: {
    platform: 'github' | 'forum' | 'stackoverflow';
    url: string;     // Direct link to original comment
    date: string;    // ISO date
  };
  position: {
    slide: number;   // Which slide (1-6)
    x: number;       // Initial x position (%)
    y: number;       // Initial y position (%)
  };
  style: {
    platform: 'github' | 'forum' | 'stackoverflow';
  };
}

export interface SlideConfig {
  id: number;
  title: string;
  subtitle?: string;
  hasBabylonScene?: boolean;
  sceneType?: 'rotation' | 'import' | 'problem' | 'solution';
}

// Physics-related types
export interface Vec2 {
  x: number;
  y: number;
}

export interface BubblePhysics {
  position: Vec2;     // Current position in pixels
  velocity: Vec2;     // Current velocity in pixels/frame
  targetPosition?: Vec2; // Target position for return-to-cluster
  isDragging: boolean;
  isReturning: boolean;
  timeAtBorder: number; // Time spent at border (for auto-return)
  lastCollisionTime: number;
}

export type BubbleState = 'clustered' | 'exploding' | 'scattered' | 're-clustering' | 'dragging' | 'returning' | 'at-border';
