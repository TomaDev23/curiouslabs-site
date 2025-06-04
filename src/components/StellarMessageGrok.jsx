import { useEffect, useRef, useState } from "react";

// Animation constants
const ANIMATION_CONFIG = {
  PHASES: {
    materialization: { duration: 10000 },
    constellation: { duration: 5000 },
    breathing: { duration: 12000 }, // Extended for new sequence
    dissolution: { duration: 4000 }
  },
  FONT_SIZE: 80,
  LINE_HEIGHT_RATIO: 1.6,
  PARTICLE_COUNTS: {
    purple: 10,
    key: 20,
    normal: 10
  },
  EXPLOSION_DISTANCE: {
    initial: 50,
    breathing_first: 400, // Much bigger first explosion
    breathing_final: 600, // Even bigger final explosion
    constellation: 30,
    dissolution: 150
  },
  COLORS: {
    purple: "#800080",
    key: "#FF6B35",
    normal: "#FFFFFF",
    constellation: "#FFA500",
    glow: "#FFD700"
  }
};

// Text configuration
const TEXT_CONFIG = {
  message: "We Care, We Create: Ethical, responsible products with humans at the core.",
  lines: [
    "We Care, We Create: Ethical,",
    "responsible products with humans",
    "at the core."
  ],
  keyWords: ["Care", "Create", "Ethical", "responsible", "humans", "core"],
  purpleWord: "humans",
  forHumansText: "HUMANS",
  weCareText: "WE CARE"
};

class AnimationPhaseManager {
  constructor() {
    this.phases = { ...ANIMATION_CONFIG.PHASES };
    Object.keys(this.phases).forEach(key => {
      this.phases[key].progress = 0;
    });
    this.currentPhase = "materialization";
    this.startTime = Date.now();
  }

  update() {
    const elapsed = Date.now() - this.startTime;
    const phase = this.phases[this.currentPhase];
    phase.progress = Math.min(elapsed / phase.duration, 1);
    
    if (phase.progress >= 1) {
      this.nextPhase();
    }
    
    return { phase: this.currentPhase, progress: phase.progress };
  }

  nextPhase() {
    const phaseOrder = ["materialization", "constellation", "breathing", "dissolution"];
    const currentIndex = phaseOrder.indexOf(this.currentPhase);
    this.currentPhase = phaseOrder[currentIndex < phaseOrder.length - 1 ? currentIndex + 1 : 0];
    this.phases[this.currentPhase].progress = 0;
    this.startTime = Date.now();
  }
}

class StellarParticle {
  constructor(options) {
    Object.assign(this, {
      x: options.startX || 0,
      y: options.startY || 0,
      targetX: options.targetX || 0,
      targetY: options.targetY || 0,
      forHumansTargetX: options.forHumansTargetX || options.targetX || 0,
      forHumansTargetY: options.forHumansTargetY || options.targetY || 0,
      weCareTargetX: options.weCareTargetX || options.targetX || 0,
      weCareTargetY: options.weCareTargetY || options.targetY || 0,
      char: options.char || "",
      word: options.word || "",
      isKeyWord: options.isKeyWord || false,
      isPurpleWord: options.isPurpleWord || false,
      opacity: 0,
      flareTimer: Math.random() * 300,
      hasInitExplosion: false
    });
    
    // FX-3: Only generate explosion vector once
    if (!this.hasInitExplosion) {
      this.startX = options.startX || 0;
      this.startY = options.startY || 0;
      this.explosionVector = { 
        x: Math.random() * 2 - 1, 
        y: Math.random() * 2 - 1 
      };
      this.hasInitExplosion = true;
    }
    
    this.size = this.isPurpleWord ? 5 : this.isKeyWord ? 4 : 3;
    this.glowIntensity = this.isPurpleWord ? 15 : this.isKeyWord ? 10 : 5;
  }

  update(phase, progress) {
    switch (phase) {
      case "materialization":
        this.updateMaterialization(progress);
        break;
      case "constellation":
        this.updateConstellation(progress);
        break;
      case "breathing":
        this.updateBreathing(progress);
        break;
      case "dissolution":
        this.updateDissolution(progress);
        break;
    }
    this.flareTimer += 16;
  }

  updateMaterialization(progress) {
    if (progress < 0.2) {
      const explodeProgress = progress / 0.2;
      const distance = explodeProgress * ANIMATION_CONFIG.EXPLOSION_DISTANCE.initial;
      this.x = this.startX + this.explosionVector.x * distance;
      this.y = this.startY + this.explosionVector.y * distance;
      this.opacity = explodeProgress * 0.5;
      this.size = this.getBaseSize() * (0.5 + explodeProgress * 0.5);
    } else {
      const easeProgress = (progress - 0.2) / 0.8;
      const easedProgress = 1 - Math.pow(1 - easeProgress, 3);
      this.x = this.startX + (this.targetX - this.startX) * easedProgress;
      this.y = this.startY + (this.targetY - this.startY) * easedProgress;
      this.opacity = easeProgress;
      this.size = this.getBaseSize() * (0.5 + easeProgress * 0.5);
    }
  }

  updateConstellation(progress) {
    const time = Date.now() * 0.005;
    this.x = this.targetX + Math.sin(time + this.targetX * 0.02) * 5;
    this.y = this.targetY + Math.cos(time + this.targetY * 0.02) * 5;
    this.opacity = 1;
    this.size = this.getBaseSize() * (0.9 + Math.sin(Date.now() * 0.003) * 0.1);
    
    if (progress > 0.6) {
      const explodeProgress = (progress - 0.6) / 0.4;
      const distance = explodeProgress * ANIMATION_CONFIG.EXPLOSION_DISTANCE.constellation;
      this.x += this.explosionVector.x * distance;
      this.y += this.explosionVector.y * distance;
    }
  }

