
/**
 * @file src/components/StellarMessage.jsx
 * @description Original StellarMessage React component for A/B testing
 * @version 1.0.0 - Original Implementation
 */

import React, { useEffect, useRef } from 'react';

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
    this.isComplete = false;
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
  
  nextPhase() {
    if (this.isComplete) return;
    
    const phaseOrder = ['materialization', 'constellation', 'breathing', 'dissolution'];
    const currentIndex = phaseOrder.indexOf(this.currentPhase);
    
    if (currentIndex < phaseOrder.length - 1) {
      this.currentPhase = phaseOrder[currentIndex + 1];
      this.startTime = Date.now();
      console.log(`🌌 Original Phase transition: ${this.currentPhase} (${currentIndex + 2}/4)`);
    } else {
      console.log('🌌 Original Sequence complete - releasing scroll');
      this.isComplete = true;
      setTimeout(() => {
        // Dispatch completion event
        window.dispatchEvent(new CustomEvent('stellarSequenceComplete'));
        this.onComplete?.();
      }, 500);
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
      const time = Date.now() * 0.003;
      const breathingIntensity = 0.4;
      const pulse = Math.sin(time + this.targetX * 0.02) * breathingIntensity + (1 - breathingIntensity);
      
      const moveAmount = 2;
      this.x = this.targetX + Math.sin(time + this.targetY * 0.01) * moveAmount;
      this.y = this.targetY + Math.cos(time + this.targetX * 0.01) * moveAmount;
      this.opacity = pulse;
      this.size = (this.isKeyWord ? 3 : 2) * (0.6 + pulse * 0.6);
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
      this.opacity = 0;
    }
  }
  
  draw(ctx) {
    if (this.opacity <= 0) return;
    
    ctx.save();
    ctx.globalAlpha = this.opacity;
    
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
    
    if (phase === 'breathing') {
      const time = Date.now() * 0.003;
      const pulse = Math.sin(time + this.pulseOffset) * 0.3 + 0.7;
      ctx.globalAlpha = this.opacity * pulse;
    } else {
      ctx.globalAlpha = this.opacity;
    }
    
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
    this.keyWordMap = new Map();
  }
  
  init(container) {
    if (this.isInitialized) return;
    console.log('🌌 Original StellarMessage initializing...');
    
    this.container = container;
    this.container.id = this.containerId;
    this.container.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 10;
    `;
    
    this.canvas = document.createElement('canvas');
    this.canvas.id = this.canvasId;
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
    `;
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    
    this.setupEventListeners();
    this.isInitialized = true;
    this.activate();
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => {
      if (this.isActive && this.canvas) {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
        this.convertTextToParticles();
        this.createConstellations();
      }
    });
  }
  
  activate() {
    if (this.isActive) return;
    console.log('🌌 Original Activating Stellar Message...');
    
    this.isActive = true;
    this.container.style.opacity = '1';
    
    // Get container dimensions
    const containerRect = this.container.getBoundingClientRect();
    console.log('🌌 Original Container rect:', containerRect);
    
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
    
    console.log('🌌 Original Canvas dimensions set to:', this.canvas.width, 'x', this.canvas.height);
    
    if (this.canvas.width === 0 || this.canvas.height === 0) {
      console.error('🌌 Original Canvas has zero dimensions! Container:', this.container.clientWidth, 'x', this.container.clientHeight);
      return;
    }
    
    // Test canvas rendering with a large visible rectangle
    this.ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
    this.ctx.fillRect(50, 50, 200, 100);
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText("ORIGINAL CANVAS TEST", 60, 110);
    
    console.log('🌌 Original Canvas test rectangle drawn');
    
    this.phaseManager = new AnimationPhaseManager();
    this.convertTextToParticles();
    this.createConstellations();
    this.startRenderLoop();
    
    // Remove test rectangle after 5 seconds
    setTimeout(() => {
      if (this.ctx) {
        this.ctx.clearRect(50, 50, 200, 100);
        console.log('🌌 Original Test rectangle cleared');
      }
    }, 5000);
  }
  
  deactivate() {
    console.log('🌌 Original Deactivating StellarMessage...');
    this.stopRenderLoop();
    if (this.container) this.container.style.opacity = '0';
    if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.phaseManager = null;
    this.isActive = false;
  }
  
  destroy() {
    this.deactivate();
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.isInitialized = false;
    console.log('🌌 Original StellarMessage destroyed');
  }
  
  convertTextToParticles() {
    console.log('🌌 Original Converting text to particles...');
    this.particles = [];
    this.keyWordMap.clear();
    
    const message = "We Care, We Create: Ethical, responsible products with humans at the core.";
    const keyWords = ['Care', 'Create', 'Ethical', 'responsible', 'humans', 'core'];
    const lines = [
      "We Care, We Create: Ethical,",
      "responsible products with humans",
      "at the core."
    ];
    
    const fontSize = 48;
    const lineHeight = fontSize * 1.4;
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const startY = (canvasHeight - lines.length * lineHeight) / 2;
    
    this.ctx.font = `${fontSize}px Arial, sans-serif`;
    
    lines.forEach((line, lineIndex) => {
      const words = line.split(' ');
      const lineWidth = this.ctx.measureText(line).width;
      const startX = (canvasWidth - lineWidth) / 2;
      let currentX = startX;
      const currentY = startY + lineIndex * lineHeight;
      
      words.forEach((word) => {
        const cleanWord = word.replace(/[^\w]/g, '');
        const isKeyWord = keyWords.includes(cleanWord);
        const wordWidth = this.ctx.measureText(word).width;
        const particlesPerWord = Math.max(3, Math.floor(word.length * 0.8));
        const wordParticles = [];
        
        for (let i = 0; i < particlesPerWord; i++) {
          const particleX = currentX + (i * (wordWidth / particlesPerWord));
          const particleY = currentY;
          const angle = Math.random() * Math.PI * 2;
          const distance = 200 + Math.random() * 300;
          const randomStartX = particleX + Math.cos(angle) * distance;
          const randomStartY = particleY + Math.sin(angle) * distance;
          
          const particle = new StellarParticle({
            startX: randomStartX,
            startY: randomStartY,
            targetX: particleX,
            targetY: particleY,
            char: word[Math.floor((i * word.length) / particlesPerWord)] || word[0],
            word: cleanWord,
            isKeyWord: isKeyWord,
            size: isKeyWord ? 3 : 2,
          });
          
          this.particles.push(particle);
          wordParticles.push(particle);
        }
        
        if (isKeyWord && wordParticles.length > 0) {
          const centerParticle = wordParticles[Math.floor(wordParticles.length / 2)];
          this.keyWordMap.set(cleanWord, centerParticle);
          console.log(`🌌 Original Mapped key word: ${cleanWord} at (${centerParticle.targetX}, ${centerParticle.targetY})`);
        }
        
        currentX += wordWidth + this.ctx.measureText(' ').width;
      });
    });
    
    console.log(`✨ Original Created ${this.particles.length} particles`);
  }
  
  createConstellations() {
    console.log('🌌 Original Creating constellation connections...');
    this.constellations = [];
    
    const connections = [
      ['Care', 'humans'],
      ['Create', 'Ethical'],
      ['humans', 'core'],
      ['responsible', 'core']
    ];
    
    connections.forEach(([word1, word2]) => {
      const particle1 = this.keyWordMap.get(word1);
      const particle2 = this.keyWordMap.get(word2);
      
      if (particle1 && particle2) {
        this.constellations.push(new ConstellationLine(particle1, particle2, `${word1}-${word2}`));
        console.log(`🌌 Original Created constellation: ${word1} → ${word2}`);
      }
    });
    
    console.log(`🌌 Original Created ${this.constellations.length} constellation lines`);
  }
  
  startRenderLoop() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    
    const render = (timestamp) => {
      if (!this.isActive || !this.phaseManager) {
        console.log('🌌 Original Render loop stopped');
        return;
      }
      
      const phaseData = this.phaseManager.update();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.particles.forEach((particle) => {
        particle.update(phaseData.phase, phaseData.progress);
        particle.draw(this.ctx);
      });
      
      this.drawConstellations(phaseData.phase, phaseData.progress);
      
      // Debug info
      this.ctx.fillStyle = "white";
      this.ctx.font = "14px monospace";
      this.ctx.fillText(`Original Phase: ${phaseData.phase} (${Math.round(phaseData.progress * 100)}%)`, 10, 20);
      
      this.animationId = requestAnimationFrame(render);
    };
    
    this.animationId = requestAnimationFrame(render);
    console.log('🌌 Original Render loop started');
  }
  
  stopRenderLoop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  drawConstellations(phase, progress) {
    if (phase === 'constellation' || phase === 'breathing') {
      this.constellations.forEach((line) => {
        if (phase === 'constellation') {
          line.opacity = progress;
        } else if (phase === 'breathing') {
          const time = Date.now() * 0.003;
          const pulse = Math.sin(time + line.pulseOffset) * 0.4 + 0.6;
          line.opacity = pulse;
        }
        line.draw(this.ctx, phase, progress);
      });
    } else if (phase === 'dissolution') {
      this.constellations.forEach((line) => {
        line.opacity = Math.max(0, 1 - progress);
        line.draw(this.ctx, phase, progress);
      });
    }
  }
}

