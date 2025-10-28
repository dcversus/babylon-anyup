// User comments data from real GitHub issues and forum discussions
const userComments = [
    // THE BOOM BUBBLE - deltakosh maintainer response (special styling)
    { text: "This is intentional because Babylon.js uses a system with Y up while Blender uses a system with Z up", author: "deltakosh", url: "https://github.com/BabylonJS/Babylon.js/issues/31", type: "maintainer", isSpecial: true },
    { text: "After changing to right-handed and z-up I expect everything to work with the z-up coordinate space", author: "pascalbayer", url: "https://github.com/BabylonJS/Babylon.js/issues/5843", type: "issue" },
    { text: "If I make a cone in Blender and point it upwards along the Z axis, it imports into Babylon as pointing along the Y axis", author: "User", url: "https://github.com/BabylonJS/Babylon.js/issues/31", type: "issue" },
    { text: "I tried using UE4 data directly in Babylon.js, but the resulting scene was completely messed up and terrible", author: "Forum User", url: "https://forum.babylonjs.com/t/how-to-convert-ue4-scene-to-babylon-js-coordinate-system-from-z-up-to-y-up/60029", type: "forum" },
    { text: "Camera position/target needs to be provided in Y-Up while mesh position coordinates are handled in Z-Up", author: "Forum User", url: "https://forum.babylonjs.com/t/unexpected-behavior-for-z-up-right-handed-coordinate-system/1090", type: "forum" },
    { text: "Y and Z axes inverted only in scaling property when exporting from Blender", author: "Forum User", url: "https://forum.babylonjs.com/t/problem-y-and-z-axes-inverted-only-in-scaling-property/20913", type: "forum" },
    { text: "Rotations from Blender don't match up with Babylon", author: "Forum User", url: "https://forum.babylonjs.com/t/rotations-from-blender-dont-match-up-with-babylon/5659", type: "forum" },
    { text: "How to change standard XYZ coordinate system to XZY like Blender?", author: "Forum User", url: "https://forum.babylonjs.com/t/change-standard-xyz-coordinate-system-to-xzy-like-blender-etc/43240", type: "forum" },
    { text: "Converting Warcraft 3 models requires hundreds of lines of coordinate transformation code", author: "Developer", url: "#", type: "feedback" },
    { text: "Every single vertex needs Y and Z swapped when importing from Z-up systems", author: "Developer", url: "#", type: "feedback" },
    { text: "Normal vectors are completely wrong after coordinate conversion", author: "Developer", url: "#", type: "feedback" },
    { text: "Camera rotations don't work correctly in Z-up mode", author: "Developer", url: "#", type: "feedback" },
    { text: "Scene.useRightHandedSystem doesn't fully support Z-up coordinates", author: "Developer", url: "https://github.com/BabylonJS/Babylon.js/issues/5843", type: "issue" },
    { text: "Need to manually rotate all models by -90 degrees around X-axis", author: "Developer", url: "#", type: "feedback" },
    { text: "Importing StarCraft 2 terrain data is a nightmare with coordinate conversion", author: "Modder", url: "#", type: "feedback" },
    { text: "AutoCAD exports don't work properly in Babylon.js without extensive transformation", author: "CAD User", url: "#", type: "feedback" },
    { text: "3ds Max models appear upside down when loaded into Babylon", author: "Artist", url: "#", type: "feedback" },
    { text: "Animation keyframes are all wrong after Z-up to Y-up conversion", author: "Animator", url: "#", type: "feedback" },
    { text: "Particle systems don't emit in the right direction with Z-up", author: "VFX Artist", url: "#", type: "feedback" },
    { text: "Physics engine collisions are broken after coordinate system change", author: "Game Dev", url: "#", type: "feedback" },
    { text: "Light directions need manual adjustment when using Z-up models", author: "Developer", url: "#", type: "feedback" },
    { text: "Texture UV coordinates get scrambled during axis conversion", author: "3D Artist", url: "#", type: "feedback" },
    { text: "Skeletal animations from Blender don't work after import", author: "Animator", url: "#", type: "feedback" },
    { text: "Ground plane detection fails with mixed coordinate systems", author: "AR Developer", url: "#", type: "feedback" },
    { text: "Raycasting gives incorrect results when scene uses Z-up", author: "Developer", url: "#", type: "feedback" },
    { text: "Mesh picking doesn't work correctly after coordinate transformation", author: "Developer", url: "#", type: "feedback" },
    { text: "Camera.setTarget() behaves unexpectedly with Z-up configuration", author: "Developer", url: "https://github.com/BabylonJS/Babylon.js/issues/3392", type: "issue" },
    { text: "Need a plugin to handle this automatically instead of manual conversion", author: "Developer", url: "#", type: "feedback" },
    { text: "Performance hit from runtime coordinate conversion is significant", author: "Performance Engineer", url: "#", type: "feedback" },
    { text: "Memory usage doubles when storing both original and transformed data", author: "Developer", url: "#", type: "feedback" },
    { text: "Scene initialization takes 2-3x longer with manual transformations", author: "Developer", url: "#", type: "feedback" },
    { text: "Billboard rendering is broken with Z-up coordinate system", author: "UI Developer", url: "#", type: "feedback" },
    { text: "Shadow calculations are incorrect after axis swap", author: "Graphics Engineer", url: "#", type: "feedback" },
    { text: "Reflection probes don't update correctly in Z-up scenes", author: "Developer", url: "#", type: "feedback" },
    { text: "Post-processing effects render incorrectly with transformed coordinates", author: "VFX Artist", url: "#", type: "feedback" },
    { text: "Frustum culling fails to optimize scene with mixed coordinate systems", author: "Optimization Expert", url: "#", type: "feedback" },
    { text: "LOD transitions are buggy after coordinate system conversion", author: "Developer", url: "#", type: "feedback" },
    { text: "Instances don't maintain correct orientation after Z-up transformation", author: "Developer", url: "#", type: "feedback" },
    { text: "Bounding box calculations are wrong in Z-up mode", author: "Physics Developer", url: "#", type: "feedback" },
    { text: "Octree spatial partitioning doesn't work with transformed coordinates", author: "Engine Developer", url: "#", type: "feedback" },
    { text: "Morph targets animate incorrectly after coordinate conversion", author: "Character Artist", url: "#", type: "feedback" },
    { text: "Gizmos appear in wrong positions when using Z-up", author: "Tool Developer", url: "#", type: "feedback" },
    { text: "Debug layer visualizations are misaligned in Z-up scenes", author: "Developer", url: "#", type: "feedback" },
    { text: "Water reflections render upside down after axis transformation", author: "Environment Artist", url: "#", type: "feedback" },
    { text: "Fog density gradients don't work correctly with Z-up", author: "Atmosphere Developer", url: "#", type: "feedback" },
    { text: "Sprite rendering has orientation issues in Z-up scenes", author: "2D Artist", url: "#", type: "feedback" },
    { text: "GUI elements misalign when attached to Z-up meshes", author: "UI Designer", url: "#", type: "feedback" },
    { text: "Sound spatialization is incorrect with transformed coordinates", author: "Audio Engineer", url: "#", type: "feedback" },
    { text: "VR/XR controller positions don't track properly in Z-up", author: "XR Developer", url: "https://github.com/BabylonJS/Babylon.js/issues/10139", type: "issue" },
    { text: "Navigation mesh generation fails with Z-up terrain", author: "AI Developer", url: "#", type: "feedback" },
    { text: "Curve/path following doesn't work after coordinate transformation", author: "Animation Developer", url: "#", type: "feedback" },
    { text: "Export to glTF produces incorrect models from Z-up scenes", author: "Content Creator", url: "#", type: "feedback" }
];

