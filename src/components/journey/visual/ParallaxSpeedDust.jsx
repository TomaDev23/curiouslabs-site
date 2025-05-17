import { useEffect, useRef } from 'react';

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

export default function ParallaxSpeedDust({ opacity, speed, density, fps, scrollProgress }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const containerRef = useRef(null);
  const particlesRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const isAnimatingRef = useRef(false);
  
  // Animation state management - more permissive range
  const isInSceneRange = scrollProgress >= 0.25 && scrollProgress <= 0.85; // Wider range for persistence

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
      
      // Distribute particles across the entire canvas height
      return {
        x: Math.random() * (canvas.width / dpr),
        y: (Math.random() * canvas.height * 1.5 - canvas.height * 0.25) / dpr, // Spread across 150% height
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
    
    // Wider ramp for smoother transitions
    const rampUpProgress = Math.min(1, (scrollProgress - 0.25) / 0.1);
    const rampDownProgress = Math.max(0, (0.85 - scrollProgress) / 0.1);
    return Math.min(rampUpProgress, rampDownProgress) * opacity;
  };

  // Core animation function
  const animate = (time) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx || !particlesRef.current) {
      isAnimatingRef.current = false;
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    
    // FPS limiting
    if (time - lastFrameTimeRef.current < 1000 / fps) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    
    lastFrameTimeRef.current = time;

    // Reset transform and clear
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const sceneOpacity = calculateSceneOpacity();
    const timeSeconds = time / 1000;
    const scrollOffset = scrollProgress * (canvas.height / dpr);

    // Always update particles even if opacity is 0
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
      }
    });

    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Ensure animation starts and stays running
  const ensureAnimation = () => {
    if (!isAnimatingRef.current && canvasRef.current) {
      isAnimatingRef.current = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container) return;
    
    // Setup ResizeObserver
    resizeObserverRef.current = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry) return;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = entry.contentRect.width * dpr;
      canvas.height = entry.contentRect.height * dpr;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        particlesRef.current = initializeParticles(canvas, dpr);
        ensureAnimation(); // Ensure animation is running after resize
      }
    });
    
    resizeObserverRef.current.observe(container);
    
    // Initial animation start
    ensureAnimation();

    return () => {
      isAnimatingRef.current = false;
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [fps, speed, density]);

  // Always ensure animation is running when in scene range
  useEffect(() => {
    if (isInSceneRange) {
      ensureAnimation();
    }
  }, [isInSceneRange, scrollProgress]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ 
        pointerEvents: 'none',
        zIndex: 20
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ 
          display: 'block',
          visibility: 'visible', // Always keep canvas visible
          mixBlendMode: 'normal'
        }} 
      />
    </div>
  );
}