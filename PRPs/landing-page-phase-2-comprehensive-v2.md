# PRP: Landing Page Phase 2 - Comprehensive Redesign v2.0

**Duration**: 6-8 weeks | **Status**: 📋 Planned | **Created**: 2025-10-28

## 🎯 Phase Overview

This is a MASSIVE redesign of the babylon-anyup landing page with advanced physics, 3D Babylon.js interactive elements, complex bubble choreography, and complete content restructuring. This builds on Phase 1 (Slide 1 restructure) completed on 2025-10-28.

**Phase 1 Completed**: ✅
- Split layout (left: title + description, right: 3D scene)
- Package name with copy button: `@dcversus/babylon-anyup`
- TypeScript code example with syntax highlighting
- Max-width 1000px container, centered

**Phase 2 Scope**: This document captures ALL remaining requirements

---

## 📋 Definition of Ready (DoR)

- [x] Phase 1 (Slide 1 restructure) completed and deployed
- [x] All user requirements documented in this PRP
- [ ] Design mockups approved for complex animations
- [ ] 3D railway lever model sourced (copyright-free)
- [ ] Performance budget defined for pinball physics
- [ ] Community Solutions links collected
- [ ] Footer design approved

---

## ✅ Definition of Done (DoD)

- [ ] All features from this PRP implemented
- [ ] Zero TypeScript errors
- [ ] Zero ESLint errors/warnings
- [ ] Build successful (<10MB bundle target)
- [ ] Smooth 60fps animations on modern hardware
- [ ] Mobile responsive (tested on 480px, 768px, 1024px)
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Performance: Lighthouse score >90
- [ ] All links tested and working
- [ ] PR reviewed and approved
- [ ] Deployed to production

---

## 🏗️ Implementation Breakdown

### **PHASE 2A: Slide 1 Advanced Layout** (Week 1-2)

#### 1. 3D Scene Positioning
**Current**: 3D Babylon scene on right side of Slide 1
**New Requirements**:
- Scene stays visible from Slide 1 → Slide 2
- Gentle movement animation during scroll transition
- Scene should "follow" scroll with smooth easing
- Delay before starting movement
- Stays at Slide 2 after transition completes

**Technical Approach**:
```typescript
// Use Framer Motion useScroll + useTransform
const { scrollYProgress } = useScroll();
const sceneY = useTransform(
  scrollYProgress,
  [0, 0.15, 0.30], // Slide 1 → transition → Slide 2
  [0, 50, 100]      // Gentle Y movement
);
const sceneOpacity = useTransform(
  scrollYProgress,
  [0.25, 0.35],
  [1, 0.3] // Fade slightly during transition
);
```

#### 2. Quick Start Code Positioning
**Current**: Below split layout
**New**: Centered, appears at ~50vh of first screen
**Requirements**:
- Should appear after user scrolls ~30-40% down Slide 1
- Fade-in + slide-up animation when visible
- Background glass-morphism effect
- Code block with TypeScript syntax highlighting (already done ✅)

### **PHASE 2B: Floating Railway Lever Card** (Week 2-3)

#### Overview
Second interactive widget that floats near the 3D scene and allows physical lever dragging.

#### Requirements
- **Visual Design**:
  - Card-style container (similar styling to bubbles)
  - Glass-morphism background
  - Blue glow border when active
  - Contains a 3D Babylon.js scene with railway lever

- **3D Lever Model**:
  - Copyright-free 3D model from Sketchfab/OpenGameArt
  - Railway station-style lever (mechanical, industrial)
  - Two states: "Z-UP ON!" and default (Y-up)
  - Lever angle changes between states (-45° to +45°)
  - Smooth animation between states

- **Interaction**:
  - Click-and-drag lever up/down
  - Physically accurate drag (follows mouse/touch)
  - Snap to nearest state on release
  - Haptic feedback on state change (if supported)
  - Toggle affects main 3D scene coordinate system

- **Floating Behavior**:
  - Floats near main 3D scene (offset by 100px left, 50px down)
  - Gentle up/down float animation (different phase than main scene)
  - User can drag entire card to reposition
  - **Auto-return**: If dragged >200px away from original position, smoothly returns after 2 seconds
  - Spring physics for return animation
  - Stays visible during Slide 1 → Slide 2 transition (follows main scene)

#### Component Structure
```typescript
interface RailwayLeverCardProps {
  position: { x: number; y: number }; // Relative to 3D scene
  enabled: boolean;
  onToggle: () => void;
  onPositionChange: (newPos: { x: number; y: number }) => void;
}

// Physics for auto-return
const LEVER_HOME_POSITION = { x: -100, y: 50 };
const AUTO_RETURN_DISTANCE = 200;
const AUTO_RETURN_DELAY = 2000; // ms
```