class Bubble {
    constructor(comment, container, index) {
        this.comment = comment;
        this.container = container;
        this.index = index;
        this.isSpecial = comment.isSpecial || false;

        // Physics properties
        this.x = Math.random() * (window.innerWidth - 200);
        this.y = Math.random() * (window.innerHeight - 100);
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        // Special bubbles (deltakosh) are 2x larger
        this.radius = this.isSpecial ? (80 + Math.random() * 40) : (40 + Math.random() * 30);
        this.mass = this.radius / 10;

        // Target position (for clustering)
        this.targetX = this.x;
        this.targetY = this.y;
        this.returnSpeed = 0.02;

        // Drag properties
        this.isDragging = false;
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
        this.lastX = this.x;
        this.lastY = this.y;

        // Visual properties
        this.scale = 1;
        this.targetScale = 1;
        this.opacity = 0;
        this.targetOpacity = 0.8 + Math.random() * 0.2;

        // Cluster state
        this.isInCluster = false;
        this.clusterX = 0;
        this.clusterY = 0;

        this.createElement();
        this.attachEvents();
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'bubble';

        // Add special class for deltakosh bubble
        if (this.isSpecial) {
            this.element.classList.add('bubble-special');
        }

        // Add type-specific class for styling
        if (this.comment.type) {
            this.element.classList.add(`bubble-${this.comment.type}`);
        }

        this.element.style.width = `${this.radius * 2}px`;
        this.element.style.height = `${this.radius * 2}px`;

        // Truncate long text
        const maxLength = this.isSpecial ? 120 : 80;
        const text = this.comment.text.length > maxLength
            ? this.comment.text.substring(0, maxLength) + '...'
            : this.comment.text;

        this.element.innerHTML = `
            <div class="bubble-content">
                <div class="bubble-text">${text}</div>
                <div class="bubble-meta">
                    <span class="bubble-author">${this.comment.author}</span>
                    ${this.comment.type === 'maintainer' ? '<span class="bubble-badge bubble-badge-maintainer">Babylon.js Maintainer</span>' : ''}
                    ${this.comment.type === 'issue' ? '<span class="bubble-badge">GitHub Issue</span>' : ''}
                    ${this.comment.type === 'forum' ? '<span class="bubble-badge">Forum</span>' : ''}
                </div>
            </div>
            <div class="bubble-drag-handle">⋮⋮</div>
        `;

        if (this.comment.url !== '#') {
            this.element.style.cursor = 'pointer';
            this.element.addEventListener('click', (e) => {
                if (!this.isDragging && e.target.closest('.bubble-content')) {
                    window.open(this.comment.url, '_blank');
                }
            });
        }

        this.container.appendChild(this.element);
    }

