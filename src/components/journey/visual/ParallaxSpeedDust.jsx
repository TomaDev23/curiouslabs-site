import React, { useEffect, useRef, useState } from 'react';
import { ScrollPipeline } from '../../../utils/scrollPipeline';
import CanvasContainer from './CanvasContainer';
import { clearCanvas } from '../../../utils/canvasUtils';
import { performanceMonitor } from '../../../utils/performanceMonitor';

const metadata = {
  id: 'parallax_speed_dust',
  scs: 'SCS-SPEED-DUST',
  type: 'visual',
  doc: 'contract_cosmic_visuals.md'
};

// Depth bands for parallax layers
const DEPTH_BANDS = {
  NEAR: 1.0,    // Full speed, highest opacity
  MID: 0.85,    // Increased from 0.7
  FAR: 0.65     // Increased from 0.4
};

export default function ParallaxSpeedDust({ opacity = 1, speed = 1, density = 100, fps = 60 }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastFrameTimeRef = useRef(0);
  const particlesRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const contextRef = useRef(null);
  
  // Animation state management - more permissive range
  const isInSceneRange = scrollProgress >= 0.25 && scrollProgress <= 0.85;

  // Initialize particles with depth bands and guaranteed minimum values
  const initializeParticles = (canvas, dpr) => {
    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      console.warn('ParallaxSpeedDust: Canvas not ready');
      return null;
    }

    const count = Math.max(density, 75);
    return Array.from({ length: count }, () => {
      const depthRoll = Math.random();
      const depth = depthRoll < 0.5 ? DEPTH_BANDS.NEAR : 
                   depthRoll < 0.8 ? DEPTH_BANDS.MID : 
                   DEPTH_BANDS.FAR;
      
      return {
        x: Math.random() * (canvas.width / dpr),
        y: (Math.random() * canvas.height * 1.5 - canvas.height * 0.25) / dpr,
        speed: Math.max(speed * (Math.random() * 0.5 + 0.75), 0.8) * depth,
        length: Math.random() * 15 + 8,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 1,
        pulseStrength: 0.15 + Math.random() * 0.2,
        depth
      };
    });
  };

  // Scene opacity calculation with smoother transitions
  const calculateSceneOpacity = () => {
    if (!isInSceneRange) return 0;
    
    const rampUpProgress = Math.min(1, (scrollProgress - 0.25) / 0.1);
    const rampDownProgress = Math.max(0, (0.85 - scrollProgress) / 0.1);
    return Math.min(rampUpProgress, rampDownProgress) * opacity;
  };

  // Core animation function
  const animate = (time) => {
    const ctx = contextRef.current;
    const canvas = ctx?.canvas;
    
    if (!ctx || !canvas || !particlesRef.current) {
      isAnimatingRef.current = false;
      return;
    }

    performanceMonitor.startFrame(metadata.id);

    const dpr = window.devicePixelRatio || 1;
    
    // FPS limiting
    if (time - lastFrameTimeRef.current < 1000 / fps) {
      requestAnimationFrame(animate);
      return;
    }
    
    lastFrameTimeRef.current = time;

    // Clear canvas efficiently
    clearCanvas(ctx);

    const sceneOpacity = calculateSceneOpacity();
    const timeSeconds = time / 1000;
    const scrollOffset = scrollProgress * (canvas.height / dpr);

    let particlesDrawn = 0;
    let particlesSkipped = 0;

    // Update and draw particles
    particlesRef.current.forEach(p => {
      // Constant base movement
      p.y += p.speed;
      
      const depthOffset = scrollOffset * (1 - p.depth);
      const finalY = p.y + depthOffset;
      
      // Reset with better distribution
      if (finalY > canvas.height / dpr) {
        p.y = -p.length - (Math.random() * canvas.height * 0.2) / dpr - depthOffset;
        p.x = Math.random() * (canvas.width / dpr);
      }
      if (p.x < -p.length || p.x > (canvas.width / dpr) + p.length) {
        p.x = Math.random() * (canvas.width / dpr);
      }

      const breathFactor = 1 + (Math.sin(timeSeconds * p.pulseSpeed + p.phase) * p.pulseStrength);
      const pulsingLength = p.length * breathFactor;
      const pulsingOpacity = Math.min(Math.max(sceneOpacity * p.depth, 0.1) * (0.8 + (breathFactor * 0.2)), 1.0);

      // Draw if there's any opacity
      if (pulsingOpacity > 0) {
        ctx.beginPath();
        ctx.moveTo(p.x, finalY);
        ctx.lineTo(p.x, finalY + pulsingLength);
        ctx.strokeStyle = `rgba(255, 255, 255, ${pulsingOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        particlesDrawn++;
      } else {
        particlesSkipped++;
      }
    });

    performanceMonitor.endFrame(metadata.id, {
      particlesTotal: particlesRef.current.length,
      particlesDrawn,
      particlesSkipped,
      sceneOpacity,
      isInSceneRange
    });

    requestAnimationFrame(animate);
  };

  // Subscribe to scroll updates
  useEffect(() => {
    return ScrollPipeline.subscribe(setScrollProgress);
  }, []);

  // Handle canvas setup
  const handleCanvasSetup = (canvas, ctx, dpr) => {
    contextRef.current = ctx;
    particlesRef.current = initializeParticles(canvas, dpr);
    isAnimatingRef.current = true;
    requestAnimationFrame(animate);
  };

  // Handle canvas resize
  const handleCanvasResize = (canvas, ctx, dpr) => {
    particlesRef.current = initializeParticles(canvas, dpr);
  };

  // Handle cleanup
  const handleCleanup = () => {
    isAnimatingRef.current = false;
    performanceMonitor.reset(metadata.id);
  };

  return (
    <CanvasContainer
      onSetup={handleCanvasSetup}
      onResize={handleCanvasResize}
      onCleanup={handleCleanup}
      zIndex={20}
      visible={true}
      blendMode="normal"
    />
  );
}