### **PHASE 2C: Advanced Bubble Physics** (Week 3-4)

#### 1. Pinball Physics for Card Release
**Current**: Simple explosion with fixed velocity
**New**: Random "pinball energy" system (1-100 scale)

**Energy Scale**:
- **1-20**: Gentle drop
  - Low initial velocity (2-5 px/frame)
  - Falls mostly downward with slight horizontal drift
  - Offset: 100px random around release point
  - Minimal bounce on edges

- **21-50**: Medium bounce
  - Medium velocity (6-12 px/frame)
  - Balanced horizontal and vertical movement
  - 1-2 bounces off screen edges
  - Friction applied after each bounce

- **51-80**: Energetic pinball
  - High velocity (13-20 px/frame)
  - Multiple direction changes
  - 3-5 bounces off edges
  - Collisions with other bubbles

- **81-100**: EXTREME pinball
  - Maximum velocity (21-30 px/frame)
  - Chaotic movement, ricochets everywhere
  - 6+ bounces minimum
  - High-speed collisions
  - Trails/motion blur effect
  - Takes 5-10 seconds to settle

**Implementation**:
```typescript
const releaseBubble = (bubble: Bubble) => {
  const energy = Math.floor(Math.random() * 100) + 1;

  const velocity = calculateVelocity(energy);
  const angle = Math.random() * Math.PI * 2;

  bubble.physics = {
    velocity: {
      x: Math.cos(angle) * velocity,
      y: Math.sin(angle) * velocity
    },
    energy, // Track for bounce behavior
    bounceCount: 0,
    maxBounces: calculateMaxBounces(energy)
  };
};
```

#### 2. Cluster Button Rename
**Current**: "Click to explode!" / "Click to release"
**New**: "release a argument" (grammatically intentional, quirky branding)

#### 3. Auto-Release Every 1 Minute
**Current**: Auto-release every 60 seconds on Slide 3
**New**:
- Auto-release starts after initial BOOM
- ONE card released every 60 seconds
- Random energy (1-100) for each release
- Continues until all 52 cards released OR user scrolls away
- Counter shows: "X cards remaining in cluster"

#### 4. Advanced Return-to-Cluster Trajectory
**Current**: Straight line back to cluster with spring animation
**New**: Three-phase trajectory (Bottom → Right → Cluster)

**Phase 1: Drift to Bottom** (2-3 seconds)
- Card slowly drifts downward
- Slight horizontal wobble (sine wave)
- Target: Bottom 10% of screen, random X position
- Easing: ease-out

**Phase 2: Travel to Right** (2-3 seconds)
- Card moves horizontally to right side
- Maintains Y position (stays at bottom)
- Target: 90vw (near right edge)
- Easing: ease-in-out

**Phase 3: Ascend to Cluster** (1-2 seconds)
- Card moves up and slightly left
- Final position: 85vw, 50vh (cluster center)
- Scale down to 0.4 (cluster size)
- Fade opacity to 0.3
- Easing: ease-in with spring finish

**Trigger**: Card returns after being at screen border for 3+ seconds

### **PHASE 2D: 5-Card Formation ("We Want Support")** (Week 4-5)

#### Overview
On Slide 3 ("We Want Support" text), cards arrange in formation around center text.

#### Requirements
- **Formation Pattern**: Pentagon (5 positions around center)
  ```
        Card 1
   Card 5    Card 2
       Text
   Card 4    Card 3
  ```

- **Position Calculation**:
  ```typescript
  const FORMATION_RADIUS = 300; // px from center
  const positions = Array.from({ length: 5 }, (_, i) => {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2; // Start at top
    return {
      x: centerX + Math.cos(angle) * FORMATION_RADIUS,
      y: centerY + Math.sin(angle) * FORMATION_RADIUS
    };
  });
  ```

- **Timing Sequence**:
  1. User scrolls to "We Want Support" section
  2. **10-second delay** begins (countdown timer optional)
  3. If <5 cards visible, release (5 - visibleCount) cards
  4. All cards smoothly move to formation positions
  5. Cards lock in place, stop floating physics
  6. **If user scrolls away before 10 seconds**: Cancel event, cards return to normal physics

- **DON'T Card Behavior** (after formation complete):
  1. **Additional 5-second delay** after formation locks
  2. "DON'T!" text appears in center (8rem, black bg, red text, glow)
  3. 6th card (deltakosh, black with red border) scales in from center
  4. Card positions in center, 1.5x scale
  5. **ALL cards freeze** - no floating, no physics
  6. Formation holds until user scrolls away