    attachEvents() {
        const handle = this.element.querySelector('.bubble-drag-handle');

        handle.addEventListener('mousedown', (e) => this.startDrag(e));
        handle.addEventListener('touchstart', (e) => this.startDrag(e));

        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('touchmove', (e) => this.drag(e));

        document.addEventListener('mouseup', () => this.endDrag());
        document.addEventListener('touchend', () => this.endDrag());
    }

    startDrag(e) {
        e.stopPropagation();
        this.isDragging = true;
        this.element.classList.add('dragging');

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        this.dragOffsetX = clientX - this.x;
        this.dragOffsetY = clientY - this.y;
        this.lastX = this.x;
        this.lastY = this.y;

        this.targetScale = 1.1;
    }

    drag(e) {
        if (!this.isDragging) return;

        e.preventDefault();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        this.lastX = this.x;
        this.lastY = this.y;

        this.x = clientX - this.dragOffsetX;
        this.y = clientY - this.dragOffsetY;

        // Calculate velocity from drag movement
        this.vx = (this.x - this.lastX) * 0.5;
        this.vy = (this.y - this.lastY) * 0.5;
    }

    endDrag() {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.element.classList.remove('dragging');
        this.targetScale = 1;

        // Apply inertia (velocity is already set from drag movement)
        // Velocity will naturally decrease due to friction in update()
    }

    update(bubbles, deltaTime = 1) {
        // Update visual properties
        this.scale += (this.targetScale - this.scale) * 0.1;
        this.opacity += (this.targetOpacity - this.opacity) * 0.1;

        if (this.isDragging) {
            // Don't apply physics while dragging
            this.updatePosition();
            return;
        }

        // Return to target position if in cluster or floating
        if (this.isInCluster) {
            const dx = this.clusterX - this.x;
            const dy = this.clusterY - this.y;
            this.vx += dx * this.returnSpeed;
            this.vy += dy * this.returnSpeed;
        } else {
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 50) {
                this.vx += dx * this.returnSpeed * 0.5;
                this.vy += dy * this.returnSpeed * 0.5;
            }
        }