  updateBreathing(progress) {
    const baseSize = this.getBaseSize();
    const time = Date.now() * 0.001;
    
    // Simplified breathing sequence to avoid crashes
    if (progress < 0.2) {
      // Phase 1: Big dynamic explosion (0-20%)
      const explodeProgress = this.easeInOut(progress / 0.2);
      const distance = explodeProgress * ANIMATION_CONFIG.EXPLOSION_DISTANCE.breathing_first;
      
      // Basic explosion movement
      this.x = this.targetX + this.explosionVector.x * distance;
      this.y = this.targetY + this.explosionVector.y * distance;
      this.opacity = Math.max(0.3, 1 - explodeProgress * 0.4);
      this.size = baseSize * (1 + explodeProgress * 0.8);
      
    } else if (progress < 0.4) {
      // Phase 2: Form HUMANS (20-40%)
      const formProgress = this.easeInOut((progress - 0.2) / 0.2);
      
      if (this.isPurpleWord) {
        // Purple particles form HUMANS
        const explodedX = this.targetX + this.explosionVector.x * ANIMATION_CONFIG.EXPLOSION_DISTANCE.breathing_first;
        const explodedY = this.targetY + this.explosionVector.y * ANIMATION_CONFIG.EXPLOSION_DISTANCE.breathing_first;
        
        this.x = explodedX + (this.forHumansTargetX - explodedX) * formProgress;
        this.y = explodedY + (this.forHumansTargetY - explodedY) * formProgress;
        this.opacity = 0.5 + formProgress * 0.5;
        this.size = baseSize * (1.5 - formProgress * 0.3);
      } else {
        // Other particles create dynamic swirl
        const centerX = this.canvas?.width / 2 || window.innerWidth / 2;
        const centerY = this.canvas?.height / 2 || window.innerHeight / 2;
        const angle = Math.atan2(this.targetY - centerY, this.targetX - centerX) + time * 0.5;
        const radius = 200;
        
        this.x = centerX + Math.cos(angle) * radius;
        this.y = centerY + Math.sin(angle) * radius;
        this.opacity = 0.4;
        this.size = baseSize * 0.8;
      }
      
    } else if (progress < 0.6) {
      // Phase 3: Form WE CARE (40-60%) - simplified
      const formProgress = this.easeInOut((progress - 0.4) / 0.2);
      
      if (this.word === "Care" || this.word === "We") {
        // Use safe fallback if weCareTarget doesn't exist
        const targetX = this.weCareTargetX || this.targetX;
        const targetY = this.weCareTargetY || this.targetY;
        
        this.x = this.forHumansTargetX + (targetX - this.forHumansTargetX) * formProgress;
        this.y = this.forHumansTargetY + (targetY - this.forHumansTargetY) * formProgress;
        this.opacity = 0.7 + formProgress * 0.3;
        this.size = baseSize * (1.2 + formProgress * 0.3);
      } else {
        // Other particles maintain constellation
        const centerX = this.canvas?.width / 2 || window.innerWidth / 2;
        const centerY = this.canvas?.height / 2 || window.innerHeight / 2;
        const angle = time * 0.3;
        const radius = 150;
        
        this.x = centerX + Math.cos(angle) * radius;
        this.y = centerY + Math.sin(angle) * radius;
        this.opacity = 0.5;
        this.size = baseSize * 0.6;
      }
      
    } else if (progress < 0.8) {
      // Phase 4: Final explosion (60-80%)
      const explodeProgress = this.easeInOut((progress - 0.6) / 0.2);
      const distance = explodeProgress * ANIMATION_CONFIG.EXPLOSION_DISTANCE.breathing_final;
      
      this.x = this.targetX + this.explosionVector.x * distance;
      this.y = this.targetY + this.explosionVector.y * distance;
      this.opacity = Math.max(0.2, 1 - explodeProgress * 0.6);
      this.size = baseSize * (1.5 + explodeProgress * 1.0);
      
    } else {
      // Phase 5: Constellation formation (80-100%)
      const constellationProgress = this.easeInOut((progress - 0.8) / 0.2);
      
      const centerX = this.canvas?.width / 2 || window.innerWidth / 2;
      const centerY = this.canvas?.height / 2 || window.innerHeight / 2;
      
      // Simple constellation positions
      let constellationX, constellationY;
      if (this.isPurpleWord) {
        constellationX = centerX;
        constellationY = centerY;
      } else {
        const angle = (this.char.charCodeAt(0) / 26) * Math.PI * 2;
        const radius = 100;
        constellationX = centerX + Math.cos(angle) * radius;
        constellationY = centerY + Math.sin(angle) * radius;
      }
      
      const explodedX = this.targetX + this.explosionVector.x * ANIMATION_CONFIG.EXPLOSION_DISTANCE.breathing_final;
      const explodedY = this.targetY + this.explosionVector.y * ANIMATION_CONFIG.EXPLOSION_DISTANCE.breathing_final;
      
      this.x = explodedX + (constellationX - explodedX) * constellationProgress;
      this.y = explodedY + (constellationY - explodedY) * constellationProgress;
      this.opacity = Math.max(0.3, 1 - constellationProgress * 0.5);
      this.size = baseSize * (1.2 - constellationProgress * 0.4);
    }
  }

  easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  updateDissolution(progress) {
    const centerX = this.canvas?.width / 2 || window.innerWidth / 2;
    const centerY = this.canvas?.height / 2 || window.innerHeight / 2;
    const angle = Math.atan2(this.targetY - centerY, this.targetX - centerX);
    const spiralAngle = angle + progress * Math.PI;
    const distance = progress * ANIMATION_CONFIG.EXPLOSION_DISTANCE.dissolution;
    
    this.x = this.targetX + Math.cos(spiralAngle) * distance;
    this.y = this.targetY + Math.sin(spiralAngle) * distance;
    this.opacity = Math.max(0, 1 - progress);
    this.size = this.getBaseSize() * (1 - progress * 0.3);
  }

  getBaseSize() {
    return this.isPurpleWord ? 5 : this.isKeyWord ? 4 : 3;
  }

  getColor() {
    return this.isPurpleWord ? ANIMATION_CONFIG.COLORS.purple : 
           this.isKeyWord ? ANIMATION_CONFIG.COLORS.key : 
           ANIMATION_CONFIG.COLORS.normal;
  }