const StellarMessageComponent = () => {
  const containerRef = useRef(null);
  const stellarRef = useRef(null);

  useEffect(() => {
    stellarRef.current = new StellarMessage();

    const initialize = () => {
      if (containerRef.current && !stellarRef.current.isInitialized) {
        // Ensure container has dimensions
        const rect = containerRef.current.getBoundingClientRect();
        console.log('🌌 Original Container dimensions:', rect.width, 'x', rect.height);
        
        if (rect.width > 0 && rect.height > 0) {
          stellarRef.current.init(containerRef.current);
          console.log('🌌 Original StellarMessage initialized with container');
          return true;
        } else {
          console.warn('🌌 Original Container has no dimensions, retrying...');
          return false;
        }
      } else if (!containerRef.current) {
        console.warn('🌌 Original Container ref not available, retrying...');
        return false;
      }
      return true;
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!initialize()) {
        const retryTimer = setInterval(() => {
          if (initialize()) clearInterval(retryTimer);
        }, 100);
        return () => clearInterval(retryTimer);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (stellarRef.current) stellarRef.current.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black"
      style={{ 
        position: "relative", 
        overflow: "hidden",
        width: "100%",
        height: "100vh",
        minHeight: "100vh"
      }}
    />
  );
};

export default StellarMessageComponent;