#### Edge Cases
- If user scrolls back up during delay: Reset timer
- If already >5 cards visible: Use closest 5 to formation positions
- If deltakosh card already released: Use it for DON'T, otherwise release it

### **PHASE 2E: Community Solutions Section Redesign** (Week 5-6)

#### Current State
- Problem/solution bubbles
- Comparison section (correct vs wrong transformation)
- Conclusion box with benefits

#### New Requirements

##### 1. Community Solutions → Links to Examples
**Replace current content** with:
- **Title**: "Community Solutions" (keep)
- **Subtitle**: "How developers solved Z-up before babylon-anyup"
- **Grid of Solution Cards** (4-6 cards):
  - Manual matrix transformation (link to StackOverflow)
  - Custom loader scripts (link to forum post)
  - Blender export settings (link to GitHub gist)
  - Runtime Y/Z swap hacks (link to blog post)
  - Per-mesh transformation functions (link to CodeSandbox)
  - Forked Babylon.js builds (link to GitHub fork)

**Card Design**:
```tsx
<div className="solution-card">
  <div className="solution-icon">🔧</div>
  <h4 className="solution-title">Manual Matrix Math</h4>
  <p className="solution-description">
    Manually multiply transformation matrices for every mesh import
  </p>
  <div className="solution-meta">
    <span className="solution-complexity">⚠️ Complex</span>
    <span className="solution-performance">🐌 Slow</span>
  </div>
  <a href="..." className="solution-link">
    View Example →
  </a>
</div>
```

##### 2. Delete "Compare Correct vs Wrong Transformation" Section
- Remove entire comparison section
- Keep space for next section

##### 3. Update "Use Transformation Matrix" Button
**Current**: Links to section below
**New**:
- Links to Slide 1 Quick Start section (scroll to top with smooth behavior)
- New comment bubble appears when clicked:
  ```
  "Every solution has trade-offs: complexity, performance, or bugs.
   We decided to ignore that and just use transformation matrix, and it's... ✨ perfect."
  ```
- Comment bubble floats in from right, positions near button
- Styled as GitHub comment (deltakosh author)
- Fades out after 8 seconds

##### 4. View on GitHub → Hover Effect
**Current**: Button with icon
**New**:
- On hover: Text color changes to white
- Icon animates (GitHub logo spins 360°)
- Button background glows (blue → white gradient)
- Scale: 1 → 1.05
- Add subtle shadow

##### 5. Clickable Solution Cards with Comment Pop-outs (NEW)
**Requirement**: Three specific solution cards trigger comment bubble pop-outs

**Card 1: ❌ Mirrored textures**
- Click triggers: Related comment bubble pops out from card
- Comment content: Real example about texture mirroring issues
- Animation: Bounce around screen (pinball-style, 3-5 bounces)
- Final state: Stops floating, remains visible
- Comment author: Community member (forum/GitHub)

**Card 2: 🐌 Performance hit**
- Click triggers: Performance complaint comment
- Comment content: "This slows down my scene by 40%..." (real quote)
- Animation: Same bounce behavior as Card 1
- Final state: Stops floating after settling

**Card 3: 📝 100+ lines of code**
- Click triggers: Code complexity comment
- Comment content: Updated text about code maintenance burden
- Animation: Same bounce behavior
- Final state: Stops floating after settling

**Technical Implementation**:
```typescript
interface SolutionCard {
  icon: string;
  title: string;
  description: string;
  comment?: {
    author: string;
    avatar: string;
    content: string;
    platform: 'github' | 'forum' | 'stackoverflow';
    url: string;
  };
}

const handleCardClick = (card: SolutionCard) => {
  if (!card.comment) return;

  // 1. Pop out comment bubble from card position
  const cardRect = cardRef.current.getBoundingClientRect();
  const initialPos = { x: cardRect.x, y: cardRect.y };

  // 2. Apply bounce physics (3-5 bounces)
  const bouncePhysics = {
    energy: 60, // Medium-high energy
    velocity: { x: randomRange(-15, 15), y: randomRange(-20, -10) },
    gravity: 0.5,
    friction: 0.95,
    maxBounces: 5
  };

  // 3. After settling, stop all physics
  onBounceComplete(() => {
    bubble.physics.velocity = { x: 0, y: 0 };
    bubble.state = 'static'; // No more floating
  });
};
```

