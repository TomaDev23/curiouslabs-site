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
    this._lastPageState = false;
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

    window.dispatchEvent(new CustomEvent('thoughtTrailsReady'));
    console.log('🌟 Lightweight ThoughtTrails system is ready');
  }

  createTrails() {
    // Initialize 2 trails with dynamic properties (reduced from 3)
    this.trails = Array.from({ length: 2 }, (_, i) => ({
      points: [], // Trail history for smooth curves
      dustParticles: [], // NEW: Array to store fading dust particles
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 0.3 + 0.15, // 0.15 to 0.45 (slower than before)
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

    // Find the ThoughtTrails layer in the Products page
    const trailsLayer = document.querySelector('[data-thought-trails-layer="true"]');
    
    if (trailsLayer) {
      const rect = trailsLayer.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      this.container.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 1;
        transition: opacity 0.3s ease;
      `;
      
      // Append to the trails layer instead of body
      if (this.container.parentNode !== trailsLayer) {
        if (this.container.parentNode) {
          this.container.parentNode.removeChild(this.container);
        }
        trailsLayer.appendChild(this.container);
      }
      
      console.log('🌟 Positioned trails in ThoughtTrails layer:', rect);
    } else {
      // Fallback to products page if trails layer not found
      const productsPage = document.querySelector('[data-page="products"]');
      
      if (productsPage) {
        const rect = productsPage.getBoundingClientRect();
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
          opacity: 1;
          transition: opacity 0.3s ease;
        `;
        
        // Make sure container is in body
        if (!this.container.parentNode) {
          document.body.appendChild(this.container);
        }
        
        console.log('🌟 Positioned trails on Products page (fallback):', rect);
      } else {
        // Default invisible fallback
        this.container.style.opacity = '0';
        console.log('🌟 No suitable container found, hiding trails');
      }
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
        trail.time += 0.015;

        // Apply delay before starting animation
        if (trail.time < trail.delay) {
          trail.opacity = 0;
          return;
        }

        // Update opacity for fade-in/fade-out
        const phase = (trail.time - trail.delay) % 5;
        trail.opacity = phase < 2.5 ? phase / 2.5 : 1 - (phase - 2.5) / 2.5;

        // Update position with organic motion (slower noise)
        trail.noiseOffset += 0.03;
        const noise = this.simpleNoise(trail.noiseOffset);
        trail.angle += noise * 0.08;
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

          // Generate dust particles along the trail
          if (trail.points.length > 1 && Math.random() < 0.5) { // 50% chance
            const lastPoint = trail.points[trail.points.length - 1];
            const prevPoint = trail.points[trail.points.length - 2];
            const dustCount = Math.floor(Math.random() * 2) + 1; // 1-2 particles
            
            for (let i = 0; i < dustCount; i++) {
              const t = Math.random();
              const dustX = prevPoint.x + (lastPoint.x - prevPoint.x) * t + (Math.random() - 0.5) * 5;
              const dustY = prevPoint.y + (lastPoint.y - prevPoint.y) * t + (Math.random() - 0.5) * 5;
              
              trail.dustParticles.push({
                x: dustX,
                y: dustY,
                size: Math.random() * 2 + 1,
                life: Math.random() * 2 + 1, // 1-3 seconds
                maxLife: Math.random() * 2 + 1,
              });
            }
          }
        }

        // Draw comet head with enhanced glow
        if (trail.points.length > 0) {
          const head = trail.points[trail.points.length - 1];
          
          // Outer glow
          this.ctx.beginPath();
          this.ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
          this.ctx.fillStyle = this.currentAccentColor;
          this.ctx.globalAlpha = trail.opacity * 0.3;
          this.ctx.shadowBlur = 8;
          this.ctx.shadowColor = this.currentAccentColor;
          this.ctx.fill();
          
          // Inner core
          this.ctx.beginPath();
          this.ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
          this.ctx.fillStyle = this.currentAccentColor;
          this.ctx.globalAlpha = trail.opacity;
          this.ctx.shadowBlur = 4;
          this.ctx.shadowColor = this.currentAccentColor;
          this.ctx.fill();
          
          // Draw sparks at the comet head
          if (Math.random() < 0.6) { // 60% chance per frame to spawn sparks
            const sparkCount = Math.floor(Math.random() * 4) + 2; // 2-5 sparks
            for (let i = 0; i < sparkCount; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 4 + 2; // 2-6 pixels per frame
              const sparkX = head.x + Math.cos(angle) * speed;
              const sparkY = head.y + Math.sin(angle) * speed;
              const sparkSize = Math.random() * 3 + 1; // 1-4 pixels
              const sparkLife = Math.random() * 0.8 + 0.4; // 0.4-1.2 opacity
              
              this.ctx.beginPath();
              this.ctx.arc(sparkX, sparkY, sparkSize, 0, Math.PI * 2);
              this.ctx.fillStyle = this.currentAccentColor;
              this.ctx.globalAlpha = trail.opacity * sparkLife;
              this.ctx.shadowBlur = 8; // Add glow to sparks
              this.ctx.shadowColor = this.currentAccentColor;
              this.ctx.fill();
            }
          }
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

    // Listen for custom event that signals page change in horizontal scroll
    window.addEventListener('horizontalPageChange', (event) => {
      const { pageIndex } = event.detail || {};
      console.log(`🌟 Horizontal page changed to: ${pageIndex}`);
      
      // Check if we're actually on the horizontal scroll page
      const isOnHorizontalScrollPage = this.isOnHorizontalScrollPage();
      
      // Only activate on the second page (index 1) AND when on horizontal scroll page
      if (pageIndex === 1 && isOnHorizontalScrollPage && !this.isActive) {
        console.log('🌟 Activating ThoughtTrails - on horizontal scroll page');
        this.activate();
      } else if ((pageIndex !== 1 || !isOnHorizontalScrollPage) && this.isActive) {
        console.log('🌟 Deactivating ThoughtTrails - not on horizontal scroll page or wrong page index');
        this.deactivate();
      }
    });

    // Listen for route changes to deactivate when leaving horizontal scroll page
    window.addEventListener('popstate', () => {
      const isOnHorizontalScrollPage = this.isOnHorizontalScrollPage();
      if (!isOnHorizontalScrollPage && this.isActive) {
        console.log('🌟 Route changed - deactivating ThoughtTrails');
        this.deactivate();
      }
    });

    window.addEventListener('resize', () => {
      if (this.isActive) this.updatePosition();
    });

    window.addEventListener('scroll', () => {
      if (this.isActive) this.updatePosition();
    });

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = (...args) => {
      originalPushState.apply(history, args);
      setTimeout(() => {
        const isOnHorizontalScrollPage = this.isOnHorizontalScrollPage();
        if (!isOnHorizontalScrollPage && this.isActive) {
          console.log('🌟 Navigation detected - deactivating ThoughtTrails');
          this.deactivate();
        }
      }, 100);
    };

    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args);
      setTimeout(() => {
        const isOnHorizontalScrollPage = this.isOnHorizontalScrollPage();
        if (!isOnHorizontalScrollPage && this.isActive) {
          console.log('🌟 Navigation detected - deactivating ThoughtTrails');
          this.deactivate();
        }
      }, 100);
    };
  }

  // Check if we're currently on the horizontal scroll page
  isOnHorizontalScrollPage() {
    // Check for the horizontal scroll component container
    const horizontalScrollContainer = document.querySelector('[class*="w-[300vw]"]') || 
                                    document.querySelector('[data-component="horizontal-scroll"]') ||
                                    document.querySelector('#horizontal-product-scroll') ||
                                    document.querySelector('.horizontal-product-scroll');
    
    // Check for products page specifically within horizontal scroll
    const productsPageInHorizontal = document.querySelector('[data-page="products"]');
    
    // Check if the horizontal scroll component is visible and active
    const isHorizontalScrollVisible = horizontalScrollContainer && 
                                    horizontalScrollContainer.offsetParent !== null;
    
    const isOnPage = isHorizontalScrollVisible && productsPageInHorizontal;
    
    // Only log when state changes to prevent console spam
    if (this._lastPageState !== isOnPage) {
      console.log('🌟 Page context check:', {
        horizontalScrollContainer: !!horizontalScrollContainer,
        productsPageInHorizontal: !!productsPageInHorizontal,
        isHorizontalScrollVisible,
        isOnPage
      });
      this._lastPageState = isOnPage;
    }
    
    return isOnPage;
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
    
    if (!this.isInitialized) {
      console.log('🌟 Not initialized, calling init first...');
      this.init();
    }
    
    this.isActive = true;
    this.updatePosition();
    this.container.style.opacity = '1';
    this.startAnimationLoop();
    
    console.log('🌟 ThoughtTrails force activated:', {
      container: !!this.container,
      canvas: !!this.canvas,
      isActive: this.isActive,
      opacity: this.container?.style.opacity,
      trails: this.trails.length
    });
    
    // Add a visible test element
    const testDiv = document.createElement('div');
    testDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${this.currentAccentColor};
      color: white;
      padding: 10px;
      z-index: 9999;
      border-radius: 5px;
      font-family: monospace;
      font-size: 12px;
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