  draw(ctx) {
    if (this.opacity <= 0) return;
    
    ctx.save();
    ctx.globalAlpha = this.opacity;
    
    if ((this.isPurpleWord || this.isKeyWord) && this.opacity > 0.3) {
      ctx.shadowBlur = this.glowIntensity;
      ctx.shadowColor = this.getColor();
    }
    
    ctx.fillStyle = this.getColor();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class ConstellationLine {
  constructor(startParticle, endParticle, concept, delay = 0, isMini = false) {
    this.start = startParticle;
    this.end = endParticle;
    this.concept = concept;
    this.opacity = 0;
    this.pulseOffset = Math.random() * Math.PI * 2;
    this.delay = delay;
    this.glowPosition = 0;
    this.isMini = isMini;
    this.scaleFactor = 1;
    
    // Create curved path
    this.controlX = (startParticle.targetX + endParticle.targetX) / 2 + (Math.random() - 0.5) * 50;
    this.controlY = (startParticle.targetY + endParticle.targetY) / 2 + (Math.random() - 0.5) * 50;
  }

  draw(ctx, phase, progress) {
    if (this.opacity <= 0) return;
    
    let lineProgress = 1;
    if (phase === "materialization" && this.isMini) {
      const delayedProgress = Math.max(0, (progress - 0.2) / 0.4 - this.delay);
      lineProgress = Math.min(1, delayedProgress);
    } else if (phase === "constellation" && !this.isMini) {
      const delayedProgress = Math.max(0, progress - this.delay);
      lineProgress = Math.min(1, delayedProgress / (1 - this.delay));
    }

    ctx.save();
    this.setupLineStyle(ctx, phase);
    this.drawLine(ctx, lineProgress);
    this.drawEffects(ctx, phase, progress, lineProgress);
    ctx.restore();
  }

  setupLineStyle(ctx, phase) {
    if (phase === "breathing" && !this.isMini) {
      const time = Date.now() * 0.004;
      const pulse = Math.sin(time + this.pulseOffset) * 0.4 + 0.6;
      ctx.globalAlpha = this.opacity * pulse;
    } else {
      ctx.globalAlpha = this.opacity;
    }
    
    this.scaleFactor = this.isMini ? 0.9 + Math.sin(Date.now() * 0.002 + this.pulseOffset) * 0.2 : 1;
    const hueShift = Math.sin(Date.now() * 0.001 + this.pulseOffset) * 0.1;
    const baseColor = hueShift > 0 ? ANIMATION_CONFIG.COLORS.constellation : "#FF8C42";
    
    ctx.shadowBlur = this.isMini ? 15 : 10;
    ctx.shadowColor = baseColor;
    ctx.strokeStyle = baseColor;
    ctx.lineWidth = (this.isMini ? 2 : 3) * this.scaleFactor;
  }

  drawLine(ctx, lineProgress) {
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    
    const endX = this.start.x + (this.end.x - this.start.x) * lineProgress;
    const endY = this.start.y + (this.end.y - this.start.y) * lineProgress;
    const controlX = this.start.x + (this.controlX - this.start.x) * lineProgress;
    const controlY = this.start.y + (this.controlY - this.start.y) * lineProgress;
    
    ctx.quadraticCurveTo(controlX, controlY, endX, endY);
    ctx.stroke();
  }

  drawEffects(ctx, phase, progress, lineProgress) {
    // FX-2: Early return for mini lines to prevent duplicate trails
    if (this.isMini) {
      this.drawGlowEffect(ctx);
      return;
    }
    
    const shouldDrawGlow = ((phase === "materialization" && !this.isMini && lineProgress >= 1) ||
                           (phase === "constellation" && !this.isMini && lineProgress >= 1) ||
                           (phase === "breathing" && !this.isMini));
    
    if (shouldDrawGlow) {
      this.drawGlowEffect(ctx);
    }
    
    if (lineProgress > 0 && lineProgress < 1) {
      this.drawTrailEffect(ctx, lineProgress);
    }
  }

  drawGlowEffect(ctx) {
    this.glowPosition = (this.glowPosition + 0.02) % 1;
    const t = this.glowPosition;
    const glowX = this.start.x * (1 - t) * (1 - t) + 2 * this.controlX * t * (1 - t) + this.end.x * t * t;
    const glowY = this.start.y * (1 - t) * (1 - t) + 2 * this.controlY * t * (1 - t) + this.end.y * t * t;
    
    ctx.shadowBlur = 20;
    ctx.shadowColor = ANIMATION_CONFIG.COLORS.glow;
    ctx.fillStyle = ANIMATION_CONFIG.COLORS.glow;
    ctx.beginPath();
    ctx.arc(glowX, glowY, this.isMini ? 6 : 4, 0, Math.PI * 2);
    ctx.fill();
  }

  drawTrailEffect(ctx, lineProgress) {
    const endX = this.start.x + (this.end.x - this.start.x) * lineProgress;
    const endY = this.start.y + (this.end.y - this.start.y) * lineProgress;
    
    ctx.shadowBlur = 20;
    ctx.shadowColor = ANIMATION_CONFIG.COLORS.glow;
    ctx.fillStyle = ANIMATION_CONFIG.COLORS.glow;
    ctx.beginPath();
    ctx.arc(endX, endY, this.isMini ? 6 : 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw trail particles
    for (let i = 1; i <= 3; i++) {
      const trailProgress = Math.max(0, lineProgress - i * 0.1);
      if (trailProgress > 0) {
        const t = trailProgress;
        const trailX = this.start.x * (1 - t) * (1 - t) + 2 * this.controlX * t * (1 - t) + this.end.x * t * t;
        const trailY = this.start.y * (1 - t) * (1 - t) + 2 * this.controlY * t * (1 - t) + this.end.y * t * t;
        ctx.globalAlpha = this.opacity * (0.6 - i * 0.15);
        ctx.beginPath();
        ctx.arc(trailX, trailY, this.isMini ? 4 : 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

class StellarMessage {
  constructor() {
    this.containerId = "stellar-message-container";
    this.canvasId = "stellar-message-canvas";
    this.isActive = false;
    this.isPaused = false;
    this.isInitialized = false;
    this.container = null;
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.constellations = [];
    this.miniConstellations = [];
    this.keyWordMap = new Map();
    this.animationId = null;
    this.pausedTime = 0;
    this.flares = [];
    this.globalOpacity = 1;
    this.showDebug = true;
    this.debugInfo = {
      fps: 0,
      lastFrameTime: 0,
      frameCount: 0,
      startTime: Date.now(),
      errors: [],
      warnings: [],
      currentLine: 'init'
    };
    this.fpsHistory = [];
    this.lastDebugPaint = 0;
    
    // MEMORY LEAK FIX: Store the resize handler for proper cleanup
    this.resizeHandler = null;
  }

  init(container) {
    if (this.isInitialized) return;
    
    this.container = container;
    this.setupContainer();
    this.setupCanvas();
    this.setupEventListeners();
    this.isInitialized = true;
    this.activate();
  }

  setupContainer() {
    this.container.id = this.containerId;
    this.container.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 9999;
      background: transparent;
    `;
  }

  setupCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = this.canvasId;
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
    `;
    this.ctx = this.canvas.getContext("2d");
    this.container.appendChild(this.canvas);
  }

  setupEventListeners() {
    // MEMORY LEAK FIX: Store the handler reference for cleanup
    this.resizeHandler = () => {
      if (this.isActive && this.canvas) {
        this.resizeCanvas();
        this.convertTextToParticles();
        this.createConstellations();
      }
    };
    
    window.addEventListener("resize", this.resizeHandler);
  }

  resizeCanvas() {
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
  }

  activate() {
    if (this.isActive) return;
    
    this.isActive = true;
    this.container.style.opacity = "1";
    this.resizeCanvas();
    
    if (this.canvas.width === 0 || this.canvas.height === 0) {
      console.error("Invalid canvas dimensions");
      return;
    }
    
    this.phaseManager = new AnimationPhaseManager();
    this.convertTextToParticles();
    this.createConstellations();
    this.startRenderLoop();
  }

  deactivate() {
    console.log("🌌 Deactivating StellarMessage...");
    this.stopRenderLoop();
    
    // MEMORY LEAK FIX: Remove event listener
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }
    
    if (this.container) this.container.style.opacity = "0";
    if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // FX-7: Clear constellation arrays to prevent memory leaks
    this.miniConstellations = [];
    this.constellations = [];
    this.particles = [];
    this.keyWordMap.clear();
    this.flares = [];
    
    this.phaseManager = null;
    this.isActive = false;
  }

  destroy() {
    this.deactivate();
    
    // MEMORY LEAK FIX: Ensure event listener is removed
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
      this.resizeHandler = null;
    }
    
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.isInitialized = false;
  }

  convertTextToParticles() {
    try {
      this.debugInfo.currentLine = 'convertTextToParticles-start';
      this.particles = [];
      this.keyWordMap.clear();
      
      const { lines, keyWords, purpleWord, forHumansText } = TEXT_CONFIG;
      const fontSize = ANIMATION_CONFIG.FONT_SIZE;
      const lineHeight = fontSize * ANIMATION_CONFIG.LINE_HEIGHT_RATIO;
      const canvasWidth = this.canvas.width;
      const canvasHeight = this.canvas.height;

      if (canvasWidth === 0 || canvasHeight === 0) {
        this.logError('Canvas Dimensions', 'Invalid canvas dimensions', 'convertTextToParticles-dimensions');
        return;
      }

      this.debugInfo.currentLine = 'convertTextToParticles-setup-font';
      this.setupFont(fontSize);
      
      this.debugInfo.currentLine = 'convertTextToParticles-create-temp-canvas';
      const tempCanvas = this.createTempCanvas(fontSize);
      
      const startY = (canvasHeight - lines.length * lineHeight) / 2;
      const humansConfig = this.calculateForHumansPosition(forHumansText, canvasWidth, canvasHeight);
      
      this.debugInfo.currentLine = 'convertTextToParticles-process-lines';
      this.processLines(lines, startY, lineHeight, canvasWidth, tempCanvas, keyWords, purpleWord, humansConfig);
      
      this.debugInfo.currentLine = 'convertTextToParticles-create-mini-constellations';
      this.createMiniConstellations();
      
      this.debugInfo.currentLine = 'convertTextToParticles-complete';
    } catch (error) {
      this.logError('Text Conversion Error', error, this.debugInfo.currentLine);
    }
  }

  setupFont(fontSize) {
    try {
      this.ctx.font = `${fontSize}px Arial, sans-serif`;
      const testWidth = this.ctx.measureText("Test").width;
      if (testWidth === 0) {
        console.warn('Font measurement failed, trying fallback');
        this.ctx.font = `${fontSize}px sans-serif`;
        const fallbackWidth = this.ctx.measureText("Test").width;
        console.log(`Fallback font width: ${fallbackWidth}`);
      }
      console.log(`Font setup complete: ${this.ctx.font}`);
    } catch (error) {
      this.logError('Font Setup Error', error, 'setupFont');
    }
  }

  createTempCanvas(fontSize) {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = fontSize * 2;
    tempCanvas.height = fontSize * 2;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.font = this.ctx.font;
    tempCtx.fillStyle = "#FFFFFF";
    tempCtx.textBaseline = "middle";
    return { canvas: tempCanvas, ctx: tempCtx };
  }

  calculateForHumansPosition(humansText, canvasWidth, canvasHeight) {
    const humansWidth = this.ctx.measureText(humansText).width;
    return {
      x: (canvasWidth - humansWidth) / 2,
      y: canvasHeight / 2,
      text: humansText
    };
  }

  calculateWeCarePosition(weCareText, canvasWidth, canvasHeight) {
    try {
      const weCareWidth = this.ctx.measureText(weCareText).width;
      return {
        x: (canvasWidth - weCareWidth) / 2,
        y: canvasHeight / 2 - 50, // Slightly above center
        text: weCareText
      };
    } catch (error) {
      this.logWarning('WE CARE position calculation failed, using fallback', 'calculateWeCarePosition');
      return {
        x: canvasWidth / 2 - 100, // Fallback position
        y: canvasHeight / 2 - 50,
        text: weCareText
      };
    }
  }

  processLines(lines, startY, lineHeight, canvasWidth, tempCanvas, keyWords, purpleWord, humansConfig, weCareConfig) {
    try {
      lines.forEach((line, lineIndex) => {
        const lineWidth = this.ctx.measureText(line).width;
        const startX = (canvasWidth - lineWidth) / 2;
        let currentX = startX;
        const currentY = startY + lineIndex * lineHeight;

        const words = line.split(" ");
        words.forEach((word) => {
          try {
            const cleanWord = word.replace(/[^\w]/g, "");
            const isKeyWord = keyWords.includes(cleanWord);
            const isPurpleWord = cleanWord === purpleWord;
            const wordWidth = this.ctx.measureText(word).width;
            const wordParticles = [];

            let charX = currentX;
            for (let charIndex = 0; charIndex < word.length; charIndex++) {
              const char = word[charIndex];
              const charWidth = this.ctx.measureText(char).width;
              const particlesPerChar = isPurpleWord ? 
                ANIMATION_CONFIG.PARTICLE_COUNTS.purple : 
                isKeyWord ? ANIMATION_CONFIG.PARTICLE_COUNTS.key : 
                ANIMATION_CONFIG.PARTICLE_COUNTS.normal;

              const charParticles = this.createCharacterParticles(
                char, charX, currentY, charIndex, cleanWord, 
                isKeyWord, isPurpleWord, tempCanvas, humansConfig, weCareConfig, particlesPerChar
              );
              
              wordParticles.push(...charParticles);
              charX += charWidth;
            }

            if (isKeyWord && wordParticles.length > 0) {
              const centerParticle = wordParticles[Math.floor(wordParticles.length / 2)];
              this.keyWordMap.set(cleanWord, centerParticle);
            }

            currentX += wordWidth + this.ctx.measureText(" ").width;
          } catch (error) {
            this.logError('Word Processing Error', error, `processLines-word-${word}`);
          }
        });
      });
    } catch (error) {
      this.logError('Process Lines Error', error, 'processLines-main');
    }
  }

  createCharacterParticles(char, charX, currentY, charIndex, cleanWord, isKeyWord, isPurpleWord, tempCanvas, humansConfig, weCareConfig, particlesPerChar) {
    try {
      const fontSize = ANIMATION_CONFIG.FONT_SIZE;
      
      // Clear and draw character
      tempCanvas.ctx.clearRect(0, 0, tempCanvas.canvas.width, tempCanvas.canvas.height);
      tempCanvas.ctx.fillText(char, fontSize / 2, fontSize);

      // Extract points from character
      const imageData = tempCanvas.ctx.getImageData(0, 0, tempCanvas.canvas.width, tempCanvas.canvas.height);
      const points = this.extractPointsFromImageData(imageData, tempCanvas.canvas);
      
      if (points.length === 0) {
        console.warn(`No points found for character '${char}' in word '${cleanWord}'`);
        return [];
      }
      
      const selectedPoints = this.selectRandomPoints(points, particlesPerChar);
      console.log(`Creating ${selectedPoints.length} particles for '${char}' in '${cleanWord}'`);

      return selectedPoints.map((point, pointIndex) => {
        try {
          const particleX = charX + point.x * (fontSize / tempCanvas.canvas.width);
          const particleY = currentY + point.y * (fontSize / tempCanvas.canvas.height);
          
          const { startX, startY } = this.generateRandomStart(particleX, particleY);
          
          // Safe calculation of targets
          let forHumansTargetX = particleX;
          let forHumansTargetY = particleY;
          if (humansConfig) {
            const humansTarget = this.calculateForHumansTarget(
              cleanWord, charIndex, point, humansConfig, particleX, particleY, fontSize
            );
            forHumansTargetX = humansTarget.forHumansTargetX;
            forHumansTargetY = humansTarget.forHumansTargetY;
          }
          
          let weCareTargetX = particleX;
          let weCareTargetY = particleY;
          if (weCareConfig) {
            const weCareTarget = this.calculateWeCareTarget(
              cleanWord, char, charIndex, point, weCareConfig, particleX, particleY, fontSize
            );
            weCareTargetX = weCareTarget.weCareTargetX;
            weCareTargetY = weCareTarget.weCareTargetY;
          }

          const particle = new StellarParticle({
            startX, startY,
            targetX: particleX, targetY: particleY,
            forHumansTargetX, forHumansTargetY,
            weCareTargetX, weCareTargetY,
            char, word: cleanWord, isKeyWord, isPurpleWord
          });
          
          this.particles.push(particle);
          return particle;
          
        } catch (error) {
          console.error(`Error creating particle ${pointIndex} for '${char}':`, error);
          return null;
        }
      }).filter(p => p !== null);
      
    } catch (error) {
      this.logError('Character Particle Creation Error', error, `createCharacterParticles-${char}-${cleanWord}`);
      return [];
    }
  }

  extractPointsFromImageData(imageData, canvas) {
    const points = [];
    for (let y = 0; y < canvas.height; y += 4) {
      for (let x = 0; x < canvas.width; x += 4) {
        const index = (y * canvas.width + x) * 4;
        if (imageData.data[index + 3] > 128) {
          points.push({ x: x - canvas.width / 2, y: y - canvas.height / 2 });
        }
      }
    }
    return points;
  }

  selectRandomPoints(points, maxPoints) {
    const selectedPoints = [];
    const maxSelection = Math.min(maxPoints, points.length);
    const pointsCopy = [...points];
    
    while (selectedPoints.length < maxSelection && pointsCopy.length > 0) {
      const index = Math.floor(Math.random() * pointsCopy.length);
      selectedPoints.push(pointsCopy.splice(index, 1)[0]);
    }
    
    return selectedPoints;
  }

  generateRandomStart(particleX, particleY) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 500 + Math.random() * 600;
    return {
      startX: particleX + Math.cos(angle) * distance,
      startY: particleY + Math.sin(angle) * distance
    };
  }

  calculateForHumansTarget(cleanWord, charIndex, point, humansConfig, particleX, particleY, fontSize) {
    if (cleanWord === TEXT_CONFIG.purpleWord) {
      let targetX = humansConfig.x;
      for (let j = 0; j < charIndex; j++) {
        targetX += this.ctx.measureText(humansConfig.text[j]).width;
      }
      return {
        forHumansTargetX: targetX + point.x * (fontSize / (fontSize * 2)),
        forHumansTargetY: humansConfig.y + point.y * (fontSize / (fontSize * 2))
      };
    }
    return { forHumansTargetX: particleX, forHumansTargetY: particleY };
  }

  calculateWeCareTarget(cleanWord, char, charIndex, point, weCareConfig, particleX, particleY, fontSize) {
    // Only process specific words that should form "WE CARE"
    if (cleanWord === "Care") {
      try {
        let targetX = weCareConfig.x + this.ctx.measureText("WE ").width;
        // Add position for each character in "Care"
        for (let j = 0; j < charIndex && j < "CARE".length; j++) {
          targetX += this.ctx.measureText("CARE"[j]).width;
        }
        
        return {
          weCareTargetX: targetX + point.x * (fontSize / (fontSize * 2)),
          weCareTargetY: weCareConfig.y + point.y * (fontSize / (fontSize * 2))
        };
      } catch (error) {
        console.warn('WE CARE target calculation failed:', error);
        return { weCareTargetX: particleX, weCareTargetY: particleY };
      }
    }
    
    // Check for "We" word specifically
    if (cleanWord === "We") {
      try {
        let targetX = weCareConfig.x;
        if (char === "e") {
          targetX += this.ctx.measureText("W").width;
        }
        
        return {
          weCareTargetX: targetX + point.x * (fontSize / (fontSize * 2)),
          weCareTargetY: weCareConfig.y + point.y * (fontSize / (fontSize * 2))
        };
      } catch (error) {
        console.warn('WE target calculation failed:', error);
        return { weCareTargetX: particleX, weCareTargetY: particleY };
      }
    }
    
    return { weCareTargetX: particleX, weCareTargetY: particleY };
  }

  createMiniConstellations() {
    this.miniConstellations = [];
    const miniConnections = [
      ["Care", "Create"], ["Care", "Ethical"], ["Care", "humans"],
      ["Create", "Ethical"], ["Create", "humans"], ["Create", "core"],
      ["Ethical", "responsible"], ["Ethical", "humans"], ["Ethical", "core"],
      ["responsible", "humans"], ["responsible", "core"], ["humans", "core"],
    ];
    
    for (let i = 0; i < 30; i++) {
      const conn = miniConnections[i % miniConnections.length];
      const p1 = this.keyWordMap.get(conn[0]);
      const p2 = this.keyWordMap.get(conn[1]);
      
      if (p1 && p2 && Math.hypot(p1.targetX - p2.targetX, p1.targetY - p2.targetY) < 100) {
        this.miniConstellations.push(
          new ConstellationLine(p1, p2, `mini-${conn[0]}-${conn[1]}`, (i * 0.1) / 4, true)
        );
      }
    }
  }

  createConstellations() {
    this.constellations = [];
    const connections = [
      ["Care", "humans"], ["Create", "Ethical"], ["humans", "core"],
      ["responsible", "core"], ["Care", "core"], ["Create", "humans"],
    ];
    
    connections.forEach(([word1, word2], index) => {
      const particle1 = this.keyWordMap.get(word1);
      const particle2 = this.keyWordMap.get(word2);
      if (particle1 && particle2) {
        const delay = index * 0.2;
        this.constellations.push(new ConstellationLine(particle1, particle2, `${word1}-${word2}`, delay));
      }
    });
  }

  startRenderLoop() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    
    const render = () => {
      if (!this.isActive || !this.phaseManager) return;
      
      try {
        this.debugInfo.currentLine = 'render-start';
        this.updateFPS();
        
        // Clear with black background  
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.isPaused) {
          this.debugInfo.currentLine = 'phase-update';
          const phaseData = this.phaseManager.update();
          
          this.debugInfo.currentLine = 'global-opacity';
          this.updateGlobalOpacity(phaseData);
          
          this.debugInfo.currentLine = 'render-particles';
          this.renderParticles(phaseData);
          
          this.debugInfo.currentLine = 'render-flares';
          this.renderFlares();
          
          this.debugInfo.currentLine = 'render-constellations';
          this.renderConstellations(phaseData);
          
          this.debugInfo.currentLine = 'render-enhancers';
          this.renderEnhancers(phaseData);
          
          this.debugInfo.currentLine = 'update-flare-generation';
          this.updateFlareGeneration(phaseData);
        }

        this.debugInfo.currentLine = 'render-debug';
        if (this.showDebug) {
          this.renderDebugPanel(phaseData);
        }

        this.debugInfo.currentLine = 'render-complete';
      } catch (error) {
        this.logError('Render Loop Error', error, this.debugInfo.currentLine);
      }

      this.animationId = requestAnimationFrame(render);
    };
    
    this.animationId = requestAnimationFrame(render);
  }

  updateGlobalOpacity(phaseData) {
    this.globalOpacity = phaseData.phase === "dissolution" && phaseData.progress > 0.75
      ? 1 - (phaseData.progress - 0.75) / 0.25
      : phaseData.phase === "materialization" && phaseData.progress < 0.25
        ? phaseData.progress / 0.25
        : 1;
    
    this.ctx.globalAlpha = this.globalOpacity;
  }

  renderParticles(phaseData) {
    try {
      this.particles.forEach((particle, index) => {
        try {
          particle.canvas = this.canvas;
          particle.update(phaseData.phase, phaseData.progress);
          particle.draw(this.ctx);
          
          // FX-5: Removed flare generation from here - let updateFlareGeneration() handle it
          
        } catch (error) {
          this.logError('Particle Error', error, `renderParticles-particle-${index}`);
        }
      });
    } catch (error) {
      this.logError('Render Particles Error', error, 'renderParticles-main');
    }
  }

  createFlare(particle) {
    return {
      x: particle.x,
      y: particle.y,
      size: particle.getBaseSize() * 0.5,
      opacity: 0.8,
      life: 0,
      color: particle.getColor(),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    };
  }

  renderFlares() {
    this.flares = this.flares.filter(flare => flare.life < 1);
    this.flares.forEach(flare => {
      flare.x += flare.vx;
      flare.y += flare.vy;
      flare.life += 0.02;
      flare.opacity = 0.8 * (1 - flare.life);
      flare.size *= 0.95;
      
      this.ctx.save();
      this.ctx.globalAlpha = flare.opacity * this.globalOpacity;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = flare.color;
      this.ctx.fillStyle = flare.color;
      this.ctx.beginPath();
      this.ctx.arc(flare.x, flare.y, flare.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  renderConstellations(phaseData) {
    try {
      if (phaseData.phase === "materialization" && phaseData.progress > 0.2 && phaseData.progress < 0.6) {
        this.miniConstellations.forEach((line, index) => {
          try {
            line.opacity = 1;
            line.draw(this.ctx, phaseData.phase, phaseData.progress);
          } catch (error) {
            this.logError('Mini Constellation Error', error, `renderConstellations-mini-${index}`);
          }
        });
      } else if (phaseData.phase === "constellation" || phaseData.phase === "breathing") {
        this.constellations.forEach((line, index) => {
          try {
            line.opacity = phaseData.phase === "breathing" && phaseData.progress > 0.667 ? 0 : 1;
            line.draw(this.ctx, phaseData.phase, phaseData.progress);
          } catch (error) {
            this.logError('Constellation Error', error, `renderConstellations-main-${index}`);
          }
        });
      } else if (phaseData.phase === "dissolution") {
        this.constellations.forEach((line, index) => {
          try {
            line.opacity = Math.max(0, 1 - phaseData.progress);
            line.draw(this.ctx, phaseData.phase, phaseData.progress);
          } catch (error) {
            this.logError('Dissolution Constellation Error', error, `renderConstellations-dissolution-${index}`);
          }
        });
      }
    } catch (error) {
      this.logError('Render Constellations Error', error, 'renderConstellations-main');
    }
  }

  renderEnhancers(phaseData) {
    let enhancerOpacity = phaseData.phase === "materialization" && phaseData.progress >= 0.75
      ? ((phaseData.progress - 0.75) / 0.25) * 0.4
      : (phaseData.phase === "constellation") ? 0.4 
      : (phaseData.phase === "breathing" && phaseData.progress >= 0.2 && phaseData.progress < 0.6) ? 0.3 : 0;

    if (enhancerOpacity > 0) {
      this.particles.forEach((p) => {
        let targetX = p.targetX;
        let targetY = p.targetY;
        
        try {
          // Determine which target to use based on breathing phase
          if (phaseData.phase === "breathing") {
            if (phaseData.progress >= 0.2 && phaseData.progress < 0.4) {
              // HUMANS phase
              if (p.isPurpleWord && p.forHumansTargetX !== undefined) {
                targetX = p.forHumansTargetX;
                targetY = p.forHumansTargetY;
              }
            } else if (phaseData.progress >= 0.4 && phaseData.progress < 0.6) {
              // WE CARE phase
              if ((p.word === "Care" || p.word === "We") && p.weCareTargetX !== undefined) {
                targetX = p.weCareTargetX;
                targetY = p.weCareTargetY;
              }
            }
          }
          
          this.ctx.save();
          this.ctx.globalAlpha = enhancerOpacity * this.globalOpacity;
          this.ctx.shadowBlur = p.isPurpleWord ? 8 : p.isKeyWord ? 8 : 4;
          this.ctx.shadowColor = p.getColor();
          this.ctx.fillStyle = p.getColor();
          this.ctx.beginPath();
          this.ctx.arc(targetX, targetY, 2, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();
        } catch (error) {
          // Skip this enhancer if there's an error
          console.warn('Enhancer render error:', error);
        }
      });
    }
  }

  updateFlareGeneration(phaseData) {
    if ((phaseData.phase === "materialization" && phaseData.progress < 0.2) ||
        (phaseData.phase === "breathing" && (phaseData.progress < 0.2 || (phaseData.progress > 0.6 && phaseData.progress < 0.8)))) {
      this.particles.forEach(p => {
        // FX-5: Cap flare count and reduce spawn rate
        if (this.flares.length < 80 && Math.random() < 0.05 && p.flareTimer > 300) {
          this.flares.push({
            x: p.x,
            y: p.y,
            size: p.getBaseSize() * 0.3,
            opacity: 0.6,
            life: 0,
            color: p.getColor(),
            vx: p.explosionVector.x * 0.5,
            vy: p.explosionVector.y * 0.5,
          });
          p.flareTimer = 0;
        }
      });
    }
  }

  stopRenderLoop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  updateFPS() {
    const now = performance.now();
    this.debugInfo.frameCount++;
    
    if (this.debugInfo.lastFrameTime) {
      const delta = now - this.debugInfo.lastFrameTime;
      const fps = 1000 / delta;
      this.fpsHistory.push(fps);
      if (this.fpsHistory.length > 60) this.fpsHistory.shift();
      this.debugInfo.fps = Math.round(this.fpsHistory.reduce((a, b) => a + b) / this.fpsHistory.length);
    }
    this.debugInfo.lastFrameTime = now;
  }

  logError(type, error, line) {
    const errorInfo = {
      type,
      message: error.message || error,
      line,
      timestamp: Date.now() - this.debugInfo.startTime
    };
    this.debugInfo.errors.push(errorInfo);
    if (this.debugInfo.errors.length > 10) this.debugInfo.errors.shift();
    console.error(`[${type}] at ${line}:`, error);
  }

  logWarning(message, line) {
    const warningInfo = {
      message,
      line,
      timestamp: Date.now() - this.debugInfo.startTime
    };
    this.debugInfo.warnings.push(warningInfo);
    if (this.debugInfo.warnings.length > 10) this.debugInfo.warnings.shift();
  }

  renderDebugPanel(phaseData) {
    if (!phaseData) return;
    
    const currentTime = performance.now();
    // FX-6: Debounce debug panel to 10fps
    if (this.lastDebugPaint && currentTime - this.lastDebugPaint < 100) return;
    this.lastDebugPaint = currentTime;
    
    const runtime = ((Date.now() - this.debugInfo.startTime) / 1000).toFixed(1);
    
    this.ctx.save();
    this.ctx.globalAlpha = 1;
    
    // Semi-transparent background
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(10, 10, 400, 300);
    
    // Border
    this.ctx.strokeStyle = '#00FF00';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(10, 10, 400, 300);
    
    // Text styling
    this.ctx.font = '14px monospace';
    this.ctx.textAlign = 'left';
    let y = 35;
    const lineHeight = 18;
    
    // Header
    this.ctx.fillStyle = '#00FF00';
    this.ctx.fillText('🌌 STELLAR MESSAGE DEBUG PANEL', 20, y);
    y += lineHeight + 5;
    
    // Runtime info
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText(`Runtime: ${runtime}s | FPS: ${this.debugInfo.fps} | Frames: ${this.debugInfo.frameCount}`, 20, y);
    y += lineHeight;
    
    this.ctx.fillText(`Current Line: ${this.debugInfo.currentLine}`, 20, y);
    y += lineHeight;
    
    // Phase info
    this.ctx.fillStyle = '#FFD700';
    this.ctx.fillText(`Phase: ${phaseData.phase} (${(phaseData.progress * 100).toFixed(1)}%)`, 20, y);
    y += lineHeight;
    
    // Progress bar
    const barWidth = 300;
    const barHeight = 10;
    this.ctx.strokeStyle = '#FFD700';
    this.ctx.strokeRect(20, y, barWidth, barHeight);
    this.ctx.fillStyle = '#FFD700';
    this.ctx.fillRect(20, y, barWidth * phaseData.progress, barHeight);
    y += lineHeight + 5;
    
    // Counts
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText(`Particles: ${this.particles.length} | Flares: ${this.flares.length}`, 20, y);
    y += lineHeight;
    
    this.ctx.fillText(`Constellations: ${this.constellations.length} | Mini: ${this.miniConstellations.length}`, 20, y);
    y += lineHeight;
    
    this.ctx.fillText(`Canvas: ${this.canvas.width}x${this.canvas.height} | Opacity: ${this.globalOpacity.toFixed(2)}`, 20, y);
    y += lineHeight;
    
    // Status
    this.ctx.fillStyle = this.isPaused ? '#FF6B35' : '#00FF00';
    this.ctx.fillText(`Status: ${this.isPaused ? '⏸️ PAUSED' : '▶️ PLAYING'}`, 20, y);
    y += lineHeight + 5;
    
    // Errors
    if (this.debugInfo.errors.length > 0) {
      this.ctx.fillStyle = '#FF0000';
      this.ctx.fillText('🚨 RECENT ERRORS:', 20, y);
      y += lineHeight;
      
      this.debugInfo.errors.slice(-3).forEach(error => {
        this.ctx.font = '12px monospace';
        this.ctx.fillText(`${error.timestamp}ms: ${error.type} at ${error.line}`, 25, y);
        y += 14;
        this.ctx.fillText(`  ${error.message.substring(0, 50)}...`, 25, y);
        y += 16;
      });
      this.ctx.font = '14px monospace';
    }
    
    // Warnings
    if (this.debugInfo.warnings.length > 0) {
      this.ctx.fillStyle = '#FFA500';
      this.ctx.fillText('⚠️ WARNINGS:', 20, y);
      y += lineHeight;
      
      this.debugInfo.warnings.slice(-2).forEach(warning => {
        this.ctx.font = '12px monospace';
        this.ctx.fillText(`${warning.timestamp}ms: ${warning.message}`, 25, y);
        y += 14;
      });
    }
    
    this.ctx.restore();
  }

  toggleDebug() {
    this.showDebug = !this.showDebug;
    return this.showDebug;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.pausedTime = Date.now();
    } else {
      const pauseDuration = Date.now() - this.pausedTime;
      this.phaseManager.startTime += pauseDuration;
    }
    return this.isPaused;
  }
}

export const StellarMessageComponent = () => {
  const containerRef = useRef(null);
  const stellarRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showDebug, setShowDebug] = useState(true);

  useEffect(() => {
    stellarRef.current = new StellarMessage();
    
    const initialize = () => {
      if (containerRef.current && !stellarRef.current.isInitialized) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          stellarRef.current.init(containerRef.current);
          return true;
        }
      }
      return false;
    };

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

  const handleTogglePause = () => {
    if (stellarRef.current) {
      setIsPaused(stellarRef.current.togglePause());
    }
  };

  const handleToggleDebug = () => {
    if (stellarRef.current) {
      setShowDebug(stellarRef.current.toggleDebug());
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ 
        position: "relative", 
        width: "100%", 
        height: "100vh", 
        background: "transparent",
        overflow: "hidden"
      }}
    >
      {/* Control Panel */}
      <div style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        zIndex: 10000,
        display: "flex",
        gap: "10px",
        flexDirection: "column"
      }}>
        <button
          onClick={handleTogglePause}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
          }}
        >
          {isPaused ? "▶️ Resume" : "⏸️ Pause"}
        </button>
        
        <button
          onClick={handleToggleDebug}
          style={{
            padding: "12px 24px",
            background: showDebug 
              ? "linear-gradient(135deg, #00FF00 0%, #00CC00 100%)" 
              : "linear-gradient(135deg, #666666 0%, #444444 100%)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
          }}
        >
          {showDebug ? "🐛 Hide Debug" : "🐛 Show Debug"}
        </button>
      </div>
    </div>
  );
};

export default StellarMessageComponent;