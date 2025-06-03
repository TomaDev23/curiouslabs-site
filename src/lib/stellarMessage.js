/**
 * Fixed StellarMessage Implementation
 * Resolves particle positioning and constellation connection issues
 */

class AnimationPhaseManager {
  constructor() {
    this.phases = {
      materialization: { duration: 3000, progress: 0 },
      constellation: { duration: 2500, progress: 0 },
      breathing: { duration: 3000, progress: 0 },
      dissolution: { duration: 2500, progress: 0 }
    };
    this.currentPhase = 'materialization';
    this.startTime = Date.now();
    this.onComplete = null;
    this.isComplete = false; // Add completion flag
  }
  
  update() {
    if (this.isComplete) {
      return { phase: 'complete', progress: 1 };
    }
    
    const elapsed = Date.now() - this.startTime;
    const phase = this.phases[this.currentPhase];
    
    phase.progress = Math.min(elapsed / phase.duration, 1);
    
    if (phase.progress >= 1) {
      this.nextPhase();
    }
    
    return { phase: this.currentPhase, progress: phase.progress };
  }
  
  getPhaseProgress() {
    if (this.isComplete) return 1;
    return this.phases[this.currentPhase].progress;
  }
  
  nextPhase() {
    if (this.isComplete) return;
    
    const phaseOrder = ['materialization', 'constellation', 'breathing', 'dissolution'];
    const currentIndex = phaseOrder.indexOf(this.currentPhase);
    
    if (currentIndex < phaseOrder.length - 1) {
      this.currentPhase = phaseOrder[currentIndex + 1];
      this.startTime = Date.now();
      console.log(`🌌 Phase transition: ${this.currentPhase} (${currentIndex + 2}/4)`);
    } else {
      console.log('🌌 Sequence complete - releasing scroll');
      this.isComplete = true;
      // Delay the completion callback slightly to ensure final frame renders
      setTimeout(() => {
        this.onComplete?.();
      }, 100);
    }
  }
}

class StellarParticle {
  constructor(options) {
    this.x = options.startX || 0;
    this.y = options.startY || 0;
    this.targetX = options.targetX || 0;
    this.targetY = options.targetY || 0;
    this.char = options.char || '';
    this.word = options.word || '';
    this.isKeyWord = options.isKeyWord || false;
    this.opacity = 0;
    this.size = options.size || 2;
    this.startX = options.startX || 0;
    this.startY = options.startY || 0;
    this.glowIntensity = this.isKeyWord ? 8 : 3;
  }
  
  update(phase, progress) {
    if (phase === 'materialization') {
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      this.x = this.startX + (this.targetX - this.startX) * easeProgress;
      this.y = this.startY + (this.targetY - this.startY) * easeProgress;
      this.opacity = easeProgress;
    } else if (phase === 'constellation') {
      this.x = this.targetX;
      this.y = this.targetY;
      this.opacity = 1;
    } else if (phase === 'breathing') {
      // Make breathing phase MORE visually distinct
      const time = Date.now() * 0.003; // Faster breathing
      const breathingIntensity = 0.4; // Stronger effect
      const pulse = Math.sin(time + this.targetX * 0.02) * breathingIntensity + (1 - breathingIntensity);
      
      // Add gentle movement during breathing
      const moveAmount = 2;
      this.x = this.targetX + Math.sin(time + this.targetY * 0.01) * moveAmount;
      this.y = this.targetY + Math.cos(time + this.targetX * 0.01) * moveAmount;
      this.opacity = pulse;
      this.size = (this.isKeyWord ? 3 : 2) * (0.6 + pulse * 0.6); // More dramatic size change
    } else if (phase === 'dissolution') {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const angle = Math.atan2(this.targetY - centerY, this.targetX - centerX);
      const spiralAngle = angle + (progress * Math.PI * 0.5);
      const distance = progress * progress * 150;
      
      this.x = this.targetX + Math.cos(spiralAngle) * distance;
      this.y = this.targetY + Math.sin(spiralAngle) * distance;
      this.opacity = Math.max(0, 1 - (progress * progress));
      this.size = (this.isKeyWord ? 3 : 2) * (1 - progress * 0.5);
    } else if (phase === 'complete') {
      // Ensure particles are invisible when complete
      this.opacity = 0;
    }
  }
  
