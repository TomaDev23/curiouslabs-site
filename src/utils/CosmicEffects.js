/**
 * CosmicEffects.js
 * Optimized shared utilities for particle and comet effects
 * LEGIT-compliant utilities for cosmic backgrounds
 */
import { PRIORITY } from './AnimationController';
import deviceDetection from './deviceDetection';

/**
 * OptimizedCometSystem - Performance-optimized comet rendering utility
 * Creates and manages comets with trail effects with FPS-aware throttling
 */
export class OptimizedCometSystem {
  constructor({
    canvasRef, 
    baseCount = 10, 
    minSize = 1, 
    maxSize = 3, 
    minSpeed = 0.5, 
    maxSpeed = 2, 
    minLength = 20, 
    maxLength = 100,
    colorPalette = ['hsla(210, 80%, 70%, 0.8)', 'hsla(240, 80%, 70%, 0.8)', 'hsla(200, 90%, 80%, 0.8)']
  } = {}) {
    this.canvas = null;
    this.ctx = null;
    this.canvasRef = canvasRef;
    
    // Configuration
    this.baseCount = baseCount;
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.colorPalette = colorPalette;
    
    // Adjust for device capability
    this.deviceTier = deviceDetection.getDevicePerformanceTier();
    this.adjustConfigForDevice();
    
    // State
    this.comets = [];
    this.lastFrameTime = 0;
    this.isRunning = false;
    
    // Performance optimization
    this.throttleLevel = 0;
    this.frameSkipCount = 0;
    this.currentSkipFrame = 0;
    
    // We'll initialize when the canvasRef is provided and ready
    this.initialized = false;
  }
  
  /**
   * Adjust configuration based on device capabilities
   */
  adjustConfigForDevice() {
    // Scale effects based on device performance tier (1-5)
    const scaleFactor = [0.2, 0.4, 0.7, 1.0, 1.2][this.deviceTier - 1];
    
    // Scale count, preserving at least 1 comet
    this.baseCount = Math.max(1, Math.floor(this.baseCount * scaleFactor));
    
    // Scale visual properties
    this.maxSize = this.maxSize * (0.7 + (scaleFactor * 0.3)); // Less aggressive scaling
    this.maxLength = this.maxLength * scaleFactor;
    
    // For very low-end devices, simplify trail rendering
    this.useSimplifiedTrails = this.deviceTier <= 2;
  }
  
  /**
   * Initialize the comet system
   */
  initialize() {
    if (!this.canvasRef.current) return;
    
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');
    
    if (!this.ctx) return;
    
    // Set proper canvas dimensions
    this.resize();
    
    // Generate initial comets
    this.generateComets();
    
    // Mark as initialized
    this.initialized = true;
  }
  
  /**
   * Resize handler for canvas
   */
  resize() {
    if (!this.canvas) return;
    
    // Update canvas size to match display size
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    
    // Regenerate comets when canvas is resized
    this.generateComets();
  }
  
  /**
   * Generate comets based on configuration and canvas size
   */
  generateComets() {
    if (!this.canvas) return;
    
    const { width, height } = this.canvas;
    
    // Clear existing comets
    this.comets = [];
    
    // Create new comets
    for (let i = 0; i < this.baseCount; i++) {
      this.comets.push(this.createComet(width, height));
    }
  }
  