**Comment Content Examples**:
- **Mirrored textures**: "Why are all my textures flipped? Spent 2 hours debugging only to find it's the coordinate system mismatch. Even after fixing, some textures still look wrong."
- **Performance hit**: "This transformation adds a 40% performance overhead to my scene. With 1000+ meshes, it's completely unusable. Had to revert back to manual Y-up exports."
- **100+ lines of code**: "I wrote 127 lines just to handle coordinate conversion. Now every time I import a model, I have to remember to run it through this pipeline. It's unmaintainable."

**Behavior**:
- Only these 3 cards are clickable (others remain static)
- Each can be clicked multiple times (comment re-animates)
- Comments persist after animation (don't disappear)
- Multiple comments can be visible simultaneously
- Comments don't interfere with other floating bubbles

### **PHASE 2F: Footer Redesign** (Week 6)

#### Current State
- Tech-focused footer with npm badges
- GitHub widget
- 3-column grid
- Dark background

#### New Requirements

##### 1. Visual Style
- **Background**: White (flat, no gradient)
- **Text**: Dark gray (#1a202c)
- **Borders**: Light gray (#e2e8f0)
- **Min Height**: 300px
- **Padding**: 60px 40px

##### 2. Icon Redesign
**Current**: Colored platform icons (GitHub green, npm red, etc.)
**New**:
- Replace all colored icons with styled icons matching landing page aesthetic
- Monochrome SVG icons with hover effects
- Size: 24px × 24px
- Color: #64748b (gray)
- Hover: #5865F2 (brand blue) + scale(1.1)

##### 3. Add Contributions Link
**New Section**: "Resources"
```
Resources:
- Documentation
- GitHub Issues
- Contributions Guide ← NEW
- npm Package
- Edge Craft Project
```

Link to: `https://github.com/dcversus/babylon-anyup/blob/main/CONTRIBUTING.md`

##### 4. Layout Structure
```
+----------------------------------------+
|  babylon-anyup          [GitHub Icon]  |
|  @dcversus/babylon-anyup               |
+----------------------------------------+
|  Resources   |   Community   |  Legal  |
|  • Docs      |   • GitHub    |  • MIT  |
|  • Issues    |   • npm       |  • v0.1 |
|  • Contrib   |   • Discord   |         |
+----------------------------------------+
|  © 2025 @dcversus • Built with ❤️ and  |
|  Babylon.js • Powered by Open Source   |
+----------------------------------------+
```

---

## 🧪 Testing & Validation

### Unit Tests
- [ ] Pinball physics energy calculation (1-100 scale)
- [ ] Return-to-cluster trajectory (3 phases)
- [ ] Formation position calculation (pentagon)
- [ ] Auto-return distance trigger (>200px)
- [ ] 10-second delay cancellation logic

### Integration Tests
- [ ] 3D scene scroll transition (Slide 1 → Slide 2)
- [ ] Lever card follows main scene
- [ ] Card release with random energy
- [ ] Formation assembly sequence
- [ ] DON'T card appearance timing
- [ ] Footer link functionality

### Performance Tests
- [ ] 60fps with 10 bubbles active pinball physics
- [ ] Smooth 3D scene transitions during scroll
- [ ] No jank during formation assembly
- [ ] Lever drag responsiveness (<16ms)
- [ ] Bundle size <10MB (Babylon.js + animations)

### Visual Regression Tests
- [ ] Formation positions match design
- [ ] Footer white background renders correctly
- [ ] Code syntax highlighting colors
- [ ] Hover states on all interactive elements

### Browser Compatibility
- [ ] Chrome 120+ (Babylon.js WebGL2)
- [ ] Firefox 120+
- [ ] Safari 17+ (WebGL support)
- [ ] Edge 120+

### Mobile Testing
- [ ] Touch drag for lever card
- [ ] Pinball physics on mobile (reduced max bounces)
- [ ] Formation scales appropriately
- [ ] Footer stacks vertically

---

## 📊 Success Metrics

### Performance Targets
- **Lighthouse Score**: >90 (Performance, Accessibility, Best Practices)
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3s
- **Cumulative Layout Shift**: <0.1
- **Frame Rate**: Stable 60fps (animations)

### Code Quality
- **TypeScript**: 0 errors
- **ESLint**: 0 errors, 0 warnings
- **Test Coverage**: >80% for physics logic
- **Bundle Size**: <10MB (with Babylon.js)

### User Experience
- **Mobile Responsive**: 100% features work on mobile
- **Accessibility**: WCAG 2.1 AA compliance
- **Cross-Browser**: Works in all modern browsers
- **Load Time**: <3s on 3G connection

---

## 📈 Phase Exit Criteria

- [ ] All features implemented and tested
- [ ] Performance metrics met
- [ ] Code review approved
- [ ] Documentation updated
- [ ] Deployed to production
- [ ] User acceptance testing completed
- [ ] No P0/P1 bugs open
- [ ] Analytics tracking implemented

---

## 🚧 Current Blockers

1. **3D Railway Lever Model**
   - Need copyright-free model (Sketchfab CC0, OpenGameArt)
   - Must be low-poly for performance (<5K triangles)
   - Should have clean geometry for animation

2. **Community Solutions Links**
   - Need to collect real examples from community
   - StackOverflow posts, GitHub gists, forum threads
   - Must be publicly accessible

3. **Performance Budget**
   - Babylon.js adds ~2MB to bundle
   - Need to evaluate code splitting strategies
   - Consider lazy loading 3D scenes

4. **Mobile Physics Performance**
   - Pinball physics with 10+ bubbles may lag on mobile
   - Need to test on low-end devices
   - May need to reduce max bounces or energy on mobile

---

## 📝 Progress Tracking

| Date       | Phase | Activity                             | Status      |
|------------|-------|--------------------------------------|-------------|
| 2025-10-28 | 1     | Slide 1 restructure completed        | ✅ Complete |
| 2025-10-28 | 2     | PRP created with all requirements    | ✅ Complete |
| TBD        | 2A    | 3D scene scroll transition           | 📋 Planned  |
| TBD        | 2B    | Floating railway lever card          | 📋 Planned  |
| TBD        | 2C    | Advanced bubble physics              | 📋 Planned  |
| TBD        | 2D    | 5-card formation                     | 📋 Planned  |
| TBD        | 2E    | Community Solutions redesign         | 📋 Planned  |
| TBD        | 2F    | Footer redesign                      | 📋 Planned  |

---

## 🔗 Related Materials

- **Original PRP**: `PRPs/landing-page-comprehensive-redesign.md`
- **Phase 1 Commit**: `9cedaf6` - Slide 1 restructure
- **Live Site**: https://anyup.theedgestory.org/
- **GitHub Repo**: https://github.com/dcversus/babylon-anyup
- **Edge Craft**: https://github.com/dcversus/edgecraft (inspiration)

---

## 💡 Implementation Notes

### Architecture Decisions
1. **Physics Engine**: Custom implementation (no external libs)
   - Reason: Lightweight, tailored to specific needs
   - Trade-off: More code to maintain, but better performance

2. **3D Models**: Babylon.js native geometry + potential GLB import
   - Reason: Leverage existing Babylon.js in bundle
   - Trade-off: Need to source copyright-free models

3. **Animation Library**: Framer Motion (already in use)
   - Reason: Powerful, React-friendly, good docs
   - Trade-off: Adds ~50KB to bundle

4. **State Management**: React hooks (useState, useRef)
   - Reason: Simple, no external dependencies
   - Trade-off: More complex state needs careful management

### Code Organization
```
landing-page/src/
├── components/
│   ├── BabylonSwitcher.tsx        ✅ (Phase 1)
│   ├── RailwayLeverCard.tsx       📋 (Phase 2B)
│   ├── FloatingBubbles.tsx        🔄 (Phase 2C - needs pinball physics)
│   └── Footer.tsx                 📋 (Phase 2F)
├── physics/
│   ├── pinballPhysics.ts          📋 (Phase 2C)
│   ├── trajectoryCalculator.ts    📋 (Phase 2C)
│   └── formationLayout.ts         📋 (Phase 2D)
├── slides/
│   ├── Slide1_Intro.tsx           ✅ (Phase 1)
│   ├── Slide2_Examples.tsx        🔄 (needs 3D scene transition)
│   └── Slide4_Solutions.tsx       📋 (Phase 2E - needs redesign)
└── types.ts                       🔄 (needs physics types)
```

---

## 🎯 Estimated Effort

### By Phase
- **Phase 2A** (3D Scene Transition): 8-12 hours
- **Phase 2B** (Railway Lever Card): 16-24 hours
- **Phase 2C** (Advanced Physics): 20-30 hours
- **Phase 2D** (5-Card Formation): 12-16 hours
- **Phase 2E** (Solutions Redesign): 8-12 hours
- **Phase 2F** (Footer Redesign): 4-6 hours

### By Skill Area
- **3D/Babylon.js Work**: 24-36 hours (2A, 2B)
- **Physics/Animation**: 20-30 hours (2C)
- **Layout/Choreography**: 12-16 hours (2D)
- **Content/Links**: 12-18 hours (2E, 2F)

**Total**: 68-100 hours (2-2.5 weeks full-time)

---

**This PRP represents the COMPLETE scope of Phase 2. Each sub-phase can be developed and PR'd independently.**