  draw(ctx) {
    if (this.opacity <= 0) return;
    
    ctx.save();
    ctx.globalAlpha = this.opacity;
    
    // Add glow effect for key words
    if (this.isKeyWord && this.opacity > 0.3) {
      ctx.shadowBlur = this.glowIntensity;
      ctx.shadowColor = '#FF6B35';
    }
    
    ctx.fillStyle = this.isKeyWord ? '#FF6B35' : 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class ConstellationLine {
  constructor(startParticle, endParticle, concept) {
    this.start = startParticle;
    this.end = endParticle;
    this.concept = concept;
    this.opacity = 0;
    this.pulseOffset = Math.random() * Math.PI * 2;
  }
  
  draw(ctx, phase, progress) {
    if (this.opacity <= 0) return;
    
    ctx.save();
    
    // Add pulsing effect during breathing phase
    if (phase === 'breathing') {
      const time = Date.now() * 0.003;
      const pulse = Math.sin(time + this.pulseOffset) * 0.3 + 0.7;
      ctx.globalAlpha = this.opacity * pulse;
    } else {
      ctx.globalAlpha = this.opacity;
    }
    
    // Add glow to the line
    ctx.shadowBlur = 4;
    ctx.shadowColor = '#FF8C42';
    ctx.strokeStyle = '#FF8C42';
    ctx.lineWidth = 1.5;
    
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
    ctx.restore();
  }
}

class StellarMessage {
  constructor() {
    this.containerId = 'stellar-message-container';
    this.canvasId = 'stellar-message-canvas';
    this.isActive = false;
    this.isInitialized = false;
    this.container = null;
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.constellations = [];
    this.keyWordMap = new Map(); // Track key word particles
  }
  
  init() {
    console.log('🌌 StellarMessage initialized');
    this.setupEventListeners();
    this.isInitialized = true;
  }
  
  setupEventListeners() {
    console.log('🌌 Setting up StellarMessage event listeners...');
    
    window.addEventListener('horizontalPageChange', (e) => {
      const { pageIndex, pageName } = e.detail;
      
      console.log(`🌌 StellarMessage received event: pageIndex=${pageIndex}, pageName=${pageName}`);
      
      // Check if we're actually on the horizontal scroll page
      const isOnHorizontalScrollPage = this.isOnHorizontalScrollPage();
      
      if (pageIndex === 2 && pageName === 'services' && isOnHorizontalScrollPage) {
        console.log('🌌 Conditions met - activating StellarMessage on horizontal scroll page');
        this.activate();
      } else {
        console.log('🌌 Conditions not met - deactivating StellarMessage (not on horizontal scroll page or wrong page)');
        this.deactivate();
      }
    });
    
    // Listen for route changes to deactivate when leaving horizontal scroll page
    window.addEventListener('popstate', () => {
      const isOnHorizontalScrollPage = this.isOnHorizontalScrollPage();
      if (!isOnHorizontalScrollPage && this.isActive) {
        console.log('🌌 Route changed - deactivating StellarMessage');
        this.deactivate();
      }
    });
    
    // Add window resize handler
    window.addEventListener('resize', () => {
      if (this.isActive && this.canvas) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.convertTextToParticles(); // Recalculate positions
        this.createConstellations();
      }
    });
    
    // Monitor navigation changes
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = (...args) => {
      originalPushState.apply(history, args);
      setTimeout(() => {
        const isOnHorizontalScrollPage = this.isOnHorizontalScrollPage();
        if (!isOnHorizontalScrollPage && this.isActive) {
          console.log('🌌 Navigation detected - deactivating StellarMessage');
          this.deactivate();
        }
      }, 100);
    };

    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args);
      setTimeout(() => {
        const isOnHorizontalScrollPage = this.isOnHorizontalScrollPage();
        if (!isOnHorizontalScrollPage && this.isActive) {
          console.log('🌌 Navigation detected - deactivating StellarMessage');
          this.deactivate();
        }
      }, 100);
    };
    