  /**
   * Create a single comet with randomized properties
   */
  createComet(width, height) {
    // Random position off-screen
    const side = Math.floor(Math.random() * 4); // 0-3: top, right, bottom, left
    let x, y;
    
    switch (side) {
      case 0: // top
        x = Math.random() * width;
        y = -this.maxLength;
        break;
      case 1: // right
        x = width + this.maxLength;
        y = Math.random() * height;
        break;
      case 2: // bottom
        x = Math.random() * width;
        y = height + this.maxLength;
        break;
      case 3: // left
        x = -this.maxLength;
        y = Math.random() * height;
        break;
    }
    
    // Calculate direction vector toward center with some randomness
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Direction with randomness
    const randomOffset = 0.2; // 20% random variation
    const dx = (centerX - x) * (1 + (Math.random() - 0.5) * randomOffset);
    const dy = (centerY - y) * (1 + (Math.random() - 0.5) * randomOffset);
    
    // Normalize direction vector
    const length = Math.sqrt(dx * dx + dy * dy);
    const ndx = dx / length;
    const ndy = dy / length;
    
    // Random properties for appearance
    const size = this.minSize + Math.random() * (this.maxSize - this.minSize);
    const speed = this.minSpeed + Math.random() * (this.maxSpeed - this.minSpeed);
    const trailLength = this.minLength + Math.random() * (this.maxLength - this.minLength);
    const colorIndex = Math.floor(Math.random() * this.colorPalette.length);
    
    return {
      x,
      y,
      dx: ndx * speed,
      dy: ndy * speed,
      size,
      trail: [], 
      maxTrailLength: trailLength,
      color: this.colorPalette[colorIndex],
      active: true,
      lifetime: 0
    };
  }
  
  /**
   * Spawn a new comet to replace one that has gone off-screen
   */
  spawnComet() {
    if (!this.canvas) return null;
    const { width, height } = this.canvas;
    return this.createComet(width, height);
  }
  
  /**
   * Update the position and state of all comets
   */
  update(deltaTime) {
    if (!this.canvas) return;
    const { width, height } = this.canvas;
    
    this.comets.forEach((comet, index) => {
      // Update position
      comet.x += comet.dx * deltaTime;
      comet.y += comet.dy * deltaTime;
      
      // Update trail (with performance optimization)
      if (!this.useSimplifiedTrails || comet.trail.length < 5 || this.throttleLevel < 2) {
        comet.trail.unshift({ x: comet.x, y: comet.y });
        
        // Limit trail length for performance
        if (comet.trail.length > comet.maxTrailLength) {
          comet.trail.pop();
        }
      }
      
      // Update lifetime
      comet.lifetime += deltaTime;
      
      // Check if comet is out of bounds with a margin
      const margin = comet.maxTrailLength;
      if (
        comet.x < -margin ||
        comet.x > width + margin ||
        comet.y < -margin ||
        comet.y > height + margin ||
        comet.lifetime > 10000 // Max 10 seconds lifetime as failsafe
      ) {
        // Replace with a new comet
        this.comets[index] = this.spawnComet();
      }
    });
  }
  
  /**
   * Draw all comets and their trails
   */
  draw() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    
    ctx.save();
    
