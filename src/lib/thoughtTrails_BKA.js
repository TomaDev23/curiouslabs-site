/**
 * @file thoughtTrails.js
 * @description Lightweight, dynamic cosmic trail system using Canvas
 * @version 3.0.0 - "Organic Cosmic Flow"
 * @legit true
 */

class ThoughtTrails {
  constructor() {
    this.container = null;
    this.canvas = null;
    this.ctx = null;
    this.trails = [];
    this.isInitialized = false;
    this.isActive = false;
    this.currentAccentColor = '#84cc16';
    this.animationId = null;
    this.lastUpdate = 0;
    this.width = 400;
    this.height = 300;
  }

  init() {
    if (this.isInitialized) return;

    console.log('🌟 Initializing Lightweight ThoughtTrails...');

    // Create container
    this.container = document.createElement('div');
    this.container.id = 'cosmic-trails-container';
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 999;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(this.container);

    // Create Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `;
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);

    // Initialize trails
    this.createTrails();

    // Setup event listeners
    this.setupEventListeners();

    this.isInitialized = true;
    this.checkRouteAndActivate();

    window.dispatchEvent(new CustomEvent('thoughtTrailsReady'));
    console.log('🌟 Lightweight ThoughtTrails system is ready');
  }

  createTrails() {
    // Initialize 3 trails with dynamic properties
    this.trails = Array.from({ length: 3 }, (_, i) => ({
      points: [], // Trail history for smooth curves
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 0.5 + 0.3, // 0.3 to 0.8
      angle: Math.random() * Math.PI * 2,
      noiseOffset: Math.random() * 1000, // For Perlin noise
      opacity: 0,
      maxLength: Math.random() * 20 + 10, // 10 to 30 points
      delay: Math.random() * 2 + 1, // 1 to 3 seconds
      time: 0,
    }));
  }

  // Simple Perlin-like noise for organic motion
  simpleNoise(x) {
    return Math.sin(x) * Math.sin(x * 0.1) * 0.5;
  }

  checkRouteAndActivate() {
    const currentPath = window.location.pathname;
    const shouldBeActive = currentPath === '/our-products' || currentPath === '/v6_atomic' || currentPath.includes('products');

    console.log(`🌟 Route check: ${currentPath}, should be active: ${shouldBeActive}`);

    if (shouldBeActive && !this.isActive) {
      this.activate();
    } else if (!shouldBeActive && this.isActive) {
      this.deactivate();
    }
  }

  activate() {
    if (!this.container || this.isActive) return;

    console.log('🌟 Activating ThoughtTrails for products page');
    this.isActive = true;

    setTimeout(() => {
      this.updatePosition();
      this.container.style.opacity = '1';
      this.startAnimationLoop();
    }, 100);
  }

  deactivate() {
    if (!this.container || !this.isActive) return;

    console.log('🌟 Deactivating ThoughtTrails');
    this.isActive = false;
    this.container.style.opacity = '0';
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  updatePosition() {
    if (!this.container || !this.isActive) return;

    const featuredCard = document.querySelector('[data-featured-card="true"]');
    if (featuredCard) {
      const rect = featuredCard.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      this.container.style.cssText = `
        position: fixed;
        top: ${rect.top}px;
        left: ${rect.left}px;
        width: ${rect.width}px;
        height: ${rect.height}px;
        pointer-events: none;
        z-index: 999;
        opacity: 1;
        transition: opacity 0.3s ease;
      `;
    } else {
      this.width = 400;
      this.height = 300;
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      this.container.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 400px;
        height: 300px;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 999;
        opacity: 1;
        transition: opacity 0.3s ease;
      `;
    }
  }

  startAnimationLoop() {
    if (!this.isActive) return;

    const animate = (time) => {
      if (!this.isActive) return;

      // Throttle updates to 60 FPS
      if (time - this.lastUpdate < 16.67) {
        this.animationId = requestAnimationFrame(animate);
        return;
      }
      this.lastUpdate = time;

      this.ctx.clearRect(0, 0, this.width, this.height);

      // Update and draw trails
      this.trails.forEach((trail, index) => {
        trail.time += 0.02;

        // Apply delay before starting animation
        if (trail.time < trail.delay) {
          trail.opacity = 0;
          return;
        }

        // Update opacity for fade-in/fade-out
        const phase = (trail.time - trail.delay) % 5;
        trail.opacity = phase < 2.5 ? phase / 2.5 : 1 - (phase - 2.5) / 2.5;

        // Update position with organic motion
        trail.noiseOffset += 0.05;
        const noise = this.simpleNoise(trail.noiseOffset);
        trail.angle += noise * 0.1;
        const speed = trail.speed * (this.width / 400); // Scale speed with container size

        trail.x += Math.cos(trail.angle) * speed;
        trail.y += Math.sin(trail.angle) * speed;

        // Normalize coordinates to canvas dimensions (0-100 range)
        const normX = (trail.x % 100 + 100) % 100;
        const normY = (trail.y % 100 + 100) % 100;
        const canvasX = (normX / 100) * this.width;
        const canvasY = (normY / 100) * this.height;

        // Add point to trail
        trail.points.push({ x: canvasX, y: canvasY, opacity: trail.opacity });
        if (trail.points.length > trail.maxLength) {
          trail.points.shift();
        }

        // Draw trail with shorter, more natural segments
        if (trail.points.length > 1) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = this.currentAccentColor;
          this.ctx.lineWidth = 1;
          this.ctx.shadowBlur = 3;
          this.ctx.shadowColor = this.currentAccentColor;

          trail.points.forEach((point, i) => {
            if (i === 0) {
              this.ctx.moveTo(point.x, point.y);
            } else {
              const prev = trail.points[i - 1];
              const distance = Math.sqrt(
                Math.pow(point.x - prev.x, 2) + Math.pow(point.y - prev.y, 2)
              );
              
              // Only draw if points are close enough (prevents long lines)
              if (distance < 50) {
                const opacity = point.opacity * (i / trail.points.length) * 0.8;
                this.ctx.globalAlpha = opacity;
                this.ctx.lineTo(point.x, point.y);
              } else {
                // Start new path segment for distant points
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(point.x, point.y);
              }
            }
          });
          this.ctx.stroke();
        }

        // Draw comet head
        if (trail.points.length > 0) {
          const head = trail.points[trail.points.length - 1];
          this.ctx.beginPath();
          this.ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
          this.ctx.fillStyle = this.currentAccentColor;
          this.ctx.globalAlpha = trail.opacity;
          this.ctx.fill();
        }
      });

      this.animationId = requestAnimationFrame(animate);
    };

    this.lastUpdate = 0;
    this.animationId = requestAnimationFrame(animate);
  }

  updateColors(newAccentColor) {
    if (newAccentColor === this.currentAccentColor) return;
    this.currentAccentColor = newAccentColor;
  }

  setupEventListeners() {
    window.addEventListener('updateAccentColor', (event) => {
      const { color } = event.detail;
      this.updateColors(color);
    });

    window.addEventListener('resize', () => {
      if (this.isActive) this.updatePosition();
    });

    window.addEventListener('scroll', () => {
      if (this.isActive) this.updatePosition();
    });

    window.addEventListener('popstate', () => {
      this.checkRouteAndActivate();
    });

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = (...args) => {
      originalPushState.apply(history, args);
      setTimeout(() => this.checkRouteAndActivate(), 100);
    };

    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args);
      setTimeout(() => this.checkRouteAndActivate(), 100);
    };
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }

    this.isInitialized = false;
    this.isActive = false;
    console.log('🌟 Lightweight ThoughtTrails destroyed');
  }

  // Manual test method for debugging
  forceActivate() {
    console.log('🌟 Force activating ThoughtTrails...');
    this.isActive = true;
    this.updatePosition();
    this.container.style.opacity = '1';
    this.startAnimationLoop();
    
    // Add a visible test element
    const testDiv = document.createElement('div');
    testDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: red;
      color: white;
      padding: 10px;
      z-index: 9999;
      border-radius: 5px;
    `;
    testDiv.textContent = 'ThoughtTrails Active';
    document.body.appendChild(testDiv);
    
    setTimeout(() => {
      if (testDiv.parentNode) {
        testDiv.parentNode.removeChild(testDiv);
      }
    }, 3000);
  }
}

const thoughtTrails = new ThoughtTrails();

// Expose globally for debugging
if (typeof window !== 'undefined') {
  window.thoughtTrails = thoughtTrails;
}

export default thoughtTrails;