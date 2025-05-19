import React, { useEffect, useRef } from 'react';

// Internal metadata for LEGIT compliance
const metadata = {
  id: 'parallax_speed_dust',
  scs: 'SCS4',
  type: 'effect',
  doc: 'contract_parallax_dust.md'
};

// Define depth bands for parallax layers
const DEPTH_BANDS = {
  NEAR: { speed: 1.0, opacity: 1.0 },
  MID: { speed: 0.85, opacity: 0.85 },
  FAR: { speed: 0.65, opacity: 0.65 }
};

export default function ParallaxSpeedDust({ 
  opacity = 1, 
  speed = 3, 
  density = 75,
  fps = 30,
  scrollProgress = 0,
  onRegisterEffect
}) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const particlesRef = useRef([]);
  const lastUpdateRef = useRef(0);
  
  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Create initial particles
    particlesRef.current = Array.from({ length: density }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speed: speed * (0.5 + Math.random() * 0.5),
      depth: Math.random()
    }));
    
    // Register effect if callback provided
    if (onRegisterEffect) {
      onRegisterEffect({
        update: (deltaTime) => {
          // Update will be handled by animation frame
        },
        cleanup: () => {
          if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
          }
        }
      });
    }
    
    // Initial render
    render();
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [density, speed, onRegisterEffect]);
  
  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Render function
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const now = performance.now();
    
    // Limit updates based on fps
    if (now - lastUpdateRef.current < 1000 / fps) {
      frameRef.current = requestAnimationFrame(render);
      return;
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw particles
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = opacity;
    
    particlesRef.current.forEach(particle => {
      // Update position
      particle.x -= particle.speed;
      
      // Wrap around
      if (particle.x < 0) {
        particle.x = width;
        particle.y = Math.random() * height;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    lastUpdateRef.current = now;
    frameRef.current = requestAnimationFrame(render);
  };
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity }}
    />
  );
} 