    this.comets.forEach(comet => {
      if (!comet.active) return;
      
      // Performance optimization for low-end devices
      if (this.useSimplifiedTrails) {
        // Simplified trail - just a line
        ctx.beginPath();
        ctx.strokeStyle = comet.color;
        ctx.lineWidth = comet.size * 0.8;
        ctx.globalAlpha = 0.7;
        
        if (comet.trail.length > 1) {
          const startPoint = comet.trail[comet.trail.length - 1];
          ctx.moveTo(startPoint.x, startPoint.y);
          ctx.lineTo(comet.x, comet.y);
        }
        
        ctx.stroke();
      } else {
        // Full trail with gradient
        if (comet.trail.length > 1) {
          // Create gradient for trail
          const gradient = ctx.createLinearGradient(
            comet.x, comet.y,
            comet.trail[comet.trail.length - 1].x,
            comet.trail[comet.trail.length - 1].y
          );
          
          gradient.addColorStop(0, comet.color);
          gradient.addColorStop(1, comet.color.replace(/[\d.]+\)$/, '0)'));
          
          // Draw trail
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = comet.size;
          ctx.globalAlpha = 0.8;
          
          // Draw using quadratic curves for smoother appearance
          ctx.moveTo(comet.trail[0].x, comet.trail[0].y);
          
          // Skip some points for performance on longer trails
          const skipFactor = this.throttleLevel > 0 
            ? Math.max(1, Math.floor(comet.trail.length / 20)) 
            : 1;
            
          for (let i = skipFactor; i < comet.trail.length; i += skipFactor) {
            const p1 = comet.trail[i - skipFactor];
            const p2 = comet.trail[i];
            
            if (p1 && p2) {
              const xc = (p1.x + p2.x) / 2;
              const yc = (p1.y + p2.y) / 2;
              ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
            }
          }
          
          ctx.stroke();
        }
      }
      
      // Draw comet head
      ctx.beginPath();
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = comet.color;
      ctx.arc(comet.x, comet.y, comet.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Glow effect for comet head (skip on lower-tier devices)
      if (this.deviceTier >= 3 && !this.useSimplifiedTrails) {
        ctx.beginPath();
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = comet.color;
        ctx.arc(comet.x, comet.y, comet.size * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    ctx.restore();
  }
  
  /**
   * Main animation frame handler
   */
  animate(timestamp) {
    if (!this.isRunning || !this.initialized) return;
    
    // Initialize lastFrameTime on first frame
    if (!this.lastFrameTime) {
      this.lastFrameTime = timestamp;
      this.animationId = requestAnimationFrame(this.animate.bind(this));
      return;
    }
    
    // Calculate delta time
    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;
    
    // Apply throttling by skipping frames if needed
    this.currentSkipFrame++;
    if (this.currentSkipFrame <= this.frameSkipCount) {
      this.animationId = requestAnimationFrame(this.animate.bind(this));
      return;
    }
    this.currentSkipFrame = 0;
    
    // Clear canvas - use a partial clear for trail effect
    if (this.ctx && this.canvas) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // Update and draw comets
    this.update(deltaTime);
    this.draw();
    
    // Continue animation loop
    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }
  
  /**
   * Start the animation
   */
  start() {
    if (this.isRunning) return;
    
    // Initialize if needed
    if (!this.initialized) {
      this.initialize();
    }
    
    this.isRunning = true;
    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }
  
  /**
   * Stop the animation
   */
  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
  
  /**
   * Set throttle level for performance optimization
   * @param {number} level - 0: none, 1: light, 2: medium, 3: heavy
   */
  setThrottleLevel(level) {
    this.throttleLevel = Math.max(0, Math.min(3, level));
    
    // Set frame skip count based on throttle level
    this.frameSkipCount = [0, 1, 2, 3][this.throttleLevel];
    
    // Reduce comet count for higher throttle levels
    if (level > 0 && this.comets.length > 3) {
      // Keep at least 2-3 comets even when throttled
      const targetCount = Math.max(3, Math.floor(this.baseCount / (level + 1)));
      
      if (this.comets.length > targetCount) {
        this.comets = this.comets.slice(0, targetCount);
      }
    }
  }
  
  /**
   * Cleanup resources when component unmounts
   */
  dispose() {
    this.stop();
    this.canvas = null;
    this.ctx = null;
    this.comets = [];
  }
}

/**
 * Use with AnimationController to create a comet system
 * that properly integrates with the priority system
 */
export const registerCometSystemWithController = (controller, cometSystem, priority = PRIORITY.LOW) => {
  if (!controller || !cometSystem) return null;
  
  // Register frame callback
  const id = controller.subscribe((timestamp) => {
    // Update throttle level based on controller's performance metrics
    const metrics = controller.getPerformanceMetrics();
    cometSystem.setThrottleLevel(metrics.throttleLevel);
    
    // Let the comet system handle its own animation loop
    if (!cometSystem.isRunning) {
      cometSystem.start();
    }
  }, priority);
  
  // Return the subscription ID for later cleanup
  return id;
};

export default {
  OptimizedCometSystem,
  registerCometSystemWithController
}; 