    console.log('🌌 Event listeners set up successfully');
  }
  
  // Check if we're currently on the horizontal scroll page
  isOnHorizontalScrollPage() {
    // Check for the horizontal scroll component container
    const horizontalScrollContainer = document.querySelector('[class*="w-[300vw]"]') || 
                                    document.querySelector('[data-component="horizontal-scroll"]') ||
                                    document.querySelector('#horizontal-product-scroll') ||
                                    document.querySelector('.horizontal-product-scroll');
    
    // Check for services page specifically within horizontal scroll
    const servicesPageInHorizontal = document.querySelector('[data-page="services"]');
    
    // Check if the horizontal scroll component is visible and active
    const isHorizontalScrollVisible = horizontalScrollContainer && 
                                    horizontalScrollContainer.offsetParent !== null;
    
    const isOnPage = isHorizontalScrollVisible && servicesPageInHorizontal;
    
    console.log('🌌 Page context check:', {
      horizontalScrollContainer: !!horizontalScrollContainer,
      servicesPageInHorizontal: !!servicesPageInHorizontal,
      isHorizontalScrollVisible,
      isOnPage
    });
    
    return isOnPage;
  }
  
  createContainer() {
    this.container = document.createElement('div');
    this.container.id = this.containerId;
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      opacity: 0;
      z-index: 1000;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(this.container);
  }
  
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = this.canvasId;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `;
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
  }
  
  activate() {
    if (this.isActive) {
      console.log('🌌 StellarMessage already active, ignoring activation');
      return;
    }
    
    console.log('🌌 Activating Stellar Message for services page');
    this.isActive = true;
    
    if (!this.container) {
      console.log('🌌 Creating container and canvas...');
      this.createContainer();
      this.createCanvas();
      console.log('🌌 Container and canvas created');
    }
    
    this.container.style.opacity = '1';
    
    // Initialize phase manager
    this.phaseManager = new AnimationPhaseManager();
    this.phaseManager.onComplete = () => {
      console.log('🌌 Animation sequence completed - triggering deactivation');
      
      // Stop the render loop first
      this.stopRenderLoop();
      
      // Fade out the container
      this.container.style.opacity = '0';
      
      // Set inactive after fade
      setTimeout(() => {
        this.isActive = false;
        console.log('🌌 StellarMessage fully deactivated');
        
        // Dispatch completion event
        window.dispatchEvent(new CustomEvent('stellarSequenceComplete'));
      }, 300);
    };
    
    // Convert text to particles
    this.convertTextToParticles();
    
    // Create constellation connections
    this.createConstellations();
    
    // Start the render loop
    this.startRenderLoop();
    
    console.log('🌌 Stellar Message activated successfully');
  }
  
  deactivate() {
    console.log('🌌 Deactivating StellarMessage...');
    
    this.stopRenderLoop();
    
    if (this.container) {
      this.container.style.opacity = '0';
    }
    
    // Clear the canvas
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    // Reset phase manager
    this.phaseManager = null;
    
    this.isActive = false;
    console.log('🌌 StellarMessage deactivated');
  }
  
  destroy() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
      this.container = null;
      this.canvas = null;
      this.ctx = null;
    }
    this.isInitialized = false;
    console.log('🌌 StellarMessage destroyed');
  }
  
  convertTextToParticles() {
    console.log('🌌 Converting text to particles...');
    
    const message = "We Care, We Create: Ethical, responsible products with humans at the core.";
    const keyWords = ['Care', 'Create', 'Ethical', 'responsible', 'humans', 'core'];
    
    // Clear existing particles
    this.particles = [];
    this.keyWordMap.clear();
    
    // Canvas dimensions
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    
    // Text layout configuration
    const lines = [
      "We Care, We Create: Ethical,",
      "responsible products with humans",
      "at the core."
    ];
    
    const fontSize = 48;
    const lineHeight = fontSize * 1.4;
    const startY = (canvasHeight - (lines.length * lineHeight)) / 2;
    
    // Set canvas font for accurate measurements
    this.ctx.font = `${fontSize}px Arial, sans-serif`;
    
    lines.forEach((line, lineIndex) => {
      const words = line.split(' ');
      const lineWidth = this.ctx.measureText(line).width;
      const startX = (canvasWidth - lineWidth) / 2;
      
      let currentX = startX;
      const currentY = startY + (lineIndex * lineHeight);
      
      words.forEach((word, wordIndex) => {
        // Clean word for key word detection
        const cleanWord = word.replace(/[^\w]/g, '');
        const isKeyWord = keyWords.includes(cleanWord);
        const wordWidth = this.ctx.measureText(word).width;
        
        // Create particles for this word
        const particlesPerWord = Math.max(3, Math.floor(word.length * 0.8));
        const wordParticles = [];
        
        for (let i = 0; i < particlesPerWord; i++) {
          const particleX = currentX + (i * (wordWidth / particlesPerWord));
          const particleY = currentY;
          
          // Random starting position (cosmic dust effect)
          const angle = Math.random() * Math.PI * 2;
          const distance = 200 + Math.random() * 300;
          const randomStartX = particleX + Math.cos(angle) * distance;
          const randomStartY = particleY + Math.sin(angle) * distance;
          
          const particle = new StellarParticle({
            startX: randomStartX,
            startY: randomStartY,
            targetX: particleX,
            targetY: particleY,
            char: word[Math.floor(i * word.length / particlesPerWord)] || word[0],
            word: cleanWord,
            isKeyWord: isKeyWord,
            size: isKeyWord ? 3 : 2
          });
          
          this.particles.push(particle);
          wordParticles.push(particle);
        }
        
        // Store key word particles for constellation connections
        if (isKeyWord && wordParticles.length > 0) {
          // Use the center particle as the connection point
          const centerParticle = wordParticles[Math.floor(wordParticles.length / 2)];
          this.keyWordMap.set(cleanWord, centerParticle);
          console.log(`🌌 Mapped key word: ${cleanWord} to particle at (${centerParticle.targetX}, ${centerParticle.targetY})`);
        }
        
        currentX += wordWidth + this.ctx.measureText(' ').width;
      });
    });
    
    console.log(`✨ Created ${this.particles.length} particles`);
    console.log(`✨ Mapped ${this.keyWordMap.size} key words:`, Array.from(this.keyWordMap.keys()));
  }
  
  createConstellations() {
    console.log('🌌 Creating constellation connections...');
    
    this.constellations = [];
    
    // Define meaningful connections
    const connections = [
      ['Care', 'humans'],      // Care connects to humans
      ['Create', 'Ethical'],   // Create connects to Ethical
      ['humans', 'core'],      // humans connects to core
      ['responsible', 'core']  // responsible connects to core
    ];
    
    connections.forEach(([word1, word2]) => {
      const particle1 = this.keyWordMap.get(word1);
      const particle2 = this.keyWordMap.get(word2);
      
      if (particle1 && particle2) {
        this.constellations.push(new ConstellationLine(particle1, particle2, `${word1}-${word2}`));
        console.log(`🌌 Created constellation: ${word1} → ${word2}`);
      } else {
        console.warn(`🌌 Could not create constellation: ${word1} → ${word2}`, {
          particle1: !!particle1,
          particle2: !!particle2
        });
      }
    });
    
    console.log(`🌌 Created ${this.constellations.length} constellation lines`);
  }
  
  startRenderLoop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    const render = (timestamp) => {
      if (!this.isActive || !this.phaseManager) {
        console.log('🌌 Render loop stopped - inactive or no phase manager');
        return;
      }
      
      // Update phase manager
      const phaseData = this.phaseManager.update();
      
      // Stop rendering if animation is complete
      if (phaseData.phase === 'complete') {
        console.log('🌌 Render loop ended - animation complete');
        return;
      }
      
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Update and draw particles
      this.particles.forEach(particle => {
        particle.update(phaseData.phase, phaseData.progress);
        particle.draw(this.ctx);
      });
      
      // Draw constellation lines
      this.drawConstellations(phaseData.phase, phaseData.progress);
      
      // Debug info (remove in production)
      this.ctx.fillStyle = 'white';
      this.ctx.font = '12px monospace';
      this.ctx.fillText(`Phase: ${phaseData.phase} (${Math.round(phaseData.progress * 100)}%)`, 10, 20);
      
      // Continue animation
      this.animationId = requestAnimationFrame(render);
    };
    
    this.animationId = requestAnimationFrame(render);
    console.log('🌌 Render loop started');
  }
  
  stopRenderLoop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  drawConstellations(phase, progress) {
    if (phase === 'constellation' || phase === 'breathing') {
      this.constellations.forEach(line => {
        if (phase === 'constellation') {
          line.opacity = progress;
        } else if (phase === 'breathing') {
          // Add breathing effect to constellation lines
          const time = Date.now() * 0.003;
          const pulse = Math.sin(time + line.pulseOffset) * 0.4 + 0.6;
          line.opacity = pulse;
        }
        line.draw(this.ctx, phase, progress);
      });
    } else if (phase === 'dissolution') {
      // Fade out constellation lines during dissolution
      this.constellations.forEach(line => {
        line.opacity = Math.max(0, 1 - progress);
        line.draw(this.ctx, phase, progress);
      });
    }
    // No constellation lines during materialization or complete phases
  }
}

// Performance Manager Class
class PerformanceManager {
  constructor(stellarMessage) {
    this.stellar = stellarMessage;
    this.frameCount = 0;
    this.lastFPSCheck = Date.now();
    this.currentFPS = 60;
  }
  
  update() {
    this.frameCount++;
    const now = Date.now();
    
    if (now - this.lastFPSCheck >= 1000) {
      this.currentFPS = this.frameCount;
      this.frameCount = 0;
      this.lastFPSCheck = now;
      
      if (this.currentFPS < 45) {
        this.optimizeParticleCount();
      }
    }
  }
  
  optimizeParticleCount() {
    const currentCount = this.stellar.particles.length;
    const newCount = Math.floor(currentCount * 0.8);
    this.stellar.particles = this.stellar.particles.slice(0, newCount);
    console.log(`🌌 Performance: Reduced particles ${currentCount} → ${newCount}`);
  }
}

// Create singleton instance
const stellarMessage = new StellarMessage();

// Debug function
window.testStellarMessage = () => {
  console.log('🧪 Testing StellarMessage manually...');
  stellarMessage.init();
  stellarMessage.activate();
  console.log('🧪 Manual test complete');
};

// Skip function for testing
window.skipStellarMessage = () => {
  if (stellarMessage.phaseManager) {
    console.log('🧪 Skipping to dissolution phase...');
    stellarMessage.phaseManager.currentPhase = 'dissolution';
    stellarMessage.phaseManager.startTime = Date.now();
  }
};

// Force complete function for testing
window.completeStellarMessage = () => {
  if (stellarMessage.phaseManager) {
    console.log('🧪 Force completing StellarMessage...');
    stellarMessage.phaseManager.isComplete = true;
    stellarMessage.phaseManager.onComplete?.();
  }
};

// Export for use
export default stellarMessage;