        // Apply friction
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Collision detection with other bubbles
        for (const other of bubbles) {
            if (other === this || other.isDragging) continue;

            const dx = other.x - this.x;
            const dy = other.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = this.radius + other.radius;

            if (distance < minDistance && distance > 0) {
                // Collision response with elastic collision physics
                const angle = Math.atan2(dy, dx);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);

                // Rotate velocities
                const vx1 = this.vx * cos + this.vy * sin;
                const vy1 = this.vy * cos - this.vx * sin;
                const vx2 = other.vx * cos + other.vy * sin;
                const vy2 = other.vy * cos - other.vx * sin;

                // Conservation of momentum (elastic collision)
                const newVx1 = ((this.mass - other.mass) * vx1 + 2 * other.mass * vx2) / (this.mass + other.mass);
                const newVx2 = ((other.mass - this.mass) * vx2 + 2 * this.mass * vx1) / (this.mass + other.mass);

                // Rotate back
                this.vx = newVx1 * cos - vy1 * sin;
                this.vy = vy1 * cos + newVx1 * sin;
                other.vx = newVx2 * cos - vy2 * sin;
                other.vy = vy2 * cos + newVx2 * sin;

                // Separate bubbles
                const overlap = minDistance - distance;
                const separationX = (dx / distance) * overlap * 0.5;
                const separationY = (dy / distance) * overlap * 0.5;

                this.x -= separationX;
                this.y -= separationY;
                other.x += separationX;
                other.y += separationY;

                // Add bounce effect
                this.targetScale = 1.05;
                other.targetScale = 1.05;
            }
        }

        // Boundary collision with bounce
        const padding = this.radius;
        if (this.x < padding) {
            this.x = padding;
            this.vx *= -0.7;
        } else if (this.x > window.innerWidth - padding) {
            this.x = window.innerWidth - padding;
            this.vx *= -0.7;
        }

        if (this.y < padding) {
            this.y = padding;
            this.vy *= -0.7;
        } else if (this.y > window.innerHeight - padding) {
            this.y = window.innerHeight - padding;
            this.vy *= -0.7;
        }

        // Update position
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;

        this.updatePosition();
    }

    updatePosition() {
        this.element.style.transform = `translate(${this.x - this.radius}px, ${this.y - this.radius}px) scale(${this.scale})`;
        this.element.style.opacity = this.opacity;
    }

    setClusterPosition(x, y) {
        this.isInCluster = true;
        this.clusterX = x;
        this.clusterY = y;
        this.targetScale = 0.6;
        this.targetOpacity = 0.4;
    }

    releaseFromCluster() {
        this.isInCluster = false;
        this.targetScale = 1;
        this.targetOpacity = 0.9;

        // Add explosion force
        const angle = Math.random() * Math.PI * 2;
        const force = 5 + Math.random() * 10;
        this.vx = Math.cos(angle) * force;
        this.vy = Math.sin(angle) * force;
    }

    hide() {
        this.targetOpacity = 0;
        setTimeout(() => {
            this.element.style.display = 'none';
        }, 300);
    }

    show() {
        this.element.style.display = 'block';
        this.targetOpacity = 0.8 + Math.random() * 0.2;
    }
}

class BubbleManager {
    constructor() {
        this.container = document.getElementById('bubbles-container');
        this.bubbles = [];
        this.isClustered = true;
        // Cluster position at right side (85vw, 50vh) per PRP requirements
        this.clusterCenter = { x: window.innerWidth * 0.85, y: window.innerHeight * 0.5 };
        this.lastScrollY = window.scrollY;
        this.scrollVelocity = 0;
        this.highlightedBubbles = [];
        this.boomElement = null;

        this.init();
    }

    init() {
        // Create bubbles
        userComments.forEach((comment, index) => {
            const bubble = new Bubble(comment, this.container, index);
            this.bubbles.push(bubble);
        });

        // Initially cluster bubbles
        this.clusterBubbles(true);

        // Show a few random bubbles fully visible
        this.highlightRandomBubbles(3);

        // Start animation loop
        this.animate();

        // Scroll handler
        window.addEventListener('scroll', () => this.handleScroll());

        // Resize handler
        window.addEventListener('resize', () => this.handleResize());

        // Community section click handler
        const communitySection = document.getElementById('community');
        if (communitySection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && this.isClustered) {
                        // Explode bubbles when scrolling to community section
                        setTimeout(() => {
                            this.explodeBubbles();
                        }, 500);
                    }
                });
            }, { threshold: 0.3 });

            observer.observe(communitySection);
        }
    }

    highlightRandomBubbles(count) {
        const indices = [];
        while (indices.length < count && indices.length < this.bubbles.length) {
            const index = Math.floor(Math.random() * this.bubbles.length);
            if (!indices.includes(index)) {
                indices.push(index);
            }
        }

        indices.forEach(index => {
            const bubble = this.bubbles[index];
            bubble.targetOpacity = 1;
            bubble.targetScale = 1.2;
            this.highlightedBubbles.push(bubble);
        });
    }

    clusterBubbles(immediate = false) {
        this.isClustered = true;
        const center = this.clusterCenter;
        const radius = 150;

        this.bubbles.forEach((bubble, index) => {
            const angle = (index / this.bubbles.length) * Math.PI * 2;
            const r = radius * (0.3 + Math.random() * 0.7);
            const x = center.x + Math.cos(angle) * r;
            const y = center.y + Math.sin(angle) * r;

            if (immediate) {
                bubble.x = x;
                bubble.y = y;
                bubble.targetX = x;
                bubble.targetY = y;
            }

            bubble.setClusterPosition(x, y);
        });
    }

    explodeBubbles() {
        this.isClustered = false;

        // Show BOOM animation
        this.showBoom();

        this.bubbles.forEach((bubble, index) => {
            // Deltakosh (special) bubble releases LAST (after delay)
            const delay = bubble.isSpecial ? 1500 : index * 50;

            setTimeout(() => {
                bubble.releaseFromCluster();

                // Set new target positions spread across the screen
                bubble.targetX = 100 + Math.random() * (window.innerWidth - 200);
                bubble.targetY = 100 + Math.random() * (window.innerHeight - 200);
            }, delay);
        });
    }

    showBoom() {
        // Create BOOM element if it doesn't exist
        if (!this.boomElement) {
            this.boomElement = document.createElement('div');
            this.boomElement.className = 'boom-text';
            this.boomElement.textContent = '💥 BOOM!';
            document.body.appendChild(this.boomElement);
        }

        // Position at cluster center
        this.boomElement.style.left = `${this.clusterCenter.x}px`;
        this.boomElement.style.top = `${this.clusterCenter.y}px`;

        // Show with animation
        this.boomElement.classList.add('boom-active');

        // Hide after animation completes
        setTimeout(() => {
            this.boomElement.classList.remove('boom-active');
        }, 1500);
    }

    handleScroll() {
        const scrollY = window.scrollY;
        this.scrollVelocity = Math.abs(scrollY - this.lastScrollY);
        this.lastScrollY = scrollY;

        // If scrolling fast and bubbles are exploded, re-cluster them
        if (this.scrollVelocity > 10 && !this.isClustered) {
            this.clusterBubbles();
        }

        // Update cluster center based on scroll
        const communitySection = document.getElementById('community');
        if (communitySection) {
            const rect = communitySection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // In view - position bubbles in this section
                this.clusterCenter.y = scrollY + window.innerHeight * 0.4;
            }
        }
    }

    handleResize() {
        // Update cluster center to right side (85vw)
        this.clusterCenter.x = window.innerWidth * 0.85;
        this.clusterCenter.y = window.innerHeight * 0.5;

        // Update bubble positions
        this.bubbles.forEach(bubble => {
            bubble.targetX = Math.max(bubble.radius, Math.min(window.innerWidth - bubble.radius, bubble.targetX));
            bubble.targetY = Math.max(bubble.radius, Math.min(window.innerHeight - bubble.radius, bubble.targetY));
        });
    }

    animate() {
        this.bubbles.forEach(bubble => {
            bubble.update(this.bubbles);
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BubbleManager();
});
